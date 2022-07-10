<template>
    <router-link :to="to" data-test="post" class="panel-block">
      <div>
        <a>{{ post.title }}</a>
        <div>{{ post.created.format("yyyy-MM-DD") }}</div>
      </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TimeLinePost",
  props: {
      post: {
          type: Object,
          required: true
      }
  },
  setup (props) {
    return {
      to: `/posts/${props.post.id}`,
    }
  }
});
</script>
