import {combineReducers} from "redux";
import blog from "./blog";
import user from "./user";
import filter from "./filter";


const blogApp = combineReducers({
    blog,
    user,
    filter
});

export default blogApp;
