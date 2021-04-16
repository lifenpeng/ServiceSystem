const time = {
    get_current_time,
    get_custom_time,
    get_time
}

function get_current_time(){
    const myDate = new Date();
    const year = myDate.getFullYear(); // 获取当前年份
    const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
    const day = myDate.getDate(); // 获取当前日（1-31）
    const currentDate = `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
    return currentDate;
}
function get_time(time){
  if(time){
    const myDate = new Date(time);
    //const year = myDate.getFullYear(); // 获取当前年份
    const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
    const day = myDate.getDate(); // 获取当前日（1-31）
    var hour = myDate.getHours();
    var minu = myDate.getMinutes();
    var sec = myDate.getSeconds();
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    const currentDate = `${month > 9 ? month : "0" + month}月${
      day > 9 ? day : "0" + day
    }日 ${hour}:${minu}`;
    return currentDate;
  }else{
    return "暂无数据";
  }
}
function get_custom_time(date_string){
    let d = new Date(date_string).getTime();
    let t = 86400000 * 2 + d;
    const myDate = new Date(t);
    const year = myDate.getFullYear(); // 获取当前年份
    const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
    const day = myDate.getDate(); // 获取当前日（1-31）
    const currentDate = `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
    return currentDate;
}


export default time;