<template>
  <!-- 延迟加载，给予回调, Suspense 在组件加载之前
        先进行回调 -->
  <div>
    <Suspense>
      <template #default>
        <PostViewer />
      </template>
      <template #fallback>
        <Progress />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostViewer from "@/components/PostViewer.vue"; // @ is an alias to /src
import Progress from "@/components/Progress.vue";
import NavBar from '@/components/NavBar.vue';
export default defineComponent({
  name: "ShowPost",
  components: {
    PostViewer,
    Progress,
    NavBar
  },
});
</script>
