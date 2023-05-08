<template>
	<view class="container">
		<view style="width: 100%;background-color: #fff;">
			<u-tabs :list="list" :current="current" @change="change" :scrollable="false"></u-tabs>
		</view>

		<!-- 个人预约记录 -->
		<view class="list" @click="goOrderDetails(item)" v-for="(item,index) in appointmentList">
			<view class="header">
				<view class="left">
					体检时间:{{item.personInfo.checkDate}}&nbsp;&nbsp;&nbsp;09:00-12:00
				</view>
				<view class="right">
					<p v-show="item.personInfo.isPass == 0">待审核</p>
					<p v-show="item.personInfo.isPass == 1">待体检</p>
					<p v-show="item.personInfo.isPass == 2">已完成</p>
				</view>
			</view>

			<view class="middle">
				<p class="type">
					<span v-for="(item1,index) in item.comboInfoList" :key="item1.comboId">{{item1.comboName}}</span>
				</p>
				<p class="hosptial">{{item.checkOrgInfo.checkOrgName}}</p>
				<p class="name">体检人员：{{item.personInfo.personName}}</p>
				<p class="price">￥{{item.comboInfoList.reduce((a, b) => a + Number(b.price), 0).toFixed(2)}}</p>
			</view>

			<view class="footer">
				<span>开发票</span>
				<span>去评价</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否正在请求数据
				isloading: false,
				appointmentList: [],
				checkOrgInfo: '',
				comboInfoList: '',
				personInfo: '',
				orderPass: '',
				list: [{
					name: '全部',
					value: '',
				}, {
					name: '待审核',
					value: 0
				}, {
					name: '待体检',
					value: 1
				}, {
					name: '已完成',
					value: 2
				}, {
					name: '未完成',
					value: 3
				}],
				current: 0
			};
		},
		computed: {
			//计算套餐总价
			totalPrice() {
				// return this.comboInfoList.reduce((a, b) => a + Number(b.price), 0)
			},
		},
		onLoad() {
			this.getOrderRecordInfoListByMobile()
		},
		methods: {
			//根据用户手机号返回预约记录
			async getOrderRecordInfoListByMobile(cb) {
				try {
					if (this.isloading) return;
					// ** 打开节流阀
					this.isloading = true;
					const res = await this.$api.appointment.record.getOrderRecordInfoListByMobile({
						mobile: this.$store.getters['m_user/userMobile'],
						isPass: this.list[this.current].value
					});
					this.appointmentList = res;
					console.log(this.appointmentList);
				} catch (error) {
					console.error(error.message);
				}
				// ** 关闭节流阀
				this.isloading = false
				cb && cb()
			},
			//切换tab栏
			change(index) {
				this.current = index.index;
				this.getOrderRecordInfoListByMobile()
			},
			//去往订单详情
			goOrderDetails(item) {
				console.log(item);
				const orderId = item.groupOrderInfo.groupOrderId
				const idCard = item.personInfo.idCard

				uni.navigateTo({
					url: '/subpkg/order_details/PersonOrder/PersonOrder?orderId=' + orderId + "&idCard=" + idCard
				})
			},
			// 下拉刷新的事件
			onPullDownRefresh() {
				this.getOrderRecordInfoListByMobile(() => uni.stopPullDownRefresh())
			}

		},
		onUnload() {
			// #ifdef H5
			uni.navigateTo({
				url: '/subpkg/PE_appointment/PE_appointment'
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
		background-color: #efefef;
		display: flex;
		flex-direction: column;
		align-items: center;

		.list {
			width: 95%;
			height: 365rpx;
			background-color: #fff;
			margin-top: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.header {
				display: flex;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;

				.left {
					flex: 8.5;
					font-size: 28rpx;
				}

				.right {
					flex: 1.5;
					text-align: center;
					font-size: 28rpx;
					color: gray;
				}
			}

			.middle {
				height: 160rpx;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;

				.type {
					width: 100%;
					font-weight: bold;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

					span {
						margin-right: 30rpx;
					}
				}

				.hosptial,
				.name {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: gray;
				}

				.price {
					font-size: 28rpx;
					text-align: right;
					font-weight: bold;
				}
			}

			.footer {
				display: flex;
				padding: 20rpx;
				float: right;

				span {
					display: block;
					width: 120rpx;
					height: 50rpx;
					font-size: 26rpx;
					text-align: center;
					line-height: 50rpx;
					margin-left: 20rpx;
					border-radius: 30rpx;
					font-weight: bold;
					border: 1px solid #efefef;
				}
			}
		}

	}
</style>