<template>
  <form action="" @submit.prevent="handleSubmit">
    <FormInput type="text" name="用户名" v-model="username" :error="usernameStatus.message"/>
    <FormInput type="password" name="密码" v-model="password" :error="passwordStatus.message"/>
    <div class="select">
        <select v-model="role">
            <option value="user">用户</option>
            <option value="visitor">游客</option>
        </select>
    </div>
    <button class="button is-primary is-pulled-right" :disabled="!usernameStatus.value || !passwordStatus.value">
        登录
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref ,computed} from "vue";
import FormInput from "@/components/FormInput.vue";
import {required, length,Status , validate} from '@/utils/validator';
import {User} from '@/types/index';
import {useState} from '@/store/index';
import {useModal} from '@/utils/useModal';

export default defineComponent({
  name: "SignIn",
  components: {
      FormInput
  },
  setup() {
    const role = ref('user');
    const username = ref('username');
    const password = ref('password');

    const usernameStatus = computed<Status>(() => {
        return validate(username.value, [required(),length({ min: 5, max: 10 })]);
    });

    const passwordStatus = computed<Status>(() => {
        return validate(password.value, [required(),length({ min: 6, max: 12 })]);
      });
    // const roleStatus = computed<Status>(() => {
    //     return validate(role.value, [required(),length({ min: 6, max: 12 })]);
    //   });

    const store = useState();
    const modal = useModal();
      
    const handleSubmit = async (e:any) => {

      const user: User = {
        id: -1,
        username: username.value,
        password: password.value,
        role: role.value,
      }

      store.createUser(user);
      modal.hideModal();
    }

    return {username,
            password,
            usernameStatus,
            passwordStatus,
            role,    
            handleSubmit,
        }
  },
});
</script>

<style scoped>
form {
    background: white;
    padding: 15px;
}
</style>