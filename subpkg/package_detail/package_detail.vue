<template>
	<view class="container">
		<view class="header">
			<image src="../../static/hosptial/pakeage.jpg" mode=""></image>

			<!-- 所选择的套餐 -->
			<view class="chooseItem">
				<p>{{ tCombo.name }}</p>
				<span>{{ tCombo.type }}套餐</span>
				<view class="cate">
					<span>{{ tCombo.fitSex }}人群</span>
					<!-- 价格 -->
					<view class="price">
						<p>
							{{
                tCombo.price == null
                  ? "暂无价格"
                  : "￥" + tCombo.price.toFixed(2)
              }}
						</p>
					</view>
				</view>
			</view>
		</view>

		<!-- 可约时间 -->
		<scroll-view enable-flex="true">
			<appoinment-calendar v-if="!readOnly" style="margin-top: 20rpx" :t-combo-id="this.tCombo_id"
				@queried="(info) => (appointmentInfo = info)" @appt="handleAppt" />
		</scroll-view>

		<!-- tab栏 -->
		<view class="tab" ref="tab">
			<u-tabs :list="list" :current="current" @change="change" :scrollable="false"></u-tabs>
		</view>

		<view class="cont" ref="cont" :style="[`padding-bottom: ${readOnly ? 0 : 150}rpx`]">
			<!-- 包括项目 -->
			<view class="items" v-if="current === 0">
				<view class="items_list" v-for="(item, index) in ComboItem" :key="index">
					<view style="padding: 20rpx">
						<view class="title">{{ item.name }}</view>
						<view class="text">
							<p>{{ item.address }}</p>
							<span v-show="item.introduce">{{ item.introduce }}</span>
						</view>
					</view>
				</view>

				<view class="noData" v-if="ComboItem == ''">
					<image src="../../static/image/暂无数据.png" mode=""></image>
				</view>
			</view>

			<!-- 体检须知 -->
			<view class="should_know" v-else>
				<view style="padding: 20rpx">
					<p>注意事项</p>
					<span>
						<p>
							1、(1如遇严重疫情或其他不可抗力因素，体检日期会有所影响，敬请谅解。(2)请预约成功的客户按时前往，现场出示有效身份证件即可体检，预约短信和平台订单不作为预约成功的标准。(3]当您确认预约套餐时，即表示接受体检的所有项目。如因自身原因放弃体检套餐中的检查项目，我们将不予退款处理，请知悉!如因特殊原因需要改期的，请提前一个工作日09:00-18:00致电4009003732进行改期。
						</p>
						<p>
							2、体检流程:(1)购买后进行预约。(2)到店后出示对应证件、健康码行程码48小时内核酸检测结果。(3]根据现场工作人员指引进行体检;需注意:预约完成后会收到橄榄枝健康预约成功短信，需要按照橄榄枝健康预约成功短信日期及时段前往体检
						</p>
						<p>
							3、体检须知:(1)体检前一晚8点后开始禁食，避免剧烈运动，避免进食高蛋白、高喋吟、高盐食物和酒，保持空腹状态。(2)糖尿病、高血压、心脏病等慢性病患者，在必须要服药的情况下可以服药，建议以少量白开水送服药物。(3]注意事项:备孕或已孕者勿做放射检查(包括CT、X片、胸片、MRI磁共振、呼气试验)。(4)已婚女士经期结束后3-7天方可做妇科检查。(5)体检当日请勿携带贵重物品、勿穿连衣裙、连裤袜、高筒靴等。(6)体检结束后，请将体检表单交到体检前台，确认有无漏项。
						</p>
						<p>
							4、报告方式:纸质报告可在现场咨询前台领取方式电子报告需关注对应体检医院的微信公众号绑定个人信息后查询。
						</p>
						<p>5、发票开具:我的--体检订单--申请发票</p>
						<p>
							6、发票说明:开深圳健康体检咨询服务类发票，备注体检代预约服务费，烦请开票时填写正确的开票信息以免耽误您的开票时间。请申请开票时务必填写正确的开票信息，一经开出将不予冲红重开，感谢您的理解!7、退款说明:如未使用、未到检可在订单上申请取消订单退款，会在7个工作日内为您处理。
						</p>
					</span>
				</view>
			</view>
		</view>

		<view class="bottomBtn" v-if="!readOnly">
			<button class="submit" @click="() => submit()" v-if="availableAppointment">
				立即预约
			</button>
			<button disabled v-else>近期已约满</button>
		</view>
	</view>
</template>

<script>
	import AppoinmentCalendar from "./components/AppointmentCalendar.vue";
	export default {
		components: {
			AppoinmentCalendar,
		},
		data() {
			return {
				//套餐的信息
				tCombo_id: "",
				tCombo: "",
				//套餐的项目
				ComboItem: "",

				formData: {
					datetimesingle: 0,
					end_datetimesingle: 0,
				},
				list: [{
						name: "包括项目",
					},
					{
						name: "体检须知",
					},
				],
				current: 0,
				readOnly: false,
				appointmentInfo: [],
			};
		},
		computed: {
			physicalExamType() {
				return this.$store.getters["m_mainInfo/currentType"];
			},
			//是否可预约
			availableAppointment() {
				return this.appointmentInfo.some((i) => this.isAvailable(i));
			},
			//获得当前选择的套餐
			currentPakeage() {
				return this.$store.state.m_mainInfo.currentPakeage;
			},
		},
		onLoad() {
			//获取该套餐的id
			this.tCombo_id = this.currentPakeage;
			const evtChannel = this.getOpenerEventChannel();
			evtChannel.on("package_detail", this.handlePageEvent);

			this.init();
		},
		methods: {
			init() {
				const {
					tCombo_id
				} = this;
				if (tCombo_id) {
					this.getTComboPriceById(tCombo_id);
					this.getComboItemByComboId(tCombo_id);
				}
			},
			//根据套餐id返回套餐信息
			async getTComboPriceById(id) {
				try {
					this.tCombo = await this.$api.appointment.combo.getTComboPriceById({
						id,
					});
				} catch (error) {
					uni.$showMsg(error.message);
				}
			},

			// 根据套餐id返回套餐项目信息
			async getComboItemByComboId(comboId) {
				try {
					this.ComboItem =
						await this.$api.appointment.combo.getComboItemByComboId({
							comboId,
						});
				} catch (error) {
					uni.$showMsg(error.message);
				}
			},

			isAvailable(item) {
				const {
					status,
					orderDate
				} = item
				const now = new Date();

				if (orderDate === this.$utils.formatDate(now)) {
					return status === "1" && now.getHours() < (10 - 3)
				}
				return status === "1"
			},

			//切换tab栏
			change(index) {
				this.current = index.index;
			},

			handleAppt(date) {
				this.submit(date);
			},
			//立即预约
			submit(chooseDay) {
				const params = {
					tcombos: this.tCombo_id,
					chooseDay: chooseDay ?? this.appointmentInfo.find((i) => this.isAvailable(i))?.orderDate,
				};

				uni.navigateTo({
					url: "/subpkg/order_info/order_info?" +
						Object.entries(params)
						.filter((a) => a[1] !== void 0)
						.map(([k, v]) => `${k}=${v}`)
						.join("&"),
				});
			},

			handlePageEvent(data) {
				const {
					readOnly,
					comboId
				} = data;

				if (readOnly !== void 0) {
					this.readOnly = readOnly;
				}

				if (comboId) {
					this.tCombo_id = comboId;
				}
			},
		},
	};
</script>

<style lang="scss">
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.header {
			display: flex;
			flex-direction: column;
			position: relative;
			background-color: #fff;
			height: auto;
			width: 100%;

			image {
				width: 100%;
				height: 400rpx;
			}

			.chooseItem {
				padding: 20rpx;
				border-bottom: 1px solid #efefef;

				p {
					font-size: 32rpx;
					font-weight: 500;
				}

				span {
					display: block;
					font-size: 28rpx;
					color: gray;
					margin-top: 20rpx;
				}

				.cate {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					position: relative;

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

					.price {
						position: absolute;
						right: 10rpx;
						color: orangered;
					}
				}
			}

			.should_know {
				display: flex;
				margin: 20rpx;
				align-items: center;
				background-color: #fff;

				.left {
					flex: 95%;
					display: flex;

					.u-icon {
						margin-top: 7rpx;
					}

					p {
						margin-left: 10rpx;
						color: gray;
					}
				}

				.right {
					flex: 5%;
				}
			}
		}

		.tab {
			width: 100%;
			background-color: #fff;
			margin-top: 20rpx;
		}

		.cont {
			width: 100%;
			margin-bottom: 100rpx;

			.items {
				width: 100%;

				.items_list {
					width: 100%;
					background-color: #fff;
					box-sizing: border-box;
					padding: 10rpx;

					.title {
						width: 100%;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 10rpx;
						text-align: center;
						background-color: #eff8ff;
					}

					p {
						margin-top: 30rpx;
						font-size: 26rpx;
					}

					span {
						display: block;
						font-size: 26rpx;
						color: gray;
						margin-top: 20rpx;
						line-height: 42rpx;
					}
				}

				.noData {
					width: 100%;
					display: flex;
					justify-content: center;
					background-color: #fff;

					image {
						width: 400rpx;
					}
				}
			}

			.should_know {
				width: 100%;
				background-color: #fff;
				box-sizing: border-box;
				padding: 10rpx;

				p {
					font-size: 30rpx;
				}

				span {
					display: block;
					font-size: 26rpx;
					color: gray;
					margin-top: 20rpx;
					line-height: 42rpx;
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
				background-color: #1d7dfc;
				color: #fff;
			}
		}
	}
</style>