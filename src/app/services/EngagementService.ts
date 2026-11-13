import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  CommentItem,
  EngagementState,
  SharePlatform,
  TargetType,
} from "../../lib/types/engagement";

class EngagementService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getState(targetId: string, targetType: TargetType): Promise<EngagementState> {
    const url = `${this.path}/engagement/state?targetId=${targetId}&targetType=${targetType}`;
    const result = await axios.get(url, { withCredentials: true });
    return result.data;
  }

  public async getComments(targetId: string, targetType: TargetType): Promise<CommentItem[]> {
    const url = `${this.path}/engagement/comments?targetId=${targetId}&targetType=${targetType}`;
    const result = await axios.get(url, { withCredentials: true });
    return result.data;
  }

  public async toggleLike(targetId: string, targetType: TargetType): Promise<EngagementState> {
    const result = await axios.post(
      `${this.path}/engagement/like`,
      { targetId, targetType },
      { withCredentials: true }
    );
    return result.data;
  }

  public async addComment(
    targetId: string,
    targetType: TargetType,
    commentText: string
  ): Promise<CommentItem> {
    const result = await axios.post(
      `${this.path}/engagement/comment`,
      { targetId, targetType, commentText },
      { withCredentials: true }
    );
    return result.data;
  }

  public async deleteComment(commentId: string): Promise<EngagementState> {
    const result = await axios.post(
      `${this.path}/engagement/comment/${commentId}/delete`,
      {},
      { withCredentials: true }
    );
    return result.data;
  }

  public async share(
    targetId: string,
    targetType: TargetType,
    platform: SharePlatform
  ): Promise<EngagementState> {
    const result = await axios.post(
      `${this.path}/engagement/share`,
      { targetId, targetType, platform },
      { withCredentials: true }
    );
    return result.data;
  }
}

export function openShareWindow(platform: SharePlatform, pageUrl: string, title: string) {
  if (platform === "copy") {
    if (navigator.clipboard) navigator.clipboard.writeText(pageUrl);
    return;
  }

  const links: Record<Exclude<SharePlatform, "copy">, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
  };
  window.open(links[platform], "_blank", "noopener,noreferrer");
}

export default EngagementService;
