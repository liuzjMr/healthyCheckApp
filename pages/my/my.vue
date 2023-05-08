<template>
	<view class="my-userinfo-container">
		<!-- 头像及昵称 -->
		<view class="top-box" @click="goMyLogin">
			<u-icon name="account-fill" size="60" color="#2979ff" class="avatar"></u-icon>
			<!-- <image src="@/static/head.jpg" class="avatar"></image> -->
			<view class="nickname">
				<view v-if="userMobile">
					<!-- <p>{{userInfo.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.mobileShow}}</p> -->
					<p>{{userMobile}}</p>
					<span>欢迎回来~</span>
				</view>

				<view v-else>
					<p>欢迎登录~</p>
					<span>马上注册,使用更多功能</span>
				</view>

			</view>
		</view>
		<!-- 面板的列表区域 -->
		<view class="panel-list">

			<!-- 第一个面板 -->
			<view class="panel">
				<!-- panel 的主体区域 -->
				<navigator :url="'/subpkg/my_appointment/my_appointment'" class="panel-body">
					<!-- panel 的 item 项 -->
					<view class="panel-item">
						<text>我的今日预约</text>
						<span>您今天还没有预约哦~</span>
					</view>

				</navigator>
			</view>

			<!-- 第二个面板 -->
			<view class="panel">
				<!-- 面板的标题 -->
				<navigator :url="'/subpkg/my_appointment/my_appointment'" class="panel-list-item">
					<view class="panel-list-item-left">
						<u-icon name="clock"></u-icon>
						<p>我的所有预约</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</navigator>
				<navigator :url="'/subpkg/edit_myInfo/edit_myInfo'" class="panel-list-item">
					<view class="panel-list-item-left">
						<u-icon name="edit-pen"></u-icon>
						<p>修改我的个人资料</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</navigator>


			</view>

			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<view class="panel-list-item-left">
						<u-icon name="account"></u-icon>
						<p>关于我们</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<view class="panel-list-item-left">
						<u-icon name="phone"></u-icon>
						<p>联系作者</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<view class="panel-list-item-left">
						<u-icon name="setting"></u-icon>
						<p>系统后台管理</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>

				<view class="panel-list-item" @click="exit">
					<view class="panel-list-item-left">
						<u-icon name="close-circle"></u-icon>
						<p>退出登录</p>
					</view>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {
				mobile: '',
			};
		},
		computed: {
			//获取用户信息
			userInfo() {
				return this.$store.getters["m_user/userInfo"]
			},
			//获取用户手机号
			userMobile() {
				return this.$store.getters["m_user/userMobile"]
			},
			//隐藏手机号
			mobileShow() {
				let mphone = this.mobile?.substring(0, 3) + '****' + this.mobile?.substring(7);
				return mphone
			},
		},
		onLoad() {
			// console.log(this.userInfo);

			this.mobile = this.userInfo?.mobile
		},
		methods: {
			...mapMutations('m_user', ['updateToken', 'updateAddress']),

			//登录
			goMyLogin() {
				uni.navigateTo({
					url: '/subpkg/my_login/my_login'
				})
			},
			//退出登录
			async exit() {
				const res = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗?'
				}).catch(err => err)

				console.log(res);

				if (res.confirm) {
					this.$store.dispatch('m_user/setUserInfo', null)
					this.$store.dispatch('m_user/setUserMobile', '')
				}
			},
		},
		onUnload() {
			// #ifdef H5
			uni.navigateTo({
				url: '/pages/home/home'
			})
			// #endif
		},
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100vh;
		background-color: #F4F4F4;

		.top-box {
			height: 300rpx;
			background-color: #2153f9;
			display: flex;
			align-items: center;

			.avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
				margin-left: 40rpx;
				background-color: #fff;
			}

			.u-icon {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
				margin-left: 40rpx;
				background-color: #fff;
			}

			.nickname {
				color: #FFF;
				margin-left: 40rpx;

				p {
					display: block;
					font-size: 16px;
					font-weight: bold;
				}

				span {
					display: block;
					font-size: 24rpx;
					margin-top: 10rpx;
				}

			}
		}
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -40rpx;

		.panel {
			background-color: white;
			border-radius: 10rpx;
			margin-bottom: 16rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.panel-title {
				line-height: 90rpx;
				padding-left: 20rpx;
				font-size: 30rpx;
				border-bottom: 1px solid #f4f4f4;
			}


			.panel-body {
				display: flex;

				.panel-item {
					display: flex;
					flex-direction: column;

					text,
					view {
						font-size: 36rpx;
						font-weight: 600;
						padding: 20rpx;
					}

					span {
						font-size: 28rpx;
						color: gray;
						padding: 0 20rpx 20rpx 20rpx;
					}
				}


			}
		}
	}

	.panel-list-item {
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		padding: 0 20rpx;

		.panel-list-item-left {
			display: flex;

			p {
				margin-left: 20rpx;
			}
		}
	}
</style>