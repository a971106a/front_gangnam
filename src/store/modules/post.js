import Post from "@/api/Post";
import User from "@/api/User";

const post = {
  namespaced: true,
  state: {
    postList: [],
    isGetPost: null,
    viewType: "list"
  },
  getters: {
    POST_LIST(state) {
      return state.postList;
    },
    IS_GET_POST(state) {
      return state.isGetPost;
    },
    VIEW_TYPE(state) {
      return state.viewType;
    }
  },
  mutations: {
    SET_POST_LIST(state, postList) {
      state.postList = postList;
    },
    SET_IS_GET_POST(state, isGetPost) {
      state.isGetPost = isGetPost;
    },
    SET_VIEW_TYPE(state, viewType) {
      state.viewType = viewType;
    }
  },
  actions: {
    async GET_POST_LIST({ commit, state }, { offset, limit }) {
      // API에 pagination이 없음.
      let postList = state.postList;
      let post = null;
      let user = null;
      const postTemp = [];
      const imgList = [
        "https://via.placeholder.com/150/771796",
        "https://via.placeholder.com/150/92c952",
        "https://via.placeholder.com/150/56a8c0"
      ];
      for (let i = offset; i < limit + 1; i++) {
        post = await Post.getPost(i).catch(() => {
          postList = postList.concat(postTemp);
          commit("SET_POST_LIST", postList);
        });
        post.data.thumnailImg =
          imgList[Math.floor(Math.random() * imgList.length)];
        user = await User.getUser(post.data.userId);
        post.data.userName = user.data.name;
        postTemp.push(post.data);
      }
      postList = postList.concat(postTemp);
      commit("SET_POST_LIST", postList);
    },
    RESET_POST_LIST({ commit }) {
      commit("SET_POST_LIST", []);
    }
  }
};

export default post;
