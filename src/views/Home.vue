<template>
  <!-- 延迟加载，给予回调, Suspense 在组件加载之前
        先进行回调 -->
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <Progress />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimeLine from "@/components/TimeLine.vue"; // @ is an alias to /src
import Progress from "@/components/Progress.vue";
export default defineComponent({
  name: "Home",
  components: {
    TimeLine,
    Progress,
  },
});
</script>
