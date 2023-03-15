import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  email: '',
  id: '',
  nickname: '',
  userType: '',
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
      // state 변화를 알림
      return state;
    },
    initUser: (state) => {
      state.email = initialState.email;
      state.id = initialState.id;
      state.nickname = initialState.nickname;
      state.userType = initialState.userType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { loginUser, initUser } = userSlice.actions;
export default userSlice.reducer;
