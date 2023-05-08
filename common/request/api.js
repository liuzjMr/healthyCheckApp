import {
	getRequest,
	getRequestTokent,
	postRequestJson,
	postRequestPutJson,
	postRequestPOSTJson,
	postRequestNoJson,
	deleteRequest,
	putRequest,
	postNoAuthRequest,
	postRequestJsonLogin,
	postRequest
} from '../../util/request.js'

//登录
export const appLogin = params => {
	return postRequestJsonLogin('/scmt/user/appLogin', params);
};
//手机号获取验证码
export const appSend = params => {
	return getRequestTokent('/scmt/user/sendMsm', params);
};
//微信登录
export const appWxLogin = params => {
	return postRequestJsonLogin('/scmt/user/appWxLogin', params);
};
//修改个人资料
export const center = params => {
	return postRequestJsonLogin('/scmt/user/appEdit', params);
};
//修改密码
export const updatePass = params => {
	return postRequestJsonLogin('/scmt/user/appModifyPass', params);
};
//注册
export const register = params => {
	return postRequestJsonLogin('/scmt/user/appRegist', params);
};

//修改头像
export const updateAvatar = params => {
	return postRequestPOSTJson('/api/users/updateAvatar/', params);
};
//文件删除
export const fileDelete = params => {
	return getRequestTokent('/api/download/fileDelete', params);
};
//修改邮箱
/* export const updatePass = params => {
	   const data = {
	       password: encrypt(params.pass),
	       email: params.email
	     }
	return postRequestJson('/api/users/updateEmail/' + form.code, params);
}; */