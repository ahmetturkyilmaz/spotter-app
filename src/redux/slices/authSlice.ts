import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface State {
  user?: User.Details | null;
  authToken: string | null;
  refreshToken: string | null;
}

const initialState: State = {
  user: undefined,
  authToken: null,
  refreshToken: null,
};

function sharedAuthUserReducer(
  state: State,
  {
    payload,
  }: PayloadAction<{
    authToken: string | null;
    refreshToken: string | null;
    user: User.Details | null;
  }>,
) {
  const {authToken, refreshToken, user} = payload;
  state.authToken = authToken;
  state.refreshToken = refreshToken;
  state.user = user;
}

function sharedClearAuthReducer(state: State) {
  state.authToken = null;
  state.refreshToken = null;
  state.user = null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<Auth.LoginRootResponse>) {
      sharedAuthUserReducer(state, action);
    },
    setUserDetails(state, action: PayloadAction<User.Details>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, sharedAuthUserReducer);
    builder.addCase(registerUser.fulfilled, sharedAuthUserReducer);
    builder.addCase(logoutUser.fulfilled, sharedClearAuthReducer);
    builder.addCase(getAuthFromLocalStorage.fulfilled, sharedAuthUserReducer);
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default authSlice.reducer;
