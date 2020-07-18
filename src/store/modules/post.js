import Post from "@/api/Post";
import User from "@/api/User";

const post = {
  namespaced: true,
  state: {
    postList: [],
    isGetPost: null
  },
  getters: {
    POST_LIST(state) {
      return state.postList;
    },
    IS_GET_POST(state) {
      return state.isGetPost;
    }
  },
  mutations: {
    SET_POST_LIST(state, postList) {
      state.postList = postList;
    },
    SET_IS_GET_POST(state, isGetPost) {
      state.isGetPost = isGetPost;
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
        await postTemp.push(post.data);
      }
      postList = await postList.concat(postTemp);
      commit("SET_POST_LIST", postList);
    }
  }
};

export default post;
