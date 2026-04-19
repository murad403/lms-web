import React, { useState } from "react";
import { CourseComment } from "@/redux/features/student/student.type";
import { FaRegComments } from "react-icons/fa6";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { resolveImageUrl } from "@/utils/image";

type RenderCommentProps = {
    comment: CourseComment;
    isReply?: boolean;
    activeReply: number | null;
    replyTexts: Record<number, string>;
    isReplyingComment: boolean;
    onReplyToggle: (commentId: number) => void;
    onReplyChange: (commentId: number, text: string) => void;
    onSubmitReply: (commentId: number) => void;
    getCommentTimestamp: (createdAt: string) => string;
    t: (key: string) => string;
    renderComment: (comment: CourseComment, isReply: boolean) => React.ReactNode;
};

const RenderCommentComponent = ({ comment, isReply = false, activeReply, replyTexts, isReplyingComment, onReplyToggle, onReplyChange, onSubmitReply, getCommentTimestamp, t, renderComment}: RenderCommentProps) => {
    const [showReplies, setShowReplies] = useState(false);
    const imageUrl = resolveImageUrl(comment?.image);
    const hasValidImage = imageUrl && imageUrl.trim() !== "";
    const repliesCount = comment.replies?.length ?? 0;
    const hasReplies = repliesCount > 0;

    return (
        <div key={comment.id} className={`flex gap-3 ${isReply ? "ml-10 sm:ml-14 mt-4" : ""}`}>
            {hasValidImage ? (
                <Image
                    src={imageUrl}
                    alt="Commenter"
                    width={500}
                    height={500}
                    className="rounded-full size-8 object-cover"
                />
            ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 shrink-0">
                    <User className="w-5 h-5 text-gray-500" />
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-title">{comment.user_name}</span>
                    <span className="text-xs text-description">
                        • {getCommentTimestamp(comment.created_at)}
                    </span>
                </div>
                <p className="text-sm text-description leading-relaxed whitespace-pre-line">
                    {comment.text}
                </p>

                <div className="flex items-center gap-3 mt-2">
                    {hasReplies && (
                        <button
                            onClick={() => setShowReplies((prev) => !prev)}
                            className="flex items-center gap-1 text-xs font-medium text-description hover:text-title transition-colors"
                        >
                            {showReplies ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                            {repliesCount} {repliesCount === 1 ? "reply" : "replies"}
                        </button>
                    )}

                    <button
                        onClick={() => onReplyToggle(comment.id)}
                        className={`flex items-center gap-1.5 mt-2 text-xs font-medium text-description hover:text-title ${
                            activeReply === comment.id ? "text-main" : ""
                        } transition-colors`}
                    >
                        <FaRegComments className="size-4" />
                        {t("reply")}
                    </button>
                </div>

                {showReplies && comment.replies?.map((reply) => renderComment(reply, true))}

                {activeReply === comment.id && (
                    <div className="mt-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex-1 relative">
                                <FaRegComments className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-description" />
                                <input
                                    type="text"
                                    value={replyTexts[comment.id] || ""}
                                    onChange={(e) => onReplyChange(comment.id, e.target.value)}
                                    placeholder={t("writeYourReply")}
                                    className="w-full pl-10 pr-4 py-2.5 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                />
                            </div>
                            <button
                                onClick={() => onSubmitReply(comment.id)}
                                disabled={isReplyingComment}
                                className="px-4 py-2.5 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors whitespace-nowrap disabled:opacity-50"
                            >
                                {t("commentReply")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RenderCommentComponent;