import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/posts";
import { commetsReducer } from "./slices/comments";

const store = configureStore({
	reducer: {
		posts: postReducer,
		comments: commetsReducer,
		auth: authReducer
	}
});

export default store;