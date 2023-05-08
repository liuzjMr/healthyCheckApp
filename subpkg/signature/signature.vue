<template>
	<view class="container">
		<!-- 承诺书 -->
		<view class="book">
			<h4>从业人员健康体检告知承诺书</h4>
			<br>
			<p>古蔺县疾病预防控制中心：</p>
			<br>
			<p>本人姓名：_______，性别：_____，身份证号：___________________，联系电话：______________。
				户籍为______县______(乡/镇)______村（居）委会，因准备在古蔺县________从事__________经营，暂未办理工商等相关许可证照，今日前来你单位参加从业人员健康体检，
				以获取健康合格证明。</p>
			<br>
			<p>在此我郑重承诺：我向你单位提供的所有信息是真实的，合法的，有效的，并自愿承担由此产生的一切经济损失和法律责任！</p>
			<p>此承诺书自我签署之日起生效!</p>
			<br>
			<br>
			承诺人（在线手写签名）：
			<!-- 完成签名的图片 -->
			<image :src="this.sigUrl" mode=""></image>
		</view>

		<!-- 签名画板 -->
		<view class="content">
			<Signature ref="sig"></Signature>
		</view>



		<!-- 签名&提交按钮 -->
		<button class="clickStartSign" @click="startSign" v-if="hasSignature == false">点我签名</button>
		<button class="submitButton" @click="submitInfo" v-else>提交预约</button>
	</view>
</template>

<script>
	import Signature from '@/components/sin-signature/sin-signature.vue'
	export default {
		data() {
			return {
				//记录是否存在签名
				hasSignature: false,
				//签名的图片路径
				sigUrl: ''
			};
		},
		components: {
			Signature,
		},
		onLoad() {

		},
		methods: {
			//开始签名 签名结束后打印数据
			async startSign() {
				let s = await this.$refs.sig.getSyncSignature();
				this.sigUrl = s;
				console.log(this.sigUrl);
				//有签名后就可以提交
				if (s != 0) {
					this.hasSignature = true
				}
			},

			//提交签名
			submitInfo() {
				uni.navigateTo({
					url: '/subpkg/appointment_detail/appointment_detail'
				})
			},

		}
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.book {
			padding: 30rpx;
			background-color: #fff;
			position: relative;

			h4 {
				text-align: center;
			}

			image {
				width: 200rpx;
				height: 140rpx;
				position: absolute;
				bottom: -10px;
				right: 18%;

			}
		}

		.content {
			width: 95%;
			margin-top: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			height: 0;
			overflow: hidden;

			.clickMe {
				margin-top: 20rpx;
			}
		}

		.clickStartSign,
		.submitButton {
			position: fixed;
			bottom: 20rpx;
			width: 95%;
			border-radius: 100rpx;
			background-color: #1d7dfc;
			color: #fff;

		}

	}
</style>