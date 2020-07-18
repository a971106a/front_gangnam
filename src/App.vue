<template>
  <div id="app">
    <div id="nav">
      <div id="nav-btn" class="nav-cell">홈</div>
      <div class="nav-cell">{{ TITLE }}</div>
      <div id="nav-btn" class="nav-cell"></div>
    </div>
    <div style="padding-top: 30px"></div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["TITLE"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  height: 3vh;
  width: 100%;
  vertical-align: middle;
  position: fixed;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style lang="scss" scoped>
#nav {
  display: table;
}
#nav-btn {
  width: 5% !important;
}
.nav-cell {
  display: table-cell;
  vertical-align: middle;
}
</style>
