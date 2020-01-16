<template>
  <div class="auth">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  width: 100vw;

  // background: #eee;
  background-image: url("./images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  //   &::before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   background-color: rgb(1, 14, 83);
  //   opacity: 0.3;
  //   width: 100%;
  //   height: 100%;

  // }
}

.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // max-width: 400px;
  background: rgba(255, 255, 255, 0.7);

  padding: 32px;
  border-radius: 4px;
}
</style>
