<template>
  <div class="menu-container">
    <a-menu
      theme="dark"
      mode="inline"
      @click="handleMenuClick"
      :selectedKeys="selectedKeys"
      :defaultOpenKeys="defaultOpenKeys"
    >
      <a-sub-menu v-for="menu in menuConfig" :key="'/playground/' + menu.path">
        <span slot="title">
          <a-icon :type="menu.icon" />
          <span>{{ menu.name }}</span>
        </span>
        <a-menu-item v-for="submenu in menu.children" :key="submenu.path">{{
          submenu.name
        }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import menuConfig from "@/menu";

export default {
  name: "SidebarMenu",
  data() {
    return {
      selectedKeys: [this.$route.path],
      defaultOpenKeys: [
        this.$route.path
          .split("/")
          .slice(0, -1)
          .join("/")
      ],
      menuConfig
    };
  },
  watch: {
    $route(to) {
      this.selectedKeys = [to.path];
    }
  },
  methods: {
    handleMenuClick(e) {
      if (e.keyPath[1] === "/playground/dfsms") {
        this.$router.push({ name: "lab", params: { lab: e.key } });
      } else {
        this.$router.push(e.keyPath[1] + "/" + e.key);
      }
    }
  }
};
</script>

<style scoped>
.menu-container {
  height: 92%;
  overflow: auto;
}
</style>
