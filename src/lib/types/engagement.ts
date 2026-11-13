export type TargetType = "PRODUCT" | "BLOG";
export type SharePlatform = "facebook" | "twitter" | "telegram" | "copy";

export interface EngagementState {
  liked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

export interface CommentItem {
  _id: string;
  commentText: string;
  createdAt: string;
  memberId: string;
  memberNick: string;
  memberImage?: string;
}
