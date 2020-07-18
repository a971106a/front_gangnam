<template>
  <div v-if="POST_LIST" class="content">
    <div class="list-area">
      <div class="list">
        <div class="item" v-for="post in POST_LIST" :key="post.id">
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
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("post");

export default {
  computed: {
    ...mapGetters(["POST_LIST"])
  }
};
</script>
