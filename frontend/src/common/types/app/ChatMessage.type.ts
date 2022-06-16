export interface IChatMessage {
  id: number;
  chat_id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  files: string;
  createdAt: string;
}

export interface IAddChatMessage {
  chat_id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  files?: string;
}
