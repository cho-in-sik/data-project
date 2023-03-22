import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  email: '',
  id: '',
  nickname: '',
  userType: '',
  profileImage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login 성공 시
    loginUser: (state, action) => {
      // name, id에 API 값 받아오기
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.userType = action.payload.userType;
      state.profileImage = action.payload.profileImage;
    },

    initUser: (state) => {
      state.email = initialState.email;
      state.id = initialState.id;
      state.nickname = initialState.nickname;
      state.userType = initialState.userType;
      state.profileImage = initialState.profileImage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { loginUser, initUser } = userSlice.actions;
export default userSlice.reducer;
