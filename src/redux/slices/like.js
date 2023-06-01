import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchLike = createAsyncThunk('posts/like', async (id) => {
	const { data } = await axios.post(`${id}/like`);
	return data.likes
});

const initialState = {
	like: {
		items: [],
		status: 'loading'
	},
};

const likeSlice = createSlice({
	name: 'like',
	initialState,
	reducer: {},
	extraReducers: {
		[fetchLike.pending]: (state) => {
			state.like.items = [];
			state.like.status = 'loading';
		},
		[fetchLike.fulfilled]: (state, action) => {
			state.like.items = action.payload;
			state.like.status = 'loaded';
		},
		[fetchLike.rejected]: (state) => {
			state.like.items = [];
			state.like.status = 'error';
		},
	},
});	

export const likeReducer = likeSlice.reducer