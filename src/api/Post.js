import Request from "@/utils/Request";

export default {
  getPost(id) {
    return Request({
      url: `/posts/${id}`,
      method: "get"
    });
  },
  getPostComments(id) {
    return Request({
      url: `/posts/${id}/comments`,
      method: "get"
    });
  }
};
