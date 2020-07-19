<template>
  <div></div>
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
      getFileInterval: null
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
        await this.infinite();
      }
    },
    fillDocument() {
      this.getFileInterval = setInterval(() => {
        this.getHeight();
        if (this.clientHeight >= this.offsetHeight) {
          this.infinite();
        } else {
          clearInterval(this.getFileInterval);
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
