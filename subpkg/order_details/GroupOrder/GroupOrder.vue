<template>
	<view class="container">
		<view class="header">
			<!-- 订单状态 -->
			<view class="status">
				<p v-show="personList.isPass == 0">待审核</p>
				<p v-show="personList.isPass == 1">待体检</p>
				<p v-show="personList.isPass == 2">已完成</p>
				<span v-show="personList.isPass == 0">请耐心等待审核</span>
				<span v-show="personList.isPass == 1">请准时前往医院体检</span>
				<span v-show="personList.isPass == 2">请等待医院体检报告</span>
			</view>

			<view class="type" v-for="(item,index) in comboInfoList" :key="item.comboName">
				<view class="left">套餐快照</view>
				<view class="right" @click="goPackageDetail" style="margin-left: 15rpx;">{{item.comboName}}</view>
				<u-icon name="arrow-right" size="16" color="#000" @click="goPackageDetail" />
			</view>

			<view class="name" v-for="(item,index) in personList" :key="item.personName">
				<view class="left">体检人员</view>
				<view class="right">{{item.personName}}</view>
			</view>

			<view class="time">
				<view class="left">体检时间</view>
				<view class="right">{{checkDate}}&nbsp;&nbsp;&nbsp;09:00-12:00</view>
			</view>

			<view class="address">
				<view class="left">体检地址</view>
				<view class="right">{{checkOrgInfo.checkOrgAddress}}</view>
			</view>

			<view class="btn">
				<span>申请发票</span>
				<span>订单状态记录</span>
			</view>
		</view>

		<view class="footer">
			<view class="info">
				<p>预约信息</p>
				<view class="infoDetail">
					<view class="left">单位:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">单位信用代码:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">体检日期:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">报告领取方式:</view>
					<view class="right">医院体检中心自取</view>
				</view>

				<text>\n</text>

				<p>订单信息</p>
				<view class="infoDetail">
					<view class="left">订单号:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">套餐金额:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">优惠金额:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">实付金额:</view>
					<view class="right"></view>
				</view>

				<view class="infoDetail">
					<view class="left">订单创建时间:</view>
					<view class="right"></view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail: '',
				checkOrgInfo: '',
				//套餐列表
				comboInfoList: [],
				groupOrderInfo: '',
				personList: [],
				checkDate: ''

			};
		},
		onLoad() {
			this.getOrderRecordInfoByOrderId()

		},
		methods: {
			//根据订单id返回套餐信息
			async getOrderRecordInfoByOrderId() {
				try {
					const res = await this.$api.appointment.record.getOrderRecordInfoByOrderId({
						orderId: "4795ef588f774e19a1f7d516f164a401"
					});
					this.orderDetail = res;
					this.checkOrgInfo = this.orderDetail.checkOrgInfo;
					this.comboInfoList = this.orderDetail.comboInfoList;
					this.groupOrderInfo = this.orderDetail.groupOrderInfo;
					this.personList = this.orderDetail.personList;
					this.checkDate = this.personList[0].checkDate
					console.log(this.orderDetail);
				} catch (error) {
					console.error(error.message);
				}
			},
			//去往套餐快照详情
			goPackageDetail() {
				uni.navigateTo({
					url: '/subpkg/package_detail/package_detail?noBtn=true',
					success: (res) => {
						res.eventChannel.emit("package_detail", {
							readOnly: true,
							comboId: "1c109d593913cc4983eac4fd47f03043"
						})
					}
				})

			}
		}
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

		.header {
			width: 95%;
			background-color: #fff;
			margin-top: 20rpx;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.status {
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 150rpx;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 100%;
					height: 18rpx;
					background-color: #0f70f0;
					position: absolute;
					top: 0;
					left: 0;
					transform: translateY(-50%);
					border-radius: 20rpx 20rpx 0 0;

				}

				p {
					font-size: 46rpx;
					font-weight: bold;
				}

				span {
					font-size: 26rpx;
					color: gray;
				}
			}

			.type,
			.name,
			.time,
			.address {
				display: flex;
				width: 95%;
				padding: 20rpx;

				.left {
					flex: 3;
					color: gray;
				}

				.right {
					flex: 7;
					font-weight: bold;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			.btn {
				display: flex;
				margin-top: 20rpx;
				margin-left: 260rpx;
				padding: 0 20rpx 20rpx 20rpx;

				span {
					display: block;
					width: 180rpx;
					height: 50rpx;
					font-size: 26rpx;
					text-align: center;
					line-height: 50rpx;
					margin-left: 20rpx;
					border-radius: 30rpx;
					font-weight: bold;
					border: 1px solid #0f70f0;
					color: #0f70f0;
					background-color: #eff8ff;
				}
			}
		}

		.footer {
			width: 95%;
			background-color: #fff;
			margin-top: 20rpx;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

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
	}
</style>