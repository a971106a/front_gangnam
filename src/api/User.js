import Request from "@/utils/Request";

export default {
  getUser(id) {
    return Request({
      url: `/users/${id}`,
      method: "get"
    });
  }
};
