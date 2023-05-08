<template>
	<view class="container">
		<p class="welcome" style="font-size: 60rpx;color: black;">欢迎登录</p>
		<image src="../../static/image/登录.png" mode="" class="img"></image>

		<view class="login">
			<uni-easyinput trim="all" v-model="username" placeholder="请输入预约人手机号" class="username"></uni-easyinput>
			<uni-easyinput type="password" v-model="password" placeholder="请输入密码" class="password"></uni-easyinput>

			<button type="primary" class="loginNow" :disabled="!btnDisabled" @click="mobileLogin">立即登录</button>
		</view>

		<div class="other-way-login">
			<span class="line"></span>
			<span class="txt">其他登录方式</span>
			<span class="line"></span>
		</div>

		<image src="../../static/icons/微信.png" mode=""></image>
		<p>微信登录</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '18783023088',
				password: 'admin12345678',
			};
		},
		computed: {
			btnDisabled() {
				if (this.username && this.password) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			//用户登录
			async login() {
				try {
					const res = await this.$api.user.login({
						username: this.username,
						password: this.password,
					});

					console.log(res);
					if (!res.id) return uni.showToast({
						title: '登录失败!',
						duration: 2000,
						icon: "none",
					})

					uni.showToast({
						title: '登录成功!',
						duration: 2000,
					})

					this.$store.dispatch('m_user/setUserInfo', res)

					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/my/my'
						})
					}, 1000);

				} catch (error) {
					uni.$showMsg(error.message);
				}
			},
			//手机号登录
			mobileLogin() {
				this.$store.dispatch('m_user/setUserMobile', this.username)

				uni.showToast({
					title: '登录成功!',
					duration: 2000,
				})

				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/my/my'
					})
				}, 1000);
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.welcome {
			font-size: 60rpx;
			position: absolute;
			left: 40rpx;
			top: 100rpx;
			color: black;
		}

		.img {
			width: 300rpx;
			height: 200rpx;
			position: absolute;
			margin-top: 50rpx;
			right: -10rpx;
		}

		.login {
			width: 100%;
			margin-top: 250rpx;

			/deep/ .uni-easyinput__placeholder-class {
				font-size: 30rpx;
			}

			/deep/ .uni-easyinput__content {
				height: 80rpx;
			}

			.username,
			.password {
				width: 90%;
				margin: auto;
				margin-top: 40rpx;
			}

			.loginNow {
				width: 90%;
				margin-top: 60rpx;
			}

			/deep/ .uni-easyinput {
				width: 90%;
				margin: 60rpx auto;
			}
		}

		.other-way-login {
			margin-top: 50%;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			text-align: center;
		}

		.other-way-login .line {
			display: inline-block;
			width: 160rpx;
			border: 1px solid #ccc;
		}

		.other-way-login .txt {
			color: gray;
			vertical-align: middle;
			vertical-align: -15%;
			margin: 0 20rpx;
		}

		image {
			margin-top: 40rpx;
			width: 100rpx;
			height: 100rpx;
		}

		p {
			font-size: 30rpx;
			color: gray;
			margin-top: 20rpx;
		}
	}
</style>