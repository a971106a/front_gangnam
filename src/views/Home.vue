<template>
  <div class="home">
    <div class="filter-area">
      <select v-model="postInterval">
        <option :value="8">8개</option>
        <option :value="16">16개</option>
      </select>
      <img
        @click="changeViewType('list')"
        :src="require('@/assets/img/icon_list_b.png')"
      />
      <img
        @click="changeViewType('grid')"
        :src="require('@/assets/img/icon_grid_b.png')"
      />
    </div>
    <List v-if="VIEW_TYPE === 'list'" />
    <Grid v-if="VIEW_TYPE === 'grid'" />
    <div class="scroll-up-btn">
      <img @click="goScrollTop()" :src="require('@/assets/img/arrow_up.png')" />
    </div>
  </div>
</template>

<script>
import List from "@/components/post/List.vue";
import Grid from "@/components/post/Grid.vue";
import { mapMutations } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("post");

export default {
  name: "Home",
  components: {
    List,
    Grid
  },
  created() {
    this.SET_TITLE("Home");
  },
  computed: {
    ...mapGetters(["VIEW_TYPE"]),
    ...mapGetters(["OFFSET"]),
    ...mapGetters(["LIMIT"]),
    ...mapGetters(["POST_INTERVAL"])
  },
  data() {
    return {
      isMobile: false,
      postInterval: 8
    };
  },
  watch: {
    postInterval() {
      this["post/SET_POST_INTERVAL"](this.postInterval);
    }
  },
  methods: {
    ...mapMutations(["SET_TITLE"]),
    ...mapMutations(["post/SET_IS_GET_POST"]),
    ...mapMutations(["post/SET_VIEW_TYPE"]),
    ...mapMutations(["post/SET_LIMIT"]),
    ...mapMutations(["post/SET_POST_INTERVAL"]),
    ...mapActions(["RESET_POST_LIST"]),
    changeViewType(viewType) {
      this.RESET_POST_LIST();
      this["post/SET_LIMIT"](this.postInterval);
      this["post/SET_POST_INTERVAL"](this.postInterval);
      this["post/SET_IS_GET_POST"](false);
      this["post/SET_VIEW_TYPE"](viewType);
    },
    goScrollTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@media all and (max-width: 768px) {
  .filter-area {
    min-width: 90%;
  }
}
.home {
  align-self: center;
}
.filter-area {
  width: 48%;
  max-width: 529px;
  margin: 0 auto;
  text-align: right;
}
.filter-area img {
  width: 28px;
  padding-right: 4px;
}
.scroll-up-btn {
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: #f9c900;
  display: flex;
  justify-content: center;
}
.scroll-up-btn img {
  width: 33px;
  height: auto;
}
.scroll-up-btn {
  position: fixed;
  bottom: 30px;
  right: 40px;
}
</style>
