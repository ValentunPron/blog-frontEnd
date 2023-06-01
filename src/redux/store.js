import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/posts";
import { commetsReducer } from "./slices/comments";
import { likeReducer } from "./slices/like";

const store = configureStore({
	reducer: {
		posts: postReducer,
		comments: commetsReducer,
		like: likeReducer,
		auth: authReducer,
	}
});

export default store;