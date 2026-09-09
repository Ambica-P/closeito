export type DocumentSource = 'website' | 'upload' | 'manual';

export interface RagDocument {
    id: string;
    source: DocumentSource;
    sourceUrl?: string;
    content: string;
    metadata?: Record<string, string>;
}
