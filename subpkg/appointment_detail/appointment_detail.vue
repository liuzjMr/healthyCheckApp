<template>
	<view class="container">
		<view class="card">
			<view class="tip">
				<p>{{comboInfo.comboName}}</p>
				<span class="time">{{comboInfo.checkDate}} 09:00-12:00</span>
				<view class="option1">
					<span class="success">登记成功！请等待审核</span>
				</view>
				<view class="option2">
					<button @click="goHome">返回首页</button>
					<button @click="goMyAppointment">查看我的预约</button>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="code">
				<span>预约码<span style="font-weight: normal;margin-left: 10rpx;">(向工作人员出示进行核销)</span></span>
				<image src="../../static/image/code.png" mode=""></image>
			</view>

		</view>

		<!-- 健康体检预约-->
		<view class="card" v-if="currentCate == '健康体检'">
			<view class="info">
				<p>预约信息</p>
				<view class="infoDetail">
					<view class="left">姓名:</view>
					<view class="right">{{orderInfo.personName}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">手机:</view>
					<view class="right">{{orderInfo.mobile}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">体检日期:</view>
					<view class="right">{{orderInfo.checkDate}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">报告领取方式:</view>
					<view class="right">医院体检中心自取</view>
				</view>
				<br>

				<p>订单信息</p>
				<view class="infoDetail">
					<view class="left">订单号:</view>
					<view class="right">{{orderInfo.orderCode}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">套餐金额:</view>
					<view class="right">￥200.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">优惠金额:</view>
					<view class="right">￥0.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">实付金额:</view>
					<view class="right">￥200.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">订单创建时间:</view>
					<view class="right">{{orderInfo.createTime}}</view>
				</view>
			</view>
		</view>

		<!-- 从业或职业体检预约 -->
		<view class="card" v-else>
			<view class="info">
				<p>预约信息</p>
				<view class="infoDetail">
					<view class="left">单位:</view>
					<view class="right">{{orderInfo.unitName}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">单位信用代码:</view>
					<view class="right">{{orderInfo.unitId}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">体检日期:</view>
					<view class="right">{{orderInfo.checkDate}}</view>
				</view>

				<view class="infoDetail">
					<view class="left">报告领取方式:</view>
					<view class="right">医院体检中心自取</view>
				</view>
				<br>

				<p>订单信息</p>
				<view class="infoDetail">
					<view class="left">订单号:</view>
					<view class="right">OD1541589846633247</view>
				</view>

				<view class="infoDetail">
					<view class="left">套餐金额:</view>
					<view class="right">￥200.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">优惠金额:</view>
					<view class="right">￥0.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">实付金额:</view>
					<view class="right">￥200.00</view>
				</view>

				<view class="infoDetail">
					<view class="left">订单创建时间:</view>
					<view class="right">{{orderInfo.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//预约返回的信息
				orderRes: {},
				//返回套餐的信息
				comboInfo: {},
				//返回预约信息
				orderInfo: {},
			};
		},
		computed: {
			//获取当前选择预约类型
			getCurrentType() {
				return this.$store.state.m_mainInfo.currentType
			},
			//获取当前选择的体检类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate;
			}
		},
		onLoad(options) {

			this.orderRes = JSON.parse(options.orderRes)
			this.comboInfo = this.orderRes.comboInfo
			this.orderInfo = this.orderRes.orderInfo

			console.log(this.comboInfo);
			console.log(this.orderInfo);
		},
		methods: {
			//跳往home
			goHome() {
				uni.navigateTo({
					url: '../../pages/home/home',
				})
			},
			// 跳往我的预约
			goMyAppointment() {
				uni.navigateTo({
					url: '../../subpkg/my_appointment/my_appointment',
				})
			}
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
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.card:last-child {
			margin-bottom: 20rpx;
		}

		.card {
			width: 95%;
			height: auto;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
			margin-top: 20rpx;

			.tip {
				padding: 20rpx;

				p {
					font-size: 32rpx;
					font-weight: bold;
				}

				.time {
					display: block;
					margin-top: 20rpx;
					font-size: 26rpx;
					color: gray;
				}

				.option1 {
					margin-top: 20rpx;

					.success {
						color: #4fbd5f;
						font-size: 30rpx;
					}

				}

				.option2 {
					display: flex;
					margin-top: 20rpx;


					button {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 250rpx;
						height: 60rpx;
						font-size: 30rpx;
						margin: 0;
						margin-right: 20rpx;

					}

				}

			}
		}


		.code {
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			span {
				font-size: 30rpx;
				font-weight: bold;
			}

			image {
				margin-top: 40rpx;
				margin-bottom: 36rpx;
				width: 400rpx;
				height: 400rpx;
			}
		}

		.info {
			padding: 20rpx;

			p {
				display: block;
				height: 50rpx;
				font-weight: bold;
				border-bottom: 1px solid #efefef;
			}

			.infoDetail {
				display: flex;
				margin-top: 30rpx;
				font-size: 30rpx;

				.left {
					flex: 30%;
				}

				.right {
					flex: 70%;
					color: gray;
					text-align: right;
				}
			}
		}

	}
</style>