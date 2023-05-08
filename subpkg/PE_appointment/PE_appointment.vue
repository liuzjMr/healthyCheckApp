<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header">
			<view class="location" @click="goCityList">
				<span>泸州市</span>
				<view class="triangle"></view>
			</view>
			<!-- 搜索框 -->
			<navigator :url="'/subpkg/search/search'" class="search">
				<u-search placeholder="搜索机构" :show-action="false" height="34" bg-color="#fff" shape="square"></u-search>
			</navigator>
		</view>

		<!-- 选择体检类型 -->
		<view class="typeBox">
			<view class="type">
				<view :class="combosType == '健康体检' ? 'activeBox box' : 'box'" @click="switchBox(0)">
					<image src="../../static/icons/cate2.png" mode=""></image>
					<p>健康体检</p>
				</view>
				<view :class="combosType == '从业体检' ? 'activeBox box' : 'box'" @click="switchBox(1)">
					<image src="../../static/icons/cate1.png" mode=""></image>
					<p>从业体检</p>
				</view>
				<view :class="combosType == '职业体检' ? 'activeBox box' : 'box'" @click="switchBox(2)">
					<image src="../../static/icons/cate3.png" mode=""></image>
					<p>职业体检</p>
				</view>
			</view>
		</view>

		<!-- 检前评测&体检记录 -->
		<view class="middle">
			<navigator :url="'/subpkg/before_PE/before_PE'" class="left">
				<p>检前评测</p>
				<span>哪些检查适合你</span>
			</navigator>
			<view class="right" @click="goMyAppointment">
				<p>体检记录</p>
				<span>查订单/开发票</span>
			</view>
		</view>

		<!-- 轮播广告 -->
		<view class="wrap">
			<swiper circular autoplay :interval="4000">
				<swiper-item v-for="(item,i) in swiperList" :key="i">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>

		<!-- 推荐机构卡片 -->
		<view class="recommendHospital">
			<p class="title">推荐机构</p>
			<!-- 排序区 -->
			<view class="sort">
				<view class="title" @click="toggle(0,'top')">
					{{location}}
					<view class="triangle"></view>
				</view>

				<view class="title" @click="toggle(1,'top')">
					{{cate}}
					<view class="triangle"></view>
				</view>

				<view class="title" @click="toggle(2,'top')">
					{{level}}
					<view class="triangle"></view>
				</view>

			</view>
			<!-- 上部弹出切换排序 -->
			<uni-popup ref="popup" type="top">
				<view class="popBox">
					<view class="gap"></view>
					<view class="popBox_sort">
						<view class="s" v-for="(item, index) in sortList" :key="index" @click="changeSort(item)">
							<view :class="currentSort == item.id  ? 'active_popBox_title' : 'popBox_title'" ref="title">
								{{ item.title }}
							</view>
							<view :class="currentSort == item.id ? 'active_triangle' : 'triangle'"></view>
						</view>
					</view>
					<!-- 全部地区 -->
					<view class="popItem" v-if="currentSort == 0">
						<p v-for="(item, index) in locationList" :key="index" @click="chooseLocation(item)"
							:class="location == item.title ? 'activeItem' : 'item'">
							{{ item.title }}
						</p>
					</view>
					<!-- 全部类型 -->
					<view class="popItem" v-if="currentSort == 1">
						<p v-for="(item, index) in cateList" :key="index" @click="chooseCate(item)"
							:class="cate == item.title ? 'activeItem' : 'item'">
							{{ item.title }}
						</p>
					</view>
					<!-- 等级优先 -->
					<view class="popItem" v-if="currentSort == 2">
						<p v-for="(item, index) in levelList" :key="index" @click="chooseLevel(item)"
							:class="level == item.title ? 'activeItem' : 'item'">
							{{ item.title }}
						</p>
					</view>
				</view>
			</uni-popup>

			<!-- 后端根据体检类型返回对应的医院信息进行渲染 -->
			<view class="hosptial">
				<image src="../../static/image/暂无数据.png" mode="" class="ifNull" v-if="hospitalList.length == 0" />

				<!-- 一个医院的信息 -->
				<view class="hosptial_item" v-for="(item, index) in hospitalList" :key="item.id"
					@click="goNextPage(item)">
					<!-- 头部区域 -->
					<view class="hosptial_list">
						<view class="left">
							<image :src="imageUrl + item.avatar" mode=""></image>
						</view>
						<view class="right">
							<p class="name">{{ item.name }}</p>
							<view class="tags">
								<span v-show="item.level">{{ item.level }}</span>
								<span v-show="item.tags">{{ item.tags }}</span>
							</view>
							<view class="footer">
								<span class="distance">3.2km</span>
								<span class="address">{{ item.address }}</span>
							</view>
						</view>
					</view>
					<!-- 套餐区域 -->
					<view class="pakeage_list">
						<view class="left"> {{item.tcombos[0].name}} </view>
						<view class="right">
							{{ item.tcombos[0].price ?  '￥' + item.tcombos[0].price.toFixed(2) : '暂无价格'}}
							<u-icon name="arrow-right" size="14" class="icons" />
						</view>
					</view>
					<!-- 第二个推荐套餐有才显示 -->
					<view class="pakeage_list" v-if="item.tcombos[1]">
						<view class="left"> {{item.tcombos[1].name}} </view>
						<view class="right">
							{{ item.tcombos[1].price ?  '￥' + item.tcombos[1].price.toFixed(2) : '暂无价格'}}
							<u-icon name="arrow-right" size="14" class="icons" />
						</view>
					</view>
					<view class="more">
						查看更多套餐
						<u-icon name="arrow-right" size="14" class="icons" />
					</view>
				</view>
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
				//向后端查询体检类型 返回对应所有医院信息
				combosType: "健康体检",
				//选择的排序与分类
				currentSort: 0,
				swiperList: [{
					url: '../../static/swiper/PE_appointment/1.png',
				}],
				//医院列表
				hospitalList: [],
				//选择的地区
				location: "全部地区",
				//选择的类型
				cate: "全部类型",
				//选择的等级
				level: "等级优先",
				//排序标题
				sortList: [{
						id: 0,
						title: "全部地区",
					},
					{
						id: 1,
						title: "全部类型",
					},
					{
						id: 2,
						title: "等级优先",
					},
				],
				locationList: [{
						title: "全部地区",
					},
					{
						title: "江阳区",
					},
					{
						title: "纳溪区",
					},
					{
						title: "龙马潭区",
					},
					{
						title: "合江县",
					},
					{
						title: "叙永县",
					},
				],
				cateList: [{
						title: "全部类型",
					},
					{
						title: "公立",
					},
					{
						title: "私立",
					},
				],
				levelList: [{
						title: "等级优先",
					},
					{
						title: "距离优先",
					},
				],
			};
		},
		computed: {
			//获得当前选择体检类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate
			}
		},
		onLoad() {
			//获得该体检类型下所有医院数据
			this.getHospital();


			//刷新时重置store防止bug
			this.$store.state.m_mainInfo.currentCate = '健康体检'
			this.$store.state.m_mainInfo.currentType = 0

		},
		methods: {
			//获得有改体检类型下所有医院列表
			async getHospital() {
				try {
					const {
						records
					} = await this.$api.appointment.hospital.list({
						combosType: this.combosType,
						type: this.cate,
						isLevel: this.level,
						address: this.location,
						isMiniApps: this.isMiniApps
					});
					Object.assign(this, {
						hospitalList: records,
					});

				} catch (error) {
					uni.$showMsg(error.message);
				}
			},
			//去往城市选择页面
			goCityList() {
				uni.navigateTo({
					url: '/subpkg/city_list/city_list'
				})
			},

			//点击切换体检类型
			switchBox(boxNum) {
				if (boxNum == 0) {
					this.combosType = "健康体检";
				} else if (boxNum == 1) {
					this.combosType = "从业体检";
				} else if (boxNum == 2) {
					this.combosType = "职业体检";
				}
				//根据类型请求医院列表
				this.getHospital();

				//体检类型 储存到vuex里
				this.$store.dispatch("m_mainInfo/setCurrentCate", this.combosType);
			},

			//去往体检记录
			goMyAppointment() {
				if (this.$store.getters['m_user/userMobile'] === '') {
					uni.showToast({
						title: '请先进行登录!',
						duration: 1000,
						icon: 'none'
					})

					setTimeout(() => {
						uni.navigateTo({
							url: '/subpkg/my_login/my_login'
						})
					}, 1000);

				} else {
					uni.navigateTo({
						url: '/subpkg/my_appointment/my_appointment'
					})
				}
			},

			//去往医院详情页
			goNextPage(item) {
				//可约时间组件关联
				this.$store.dispatch('m_hospital/setInfo', item)
				//改变当前选择医院的id
				this.$store.dispatch('m_mainInfo/setCurrentHospital', item.id)

				//如果当前选择的是健康体检 跳转到套餐选择
				if (this.currentCate === '健康体检') {
					uni.navigateTo({
						url: "/subpkg/package_selection/package_selection",
					});
				}
				//如果当前选择的是从业体检 跳转到个人/单位类型选择
				else if (this.currentCate === '从业体检') {
					uni.navigateTo({
						url: "/subpkg/choose_type/choose_type?hospital=" + item.id,
					});
				}
				//如果当前选择的是职业体检 跳转到个人/单位类型选择
				else if (this.currentCate === '职业体检') {
					uni.navigateTo({
						url: "/subpkg/choose_type/choose_type?hospital=" + item.id,
					});
				}
			},
			//顶部弹出
			toggle(num, type) {
				console.log(num);
				this.currentSort = num;
				this.type = type;
				// open 方法传入参数 等同在 uni - popup 组件上绑定 type属性
				this.$refs.popup.open(type);
			},
			//改变排序选择
			changeSort(item) {
				this.currentSort = item.id;
			},

			//选择地区
			chooseLocation(item) {

				this.location = item.title;
				//获得该体检类型下所有医院数据
				this.getHospital();
				this.$refs.popup.close();
			},

			//选择类型
			chooseCate(item) {
				this.cate = item.title;
				//获得该体检类型下所有医院数据
				this.getHospital();
				this.$refs.popup.close();
			},

			// 选择等级优先或距离优先
			chooseLevel(item) {
				this.level = item.title;
				//获得该体检类型下所有医院数据
				this.getHospital();
				this.$refs.popup.close();
			},
		},
		watch: {
			combosType(newValue, oldValue) {
				if (newValue == '健康体检') {
					this.$store.state.m_mainInfo.currentType = 0;
				}
			}
		},
		onUnload() {
			// #ifdef H5
			uni.navigateTo({
				url: '/pages/home/home'
			})
			// #endif

		},
	};
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

		//css画三角形
		.triangle {
			width: 0;
			height: 0;
			border-top: 10rpx solid black;
			border-bottom: 6rpx solid transparent;
			border-left: 6rpx solid transparent;
			border-right: 6rpx solid transparent;
		}

		.icons {
			margin-left: 5rpx;
			margin-top: 5rpx;
		}

		.header {
			display: flex;
			align-items: center;
			width: 100%;
			background-color: #e2eefc;
			padding: 30rpx 0;
			//实现顶部吸附效果
			position: sticky;
			top: 0;
			z-index: 999;

			.location {
				display: flex;
				width: 120rpx;
				padding: 20rpx;
				font-size: 28rpx;

				.arrow-down-fill {
					margin-top: 5rpx;
					margin-left: 10rpx;
					font-size: 10rpx;
				}

				.triangle {
					margin-top: 16rpx;
					margin-left: 14rpx;
				}
			}

			.search {
				width: 76%;

				/deep/ .u-search__content__input {
					font-size: 26rpx;
				}
			}
		}

		.typeBox {
			width: 100%;
			background-image: linear-gradient(#e2eefc, #f6f6f6);

			.type {
				width: 95%;
				height: 200rpx;
				background-color: #fff;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-radius: 10rpx;
				margin: auto;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 150rpx;
					height: 150rpx;
					border-radius: 20rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						margin-top: 14rpx;
					}

					p {
						font-weight: 500;
						font-size: 28rpx;
					}
				}

				.activeBox {
					background-image: linear-gradient(to bottom right, #e2eefc, #fff);
				}
			}
		}

		.middle {
			display: flex;
			justify-content: space-between;
			width: 95%;
			margin-top: 20rpx;

			.left,
			.right {
				display: flex;
				flex-direction: column;
				width: 48.5%;
				height: 160rpx;
				border-radius: 10rpx;

				p {
					margin-top: 30rpx;
					margin-left: 20rpx;
					font-size: 36rpx;
				}

				span {
					margin-top: 10rpx;
					margin-left: 20rpx;
					font-size: 26rpx;
					color: gray;
				}
			}

			.left {
				background-image: linear-gradient(#e2eefc, #fff);
			}

			.right {
				background-image: linear-gradient(#d4f2f2, #fff);
			}
		}

		.wrap {
			width: 95%;
			margin-top: 20rpx;
			border-radius: 10rpx;

			swiper {
				height: 140rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}

		.recommendHospital {
			width: 95%;
			background-color: #fff;
			margin-top: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.title {
				font-size: 36rpx;
				padding: 30rpx 0 10rpx 30rpx;
			}

			.sort {
				width: 100%;
				display: flex;
				justify-content: space-around;
				margin-left: -15rpx;

				.title {
					display: flex;
					font-size: 14px;
					margin-right: 4px;
					color: gray;

					.triangle {
						margin-top: 15rpx;
						margin-left: 10rpx;
						border-top: 10rpx solid gray;
					}
				}
			}

			.popBox {
				width: 100%;
				background-color: #fff;

				.gap {
					width: 100%;
					height: 130rpx;
				}

				.popBox_sort {
					width: 100%;
					display: flex;
					justify-content: space-around;
					margin-left: -15rpx;
					margin-top: 30rpx;

					.s {
						display: flex;
						align-items: center;

						.popBox_title {
							font-size: 14px;
							color: gray;
							padding-right: 8rpx;
						}

						.active_popBox_title {
							font-size: 14px;
							padding-right: 8rpx;
							color: #2c80f9;
						}

						.triangle {
							margin-top: 10rpx;
							border-top: 10rpx solid gray;
						}

						.active_triangle {
							width: 0;
							height: 0;
							border-top: 10rpx solid #2c80f9;
							border-bottom: 6rpx solid transparent;
							border-left: 6rpx solid transparent;
							border-right: 6rpx solid transparent;

							margin-top: 10rpx;
						}
					}
				}

				.popItem {
					padding: 30rpx;

					p {
						padding: 20rpx;
						border-bottom: 1px solid #efefef;

						&:last-child {
							border-bottom: none;
						}
					}

					.item {}

					.activeItem {
						position: relative;
						color: #2c80f9;

						&::after {
							content: "✔";
							position: absolute;
							right: 20rpx;
						}
					}
				}
			}

			.hosptial {
				display: flex;
				flex-direction: column;

				.ifNull {
					width: 500rpx;
					height: 500rpx;
					margin: auto;
				}

				.hosptial_item {
					display: flex;
					flex-direction: column;

					.hosptial_list {
						width: 100%;
						height: 200rpx;
						background-color: #fff;
						display: flex;

						.left {
							flex: 25%;
							display: flex;
							justify-content: center;
							align-items: center;

							image {
								width: 120rpx;
								height: 120rpx;
							}
						}

						.right {
							flex: 70%;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.name {
								font-size: 30rpx;
							}

							.footer {
								display: flex;
								font-size: 28rpx;
								color: gray;
								margin-top: 10rpx;
								width: 500rpx;

								.distance {
									position: relative;

									&::after {
										content: "";
										display: block;
										width: 1px;
										height: 14px;
										background-color: gray;
										position: absolute;
										top: 15%;
										right: -16%;
									}
								}

								.address {
									width: 400rpx;
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
									margin-left: 24rpx;
								}
							}

							.tags {
								display: flex;

								span {
									display: block;
									margin-top: 15rpx;
									margin-right: 20rpx;
									width: 120rpx;
									height: 36rpx;
									line-height: 36rpx;
									font-size: 20rpx;
									text-align: center;
									border-radius: 6rpx;
									color: #06af88;
									border: 1px solid #06af88;
								}
							}

							.price {
								margin-top: 10rpx;
								font-size: 32rpx;
								color: orangered;
							}
						}
					}
				}

				.pakeage_list {
					display: flex;
					align-items: center;
					padding: 20rpx;
					margin-left: 10rpx;
					border-bottom: 1px solid #efefef;
					font-size: 28rpx;

					.left {
						flex: 10;
						font-weight: normal;
					}

					.right {
						display: flex;
						flex: 3;
						color: orangered;
					}
				}

				.more {
					display: flex;
					justify-content: center;
					padding: 20rpx;
					font-size: 28rpx;
					color: gray;
				}
			}
		}

		.hotPackage {
			width: 100%;

			.sort {
				background-color: #fff;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1px solid #efefef;

				span {
					margin-left: 40rpx;
					font-size: 28rpx;
				}
			}

			.package_list {
				display: flex;
				flex-direction: column;
				width: 100%;

				.listBox {
					display: flex;
					flex-direction: column;
					padding: 30rpx 30rpx 15rpx 30rpx;
					background-color: #fff;
					border-bottom: 1px solid #efefef;

					.hosptial {
						display: flex;
						width: 100%;
						height: 50rpx;
						margin-bottom: 10rpx;

						span {
							display: block;
							margin-right: 20rpx;
							width: 80rpx;
							height: 36rpx;
							line-height: 36rpx;
							font-size: 20rpx;
							text-align: center;
							border-radius: 6rpx;
							color: #06af88;
							border: 1px solid #06af88;
						}
					}

					.listBox_list {
						display: flex;
						width: 100%;
						margin-top: 10rpx;

						.left {
							width: 200rpx;
							height: 200rpx;
							background-color: #fff;
							border-radius: 10rpx;
							overflow: hidden;

							image {
								width: 180rpx;
								height: 180rpx;
								border-radius: 20rpx;
							}
						}

						.right {
							display: flex;
							flex-direction: column;
							position: relative;
							margin-left: 20rpx;
							margin-top: 20rpx;

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
					}
				}

				.price {
					position: relative;
					color: orangered;

					p {
						position: absolute;
						right: 40rpx;
						bottom: 55rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>