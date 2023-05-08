<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="wrap">
			<swiper circular autoplay :interval="3000" indicator-dots indicator-color="rgba(255, 255, 255, .3)"
				indicator-active-color="rgba(255, 255, 255, .7)">
				<swiper-item v-for="item of swiperList" :key="item">
					<image :src="imageUrl + item" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</view>

		<!-- 医院信息 -->
		<view class="hosptialDetail">
			<!-- 头部区域 -->
			<view class="header">
				<view class="left">
					<image :src="imageUrl + hospitalData.avatar" mode=""></image>
				</view>
				<view class="right">
					<p>{{hospitalData.name}}</p>
					<view class="tags">
						<span v-show="hospitalData.level">{{hospitalData.level}}</span>
						<span v-show="hospitalData.tags">{{hospitalData.tags}}</span>
					</view>

				</view>
			</view>
			<!-- 营业时间 -->
			<view class="time">
				<u-icon name="clock" class="clock" />
				<span class="text">营业时间</span>
				<span class="info" @click="open1">{{hospitalData.businessHours}}</span>
				<span class="introduce" @click="open1">简介
					<u-icon name="arrow-right" size="14" class="arrow-right" />
				</span>
				<!-- 弹出层 -->
				<uni-popup ref="popup1" type="bottom">
					<view class="popBox" style="overflow: scroll;">
						<view class="popHeader">机构简介</view>
						<view class="pop1">
							<p>营业时间</p>
							<span>{{hospitalData.businessHours}}</span>
						</view>
						<view class="pop2">
							<p>门店介绍</p>
							<span>{{hospitalData.introduction}}</span>
						</view>
					</view>

				</uni-popup>
			</view>
			<!-- 到院须知 -->
			<view class="notice">
				<u-icon name="volume" class="volume" />
				<span class="text">到院须知</span>
				<span class="info" @click="open2">{{hospitalData.notice}}</span>
				<span class="introduce" @click="open2">详情
					<u-icon name="arrow-right" size="14" class="arrow-right" />
				</span>
				<!-- 弹出层 -->
				<uni-popup ref="popup2" type="bottom">
					<view class="popBox">
						<view class="popHeader">到院须知</view>
						<view class="pop1">
							<span>{{hospitalData.notice}}</span>
						</view>
					</view>
				</uni-popup>
			</view>
			<!-- 详细地址 -->
			<view class="address">
				<u-icon name="map" class="map" />
				<span class="text">{{hospitalData.address}}</span>
				<view class="icons">
					<image src="../../static/icons/region.png" mode=""></image>
					<image src="../../static/icons/phonecall.png" mode="" @click="callphone"></image>
				</view>
			</view>
		</view>

		<!-- 套餐类型选择 -->
		<view class="typeTab" @touchmove.stop>
			<u-tabs :list="list" :current="current" @change="change" class="tabs" />
			<!-- 全部 -->
			<view class="pakeageList">
				<!-- 套餐列表 -->
				<view class="list" v-for="(item,index) in comboData" :key="item.id" @click="goNextPage(item)">
					<!-- 左侧图片 -->
					<view class="left">
						<image :src="item.url == '' ? '../../static/image/暂无数据.png':imageUrl + item.url" mode="">
						</image>
					</view>
					<!-- 右侧文字 -->
					<view class="right">
						<p>{{item.name}}</p>
						<span>{{item.type}}套餐</span>
						<view class="cate">
							<span>{{item.fitSex}}人群</span>
						</view>
					</view>
					<!-- 价格 -->
					<view class="price">
						<p>{{item.price == null ? '暂无价格' : '￥' + item.price.toFixed(2)}}</p>
					</view>
				</view>
			</view>

			<view class="noData" v-if="comboData.length == 0" style="display: flex;justify-content: center;">
				<image src="../../static/image/暂无数据.png" mode="heightFix"></image>
			</view>
		</view>

		<!-- 自主选择项目 -->
		<view class="bottomBtn" v-if="this.currentCate == '职业体检'">
			<button class="submit" @click="choose_item">多选体检套餐</button>
		</view>

	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//微信小程序端代理图片地址
				imageUrl: this.imageUrl,
				//后端返回的医院信息
				hospitalData: "",
				//套餐信息
				comboData: "",
				//tab栏体检类型列表
				list: [],
				// 当前tab栏选择序号
				current: 0,
				//当前tab栏选择文字
				careerStage: "上岗前"
			};
		},
		computed: {
			//获得轮播图
			swiperList() {
				const {
					images
				} = Object.assign({
						images: "",
					},
					this.hospitalData
				);

				if (images) {
					return images.split(";").filter(Boolean);
				} else {
					return ["../../static/image/暂无图片.png"];
				}
			},
			//获得当前选择的医院id
			currentHospital() {
				return this.$store.state.m_mainInfo.currentHospital;
			},

			//获得当前选择的套餐类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate;
			},

			//获取当前选择类型
			currentType() {
				return this.$store.state.m_mainInfo.currentType;
			},
		},
		onLoad() {
			this.getAllCheckOrg();

			this.getOrgAndComboData();

			//如果当前是健康体检
			if (this.currentCate == "健康体检") {
				this.list = [{
						name: "入学/入园",
					},
					{
						name: "中老年体检",
					},
					{
						name: "女性健康",
					},
					{
						name: "男性健康",
					},
				];
			}
			//如果当前是从业体检
			else if (this.currentCate == "从业体检") {
				//如果当前是个人预约
				if (this.currentType == 0) {
					this.list = [{
						name: "健康证",
					}, ];
				}
				//如果当前是单位预约
				else if (this.currentType == 1) {
					this.list = [{
						name: "健康证",
					}, ];
				}
			}
			//如果当前是职业体检
			else if (this.currentCate == "职业体检") {
				//如果当前是个人预约
				if (this.currentType == 0) {
					this.list = [{
							name: "上岗前",
						},
						{
							name: "在岗期间",
						},
						{
							name: "离岗时",
						},
						{
							name: "离岗后",
						},
						{
							name: "应急健康检查",
						},
						{
							name: "机动车",
						},
					];
				}
				//如果当前是单位预约
				else if (this.currentType == 1) {
					this.list = [{
							name: "上岗前",
						},
						{
							name: "在岗期间",
						},
						{
							name: "离岗时",
						},
						{
							name: "离岗后",
						},
						{
							name: "应急健康检查",
						},
						{
							name: "机动车",
						},
					];
				}
			}
		},
		methods: {
			//查询具体体检机构信息
			async getAllCheckOrg(cb) {
				try {
					const temp = await this.$api.appointment.hospital.getOrgAndCombo({
						id: this.currentHospital,
						combosType: this.currentCate,
						isMiniApps: this.isMiniApps
					});
					this.hospitalData = temp.records[0];
					// console.log(this.hospitalData);
				} catch (error) {
					uni.$showMsg(error.message);
				}
				cb && cb()
			},

			//查询该机构对应体检类型类型的套餐信息
			async getOrgAndComboData(cb) {
				try {
					const temp = await this.$api.appointment.hospital.getOrgAndComboData({
						id: this.currentHospital,
						combosType: this.currentCate,
						careerStage: this.careerStage,
						isMiniApps: this.isMiniApps
					});
					this.comboData = temp;
					console.log(this.comboData);
				} catch (error) {
					uni.$showMsg(error.message);
				}
				cb && cb()
			},

			//拨打电话
			callphone() {
				uni.makePhoneCall({
					phoneNumber: this.hospitalData.phone.toString(), //仅为示例 this.servicePhone是你要拨打的电话号码
				});
			},

			//切换tab栏
			change(index) {
				this.current = index.index;
				this.careerStage = this.list[this.current].name;

				this.getOrgAndComboData()
			},

			//根据currentType和current(当前选择体检类型)判断下一页并向vuex传递参数
			goNextPage(item) {
				//改变当前选择的套餐id
				this.$store.dispatch("m_mainInfo/setCurrentPakeage", item.id);

				//点击此项说明当前并不是多选套餐 将多选标志重置
				this.$store.dispatch("m_mainInfo/setGroupPakeageFlag", false);

				uni.navigateTo({
					url: "/subpkg/package_detail/package_detail",
				});
			},
			//从底部弹出的两个弹出层
			open1() {
				this.$refs.popup1.open("bottom");
			},
			open2() {
				this.$refs.popup2.open("bottom");
			},
			//自主选择项目
			choose_item() {
				//开启多选套餐识别
				this.$store.dispatch('m_mainInfo/setGroupPakeageFlag', true)

				uni.navigateTo({
					url: "/subpkg/choose_item/choose_item",
				});
			},
			// 下拉刷新的事件
			onPullDownRefresh() {
				this.getAllCheckOrg(() => uni.stopPullDownRefresh())
				this.getOrgAndComboData(() => uni.stopPullDownRefresh())
			}
		},
	};
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;

		//css画三角形
		.triangle {
			width: 0;
			height: 0;
			border-top: 10rpx solid black;
			border-bottom: 6rpx solid transparent;
			border-left: 6rpx solid transparent;
			border-right: 6rpx solid transparent;
		}

		.wrap {
			width: 100%;

			/deep/.uni-swiper-dots-horizontal {
				bottom: 30rpx;
			}

			swiper {
				width: 100%;
				height: 280rpx;

				.swiper-item,
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.hosptialDetail {
			width: 100%;
			height: 400rpx;
			background-color: transparent;
			display: flex;
			flex-direction: column;
			margin-top: -15rpx;
			z-index: 1;

			//为了实现顶部圆角透明效果
			.header,
			.time,
			.notice,
			.address {
				background-color: #fff;
			}

			.header {
				width: 100%;
				height: 200rpx;
				display: flex;
				border-bottom: 1px solid #efefef;
				border-radius: 20rpx 20rpx 0 0;

				.left {
					flex: 20%;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}

				.right {
					flex: 75%;
					display: flex;
					flex-direction: column;
					justify-content: center;

					p {
						font-size: 36rpx;
						font-weight: 600;
					}

					.tags {
						display: flex;

						span {
							display: block;
							margin-top: 10rpx;
							width: 120rpx;
							height: 36rpx;
							line-height: 34rpx;
							background-color: #e5f6f3;
							font-size: 20rpx;
							text-align: center;
							border-radius: 6rpx;
							color: #06af88;
							margin-right: 20rpx;
						}
					}
				}
			}

			//营业时间
			.time,
			.notice {
				display: flex;
				align-items: center;
				height: 60rpx;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;

				.clock,
				.volume,
				.map {
					margin-top: 6rpx;
				}

				.text {
					margin-left: 15rpx;
					position: relative;

					&::after {
						content: "";
						display: block;
						width: 1px;
						height: 14px;
						border-radius: 20rpx;
						background-color: gray;
						position: absolute;
						top: 60%;
						right: -12%;
						transform: translateY(-50%);
					}
				}

				.info {
					background-color: #fff;
					display: block;
					width: 410rpx;
					margin-top: 4rpx;
					margin-left: 28rpx;
					color: gray;
					font-size: 28rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					word-break: break-all;
					position: relative;
				}

				.introduce {
					display: flex;
					font-size: 28rpx;
					margin-left: 20rpx;

					.arrow-right {
						margin-top: 6rpx;
					}
				}

				.popBox {
					background-color: #fff;
					padding: 30rpx;
					padding-top: 0;
					height: 700rpx;
					border-radius: 20rpx 20rpx 0 0;

					.popHeader {
						position: fixed;
						width: 93%;
						height: 80rpx;
						line-height: 80rpx;
						background-color: #fff;
						text-align: center;
						font-weight: bold;
					}

					.pop1 {
						display: flex;
						flex-direction: column;
						justify-content: center;
						height: 180rpx;
						margin-top: 80rpx;
						z-index: 999;

						p {
							font-weight: bold;
						}

						span {
							margin-top: 50rpx;
							color: gray;
							font-size: 30rpx;
						}
					}

					.pop2 {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-top: 20rpx;

						p {
							font-weight: bold;
						}

						span {
							margin-top: 20rpx;
							color: gray;
							font-size: 30rpx;
						}
					}
				}
			}

			.address {
				display: flex;
				align-items: center;
				height: 60rpx;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;
				position: relative;

				.text {
					width: 500rpx;
					margin-left: 15rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.icons {
					position: absolute;
					right: 40rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 40rpx;
						margin-top: 10rpx;
					}
				}
			}
		}

		//分类
		.type {
			width: 98%;
			height: 160rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.healthy,
			.occupation,
			.engage {
				width: 220rpx;
				height: 150rpx;
				background-color: #fff;
				border-radius: 20rpx;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}

		.currentCate {
			width: 100%;
			margin-top: 20rpx;

			p {
				font-size: 30rpx;
				margin-right: 30rpx;
			}
		}

		.typeTab {
			width: 100%;
			margin-top: 20rpx;
			background-color: #fff;

			.tabs {
				padding: 10rpx;
				background-color: #fff;
			}

			.sort {
				width: 100%;
				display: flex;
				justify-content: space-around;
				background-color: #fff;
				padding: 20rpx 0;

				.s {
					display: flex;
					align-items: center;

					.title {
						font-size: 14px;
						margin-right: 4px;
						color: gray;
					}

					.triangle {
						margin-top: 8rpx;
					}
				}
			}
		}

		.pakeageList {
			// margin-top: 20rpx;

			.list:first-child {
				margin-top: 0rpx;
			}

			.list {
				display: flex;
				padding: 40rpx;
				background-color: #fff;
				border-bottom: 1px solid #efefef;
				margin-top: 20rpx;
				position: relative;

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
					width: 450rpx;
					padding: 15rpx 20rpx;
					position: relative;
					margin-left: 20rpx;

					p {
						font-size: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
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
							font-size: 24rpx;
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

				.price {
					position: absolute;
					right: 40rpx;
					top: 160rpx;
					color: orangered;
				}
			}
		}

		.bottomBtn {
			position: fixed;
			width: 100%;
			height: 100rpx;
			bottom: 0rpx;
			background-color: #fff;

			.submit {
				width: 95%;
				border-radius: 100rpx;
				background-color: orange;
				color: #fff;
			}
		}
	}
</style>