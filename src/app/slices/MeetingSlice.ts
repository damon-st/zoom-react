import { ToastType } from "../../utils/Types";
import{createSlice}from"@reduxjs/toolkit"
interface MeetingInitialState{
    toasts:Array<ToastType>
}
const initialState:MeetingInitialState={
    toasts:[]
}

export const meetingsSlice=createSlice({
    name:"meetings",
    initialState,
    reducers:{
        setToast:(state,action)=>{
            state.toasts=action.payload;
        }
    }
})

export const {setToast}=meetingsSlice.actions;