"use client";
import ChatBox from "@/components/reusable/ChatBox";
import { useTranslations } from "next-intl";

const MessagesPage = () => {
  const t = useTranslations("MessagesPage");

  return <ChatBox heightClass="h-[calc(100vh-180px)]" isShowTitle={false} title={t("title")} />;
};

export default MessagesPage;
