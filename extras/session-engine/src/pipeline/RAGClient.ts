export interface RAGClient {
    query(params: {
        workspaceId: string;
        agentId: string;
        query: string;
        topK: number;
    }): Promise<string[]>;
}
