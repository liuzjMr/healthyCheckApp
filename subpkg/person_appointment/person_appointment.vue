<template>
	<view class="container">
		<!-- 列表展示区 -->
		<view class="list">

			<!-- 套餐列表 -->
			<navigator class="listBox" :url="'/subpkg/orderInfo/orderInfo'">
				<!-- 左侧图片 -->
				<view class="left">
					<image src="../../static/calender/1.png" mode=""></image>
				</view>
				<!-- 右侧文字 -->
				<view class="right">
					<p>入职无忧体检套餐(男女通用)</p>
					<span>入职体检套餐</span>
					<view class="cate">
						<span>性别不限</span>
						<span>18-60岁</span>
					</view>
				</view>
			</navigator>

			<navigator class="listBox" :url="'/subpkg/orderInfo/orderInfo'">
				<!-- 左侧图片 -->
				<view class="left">
					<image src="" mode=""></image>
				</view>
				<!-- 右侧文字 -->
				<view class="right">
					<p>儿童入园体检预约</p>
					<span>儿童体检套餐</span>
					<view class="cate">
						<span>性别不限</span>
						<span>3-10岁</span>
					</view>
				</view>
			</navigator>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;

		.list {
			display: flex;
			flex-direction: column;
			width: 100%;



			.listBox {
				display: flex;
				padding: 40rpx;
				border-bottom: 1px solid #efefef;
				background-color: #fff;



				.left {
					width: 180rpx;
					height: 180rpx;
					background-color: #fff;
					border-radius: 10rpx;
					overflow: hidden;

					image {
						width: 180rpx;
						height: 180rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					padding: 15rpx 20rpx;
					position: relative;
					margin-left: 20rpx;

					p {
						font-size: 32rpx;
						font-weight: 500;
					}

					span {
						font-size: 28rpx;
						margin-top: 5rpx;
						color: gray;
						margin-top: 10rpx;
					}

					.cate {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						span {
							display: block;
							width: 120rpx;
							height: 40rpx;
							font-size: 20rpx;
							color: #fff;
							margin-top: 6rpx;
							margin-right: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: orange;
							border-radius: 8rpx;
							border: 1.5px solid orange;
						}
					}


				}
			}
		}

	}
</style>