import { RagChunk } from "./chunk.js";
import { RagDocument } from "./document.js";


export interface Chunker {
  chunk(document: RagDocument): RagChunk[];
}
