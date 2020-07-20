<template>
  <div>
    <div>
      <img
        style="width: 60px; padding-top: 10px;"
        v-if="!requestSuccess"
        :src="require('@/assets/img/3.gif')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infinite: Function,
    default: () => {}
  },
  data() {
    return {
      scrollTop: 0,
      clientHeight: 0,
      offsetHeight: 0,
      getFileInterval: null,
      requestSuccess: false
    };
  },
  mounted() {
    window.addEventListener("scroll", e => {
      this.scrollHandler(e);
    });
    this.fillDocument();
  },
  methods: {
    async scrollHandler() {
      this.getHeight();
      if (this.scrollTop >= this.offsetHeight - this.clientHeight) {
        this.requestSuccess = false;
        await this.infinite();
        this.requestSuccess = true;
      }
    },
    async fillDocument() {
      this.getFileInterval = setInterval(async () => {
        this.getHeight();
        if (this.clientHeight >= this.offsetHeight) {
          await this.infinite();
        } else {
          clearInterval(this.getFileInterval);
          this.requestSuccess = true;
          this.getFileInterval = null;
        }
      }, 1000);
    },
    getHeight() {
      this.scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      this.offsetHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      this.clientHeight =
        window.innerHeight ||
        Math.max(
          document.documentElement.clientHeight,
          document.body.clientHeight
        );
    }
  }
};
</script>
