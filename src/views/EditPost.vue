<template>
  <!-- 延迟加载，给予回调, Suspense 在组件加载之前
        先进行回调 -->
  <div>
    <Suspense>
      <template #default>
        <PostEditor />
      </template>
      <template #fallback>
        <Progress />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostEditor from "@/components/PostEditor.vue";
import Progress from "@/components/Progress.vue";
export default defineComponent({
  name: "EditPost",
  components: {
    PostEditor,
    Progress
  },
});
</script>
