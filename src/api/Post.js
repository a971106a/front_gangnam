import Request from "@/utils/Request";

export default {
  getPost(count) {
    return Request({
      url: `/posts/${count}`,
      method: "get"
    });
  }
};
