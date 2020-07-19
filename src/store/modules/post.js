import Post from "@/api/Post";
import User from "@/api/User";

const post = {
  namespaced: true,
  state: {
    postList: [],
    isGetPost: null,
    viewType: "list",
    offset: 1,
    limit: 8,
    postInterval: 8
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
    },
    OFFSET(state) {
      return state.offset;
    },
    LIMIT(state) {
      return state.limit;
    },
    POST_INTERVAL(state) {
      return state.postInterval;
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
    },
    SET_OFFSET(state, offset) {
      state.offset = offset;
    },
    SET_LIMIT(state, limit) {
      state.limit = limit;
    },
    SET_POST_INTERVAL(state, postInterval) {
      state.postInterval = postInterval;
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
      commit("SET_OFFSET", 1);
    }
  }
};

export default post;
