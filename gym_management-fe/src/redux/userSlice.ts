import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  target: string;
  activity: string;
  password?: string;
  profileImage?: File;
  selectedLanguage: string;
  isCoach: boolean;

}


const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  activity: '',
  target: '',
  password: '',
  isCoach: false,
  selectedLanguage: 'en',

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 