<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="field">
            <div class="label">博客标题</div>
            <div class="contol">
              <input type="text" v-model="title" class="input" />
              {{ title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 写的内容 和  展示的内容 -->
    <div class="columns">
      <div class="column is-one-half">写的内容
        <!-- 可编辑的 div => input textarea -->
        <div contenteditable id="markdown" ref="contentEditable" @input="handleEdit"/>
      </div>
      <div class="column is-one-half">展示内容
        <div v-html="html"></div>
      </div>

      <!-- 保存 -->
      <div class="columns">
        <div class="column">
          <button @click="handleSubmit" class="button is-primary is-pull-right">
            保存
          </button>
          <button @click="$router.go(-1)" class="button is-danger">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref , watch } from "vue";
import { Post } from "@/types";
// @ts-ignore
import {parse, MarkedOptions} from 'marked';
// @ts-ignore
import { highlightAuto } from 'highlight.js';
import debounce from 'lodash/debounce';
export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props, ctx) {
    const title = ref(props.post.title);
    const markdown = ref(props.post.markdown);
    const contentEditable = ref<null | HTMLDivElement>(null);
    const html = ref("");
    const handleEdit = () => {
      //@ts-ignore
      markdown.value = contentEditable.value.innerText;
    }
    // 保存
    const handleSubmit = () => {
      // 通过 store 进行存储，完整数据提交到父级
      const post:Post = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value
      };
      ctx.emit('save', post)
    }
    const options:MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value
    }

    onMounted (() => {
      //@ts-ignore
      contentEditable.value.innerText = markdown.value;
      html.value = parse(markdown.value);
    });

    // debounce 延迟加载
    const update = debounce((value: string) => {
      html.value = parse(value,options);
    },500);

    watch (
      () => markdown.value, 
      (value) =>  {
      update(value)
    },{immediate:true})

    return { title , contentEditable , handleEdit, markdown , html, handleSubmit};
  },
});
</script>