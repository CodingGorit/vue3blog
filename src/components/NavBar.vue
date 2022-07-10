<template>
  <nav class="navbar is-dark topNav">
    <div class="container">
      <div class="navbar-menu" id="topNav">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">
            <span class="icon">
              <i class="fa fa-home"></i>
            </span>
             <span> 博客 </span>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <!-- 显示用户退出 -->
            <div class="field is-grouped" v-if="auth">
              <div class="control">
                <button class="button is-small" >
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span> Admin </span>
                </button>
              </div>
              <div class="control">
                <button @click="handleLoginOut" class="button is-small is-info is-outlined">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span> 退出 </span>
                </button>
              </div>
            </div>
            <!-- 注册登录 -->
            <div class="field is-grouped" v-else>
              <div class="control">
                <button class="button is-small" @click="handleRegister">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span> 注册 </span>
                </button>
              </div>
              <div class="control">
                <button @click="handleLogin" class="button is-small is-info is-outlined">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span> 登录 </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
        <!-- 插入组件 动态组件 -->
        <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent , ref , markRaw} from "vue";
import {useModal} from '@/utils/useModal';
import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";
import {useState} from '@/store/index';
export default defineComponent({
  name: "NavBar",
  components: {},
  setup () {
      const modal = useModal();
      const component = ref();
      const store = useState();
      // 计算属性判断是否有 auth
      const auth = computed (() => {
        store.getState().loginUser.currentUserId
      });

      // 解决 markRaw 警告的问题
      const handleRegister = () => {
        modal.showModal();
        component.value = markRaw(SignUp);
      };

      const handleLogin = () => {
        modal.showModal();
        component.value = markRaw(SignIn);
      };

      const handleLoginOut = async () => {
        await store.singOut();
      }
      return {modal,
              handleRegister, 
              component, 
              handleLogin,
              auth,
              handleLoginOut};
  }
});
</script>