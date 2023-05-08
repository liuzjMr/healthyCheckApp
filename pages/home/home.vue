<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="wrap">
			<swiper circular autoplay :interval="3000" indicator-dots indicator-color="rgba(255, 255, 255, .3)"
				indicator-active-color="rgba(255, 255, 255, .7)">
				<swiper-item v-for="(item,i) in swiperList" :key="i">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>

		<!-- 六个功能卡片 -->
		<view class="middle">
			<navigator class="box1" :url="'/subpkg/PE_appointment/PE_appointment'">
				<view class="box1_text">
					<p>体检预约</p>
					<span>实时预约</span>
				</view>
				<view class="img">
					<image src="../../static/icons/shijian.png" mode=""></image>
				</view>

			</navigator>
			<navigator class="box2" :url="'/subpkg/report_query/report_query'">
				<view class="box2_text">
					<p>报告查询</p>
					<span>一键查询</span>
				</view>
				<view class="img">
					<image src="../../static/icons/zixun.png" mode=""></image>
				</view>
			</navigator>

		</view>

		<view class="middle">
			<navigator class="box1" :url="'/subpkg/health_assessment/health_assessment'">
				<view class="box1_text">
					<p>健康评估</p>
					<span>了解自身健康</span>
				</view>
				<view class="img">
					<image src="../../static/icons/shaomiao.png" mode=""></image>
				</view>

			</navigator>
			<navigator class="box2" :url="'/subpkg/health_intervention/health_intervention'">
				<view class="box2_text">
					<p>健康干预</p>
					<span>采集状况</span>
				</view>
				<view class="img">
					<image src="../../static/icons/guahao.png" mode=""></image>
				</view>
			</navigator>

		</view>

		<view class="middle">
			<navigator class="box1" :url="'/subpkg/health_record/health_record'">
				<view class="box1_text">
					<p>健康档案</p>
					<span>掌上查询</span>
				</view>
				<view class="img">
					<image src="../../static/icons/tijianbiao.png" mode=""></image>
				</view>

			</navigator>
			<navigator class="box2" :url="'/subpkg/health_consultation/health_consultation'">
				<view class="box2_text">
					<p>健康咨询</p>
					<span>咨询一览</span>
				</view>
				<view class="img">
					<image src="../../static/icons/yisheng.png" mode=""></image>
				</view>
			</navigator>
		</view>

		<view class="middle">
			<navigator class="box1" :url="'/pages/my/my'">
				<view class="box1_text">
					<p>个人中心</p>
					<span>预约记录</span>
				</view>
				<view class="img">
					<image src="../../static/icons/tuanti.png" mode=""></image>
				</view>

			</navigator>
			<navigator class="box2" :url="'/subpkg/home_group/home_group'" style="background-color: #f6f6f6;">
			</navigator>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图
				swiperList: [{
					url: '../../static/swiper/home/1.jpg',
				}, {
					url: '../../static/swiper/home/2.jpg',
				}, {
					url: '../../static/swiper/home/3.png',
				}, ],

			}
		},
		computed: {},
		onLoad() {},
		methods: {

		},
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f6f6f6;
		position: absolute;
		width: 100%;
		height: 100%;

		.wrap {
			width: 100%;
			background-color: #f6f6f6;

			swiper {
				height: 380rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.header {
			display: flex;
			width: 100%;
			height: 400rpx;
			justify-content: center;

			background-size: cover;
			background-position: center;
			position: relative;

			span {
				display: block;
				width: 600rpx;
				color: white;
				font-size: 50rpx;
				font-weight: 600;
				text-align-last: justify;
				position: absolute;
				bottom: 60rpx;
			}

		}

		.middle {
			width: 95%;
			height: 160rpx;
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;
			border-radius: 10rpx;

			.box1 {
				background-color: #fff;
			}

			.box2 {
				background-color: #fff;
			}

			navigator {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 340rpx;
				height: 160rpx;
				border-radius: 20rpx;

				.box1_text,
				.box2_text {
					display: flex;
					flex-direction: column;
					justify-content: center;

					p {
						font-size: 36rpx;
					}

					span {
						margin-top: 6rpx;
						font-size: 26rpx;
						color: gray;
						margin-left: 4rpx;
					}
				}


				.img {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 80rpx;
					border-radius: 30rpx;

					image {
						width: 60rpx;
						height: 60rpx;
					}
				}

				p {
					margin-top: 10rpx;
					font-size: 26rpx;
				}

			}

		}

		.main {
			width: 100%;
			background-color: #f6f6f6;

			.institution {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				margin-top: 20rpx;

				p {
					margin-left: 20rpx;
					position: relative;

					span {
						margin-left: 15rpx;
					}

					&::before {
						content: '';
						display: block;
						width: 3px;
						height: 15px;
						border-radius: 20rpx;
						background-color: #21d2b5;
						position: absolute;
						top: 55%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}

			.institution_list {
				width: 95%;
				height: 200rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin: 20rpx auto;
				display: flex;
				align-items: center;

				.left {
					flex: 25%;
					margin-top: 10rpx;

					image {
						width: 150rpx;
						height: 150rpx;
						background-color: skyblue;
						margin: 20rpx;
						border-radius: 20rpx;
					}
				}

				.right {
					flex: 75%;
					display: flex;
					flex-direction: column;

					.right_header {
						display: flex;
						justify-content: space-between;

						span {
							display: block;
							width: 70rpx;
							height: 30rpx;
							background-color: #21d2b5;
							font-size: 10rpx;
							border-radius: 20rpx;
							color: #fff;
							margin-top: 6rpx;
							margin-right: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.right_middle {
						margin-top: 10px;
						font-size: 18rpx;
						color: gray;
					}
				}

			}
		}
	}
</style>