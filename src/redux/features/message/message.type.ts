// Message and Conversation Types

export type TParticipant = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type TConversation = {
  id: number;
  participants: TParticipant[];
  created_at: string;
  updated_at: string;
  last_message: string | null;
  unread_count: number;
};

export type TMessage = {
  id: number;
  conversation: number;
  sender: string;
  sender_name: string;
  body: string;
  status: "sent" | "pending" | "failed";
  is_read: boolean;
  created_at: string;
};

export type TGetConversationsResponse = {
  success: boolean;
  data: TConversation[];
};

export type TGetMessagesResponse = {
  success: boolean;
  status: number;
  message: string;
  data: TMessage[];
};
