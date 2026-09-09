import { RagChunk } from './chunk';
import { RagNamespace } from './namespace';

export interface VectorStore {
    upsert(
        namespace: RagNamespace,
        vectors: {
            id: string;
            embedding: number[];
            chunk: RagChunk;
        }[],
    ): Promise<void>;

    query(
        namespace: RagNamespace,
        embedding: number[],
        topK: number,
    ): Promise<RagChunk[]>;
}
