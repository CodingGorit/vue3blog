<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            @click="setPeriod(period)"
            :class="[period === selectPeriod ? 'is-active' : '']"
            data-test="period"
            v-for="(period, index) in periods"
            :key="index"
            >{{ period }}</a
          >
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <router-link class="button is-primary is-alt" to="/posts/new">添加博客</router-link>
            </div>
        </div>
      </div>
    </div>
  </nav>
  <TimeLinePost v-for="post in posts" :key="post.id" :post="post" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Period } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/mock";
import moment from "moment";
import TimeLinePost from "./TimeLinePost.vue";
import { useState } from "@/store";
import { Post } from "@/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default defineComponent({
  name: "TimeLine",
  components: {
    TimeLinePost,
  },
  async setup() {
    const periods: Array<Period> = ["今天", "本周", "本月"];
    const selectPeriod = ref<Period>("今天");

    //tab 切换
    const setPeriod = (period: Period) => {
      selectPeriod.value = period;
    };

    await delay(2000);

    // 自定义 Vuex 起作用了
    const state = useState();

    if (!state.getState().posts.loaded) {
      await state.fetchPosts();
    }

    // 对 id 遍历
    const allPosts = state.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const post = state.getState().posts.all[id];
      return acc.concat(post);
    }, []);

    // 展示数据
    const posts = computed(() =>
      // [todayPost, thisWeek, thisMonth]
      allPosts.filter((post) => {
        if (
          selectPeriod.value == "今天" &&
          post.created.isAfter(moment().subtract(1, "day"))
        ) {
          return true;
        }

        if (
          selectPeriod.value == "本周" &&
          post.created.isAfter(moment().subtract(7, "day"))
        ) {
          return true;
        }

        if (
          selectPeriod.value == "本月" &&
          post.created.isAfter(moment().subtract(1, "month"))
        ) {
          return true;
        }
        return false;
      })
    );
    return { periods, selectPeriod, setPeriod, posts };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
