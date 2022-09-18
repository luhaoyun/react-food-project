//使用RTK来构建store
import {configureStore} from "@reduxjs/toolkit";
import { hanReducer } from "./hanSlice";

// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{
       han:hanReducer
   }
});

export default store;
