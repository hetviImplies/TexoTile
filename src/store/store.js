import { configureStore } from "@reduxjs/toolkit";
import LoginAuthReducer from "../Slice/LoginAuthSlice";
import QualityReducer from "../Slice/QualitySlice";
import YarnReducer from "../Slice/YarnSlice";
import UserReducer from "../Slice/UserSlice";
const Store=configureStore({
reducer:{
    LoginAuthSlice : LoginAuthReducer,
    Quality : QualityReducer,
    Yarn : YarnReducer,
    User : UserReducer
}
})

export default Store