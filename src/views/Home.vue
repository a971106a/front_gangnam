<template>
  <div class="home">
    <div class="filter-area">
      <img
        @click="changeViewType('list')"
        :src="require('@/assets/img/icon_list_b.png')"
      />
      <img
        @click="changeViewType('grid')"
        :src="require('@/assets/img/icon_grid_b.png')"
      />
    </div>
    <List
      v-if="VIEW_TYPE === 'list'"
      :offset="offset"
      :limit="limit"
      :postInterval="postInterval"
    />
    <Grid
      v-if="VIEW_TYPE === 'grid'"
      :offset="offset"
      :limit="limit"
      :postInterval="postInterval"
    />
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
    ...mapGetters(["VIEW_TYPE"])
  },
  data() {
    return {
      offset: 1,
      limit: 8,
      postInterval: 8
    };
  },
  methods: {
    ...mapMutations(["SET_TITLE"]),
    ...mapMutations(["post/SET_IS_GET_POST"]),
    ...mapMutations(["post/SET_VIEW_TYPE"]),
    ...mapActions(["RESET_POST_LIST"]),
    changeViewType(viewType) {
      this.RESET_POST_LIST();
      this["post/SET_IS_GET_POST"](false);
      this["post/SET_VIEW_TYPE"](viewType);
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
  width: 23px;
}
</style>
