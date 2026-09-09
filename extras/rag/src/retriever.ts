import { RagChunk } from './chunk';

export interface Retriever {
    retrieve(query: string): Promise<RagChunk[]>;
}
