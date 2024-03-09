import { create } from "zustand";

const usePostStore = create((set) => ({
  post: [],
  createPost: (post) => set((state) => ({ post: [post, ...state.post] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.post.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }

        return post;
      }),
    })),
}));

export default usePostStore;
