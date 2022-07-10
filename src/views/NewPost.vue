<template>
    <PostWriter :post="post" @save="handleWSave"/>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import PostWriter from '@/components/PostWriter.vue';
import { Post } from '@/types';
import moment from 'moment';
import { useState } from '@/store';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent ({
    name: 'NewPost',
    components: {
        PostWriter
    },
    setup () {
        const post: Post = {
            id: -1,
            title: 'Hello',
            markdown: "## Vue Composition Api",
            html: "",
            authorId: 0,
            created: moment(),
        };

        const store = useState();
        const router = useRouter();

        const handleWSave = async (post: Post) => {

            // 存储到 store
            await store.createPost(post);
            // 跳转
            router.push('/');
        }
        return {post, handleWSave};
    }
})
</script>