<template>
  <div id="notfound">
    <div class="container">
      <div>
        <h1><a-icon type="stop" /> 404</h1>
        <h2>你访问的页面不存在！</h2>
        <router-link to="/">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#notfound {
  height: 100vh;
  width: 100vw;
  position: relative;

  .container {
    padding: 2em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-size: 8em;
    margin: 0;
  }

  h2 {
    font-size: 3em;
    color: rgba($color: #000000, $alpha: 0.7);
  }
}
</style>
