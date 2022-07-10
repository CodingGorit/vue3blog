import { reactive } from "vue";
import {todayPost,thisWeek,thisMonth} from '@/mock'
import { Post , User } from "@/types/index";
import axios from 'axios'

interface PostsState {
    ids: Array<string>;
    all: Record<string,Post>; // 类型转换
    loaded: boolean;
}

interface LoginUsersState {
    ids: Array<string>;
    all: Record<string,Post>; // 类型转换
    loaded: boolean;
    currentUserId?: string;
}

const initialPostsState = (): PostsState => ({
    ids: [
        // todayPost.id.toString(),
        // thisWeek.id.toString(),
        // thisMonth.id.toString(),
    ],
    all: {
        // [todayPost.id]: todayPost,
        // [thisWeek.id]: thisWeek,
        // [thisMonth.id]: thisMonth
    },
    loaded: false,
});

const initialLoginUserState = (): LoginUsersState => ({
    ids: [],
    all: {},
    loaded: true,
    currentUserId: "123"
});

interface State {
    loginUser: LoginUsersState;
    posts: PostsState;
}

const initialState = (): State => ({
    posts: initialPostsState(),
    loginUser: initialLoginUserState()
})

class Store {
    protected state: State;

    constructor (initState: State) {
        this.state = reactive(initState)
    }

    public getState(): State {
        return this.state;
    }

    async fetchPosts () {
        const response = await axios.get<Post[]>("/posts");
        // 处理数据
        // const ids: string[] = [];
        // const all: Record<string,Post> = {};
        for (const post of response.data) {
            if (!this.state.posts.ids.includes(post.id.toString())) {
                this.state.posts.ids.push(post.id.toString())
            }
            this.state.posts.all[post.id] = post
        }
        // 返回数据
        this.state.posts.loaded = true
    }

    async createPost (post: Post) {
        const response = await axios.post<Post>("/posts",post);
        this.state.posts.all[response.data.id] = response.data;
        this.state.posts.ids.push(response.data.id.toString());
    }

    async updatePost (post: Post) {
        const response = await axios.put<Post>("/posts",post);
        this.state.posts.all[response.data.id] = response.data;
    }

    async createUser (user:User) {
        // 创建 User
        const response = await axios.post<Post>("/users",user);
        this.state.loginUser.all[response.data.id] = response.data;
        this.state.loginUser.ids.push(response.data.id.toString());
        this.state.loginUser.currentUserId = response.data.id.toString();
    }

    async singOut() {
        this.state.loginUser.currentUserId = undefined;
    }
}

// 传递对象
const store = new Store(initialState());
store.getState();

export const useState = () => store;