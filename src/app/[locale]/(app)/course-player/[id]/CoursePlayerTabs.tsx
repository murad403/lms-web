"use client";
import { useState } from "react";
import { Download, FileText, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaRegComments } from "react-icons/fa6";
import { useAddCommentMutation, useGetCommentsQuery, useReplyCommentMutation } from "@/redux/features/student/student.api";
import { CourseComment, CourseLecture } from "@/redux/features/student/student.type";
import { Skeleton } from "@/components/ui/skeleton";
import RenderCommentComponent from "./RenderComment";

type CoursePlayerTabsProps = {
    currentLecture: CourseLecture;
    currentLectureNumber: number;
};

const CoursePlayerTabs = ({ currentLecture, currentLectureNumber }: CoursePlayerTabsProps) => {
    const t = useTranslations("CoursePlayer");
    const [activeTab, setActiveTab] = useState("description");
    const [commentText, setCommentText] = useState("");
    const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
    const [activeReply, setActiveReply] = useState<number | null>(null);
    const [visibleComments, setVisibleComments] = useState(5);

    // console.log("attachment", currentLecture)

    const { data: commentsResponse, isLoading: isCommentsLoading, refetch: refetchComments } = useGetCommentsQuery(currentLecture.id);
    const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
    const [replyComment, { isLoading: isReplyingComment }] = useReplyCommentMutation();

    const comments = commentsResponse?.data?.comments ?? [];
    const commentsCount = comments.length;

    const handleDownloadNotes = async () => {
        if (!currentLecture.note_file) return;

        try {
            const fileName = currentLecture.note_file.split("/").pop() || "lecture-notes.pdf";
            const response = await fetch(currentLecture.note_file);
            
            if (!response.ok) throw new Error("Download failed");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            window.open(currentLecture.note_file, "_blank");
        }
    };

    const handleDownloadFile = async (fileUrl: string) => {
        try {
            const fileName = fileUrl.split("/").pop() || "file";
            const response = await fetch(fileUrl);
            
            if (!response.ok) throw new Error("Download failed");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            window.open(fileUrl, "_blank");
        }
    };

    const getCommentTimestamp = (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const handleReplyToggle = (commentId: number) => {
        setActiveReply((prev) => (prev === commentId ? null : commentId));
    };

    const handleReplyChange = (commentId: number, text: string) => {
        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: text,
        }));
    };

    const handleAddComment = async () => {
        const text = commentText.trim();
        if (!text) return;

        await addComment({ lecture: currentLecture.id, text }).unwrap();
        setCommentText("");
        await refetchComments();
    };

    const handleSubmitReply = async (commentId: number) => {
        const text = replyTexts[commentId]?.trim();
        if (!text) return;

        await replyComment({
            lecture: currentLecture.id,
            text,
            parent: commentId,
        }).unwrap();

        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: "",
        }));
        setActiveReply(null);
        await refetchComments();
    };

    const renderComment = (comment: CourseComment, isReply = false) => {
        return (
            <RenderCommentComponent
                key={comment.id}
                comment={comment}
                isReply={isReply}
                activeReply={activeReply}
                replyTexts={replyTexts}
                isReplyingComment={isReplyingComment}
                onReplyToggle={handleReplyToggle}
                onReplyChange={handleReplyChange}
                onSubmitReply={handleSubmitReply}
                getCommentTimestamp={getCommentTimestamp}
                t={t}
                renderComment={renderComment}
            />
        );
    };

    const tabs = [
        { id: "description", label: t("description") },
        { id: "notes", label: t("lectureNotes") },
        {
            id: "files",
            label: `${t("attachFile")} (${currentLecture.attachment_file ? "01" : "00"})`,
        },
        { id: "comments", label: t("comments") },
    ];

    return (
        <div className="mt-4 sm:mt-6">
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-title">
                    {currentLectureNumber}. {currentLecture.name}
                </h2>
                <div className="space-x-6 whitespace-nowrap">
                    <span className="text-xs sm:text-sm text-description">
                        {t("comments")}: <span className="font-medium text-title">{commentsCount}</span>
                    </span>
                </div>
            </div>

            <div className="border-b border-border-light">
                <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 sm:px-5 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors relative ${activeTab === tab.id
                                ? "text-main border-b-2 border-main"
                                : "text-description hover:text-title"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="py-4 sm:py-6">
                {activeTab === "description" && (
                    <div className="space-y-6">
                        <h3 className="text-base sm:text-lg font-semibold text-title">
                            {t("lectureDescription")}
                        </h3>
                        <div>
                            <p className="text-sm text-description leading-relaxed whitespace-pre-line">
                                {currentLecture.description || "No description available."}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === "notes" && (
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-title mb-4">
                            {t("lectureNotes")}
                        </h3>
                        {currentLecture.note_file ? (
                            <div>
                                <div className="flex items-center justify-between px-4 py-5 transition-colors bg-[#F5F7FA] mb-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div>
                                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F9BEF]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-title truncate">
                                                {currentLecture.note_file.split("/").pop() || "lecture-notes.pdf"}
                                            </p>
                                            <p className="text-xs text-description">Lecture Notes</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDownloadNotes}
                                        className="flex items-center gap-2 px-4 py-2 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors shrink-0 ml-3 cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t("downloadNotes")}
                                    </button>
                                </div>
                                {currentLecture.lecture_notes && (
                                    <div className="text-sm text-description leading-relaxed whitespace-pre-line p-4 bg-gray-50 rounded">
                                        {currentLecture.lecture_notes}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-description">No lecture notes available.</p>
                        )}
                    </div>
                )}

                {activeTab === "files" && (
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-title mb-4">
                            {t("attachFiles")} {currentLecture.attachment_file ? "(01)" : "(00)"}
                        </h3>
                        <div className="space-y-3">
                            {currentLecture.attachment_file ? (
                                <div className="flex items-center justify-between px-4 py-5 transition-colors bg-[#F5F7FA]">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div>
                                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F9BEF]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-title truncate">
                                                {currentLecture.attachment_file.split("/").pop() || "attachment-file"}
                                            </p>
                                            <p className="text-xs text-description">Attachment</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownloadFile(currentLecture.attachment_file!)}
                                        className="px-4 py-2 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors shrink-0 ml-3 cursor-pointer"
                                    >
                                        {t("downloadFile")}
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-description">No attachments available.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "comments" && (
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-title mb-4">
                            {t("comments")} ({commentsCount})
                        </h3>

                        <div className="flex items-center gap-2 sm:gap-3 mb-6">
                            <div className="flex-1 relative">
                                <FaRegComments className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-description" />
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder={t("writeAComment")}
                                    className="w-full pl-10 pr-4 py-2.5 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                />
                            </div>
                            <button
                                onClick={handleAddComment}
                                disabled={isAddingComment}
                                className="px-4 sm:px-6 py-2.5 bg-main text-white text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-50"
                            >
                                {t("comment")}
                            </button>
                        </div>

                        {isCommentsLoading ? (
                            <div className="space-y-4 py-6">
                                {[...Array(3)].map((_, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="flex gap-2">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                            <Skeleton className="h-12 w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {comments.slice(0, visibleComments).map((comment) => renderComment(comment))}
                            </div>
                        )}

                        {visibleComments < comments.length && (
                            <button
                                onClick={() => setVisibleComments((prev) => prev + 5)}
                                className="flex items-center gap-1.5 py-3 px-4 mt-6 text-sm font-medium bg-[#EDF5FD] text-[#4F9BEF] hover:bg-[#EDF5FD]/90 transition-colors"
                            >
                                {t("loadMore")}
                                <Loader className="size-4 animate-spin" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePlayerTabs;