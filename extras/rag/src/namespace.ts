import { UserId } from '@repo/types';

export type RagNamespace = string;

/**
 * Rule:
 * - Every user gets a STRICTLY isolated namespace
 * - No cross-user retrieval is ever allowed
 */
export function createUserNamespace(userId: UserId): RagNamespace {
    return `user_${userId}`;
}
