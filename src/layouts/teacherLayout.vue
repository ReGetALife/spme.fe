<template>
  <a-layout class="layout" :class="{ collapsed: collapsed }">
    <a-layout-sider
      class="sidebar"
      :trigger="null"
      collapsible
      v-model="collapsed"
      :width="240"
    >
      <div class="logo"><span>z/OSMF</span></div>
      <SidebarMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="display: flex; background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div style="margin-left: auto; margin-right: 1em;">
          <a-dropdown>
            <a>{{ username }}</a>
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
import SidebarMenu from "@/components/SidebarTeacher";
export default {
  name: "DashBoardLayout",
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
        sessionStorage.removeItem("isTeacher");
        await this.$store.dispatch("user/logout");
        setTimeout(() => {
          this.$router.push("/");
        }, 600);
      } else if (key === "reports") {
        this.$router.push("/dashboard/reports");
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
  margin: 16px;
  text-align: center;

  span {
    line-height: 32px;
  }
}

.layout {
  min-height: 100vh;
  margin-left: 240px;
  transition: margin-left 0.2s;

  &.collapsed {
    margin-left: 80px;
  }
}

.sidebar {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  left: 0;
}
</style>
