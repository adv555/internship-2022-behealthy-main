import { IChatMessage } from 'common/types/app/ChatMessage.type';

export function findLatestMessage(messages: IChatMessage[], userId: number) {
  if (messages == null || messages.length === 0) {
    return undefined;
  }
  const filteredMessages = messages.filter(
    (messages) => messages.user_id !== userId,
  );
  if (filteredMessages == null || filteredMessages.length === 0) {
    return undefined;
  }

  return filteredMessages.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )[0];
}
