<template>
  <div class="menu-container">
    <a-menu
      theme="dark"
      mode="inline"
      @click="handleMenuClick"
      :selectedKeys="selectedKeys"
      :defaultOpenKeys="defaultOpenKeys"
    >
      <a-menu-item v-for="menu in menuConfig" :key="menu.path">
        <a-icon :type="menu.icon" />
        <!-- 没有 span 收起来时字还会有 -->
        <span>{{ menu.name }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
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
      menuConfig: [
        {
          name: "实验总览",
          path: "home",
          icon: "home"
        },
        {
          name: "安全管理（RACF）",
          path: "racf",
          icon: "safety"
        },
        {
          name: "存储管理（DFSMS）",
          path: "sms",
          icon: "hdd"
        },
        {
          name: "目录管理（Catalog）",
          path: "catalog",
          icon: "inbox"
        },
        {
          name: "系统命令（MVS）",
          path: "mvs",
          icon: "code"
        },
        {
          name: "脚本语言（REXX）",
          path: "rexx",
          icon: "snippets"
        }
      ]
    };
  },
  watch: {
    $route(to) {
      this.selectedKeys = [to.path];
    }
  },
  methods: {
    handleMenuClick(e) {
      this.$router.push(e.key);
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
