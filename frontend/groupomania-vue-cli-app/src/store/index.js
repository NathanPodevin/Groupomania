
import { createStore } from 'vuex';
import router from '../router';
import axios from 'axios';

export default createStore({
  state: {
    errorMsg: null,
    userId: localStorage.getItem('userId'), 
    connectedUser: null,
    posts: [],
    userPosts: [],
  },

  getters: {
    showPosts: (state) => state.posts,
    showUserPosts: (state) => state.userPosts 
  },
  
  mutations: {

    SET_CONNECTED_USER(state, user) {
      state.connectedUser = user;
    },

    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    SET_USER_POSTS(state, userPosts) {
      state.userPosts = userPosts;
    }

  },
  actions: {

    logout({ commit }) {
      commit('SET_CONNECTED_USER', null);
      localStorage.clear();      
      router.push("/")
    },

    getPosts({ commit }) {
      axios.get('http://localhost:3000/api/post')
        .then(res => {
          commit("SET_POSTS", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUserPosts({ commit }) {
      axios.get('http://localhost:3000/api/post')
        .then(res => {
          commit("SET_USER_POSTS", res.data.filter(post => post.UserId.toString().includes(localStorage.getItem('userId')))
          )
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  modules: {
  }
})
