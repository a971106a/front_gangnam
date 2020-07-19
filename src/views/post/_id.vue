<template>
  <div v-if="post" class="post-area">
    <div class="post">
      <div class="post-title">
        {{ post.title }}
      </div>
      <hr />
      <div class="post-content">
        {{ post.body }}
      </div>
      <hr />
      <div class="reply-box" v-if="commentList">
        Reply
        <span style="font-weight: 700;"> {{ commentList.length }}</span> 개
      </div>
      <div class="post-comment">
        <div v-for="comment in commentList" :key="comment.id">
          <hr />
          <div class="comment-author">
            <div class="comment-name">
              {{ comment.name }}
            </div>
            <div class="comment-email">({{ comment.email }})</div>
          </div>
          <div class="comment-body">
            {{ comment.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Post from "@/api/Post";

export default {
  data() {
    return {
      post: {},
      commentList: null,
      title: "front_gangnam"
    };
  },
  async created() {
    this.SET_TITLE("Post");
  },
  async mounted() {
    const { data: post } = await Post.getPost(this.$route.params.id);
    this.post = post;
    const { data: commentList } = await Post.getPostComments(
      this.$route.params.id
    );
    this.commentList = commentList;
  },
  methods: {
    ...mapMutations(["SET_TITLE"])
  },
  metaInfo() {
    return {
      title: this.post.title,
      meta: [
        { name: "description", content: this.post.body, vmid: "description" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 7vw;
  background: #f7f7f7;
  max-width: 529px;
  width: 100%;
}
.post-area {
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
.post-title {
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 450;
  color: #000000;
  width: 80%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-content {
  width: 90%;
  display: inline-block;
  font-size: 0.96rem;
  padding-top: 10px;
  padding-bottom: 10px;
}

.comment-author {
  width: 90%;
  display: flex;
  display: -ms-flexbox;
  padding-left: 3%;
}
.comment-name {
  display: inline-block;
  width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.83rem;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.comment-email {
  display: inline-block;
  text-align: left;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 480;
  color: #4c4c4c;
}
.comment-body {
  display: inline-block;
  text-align: left;
  font-size: 0.8rem;
  color: #000000;
  width: 93%;
}

.post-comment {
  padding-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  width: 98%;
  background-color: #a6a6a6;
}

.post-comment hr {
  background-color: #d5d5d5;
  height: 0.4px;
  width: 96%;
}
.reply-box {
  text-align: left;
  margin-left: 10px;
  color: #f9c900;
  font-weight: 400;
}
</style>
