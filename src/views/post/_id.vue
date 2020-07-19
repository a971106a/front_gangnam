<template>
  <div v-if="post">
    <div>
      {{ post.title }}
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
      comments: null,
      title: "front_gangnam"
    };
  },
  async created() {
    this.SET_TITLE("Post");
  },
  async mounted() {
    const { data: post } = await Post.getPost(this.$route.params.id);
    this.post = post;
    const { data: comments } = await Post.getPostComments(
      this.$route.params.id
    );
    this.comments = comments;
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
