import { MouseEvent, FormEvent, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { Messages, serverApi } from "../../../lib/config";
import {
  CommentItem,
  EngagementState,
  SharePlatform,
  TargetType,
} from "../../../lib/types/engagement";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useGlobals } from "../../stores/slices/useGlobals";
import EngagementService, { openShareWindow } from "../../services/EngagementService";
import "./engagement.css";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const emptyState: EngagementState = {
  liked: false,
  likeCount: 0,
  commentCount: 0,
  shareCount: 0,
};

function memberPhoto(path?: string) {
  if (!path) return "";
  return `${serverApi}/${path}`;
}

export function useEngagement(targetId?: string, targetType?: TargetType) {
  const { authMember } = useGlobals();
  const { t } = useTranslation();
  const [state, setState] = useState<EngagementState>(emptyState);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!targetId || !targetType) return;
    const service = new EngagementService();
    let active = true;
    Promise.all([
      service.getState(targetId, targetType),
      service.getComments(targetId, targetType),
    ])
      .then(([nextState, nextComments]) => {
        if (!active) return;
        setState(nextState);
        setComments(nextComments);
      })
      .catch((err) => console.log("Error, useEngagement", err));

    return () => {
      active = false;
    };
  }, [targetId, targetType, authMember?._id]);

  const requireLogin = async () => {
    if (authMember) return true;
    await Swal.fire({
      icon: "info",
      text: String(t("errors.login")),
      confirmButtonText: "OK",
    });
    return false;
  };

  const onLike = async () => {
    if (!targetId || !targetType) return;
    if (!(await requireLogin())) return;
    try {
      const service = new EngagementService();
      setState(await service.toggleLike(targetId, targetType));
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const onShare = async (platform: SharePlatform, pageUrl: string, title: string) => {
    if (!targetId || !targetType) return;
    try {
      const service = new EngagementService();
      setState(await service.share(targetId, targetType, platform));
      openShareWindow(platform, pageUrl, title);
      if (platform === "copy") sweetTopSmallSuccessAlert(String(t("blog.copied")), 1200);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!targetId || !targetType) return;
    if (!(await requireLogin())) return;
    if (!text.trim()) {
      await Swal.fire({ icon: "info", text: String(t("errors.empty")) });
      return;
    }
    try {
      setBusy(true);
      const service = new EngagementService();
      const created = await service.addComment(targetId, targetType, text.trim());
      setComments((prev) => [created, ...prev]);
      setState((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
      setText("");
    } catch (err) {
      sweetErrorHandling(err).then();
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (commentId: string) => {
    try {
      const service = new EngagementService();
      const next = await service.deleteComment(commentId);
      setComments((prev) => prev.filter((item) => item._id !== commentId));
      setState(next);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return {
    authMember,
    state,
    comments,
    text,
    setText,
    busy,
    onLike,
    onShare,
    onSubmit,
    onDelete,
  };
}

type BarProps = {
  state: EngagementState;
  title: string;
  sharePath: string;
  onLike: () => void;
  onShare: (platform: SharePlatform, pageUrl: string, title: string) => void;
  hideShare?: boolean;
};

export function EngagementBar(props: BarProps) {
  const pageUrl = `${window.location.origin}${props.sharePath}`;
  const share = (platform: SharePlatform) => props.onShare(platform, pageUrl, props.title);

  return (
    <div className="pf-engage-bar">
      <button
        type="button"
        className={props.state.liked ? "pf-like-btn active" : "pf-like-btn"}
        onClick={props.onLike}
      >
        <i className="fa fa-heart" /> {props.state.likeCount}
      </button>
      <span>
        <i className="fa fa-comments-o" /> {props.state.commentCount}
      </span>
      {props.hideShare ? null : (
        <div className="blog-share">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li>
                <a className="facebook" href="#facebook" onClick={(event) => { event.preventDefault(); share("facebook"); }}>
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="#twitter" onClick={(event) => { event.preventDefault(); share("twitter"); }}>
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a className="instagram" href="#instagram" onClick={(event) => { event.preventDefault(); share("copy"); }}>
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

type CommentsProps = ReturnType<typeof useEngagement>;

export function EngagementComments(props: CommentsProps) {
  const { t } = useTranslation();
  return (
    <div className="blog-comment-wrapper mt-20">
      <h4 className="blog-dec-title">{t("blog.comments")} : {props.comments.length}</h4>
      {props.comments.map((comment) => {
        const photo = memberPhoto(comment.memberImage);
        const mine = props.authMember?._id === comment.memberId;
        return (
          <div className="pf-comment" key={comment._id}>
            {photo ? (
              <img src={photo} alt={comment.memberNick} />
            ) : (
              <div className="pf-comment-fallback">
                <i className="fa fa-user" />
              </div>
            )}
            <div className="pf-comment-body">
              <h4>{comment.memberNick}</h4>
              <span>{moment(comment.createdAt).format("MMMM D, YYYY")}</span>
              <p>{comment.commentText}</p>
              {mine ? (
                <button type="button" className="pf-comment-delete" onClick={() => props.onDelete(comment._id)}>
                  {t("blog.delete")}
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
      <div className="blog-reply-wrapper mt-40">
        <h4 className="blog-dec-title">{t("blog.postComment")}</h4>
        <form className="pf-comment-form" onSubmit={props.onSubmit}>
          <textarea
            placeholder={props.authMember ? String(t("blog.message")) : String(t("blog.loginComment"))}
            value={props.text}
            onChange={(event) => props.setText(event.target.value)}
          />
          <button type="submit" disabled={props.busy}>
            {t("blog.send")}
          </button>
        </form>
      </div>
    </div>
  );
}

type LikeButtonProps = {
  targetId: string;
  targetType: TargetType;
  initialLiked?: boolean;
  initialCount?: number;
};

export function LikeButton(props: LikeButtonProps) {
  const { authMember } = useGlobals();
  const [liked, setLiked] = useState(Boolean(props.initialLiked));
  const [count, setCount] = useState(props.initialCount ?? 0);

  useEffect(() => {
    setLiked(Boolean(props.initialLiked));
    setCount(props.initialCount ?? 0);
  }, [props.targetId, props.initialLiked, props.initialCount]);

  const onClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!authMember) {
      await Swal.fire({ icon: "info", text: String(i18n.t("errors.login")), confirmButtonText: "OK" });
      return;
    }
    try {
      const service = new EngagementService();
      const next = await service.toggleLike(props.targetId, props.targetType);
      setLiked(next.liked);
      setCount(next.likeCount);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <button type="button" className={liked ? "pf-like-btn active" : "pf-like-btn"} onClick={onClick} title={String(i18n.t("blog.like"))}>
      <i className="fa fa-heart" /> {count}
    </button>
  );
}
