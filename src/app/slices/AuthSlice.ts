import { createSlice } from "@reduxjs/toolkit";

interface AuthInitialState{
    userInfo:{
        uid:string,
        email:string,
        name:string
    }| undefined,
    isDarkTheme:boolean,
}

const initialState:AuthInitialState={
    userInfo:undefined,
    isDarkTheme:false,
} 

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        changeTheme:(state,action)=>{
            state.isDarkTheme=action.payload.isDarkTheme;
        },
        setUser:(state,action)=>{
            state.userInfo = action.payload;
        }
    }
})

export const {setUser,changeTheme}=authSlice.actions;