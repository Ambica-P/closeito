import { RAGClient } from "./RAGClient";

export class MockRAGClient implements RAGClient {
    async query() {
        return [
            "Our product is an AI sales assistant.",
            "It helps automate product demos and meetings.",
        ];
    }
}
