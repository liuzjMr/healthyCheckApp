<template>
	<view class="container">
		<view class="containerInto">
			<!-- 标题 -->
			<view class="header">
				<!-- 头部，开始评估、专业评估部分 -->
				<!-- 背景图片及其开始评估-->
				<view class="beijin">
					<view class="dinbu">
						<view class="start01">
							<view>开始评估</view>
						</view>
						<view class="end01">
							<view>评估结果</view>
						</view>
					</view>

					<view class="kuang">
						<!-- 专业评估 -->
						<view class="zhuanye">
							<view>专业评估</view>
						</view>
						<!-- 专业评估下面的内容 -->
						<view class="wenzi">
							<view>
								由北京、上海、浙江上百位重点医院、研究所的专 依据临床经验和医学文献综合制定 对疾病风险的判断机具价值
							</view>
						</view>
					</view>
				</view>
			</view>


			<!-- 身体部分 预防精讲下面部分-->
			<view class="body">
				<!-- 背景图片 -->
				<view class="bodyItem">

					<!--  预防精讲 -->
					<view class="yufang">
						<view> 预防精讲</view>
					</view>
					<!--文字内容 -->
					<view class="wenzi2">
						<view class="ceshi">根据评估结果量身介绍健康建议，预防，注意事项</view>
					</view>
					<!-- 三个展示框 -->
					<view class="bigkuang">
						<view class="title">
							<view class="kuang1">
								<view class="tupian1">
									<image src="../../static/risk/tubiao1.png">
									</image>
								</view>
								<view class="zhuyi">
									<view>注意事项</view>
								</view>
							</view>
						</view>


						<view class="title">
							<view class="kuang2">
								<image class="tubiao2" src="../../static/risk/tubiao2.png"> </image>
								<view class="ruhe">
									<view>如何预防</view>
								</view>
							</view>
						</view>

						<view class="kuang3">
							<view class="tu3">
								<image class="tubiao3" src="../../static/risk/tubaio3.png"> </image>
							</view>
							<view class="zhuanjia">
								<view>专家建议</view>
							</view>
						</view>
					</view>

					<!-- 健康测评部分 -->
					<view class="cepingkuang">
						<view class="cepingbeijin">
							<view class="toubu">
								<view class="jkcp">
									<view>健康测评</view>
								</view>
								<view class="bjhh">
									<view>为您的健康保驾护航</view>
								</view>
							</view>
							<view class="dibu">
								<view class="zuo">
									<view class="shuzi">
										<view>5709</view>
									</view>
									<view class="ren">
										<view>人</view>
									</view>
									<view class="all">
										<view>已参与测评人数</view>
									</view>
								</view>

								<view class="tupian">
									<view class="tu4">
										<image class="img4" src="../../static/risk/tu4.png"> </image>
									</view>
									<view class="tu3">
										<image class="img3" src="../../static/risk/tu3.png"> </image>
									</view>
									<view class="tu2">
										<image class="img2" src="../../static/risk/tu2.png"> </image>
									</view>
									<view class="tu1">
										<image class="img1 " src="../../static/risk/tu1.png"></image>
									</view>

								</view>
							</view>
						</view>
					</view>
					<!-- 开始评估按钮 -->
					<view class="anniu">
						<view class="annius">
							<view class="jiesu">
								<view>开始评估</view>
							</view>
						</view>
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

			};
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.containerInto {
			position: relative;
			width: 100%;
			height: 100%;
			background: #ffffff;

			.header {
				position: relative;
				width: 100%;
				height: 50%;

				.beijin {
					//z-index: -1;
					background-image: url(../../static/risk/back.png);
					background-size: 100% 100%;
					//display: flex;
					width: 130%;
					height: 1038rpx;
					text-align: left;

					.kuang {
						width: 70%;
						height: 250rpx;
						text-align: left;
						margin-top: 40rpx;
						margin-left: 40rpx;

						.zhuanye {
							font-size: 40rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							height: 42rpx;
							width: 100%;
						}

						.wenzi {
							//width:700rpx;
							width: 100%;
							height: 142rpx;
							font-size: 30rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							color: #262322;
							line-height: 50rpx;
							margin-top: 35rpx;

						}
					}

					.dinbu {
						height: 10%;
						width: 100%;
						display: flex;

						.start01 {
							//width: 50%;
							height: 44rpx;
							font-size: 32rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							color: #262322;
							margin-top: 46rpx;
							padding-left: 44rpx;
							white-space: nowrap;
						}

						.end01 {

							height: 40rpx;
							font-size: 28rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							//text-align: left;
							color: #262322;
							margin-top: 50rpx;
							margin-left: 46rpx;
							white-space: nowrap;

						}
					}
				}
			}

			.body {
				background: #ffffff;
				position: relative;
				width: 100%;
				height: 50%;
				display: flex;
				margin-top: -100rpx;
				//background-image: url(../../static/risk/jiada.png);

				//margin: 0 auto;
				//z-index: 1;
				.bodyItem {
					width: 100%;
					height: 100%;
					background-image: url(../../static/risk/jiada.png);
					background-size: 100% 96%;
					height: 1038rpx;
					text-align: left;
					//margin-top: -100rpx;

					.yufang {
						font-size: 40rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						width: 500rpx;
						height: 10%;
						margin-left: 70rpx;
						margin-top: -8rpx;
						white-space: nowrap;
					}

					.wenzi2 {
						width: 100%;
						//height: 30%;
						font-size: 30rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #262322;
						line-height: 50rpx;
						writing-mode: horizontal-tb;
						//margin-top: -30rpx;
						margin-left: 70rpx;

						.ceshi {
							width: 100%;
							height: 100%;
						}
					}

					.bigkuang {
						//margin-top: -220rpx;
						width: 100%;
						height: 50%;
						//flex-direction: row;
						//justify-content: center;
						margin-top: 30rpx;

						.title {
							.kuang1 {
								width: 582rpx;
								//height: 260rpx;
								height: 140rpx;
								opacity: 0.57;
								background: #ffffff;
								border-radius: 20rpx;
								box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);
								margin: 0 auto;

								.tupian1 {
									width: 58rpx;
									height: 58rpx;

									image {
										width: 58rpx;
										height: 58rpx;
										margin-top: 10px;
										padding-top: 20rpx;
										padding-left: 20rpx;
										margin: 0 auto;
										//margin-top: 350rpx;
									}

								}


								.zhuyi {
									width: 120rpx;
									height: 42rpx;
									font-size: 30rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: center;
									color: #262322;
									padding-left: 85rpx;
									//margin-top: -238rpx;
									margin-top: -30rpx;
									opacity: 1;
									//transform: translate(170rpx, -2082rpx);
								}

								.font {
									width: 60px;
									height: 21px;
									font-size: 15px;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: center;
									color: #ffffff;
								}

							}

							.kuang11 {
								width: 582rpx;
								height: 270rpx;
								//opacity: 0.57;
								background: #ffffff;
								border-radius: 20rpx;
								box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);
								margin: 0 auto;

								//transform: translate(90rpx, -1300rpx);
								//margin-left: -20rpx;
								.tupian1 {
									width: 58rpx;
									height: 58rpx;

									image {
										width: 58rpx;
										height: 58rpx;
										margin-top: 10px;
										padding-top: -4rpx;
										padding-left: 20rpx;
										//margin: 0 auto;
										//margin-top: 350rpx;
									}

								}

								.zhuyi {
									width: 120rpx;
									height: 42rpx;
									font-size: 30rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: center;
									color: #262322;
									padding-left: 85rpx;
									//margin-top: -235rpx;
									opacity: 1;
									margin-top: -30rpx;
									//transform: translate(170rpx, -2082rpx);
								}

								.font {
									width: 60px;
									height: 21px;
									font-size: 15px;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: center;
									color: #ffffff;
								}

							}
						}


						.zhanshi {
							//height: 53%;
							width: 582rpx;
							height: 25%;
							//margin-top: -200rpx;
							margin-left: 90rpx;
							//text-align: center;
							//margin-bottom: 160rpx;
							margin: 0 auto;
							margin-top: -192rpx;

							//margin-top: ;
							.red {
								width: 6px;
								height: 6px;
								background: #fd424d;
								border-radius: 50%;
								margin-top: 30rpx;
								margin-left: 20rpx;
								//transform: translate(105rpx, -2040rpx);
							}

							.neirong {
								width: 520rpx;
								height: 122rpx;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								// text-align: left;
								color: #262322;
								line-height: 40rpx;
								margin-left: 45rpx;
								margin-top: -24rpx;
								//transform: translate(130rpx, -2062rpx);
							}
						}

						.zhanshi3 {
							//height: 28%;
							height: 31%;
							width: 582rpx;
							margin-left: 90rpx;
							//text-align: center;
							margin: 0 auto;
							margin-top: -76rpx;
							background: #ffffff;
							border-radius: 20rpx;
							box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);


							.red {
								width: 12rpx;
								height: 50%;
								margin-top: 30rpx;
								margin-left: 20rpx;
								padding-top: 43rpx;

								//transform: translate(105rpx, -2040rpx);
								.reds {
									width: 6px;
									height: 6px;
									background: #fd424d;
									border-radius: 50%;

								}
							}

							.neirong {
								width: 520rpx;
								height: 122rpx;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								// text-align: left;
								color: #262322;
								line-height: 40rpx;
								margin-left: 28rpx;
								margin-top: -84rpx;

								//transform: translate(130rpx, -2062rpx);
							}
						}

						.kuang2 {
							width: 582rpx;
							//height: 260rpx;
							height: 140rpx;
							opacity: 0.57;
							background: #ffffff;
							border-radius: 20rpx;
							box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.13);
							margin: 0 auto;
							//	margin-top: -162rpx;
							//margin-top: -55rpx;
							margin-top: -24rpx;

							.tubiao2 {
								width: 58rpx;
								height: 58rpx;
								padding-top: 20rpx;
								padding-left: 20rpx;
								//transform: translate(99rpx, -2035rpx);
							}

							.ruhe {
								width: 120rpx;
								height: 42rpx;
								font-size: 30rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								text-align: center;
								color: #262322;
								margin-top: -58rpx;
								margin-left: 85rpx;
								//transform: translate(170rpx, -2082rpx);
							}

							.red {
								width: 6px;
								height: 6px;
								background: #fd424d;
								border-radius: 50%;
								margin-top: 30rpx;
								margin-left: 20rpx;
								//transform: translate(105rpx, -2040rpx);
							}

							.neirong {
								width: 520rpx;
								height: 122rpx;
								font-size: 30rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								// text-align: left;
								color: #262322;
								line-height: 40rpx;
								margin-left: 45rpx;
								margin-top: -24rpx;
								//transform: translate(130rpx, -2062rpx);
							}
						}

						.kuang22 {
							width: 584rpx;
							//height: 260rpx;
							height: 270rpx;
							//opacity: 0.57;
							background: #ffffff;
							border-radius: 20rpx;
							box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.13);
							margin: 0 auto;
							//margin-top: -162rpx;
							//	margin-top: -54rpx;
							margin-top: -22rpx;

							.tubiao2 {
								width: 58rpx;
								height: 58rpx;
								margin-top: 10px;
								padding-top: -4rpx;
								padding-left: 20rpx;
								//transform: translate(99rpx, -2035rpx);
							}

							.ruhe {
								width: 120rpx;
								height: 42rpx;
								font-size: 30rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								text-align: center;
								color: #262322;
								margin-top: -58rpx;
								margin-left: 85rpx;
								//transform: translate(170rpx, -2082rpx);
							}

							.red {
								width: 6px;
								height: 6px;
								background: #fd424d;
								border-radius: 50%;
								margin-top: 30rpx;
								margin-left: 20rpx;
								//transform: translate(105rpx, -2040rpx);
							}

							.neirong {
								width: 520rpx;
								height: 122rpx;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								// text-align: left;
								color: #262322;
								line-height: 40rpx;
								margin-left: 45rpx;
								margin-top: -24rpx;
								//transform: translate(130rpx, -2062rpx);
							}
						}

						.kuang3 {
							width: 582rpx;
							height: 100rpx;
							background: #ffffff;
							border-radius: 20rpx;
							box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
							margin: 0 auto;
							margin-top: -20rpx;



							.tu3 {

								.tubiao3 {
									width: 58rpx;
									height: 58rpx;
									padding-top: 20rpx;
									padding-left: 20rpx;
								}

							}

							.zhuanjia {
								width: 120rpx;
								height: 42rpx;
								font-size: 30rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								text-align: center;
								color: #262322;
								margin-top: -58rpx;
								margin-left: 85rpx;
								//transform: translate(170rpx, -2082rpx);
							}

							.red {
								width: 6px;
								height: 6px;
								background: #fd424d;
								border-radius: 50%;
								margin-top: 30rpx;
								margin-left: 20rpx;
								//transform: translate(105rpx, -2040rpx);
							}
						}

						.neirong {
							width: 520rpx;
							height: 122rpx;
							font-size: 30rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							// text-align: left;
							color: #262322;
							line-height: 40rpx;
							margin-left: 45rpx;
							margin-top: -24rpx;
							//transform: translate(130rpx, -2062rpx);
						}


					}

					.cepingkuang {
						width: 100%;
						height: 25%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						margin: 0 auto;
						margin-top: -66rpx;

						.cepingbeijin {
							width: 90%;
							height: 218rpx;
							background: #ffffff;
							border-radius: 20rpx;
							//margin-left: 40rpx;

							.toubu {
								height: 40%;

								.jkcp {
									width: 100%;
									height: 50rpx;
									font-size: 36rpx;
									font-family: PingFang SC, PingFang SC-Bold;
									font-weight: 700;
									text-align: left;
									color: #262322;
									margin-left: 20rpx;
									margin-top: 20rpx;
								}

								.bjhh {
									width: 100%px;
									height: 40rpx;
									font-size: 28rpx;
									font-family: PingFang SC, PingFang SC-Medium;
									font-weight: 500;
									text-align: left;
									color: #262322;
									margin-left: 163rpx;
									margin-top: -42rpx;
								}
							}

							.dibu {
								height: 60%;
								display: flex;
								width: 100%;

								.zuo {
									height: 100%;
									width: 50%;
									display: flex;

									.shuzi {
										width: 104rpx;
										height: 62rpx;
										font-size: 48rpx;
										font-family: DINPro, DINPro-Bold;
										font-weight: 700;
										text-align: left;
										color: #262322;
										margin-left: 26rpx;
										margin-top: -18rpx;
									}

									.ren {
										width: 28rpx;
										height: 40rpx;
										font-size: 28rpx;
										font-family: PingFang SC, PingFang SC-Medium;
										font-weight: 500;
										text-align: left;
										color: #262322;
										margin-left: 10rpx;
										//margin-top: -45rpx;
									}

									.all {
										width: 400rpx;
										height: 42rpx;
										font-size: 30rpx;
										font-family: PingFang SC, PingFang SC-Medium;
										font-weight: 500;
										text-align: left;
										color: #262322;
										margin-left: -142rpx;
										margin-top: 55rpx;
									}
								}


								.tupian {
									width: 50%;
									height: 100%;
									display: flex;
									//justify-content: center;
									//margin: 0 auto;
									text-align: right;
									//margin-right: -700rpx;
									//margin-right: -340rpx;
									//	margin-left: 330rpx;

									.tu4 {
										width: 88rpx;
										height: 100%;
										//margin-top: 190rpx;
										margin-left: 218rpx;

										//padding-right: 200rpx;
										.img4 {
											width: 88rpx;
											height: 88rpx;
											border-radius: 50%;
										}
									}

									.tu3 {
										height: 100%;
										width: 88rpx;
										//margin-top: 190rpx;
										margin-left: -130rpx;

										.img3 {
											width: 88rpx;
											height: 88rpx;
											border-radius: 50%;
										}
									}

									.tu2 {
										width: 100%;
										height: 100%;
										width: 88rpx;
										//margin-top: 190rpx;
										margin-left: -126rpx;

										.img2 {
											width: 88rpx;
											height: 88rpx;
											border-radius: 50%;
										}
									}

									.tu1 {
										width: 100%;
										height: 100%;
										width: 88rpx;
										//margin-top: 190rpx;
										margin-left: -120rpx;

										.img1 {
											width: 88rpx;
											height: 88rpx;
											border-radius: 50%;
										}
									}



								}



							}
						}
					}

					.anniu {
						width: 100%;
						height: 46px;

						.annius {
							margin: 0 auto;
							width: 448rpx;
							height: 92rpx;
							background: linear-gradient(360deg, #ff7400 0%, #fe8d28 99%);
							border-radius: 46rpx;
							text-align: center;

							.jiesu {
								//width: 128rpx;
								margin: 0 auto;
								padding-top: 25rpx;
								width: 100%;
								height: 44rpx;
								font-size: 32rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								text-align: center;
								color: #ffffff;
								line-height: 40rpx;
								//transform: translate(300rpx, -2480rpx);
							}

						}
					}

					.renshu {
						width: 52px;
						height: 31px;
						font-size: 24px;
						font-family: DINPro, DINPro-Bold;
						font-weight: 700;
						text-align: left;
						color: #262322;
						//transform: translate(65rpx, -2148rpx);
					}

					.huhang {
						width: 126px;
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: left;
						color: #262322;
						//transform: translate(210rpx, -2157rpx);
					}

					.ceping {
						width: 72px;
						height: 25px;
						font-size: 18px;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: left;
						color: #262322;
						//transform: translate(65rpx, -2118rpx);
					}

					.jiangkang {
						width: 351px;
						height: 109px;
						background: #ffffff;
						border-radius: 10px;
						//transform: translate(40rpx, -1925rpx);
					}

				}
			}
		}
	}
</style>