import type { Product } from "./Product.interface";

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    type: 'text' | 'course-suggestion' | 'course-links';
    courseData?: Product;
    courseLinks?: Product[];
}