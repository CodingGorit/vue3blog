<template>
    <PostWriter :post="post" @save="handleSave" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostWriter from '@/components/PostWriter.vue';
import {useState} from '@/store';
import {useRoute,useRouter} from 'vue-router';
import { Post } from '@/types';
export default defineComponent({
    name: 'PostEditor',
    components: {
        PostWriter
    },
    async setup () {
        const route = useRoute();
        const store = useState();
        const router = useRouter();

        const id = route.params.id as string;

        // 加载数据
        if (!store.getState().posts.loaded) {
            await store.fetchPosts();
        }

        const post = store.getState().posts.all[id];

        const handleSave = async (post:Post) => {
            // 存到 store
            await store.updatePost(post);
            // 路由跳转
            router.push('/');
        }
        return {post, handleSave};
    }   
});
</script>

<style>

</style>