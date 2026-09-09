export interface SessionContext {
  sessionId: string;
  workspaceId: string;
  agentId: string;
  userId: string;

  // Media
  roomId: string;

  // Config
  language: string;
  timezone: string;

  createdAt: number;
}
