// import {Post} from "@/types";
import moment from "moment";
moment.locale('zh-cn');
export const basePost = {
    id: 1,
    title: "欢迎来到 Gorit 的博客",
    markdown: "帖子",
    html: "<p>帖子</p>",
    authorId: 1,
    created: moment(),
}

export const todayPost = {
    ...basePost,
    id: 2,
    title: '今天'
}

export const thisWeek = {
    ...basePost,
    id: 3,
    title: '本周',
    created: moment().subtract(2,"days"),
}

export const thisMonth = {
    ...basePost,
    title: '本月',
    created: moment().subtract(2,"weeks"),
}