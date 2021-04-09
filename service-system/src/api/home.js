import request from "../common/request";

export default {
    "test":(data)=>{
        request("post","/api/test",data);
    }
}