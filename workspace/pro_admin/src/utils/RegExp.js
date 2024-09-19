export const reg_user = /^[\u4e00-\u9fa5]{2,4}$/;    //2-4个中文字符正则
export const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码
export const reg_mail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ //电子邮箱
export const reg_id =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号
export const reg_qq =  /^[1-9][0-9]\d{4,9}$/ //qq
export const reg_post =  /^[1-9]\d{5}$/ //邮政编码
export const reg_login =/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ //4-15位大小写字符和数字组成，字母开头