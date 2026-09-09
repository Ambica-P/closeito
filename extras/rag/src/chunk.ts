export interface RagChunk {
    id: string;
    documentId: string;

    content: string;

    // Character offsets in original document
    start: number;
    end: number;

    metadata?: Record<string, string>;
}
