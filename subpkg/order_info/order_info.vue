<template>
	<view class="container">
		<!-- 单位信息 -->
		<view class="info" v-if="currentCate !== '健康体检'" style="margin-bottom: 20rpx;">
			<uni-section title="单位信息" type="line" titleFontSize="16px" />

			<uni-forms ref="formData" :model="formData" class="formData" :rules="vaildateRules">
				<uni-forms-item label="单位名称" label-width="80px" name="groupUnitName">
					<uni-easyinput placeholder="请输入单位名称" :inputBorder="false" v-model="formData.groupUnitName" />
				</uni-forms-item>

				<uni-forms-item label="信用代码" label-width="80px" name="groupUnitId">
					<uni-easyinput placeholder="请输入单位统一社会信用代码" :inputBorder="false" v-model="formData.groupUnitId" />
				</uni-forms-item>

				<uni-forms-item label="从业类别" label-width="80px" name="certificate_type"
					v-if="this.currentCate === '从业体检'">
					<picker :value="index1" :range="certificate_type" range-key="label" @change="bindPickerChange">
						<view class="uni-input">{{index1?certificate_type[index1].label:"A 食品卫生"}}</view>
					</picker>
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 体检人信息 -->
		<view class="info">
			<single-person v-if="currentType === 0" :modelValue.sync="formData" ref="personForm" />

			<uni-forms v-if="currentType === 1" :model="formData" :rules="vaildateRules" class="personForm"
				ref="personForm">
				<uni-forms-item label-width="0px" name="tGroupPersonData">
					<group-person v-model="formData.tGroupPersonData" />
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 体检日期 -->
		<view class="time">
			<uni-forms class="formTime" :model="formData" ref="timeForm">
				<uni-forms-item label="体检日期" label-width="80px" name="checkDate">
					<choose-date :model-value.sync="formData.checkDate" ref="calendar"></choose-date>
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 所选套餐 -->
		<view class="pay">
			<uni-section title="确认体检项目" type="line" titleFontSize="16px" />
			<!-- 单选套餐列表 -->
			<view class="choose_package" v-if="groupPakeageFlag === false">
				<view class="left">
					<image :src="imageUrl + tCombo.url" mode="heightFix"></image>
				</view>
				<view class="middle">
					<p>{{ tCombo.name }}</p>
					<span>{{ tCombo.type }}套餐</span>
				</view>
				<view class="right">
					{{
            tCombo.price == null ? "暂无价格" : "￥" + tCombo.price.toFixed(2)
          }}
				</view>
			</view>
			<!-- 多选套餐列表 -->
			<view class="choose_package" v-else v-for="(item,index) in combo" :key="index">
				<view class="left">
					<image :src="item.url == '' ? '../../static/image/暂无数据.png' : imageUrl + item.url" mode="heightFix">
					</image>
				</view>
				<view class="middle">
					<p>{{ item.name }}</p>
					<span>{{ item.type }}套餐</span>
				</view>
				<view class="right">
					{{
			  item.price == null ? "暂无价格" : "￥" + item.price.toFixed(2)
			}}
				</view>
			</view>
			<!-- 实付款:单选时才展示 -->
			<view class="price" v-if="groupPakeageFlag === false">
				<view class="left"> 实付款 </view>
				<view class="right">
					{{
            tCombo.price == null ? "暂无价格" : "￥" + tCombo.price.toFixed(2)
          }}
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="bottomBtn">
			<button :class="[{submit:true,disabled: loading}]" @click="submit('formData')"
				:disabled="loading">提交预约</button>
		</view>
	</view>
</template>

