<template>
	<view class="container">
		<view class="person" @click="personType">
			<view class="text">
				<p>个人预约</p>
				<span>个人告知承诺预约</span>
			</view>
			<image src="../../static/icons/shijian.png" mode=""></image>
		</view>


		<view class="group" @click="groupType">
			<view class="text">
				<p>单位预约</p>
				<span>用工单位集体预约</span>
			</view>
			<image src="../../static/icons/tuanti.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				hospital_id:''
			};
		},
		onLoad(options){			
			//转存为自己的数据
			this.hospital_id = options.hospital || ''
		
		},
		methods: {
			//个人预约类型
			personType() {
				//跳转到套餐选择
				this.$store.commit('m_mainInfo/SET_CURRENTTYPE', 0);
				uni.navigateTo({
					url: '/subpkg/package_selection/package_selection?hospital=' + this.hospital_id
				})
			},
			//单位预约类型
			groupType() {
				//跳转到单位信息
				this.$store.commit('m_mainInfo/SET_CURRENTTYPE', 1);
				uni.navigateTo({
					url: '/subpkg/package_selection/package_selection?hospital=' + this.hospital_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;

		image {
			width: 100rpx;
			height: 100rpx;
		}

		.person,
		.group {
			width: 90%;
			height: 200rpx;
			margin-top: 40rpx;
			display: flex;
			background-color: #fff;
			background-size: 100% 100%;
			justify-content: space-around;
			align-items: center;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.text {

				p {
					font-size: 40rpx;
				}

				span {
					font-size: 30rpx;
					color: gray;
				}
			}

			image {}
		}

		.person {}

		.group {}

	}
</style>