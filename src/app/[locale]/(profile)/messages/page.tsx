"use client";
import ChatBox from "@/components/reusable/ChatBox";
import { useTranslations } from "next-intl";

const MessagesPage = () => {
    const t = useTranslations("MessagesPage");

    return <ChatBox isShowTitle title={t("title")} />;
};

export default MessagesPage;
