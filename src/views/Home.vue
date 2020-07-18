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
    <List v-if="viewType === 'list'" />
    <Grid v-if="viewType === 'grid'" />
    <InfiniteScroll :infinite="infiniteHandler" />
  </div>
</template>

<script>
import List from "@/components/post/List.vue";
import Grid from "@/components/post/Grid.vue";
import InfiniteScroll from "@/components/post/InfiniteScroll.vue";
import { mapMutations } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("post");

export default {
  name: "Home",
  components: {
    List,
    Grid,
    InfiniteScroll
  },
  created() {
    this.SET_TITLE("Home");
  },
  computed: {
    ...mapGetters(["POST_LIST"]),
    ...mapGetters(["IS_GET_POST"])
  },
  data() {
    return {
      offset: 1,
      limit: 8,
      postInterval: 8,
      viewType: "list"
    };
  },
  methods: {
    ...mapMutations(["SET_TITLE"]),
    ...mapMutations(["post/SET_IS_GET_POST"]),
    ...mapActions(["GET_POST_LIST"]),
    async infiniteHandler() {
      if (!this.IS_GET_POST) {
        this["post/SET_IS_GET_POST"](true);
        await this.GET_POST_LIST({ offset: this.offset, limit: this.limit });
        this.offset += this.postInterval;
        this.limit += this.postInterval;
        await this["post/SET_IS_GET_POST"](false);
      }
    },
    changeViewType(viewType) {
      switch (viewType) {
        case "list":
          this.viewType = viewType;
          break;
        case "grid":
          this.viewType = viewType;
          break;
      }
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
