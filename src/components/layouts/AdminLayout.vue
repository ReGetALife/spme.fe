<template>
  <a-layout class="layout" :class="{ collapsed: collapsed }">
    <a-layout-sider
      class="sidebar"
      :trigger="null"
      :collapsible="true"
      v-model="this.collapsed"
      :width="280"
    >
      <div class="logo"><span>Admin</span></div>
      <SidebarMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="display: flex; background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="this.collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (this.collapsed = !this.collapsed)"
        />
        <h2 class="title">大型主机系统管理虚拟仿真实验平台</h2>
        <div style="margin-right: 24px;">
          <a-dropdown>
            <a><a-icon type="user" /> {{ username }} </a>
            <a-menu slot="overlay" @click="handleClick">
              <a-menu-item key="reports">学生视角</a-menu-item>
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          height: 'calc(100vh - 64px - 64px)',
          overflow: 'auto'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SidebarMenu from "@/components/sidebar/AdminSidebar";
export default {
  name: "AdminLayout",
  components: {
    SidebarMenu
  },
  data() {
    return {
      collapsed: false
    };
  },

  computed: {
    username() {
      return this.$store.state.user.username;
    }
  },

  methods: {
    async handleClick({ key }) {
      if (key === "logout") {
        await this.$store.dispatch("user/logout");
      } else if (key === "reports") {
        this.$router.push("/playground");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  color: #fff;
  margin: 12px;
  text-align: center;
  font-size: 24px;
  span {
    line-height: 32px;
  }
}

.layout {
  min-height: 100vh;
  margin-left: 280px;
  transition: margin-left 0.2s;

  &.collapsed {
    margin-left: 80px;
    .logo {
      font-size: 16px;
    }
  }
}

.sidebar {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  left: 0;
}
.title {
  margin: auto;
}
</style>
