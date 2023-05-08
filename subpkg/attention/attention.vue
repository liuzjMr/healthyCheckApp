<template>
	<view class="container">
		<view class="text">
			<h4 class="header">从业人员在线预约体检</h4>
			<h4 class="header">办理健康证明注意事项</h4>
			<br>
			<h4>一、体检预约注意事项：</h4>
			<p>1.女性参检：胸部照片检查是从业人员必检项目，女性预约体检须勾选承诺无怀孕情况；体检当日避免穿连衣裙和有饰物图案上衣。</p>
			<p>2.体检时间：体检预约当日上午8：30-11:30有效。</p>
			<p>3.空腹准备：体检当日早上勿进食、勿饮水。</p>
			<h4>二、现场体检注意事项：</h4>
			<p>1.健康防护：体检时有人员聚集可能，请自行准备并全程佩戴口罩。公共场所请遵守秩序、尊重他人。</p>
			<p>2.要件携带：体检当日请携带第二代居民身份证原件参加体检。</p>
			<p>3.体检地点：古蔺疾控中心实验楼一楼体检区域。</p>
			<p>4.特殊体质：如有晕血晕针、低血糖等，请提前告知采血工作人员。</p>
			<p>5.项目确认：离开前请确认《体检指引单》上体检项目全部完成。</p>
			<h4>三、体检后相关事项</h4>
			<p>1.体检结果查询及自行打印：体检完成3个工作日后，登录“古蔺县疾控中心”微信公众号可查询体检结果；电脑端登录微信可自行打印体检表和《健康合格证明》。</p>
			<p>2.体检结果管理：《体检表》《健康合格证明》打印后由用人单位或者私营业主存档备查。在1年有效期内，从业人员可通过“古蔺县疾控中心”微信公众号，在线出示电子版《健康合格证
				明》备查。有效期届满前1月，需预约申请重新体检办证。</p>
			<br>
			<p class="footer">古蔺县疾病预防控制中心</p>
			<p class="footer">2022年6月</p>

		</view>

		<button class="wait" v-if="needWait">倒计时：{{time}}秒</button>
		<button class="agree" @click="agree" v-else>已阅读并同意</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//时间初始值
				time:5,
				needWait:true,
			};
		},
		onLoad() {
			//倒计时后才能同意
			var timer = setInterval(() => {
				// 判断剩余秒数
				if (this.time == 1) {
					// 清除定时器和复原按钮
					clearInterval(timer);
					this.needWait = false
				} else {
					this.time--;
				}
			}, 1000);
		},
		methods: {
			//已阅读并同意按钮 去往order_info
			agree() {
				uni.navigateTo({
					url: '/subpkg/order_info/order_info'
				})
			}
		},
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.text {
			padding: 30rpx;

			.header {
				text-align: center;
			}

			.footer {
				text-align: right;
			}
		}
		
		.wait,
		.agree {
			position: fixed;
			bottom: 20rpx;
			width: 95%;
			border-radius: 100rpx;
			background-color: #1d7dfc;
			color: #fff;
		}
		
		.wait{
			background-color: #74adf9;
		}
	}
</style>