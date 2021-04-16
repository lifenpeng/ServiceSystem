import request from "../common/request";

export default {
    "getOrderListInfo":(data)=>{//
        return request("get","/api/order",data);
    },
    "getOrderStatusInfo":(data)=>{
        return request("get","/api/status",data);
    },
    "getbaseinfo":(data)=>{
        return request("get","/api/baseinfo",data);
    },
    "addOrder":(data)=>{
        return request("post","/api/add",data);
    },
    "orderInfoEdit":(data)=>{
        return request("post","/api/edit",data);
    },
    "orderStatusEdit":(data)=>{
        return request("post","/api/change",data);
    },
    "login":(data)=>{
        return request("post","/api/login",data);
    },
}