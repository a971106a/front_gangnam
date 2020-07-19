<template>
  <div id="app">
    <div id="nav">
      <div id="nav-btn" v-if="!isHome" @click="back" class="nav-cell">
        &lt;
      </div>
      <div class="nav-cell">{{ TITLE }}</div>
      <div id="nav-btn" v-if="!isHome" class="nav-cell"></div>
    </div>
    <div style="padding-top: 5vh"></div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["TITLE"])
  },
  data() {
    return {
      isHome: false
    };
  },
  watch: {
    $route($route) {
      if ($route.name !== "Home") {
        this.isHome = false;
      } else {
        this.isHome = true;
      }
    }
  },
  mounted() {
    if (this.$route.name !== "Home") {
      this.isHome = false;
    } else {
      this.isHome = true;
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
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
  margin: 0;
  padding: 0;
}

#nav {
  height: 4vh;
  width: 100%;
  margin: 0;
  padding: 0;
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
  height: 100%;
  text-align: center;
  font-weight: 900;
  font-size: 1.3rem;
}
.nav-cell {
  display: table-cell;
  vertical-align: middle;
}
</style>
