"use client";
import { useState } from "react";
import Image from "next/image";
import { Download, FileText, MessageSquare, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  coursePlayerInfo,
  lectureDescription,
  lectureNotes,
  courseAttachments,
  courseComments,
  TCourseComment,
} from "@/lib/profile";

type CoursePlayerTabsProps = {
  currentLectureTitle: string;
  currentLectureNumber: number;
};

const CoursePlayerTabs = ({
  currentLectureTitle,
  currentLectureNumber,
}: CoursePlayerTabsProps) => {
  const t = useTranslations("CoursePlayer");
  const [activeTab, setActiveTab] = useState("description");
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState(5);

  const tabs = [
    { id: "description", label: t("description") },
    { id: "notes", label: t("lectureNotes") },
    {
      id: "files",
      label: `${t("attachFile")} (${String(courseAttachments.length).padStart(2, "0")})`,
    },
    { id: "comments", label: t("comments") },
  ];

  const handleReplyToggle = (commentId: string) => {
    setActiveReply(activeReply === commentId ? null : commentId);
  };

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyTexts((prev) => ({ ...prev, [commentId]: text }));
  };

  const renderComment = (comment: TCourseComment, isReply = false) => (
    <div
      key={comment.id}
      className={`flex gap-3 ${isReply ? "ml-10 sm:ml-14 mt-4" : ""}`}
    >
      {/* Avatar */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
        <Image
          src={comment.avatar}
          alt={comment.userName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-title">
            {comment.userName}
          </span>
          <span className="text-xs text-description">• {comment.timeAgo}</span>
        </div>
        <p className="text-sm text-description leading-relaxed whitespace-pre-line">
          {comment.comment}
        </p>
        {!isReply && (
          <button
            onClick={() => handleReplyToggle(comment.id)}
            className="flex items-center gap-1.5 mt-2 text-xs font-medium text-main hover:text-main/80 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {t("reply")}
          </button>
        )}

        {/* Replies */}
        {comment.replies &&
          comment.replies.map((reply) => renderComment(reply, true))}

        {/* Reply Input */}
        {activeReply === comment.id && (
          <div className="mt-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                <input
                  type="text"
                  value={replyTexts[comment.id] || ""}
                  onChange={(e) =>
                    handleReplyChange(comment.id, e.target.value)
                  }
                  placeholder={t("writeYourReply")}
                  className="w-full pl-10 pr-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-main"
                />
              </div>
              <button className="px-4 py-2.5 bg-main text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors whitespace-nowrap">
                {t("commentReply")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-4 sm:mt-6">
      {/* Lecture Info Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-title">
          {currentLectureNumber}. {currentLectureTitle}
        </h2>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
          {/* Student Avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src="/home/banner.jpg"
                    alt="Student"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-description">
              <span className="font-semibold text-title">
                {coursePlayerInfo.studentsWatching}
              </span>{" "}
              {t("studentsWatching")}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-gray-300" />

          {/* Last Updated */}
          <span className="text-xs sm:text-sm text-description">
            {t("lastUpdated")}:{" "}
            <span className="font-medium text-title">
              {coursePlayerInfo.lastUpdated}
            </span>
          </span>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-gray-300" />

          {/* Comments Count */}
          <span className="text-xs sm:text-sm text-description">
            {t("comments")}:{" "}
            <span className="font-medium text-title">
              {coursePlayerInfo.comments}
            </span>
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border-light">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? "text-main border-b-2 border-main"
                  : "text-description hover:text-title"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-4 sm:py-6">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-title mb-3">
                {t("lecturesDescription")}
              </h3>
              <p className="text-sm text-description leading-relaxed">
                {lectureDescription}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-title">
                  {t("lectureNotes")}
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors">
                  <Download className="w-4 h-4" />
                  {t("downloadNotes")}
                </button>
              </div>
              <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                {lectureNotes}
              </div>
            </div>
          </div>
        )}

        {/* Lecture Notes Tab */}
        {activeTab === "notes" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-title">
                {t("lectureNotes")}
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors">
                <Download className="w-4 h-4" />
                {t("downloadNotes")}
              </button>
            </div>
            <div className="text-sm text-description leading-relaxed whitespace-pre-line">
              {lectureNotes}
            </div>
          </div>
        )}

        {/* Attach Files Tab */}
        {activeTab === "files" && (
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-title mb-4">
              {t("attachFiles")} ({String(courseAttachments.length).padStart(2, "0")})
            </h3>
            <div className="space-y-3">
              {courseAttachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border border-border-light rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-description" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-title truncate">
                        {file.fileName}
                      </p>
                      <p className="text-xs text-description">{file.fileSize}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-main text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors shrink-0 ml-3">
                    {t("downloadFile")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-title mb-4">
              {t("comments")} ({courseComments.length})
            </h3>

            {/* Comment Input */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6">
              <div className="flex-1 relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t("writeAComment")}
                  className="w-full pl-10 pr-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-main"
                />
              </div>
              <button className="px-4 sm:px-6 py-2.5 bg-main text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors">
                {t("comment")}
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-5">
              {courseComments.slice(0, visibleComments).map((comment) => renderComment(comment))}
            </div>

            {/* Load More */}
            {visibleComments < courseComments.length && (
              <button
                onClick={() => setVisibleComments((prev) => prev + 5)}
                className="flex items-center gap-1.5 mt-6 text-sm font-medium text-main hover:text-main/80 transition-colors"
              >
                {t("loadMore")}
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayerTabs
