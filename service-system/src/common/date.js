const time = {
    get_current_time,
    get_custom_time
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