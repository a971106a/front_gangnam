<template>
  <div v-if="POST_LIST" class="content">
    <div class="list-area">
      <div class="list">
        <div
          class="item"
          v-for="post in POST_LIST"
          :key="post.id"
          @click="goPost(post.id)"
        >
          <div class="item-header">
            <div class="title">{{ post.title }}</div>
          </div>
          <div class="item-body">
            <img :src="post.thumnailImg" />
            <div class="post-body">
              <p style="text-align: right;">
                <b> by. {{ post.userName }} </b>
              </p>
              <p>
                {{ post.body }}
              </p>
            </div>
          </div>
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
    ...mapGetters(["VIEW_TYPE"]),
    ...mapGetters(["OFFSET"]),
    ...mapGetters(["LIMIT"]),
    ...mapGetters(["POST_INTERVAL"])
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
    ...mapMutations(["SET_OFFSET"]),
    ...mapMutations(["SET_LIMIT"]),
    async infiniteHandler() {
      return new Promise(resolve => {
        if (!this.IS_GET_POST && this.VIEW_TYPE === "list") {
          this.SET_IS_GET_POST(true);
          this.GET_POST_LIST({
            offset: this.OFFSET,
            limit: this.LIMIT
          }).then(() => {
            this.SET_OFFSET(this.OFFSET + (this.LIMIT - this.OFFSET + 1));
            this.SET_LIMIT(this.LIMIT + this.POST_INTERVAL);
            this.SET_IS_GET_POST(false);
            resolve();
          });
        }
      });
    },
    goPost(id) {
      this.$router.push({
        name: "post-id",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@media all and (max-width: 768px) {
  .list-area {
    height: 580px;
    width: 100%;
    min-width: 100%;
  }
}
.content {
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
.list-area {
  max-width: 529px;
  align-self: center;
  height: 50vh;
}
.list {
  width: 100%;
  height: 55vh;
}
.item {
  background: #f7f7f7;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.item-header {
  width: 100%;
  height: 2.6rem;
  float: left;
  padding: 0;
  color: #000;
  text-align: center;
}

.item-body {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.item img {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 4.5rem;
  margin-left: 1rem;
}
.post-body {
  width: calc(100% - 6.9rem);
  height: 100%;
  float: right;
}

.post-body p {
  font-size: 0.85rem;
  margin: 0;
  margin-bottom: 0.3rem;
  line-height: 1.2rem;
  width: 94%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 3.6rem;
}

.post-body p b {
  color: #f9c900;
  font-weight: 400;
  width: 60%;
  display: inline-block;
  line-height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list .title {
  font-size: 1.3rem;
  margin-top: 0.5rem;
  display: inline-block;
  color: #000000;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
</style>