<script>
	import SinglePerson from "./components/SinglePerson.vue";
	import GroupPerson from "./components/GroupPerson.vue";
	import ChooseDate from "./components/ChooseDate.vue";
	export default {
		components: {
			SinglePerson,
			GroupPerson,
			ChooseDate
		},
		data() {
			return {
				//微信小程序端代理图片地址
				imageUrl: this.imageUrl,
				loading: false,
				formData: {
					//1.单位信息
					groupUnitName: '',
					groupUnitId: '91510800714474320D',
					certificate_type: '1',
					//2.个人信息
					personName: "私密马赛",
					idCard: "510521200007207393",
					age: "22",
					sex: "男",
					mobile: "18783023088",
					//3.团检的人员信息
					tGroupPersonData: [],
					//4.套餐信息
					comboId: "",
					//5.选择的日期信息
					checkDate: "",

				},
				index1: 0,
				//从业类别字典数据
				certificate_type: [],
				//体检人员的信息
				personList: [],
				//用户头像
				avatar: "",
				//套餐基本信息
				tCombo: "",
				//套餐的id
				tCombo_id: "",
				items: [],
				//保存信息后后端返回的结果
				orderRes: {},
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: "10%",
					},
				},
			};
		},
		computed: {
			hospitalAvailableDays() {
				return this.$store.getters["m_hospital/availableDays"];
			},

			hospitalId() {
				return this.$store.getters["m_hospital/id"];
			},

			queryForm() {
				return {
					beginDate: this.$utils.formatDate(new Date(), "YYYY-MM-DD"),
					endDate: this.$utils
						.date()
						.add(this.hospitalAvailableDays - 1, "day")
						.format("YYYY-MM-DD"),
					checkOrgId: this.hospitalId,
				};
			},
			//获取当前store里的体检类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate;
			},
			//获取当前预约类型
			currentType() {
				return this.$store.getters["m_mainInfo/currentType"];
			},

			//获取当前store里医院的id
			currentHospital() {
				return this.$store.state.m_mainInfo.currentHospital;
			},
			//获取当前套餐id
			currentPakeage() {
				return this.$store.getters["m_mainInfo/currentPakeage"];
			},
			//获取单选还是多选套餐标志
			groupPakeageFlag() {
				return this.$store.getters["m_mainInfo/groupPakeageFlag"];
			},


			//获取当前多选套餐信息
			combo() {
				return this.$store.getters["m_combo/info"];
			},

			vaildateRules() {
				return {
					groupUnitName: {
						rules: [{
							required: true,
							errorMessage: "请输入单位名称",
						}, ],
					},
					groupUnitId: {
						rules: [{
								required: true,
								errorMessage: "请输入单位统一社会信用代码",
							},
							{
								validateFunction: (_rule, value, _data, callback) => {
									if (this.$utils.validate.deptCreditCode(value)) {
										callback();
									} else {
										callback("请输入正确的单位统一社会信用代码");
									}
								},
							},
						],
					},
					checkDate: {
						rules: [{
							required: true,
							errorMessage: "请选择体检日期",
						}, ],
					},
					tGroupPersonData: {
						rules: [{
							validateFunction: (_rule, value, _data, callback) => {
								if (value.length) {
									callback();
								} else {
									uni.showToast({
										title: '请填写体检人员!',
										duration: 2000,
										icon: "none"
									})
								}
							},
						}, ],
					},
				};
			},
		},
		onLoad(options) {
			this.tCombo_id = options.tcombos;
			if (!this.groupPakeageFlag) {
				this.getTComboPriceById();
			};
			this.queryItems();
			this.formData.checkDate = this.$utils.formatDate(options.chooseDay);
			this.getDictAsOptions();

			if (options.chooseDay) {
				this.$nextTick(() => {
					this.$refs.calendar.open();
				});
			}
		},
		methods: {
			//单选套餐 根据套餐id返回套餐信息
			async getTComboPriceById() {
				try {
					this.tCombo = await this.$api.appointment.combo.getTComboPriceById({
						id: this.tCombo_id,
						isMiniApps: this.isMiniApps
					});
				} catch (error) {
					console.error(error.message);
				}
			},
			//获取预约日期信息
			async queryItems() {
				try {
					this.items = await this.$api.appointment.order.getAppointmentInfo(
						this.queryForm
					);
				} catch (error) {
					uni.$showMsg(error.message);
				}
			},
			//获取从业类别字典
			async getDictAsOptions() {
				try {
					const res = await this.$api.common.getDictAsOptions("certificate_type");
					this.certificate_type = res
				} catch (error) {
					console.error(error.message);
				}
			},
			//改变体检类型
			bindPickerChange: function(e) {
				this.index1 = e.detail.value
				this.formData.certificate_type = this.certificate_type[e.detail.value].value
			},
			//上传图片
			upload(e) {
				const temp = e.tempFilePaths;
				this.avatar = temp[0];
			},
			//日历展示日期
			calendarDisableDate(date) {
				return !this.items.some(
					(i) => i.status === "1" && this.$utils.date(i.orderDate).isSame(date)
				);
			},
			//获取日历是否可预约
			getCalerndarItemClass(date) {
				return this.items.some(
						(i) => i.status === "1" && this.$utils.date(i.orderDate).isSame(date)
					) ?
					"available" :
					"full";
			},

			//去往套餐详情
			goPackageDetail() {
				uni.navigateTo({
					url: "/subpkg/package_detail/package_detail",
				});
			},

			// 触发提交表单 先进行表单验证 然后交给后端
			submit() {
				Promise.all([
					this.validateForm("formData"),
					this.validateForm("timeForm"),
					this.validateForm("personForm"),
				]).then(async (res) => {
					if (this.loading) return;

					this.loading = true;

					try {
						const mapMethods = {
							健康体检: (params) =>
								new Promise(async (resolve, reject) => {
									try {
										const res =
											await this.$api.appointment.order
											.saveOrUpdatePersonInfo(
												Object.assign({
														physicalType: this.currentCate,
														checkOrgId: this.currentHospital,
														comboId: this.currentPakeage,
													},
													params
												)
											);
										resolve(res);
									} catch (err) {
										reject(err);
									}
								}),
							从业体检: (params) =>
								new Promise(async (resolve, reject) => {
									try {
										const {
											personName,
											idCard,
											age,
											sex,
											birth,
											mobile,
											nation,
											certificate_type,
											physicalType,
											...model
										} = params;

										if (this.currentType === 0) {
											Object.assign(model, {
												tGroupPersonData: [{
													personName,
													idCard,
													age,
													sex,
													birthday: birth,
													mobile,
													nation,
													certificate_type,
													physicalType,
												}, ],
											});
										}
										const res =
											await this.$api.appointment.order
											.addPracticeTGroupOrder(
												Object.assign({
														comboId: this.currentPakeage,
														checkOrgId: this.currentHospital,
													},
													model
												)
											);
										resolve(res);
									} catch (err) {
										reject(err);
									}
								}),
							职业体检: (params) =>
								new Promise(async (resolve, reject) => {
									try {
										const comboIds = [].concat(
											this.$store.getters[
												this.$store.getters[
													"m_mainInfo/groupPakeageFlag"] ?
												"m_mainInfo/groupPakeage" :
												"m_mainInfo/currentPakeage"
											]
										);

										const {
											personName,
											idCard,
											age,
											sex,
											mobile,
											nation,
											physicalType,
											...model
										} = params;

										if (this.currentType === 0) {
											Object.assign(model, {
												tGroupPersonData: [{
													personName,
													idCard,
													age,
													sex,
													mobile,
													nation,
													physicalType,
												}, ],
											});
										}

										const res =
											await this.$api.appointment.order
											.saveOrUpdateCareerPersonInfo(
												Object.assign({
														comboIds,
														checkOrgId: this.currentHospital,
													},
													model
												)
											);
										resolve(res);
									} catch (err) {
										reject(err);
									}
								}),
						};

						const mapMethod = mapMethods[this.currentCate];

						if (typeof mapMethod === "function") {
							const orderRes = await mapMethod(Object.assign({}, ...res));

							uni.navigateTo({
								url: "/subpkg/appointment_detail/appointment_detail?orderRes=" +
									JSON.stringify(orderRes),
							});
						}
					} catch (err) {
						console.log(err);
						uni.$showMsg(err.message);
					}

					this.loading = false;
				});
			},
			//表单验证
			validateForm(ref) {
				// 如果传入的form不存在那么校验成功
				if (!Object.prototype.hasOwnProperty.call(this.$refs, ref)) {
					return Promise.resolve({});
				}

				return new Promise((resolve, reject) => {
					this.$refs[ref].validate((err, formData) => {
						if (!err) {
							resolve(formData);
						} else {
							reject(err);
						}
					});
				});
			},

			//打开日历
			handleOpenCalendar() {
				this.$refs["calendar"]?.open();
			},

			//确定日期
			handleCalendarConfirm({
				fulldate
			}) {
				const item = this.items.find((i) =>
					this.$utils.date(fulldate).isSame(i.orderDate)
				);

				if (item?.status === "1") {
					Object.assign(this.formData, {
						checkDate: fulldate,
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.info {
			width: 100%;
			height: auto;
			background-color: #fff;

			//添加padding
			/deep/ .uni-forms {
				padding-left: 30rpx;
			}

			/deep/ .uni-forms-item {
				border-bottom: 1px solid #efefef;
			}

			/deep/.uni-forms-item__label {
				font-size: 30rpx;
				text-align: justify;
			}

			/deep/.uni-forms-item__error {
				left: 3.5%;
			}

			//放大内部字体大小
			/deep/ .uni-easyinput__placeholder-class {
				font-size: 30rpx;
			}

			.header {
				height: 80rpx;
				line-height: 80rpx;
				position: relative;
			}

			.formData {
				padding: 1rpx 30rpx;

				/deep/ uni-picker {
					font-size: 15px;
					margin-top: 15rpx;
					margin-left: 20rpx;
				}

				/deep/ .uni-input {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						top: 5rpx;
						right: 40rpx;
						//css画下箭头
						width: 15rpx;
						height: 15rpx;
						border-top: 2rpx solid #333;
						border-right: 2rpx solid #333;
						transform: rotate(135deg);
					}
				}

				.sendCode {
					width: auto;
					font-size: 26rpx;
					height: 65rpx;
					position: absolute;
					bottom: 0px;
					right: 0px;
				}
			}

		}

		.license {
			width: 95%;
			border-radius: 20rpx;

			/deep/ .uni-section {
				border-radius: 20rpx;
			}

			.addLicense {
				padding: 0 40rpx 30rpx 40rpx;
			}
		}

		.time {
			margin-top: 10px;
			width: 95%;
			height: 70rpx;
			background-color: #fff;
			padding: 20rpx;
			padding-left: 30rpx;

			/deep/ .uni-forms-item__label {
				font-size: 30rpx;
			}


			/deep/ .full {
				.uni-calendar-item__weeks-box-circle {
					background-color: transparent;
				}

				.uni-calendar-item--extra {
					color: #c0c0c0;
				}
			}

			/deep/ .available {
				.uni-calendar-item__weeks-box-circle {
					background-color: #42b983;
				}

				.uni-calendar-item--extra {
					color: #42b983;
				}
			}

			/deep/ .uni-calendar__content {
				display: flex;
				flex-direction: column;
			}
		}

		.pay {
			width: 100%;
			background-color: #fff;
			margin-top: 20rpx;
			margin-bottom: 120rpx;

			.choose_package {
				display: flex;
				align-items: center;
				width: 100%;
				height: 160rpx;
				background-image: linear-gradient(to right, #d4f2f2, #fff);

				.left {
					padding: 20rpx;

					image {
						border-radius: 20rpx;
						margin-top: 10rpx;
						width: 130rpx;
						height: 130rpx;
					}
				}

				.middle {
					width: 480rpx;
					height: 130rpx;

					p {
						margin-top: 24rpx;
						width: 420rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					span {
						display: block;
						margin-top: 15rpx;
						font-size: 26rpx;
						color: gray;
					}
				}

				.right {
					width: 150rpx;
					font-size: 30rpx;
					color: orangered;
				}
			}

			.price {
				padding: 20rpx;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 28rpx;
					color: gray;
				}

				.right {
					font-weight: bold;
					color: orangered;
				}
			}
		}

		.bottomBtn {
			position: fixed;
			width: 100%;
			height: 100rpx;
			bottom: 0rpx;
			background-color: #f6f6f6;
			z-index: 1;

			.submit,
			.disabled {
				width: 95%;
				border-radius: 100rpx;
				background-color: #1d7dfc;
				color: #fff;
			}

			.disabled {
				background-color: #74adf9;
			}
		}
	}
</style>