<template>
  <div id="app">
    <cn-navbar></cn-navbar>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  name: "cn-app",
  components: {
    "cn-navbar": Navbar
  }
};
</script>

<style lang="scss">
body {
  font-family: "Source Sans Pro", sans-serif;
  height: 100%;
  background: #f3f3f3;
}

html {
  height: 100%;
}

#content {
  padding: 60px 24px;
}
</style>
