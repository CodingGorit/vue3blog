<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal"></button>
  </div>
  <NavBar />
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useModal } from "@/utils/useModal";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const modal = useModal();
    const style = computed(() => {
      display: modal.visible.value ? "block" : "none";
    });
    return { modal, style };
  },
});
</script>

<style scoped>
.modal-content {
  top: 10%;
}
</style>
