import { Moment } from "moment";

// 类型定义
export type Period = "今天" | "本周" | "本月";

export interface Post {
    id: number;
    title: string;
    markdown: string;
    html: string;
    authorId: number;
    created: Moment;
}

export interface User {
    id: number;
    username: string;
    email?: string;
    password: string;
    password2?: string;
    role?: string;
}
