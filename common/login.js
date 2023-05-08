import {
	appLogin
} from "@/common/request/api.js"


const loginJs = params => {
	//提交请求
	appLogin({
		username:params.username,
		password: params.password,
		saveLogin: true
	}).then(res => {
		if (res.code == 200) {
			uni.showToast({
				title: "登录成功",
				icon: "none",
				mask: true
			})
			//本地保存
			uni.setStorageSync("user",res.data);
			uni.setStorageSync("token",res.msg);
			
			uni.setStorageSync('remeber', params.rememberBlooean);
			//记住账号密码
			if(params.rememberBlooean == true){
				uni.setStorageSync('username', params.usernameRember);
				uni.setStorageSync('password', params.passwordRember);
			}else if(params.rememberBlooean == false){
				uni.removeStorageSync("username");
				uni.removeStorageSync("password");
			}
			
			//跳转首页
			setTimeout(function() {
				uni.switchTab({
					url: "../index/index"
				})
			}, 1000)
		} else {
			uni.showToast({
				title: res.msg,
				icon: "none"
			})
		}
	})
}

export default loginJs;
