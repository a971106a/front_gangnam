<template>
  <div v-if="POST_LIST" class="content">
    <div class="list-area">
      <div class="list">
        <div class="item" v-for="post in POST_LIST" :key="post.id">
          <img :src="post.thumnailImg" />
          <div class="title">{{ post.title }}</div>
          <div style="display: inline-block; width: 90%;">
            <div class="post-body">
              {{ post.body }}
            </div>
          </div>
          <div class="post-user">by. {{ post.userName }}</div>
        </div>
        <InfiniteScroll :infinite="infiniteHandler" />
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteScroll from "@/components/post/InfiniteScroll.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "post"
);

export default {
  props: {
    offset: Number,
    limit: Number,
    postInterval: Number
  },
  computed: {
    ...mapGetters(["POST_LIST"]),
    ...mapGetters(["IS_GET_POST"]),
    ...mapGetters(["VIEW_TYPE"])
  },
  components: {
    InfiniteScroll
  },
  data() {
    return {
      list_offset: null,
      list_limit: null
    };
  },
  mounted() {
    this.list_offset = this.offset;
    this.list_limit = this.limit;
  },
  methods: {
    ...mapActions(["GET_POST_LIST"]),
    ...mapMutations(["SET_IS_GET_POST"]),
    async infiniteHandler() {
      if (!this.IS_GET_POST && this.VIEW_TYPE === "grid") {
        this.SET_IS_GET_POST(true);
        await this.GET_POST_LIST({
          offset: this.list_offset,
          limit: this.list_limit
        });
        this.list_offset += this.postInterval;
        this.list_limit += this.postInterval;
        await this.SET_IS_GET_POST(false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
.list-area {
  width: 65vw;
  align-self: center;
}

.list {
  width: 100%;
  float: left;
}

.item {
  background: #f7f7f7;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 15vw;
  display: inline-block;
  margin-right: 6px;
  align-self: center;
}

.item img {
  width: 10rem;
  margin-top: 7px;
  border-radius: 10rem;
}

.item .title {
  font-size: 1.3rem;
  display: inline-block;
  color: #000000;
  width: 87%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.post-body {
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  line-height: 1.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 3.6rem;
}

.post-user {
  color: #f9c900;
  font-weight: 400;
  width: 70%;
  display: inline-block;
  line-height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
