<template>
	<view class="container">
		<!-- 输入体检信息表 -->
		<view class="form">
			<uni-forms ref="formData" :rules="rules" :model="formData" class="formData">
				<uni-forms-item label="体检人" label-width="80px" name="personName">
					<uni-easyinput placeholder="请输入体检人姓名" :inputBorder="false" v-model="formData.personName" />
				</uni-forms-item>

				<uni-forms-item label="身份证号" label-width="80px" name="idCard">
					<uni-easyinput placeholder="请输入体检人身份证号" :inputBorder="false" v-model="formData.idCard" />
				</uni-forms-item>

				<uni-forms-item label="年龄" label-width="80px" name="age">
					<uni-easyinput placeholder="请输入体检人年龄" :inputBorder="false" v-model="formData.age" type="number"
						class="input" />
				</uni-forms-item>

				<uni-forms-item label="出生日期" label-width="80px" name="birthday" v-if="this.currentCate === '从业体检'">
					<gpp-date-picker v-model="formData.birthday" @onCancel="onCancel" @onConfirm="onConfirm"
						:startDate="startDate" :endDate="endDate" :defaultValue="formData.birthday"
						style="margin-left: 20rpx;font-size: 30rpx;">
						{{formData.birthday}}
					</gpp-date-picker>
				</uni-forms-item>

				<uni-forms-item label="性别" label-width="80px" name="sex">
					<uni-data-checkbox v-model="formData.sex" :localdata="sexs" style="margin-left: 20rpx;" />
				</uni-forms-item>

				<uni-forms-item label="民族" label-width="80px" name="nation" v-if="this.currentCate === '从业体检'">
					<picker :value="index" :range="nation" range-key="label" @change="bindPickerChange">
						<view class="uni-input">{{this.index?nation[index].label:'汉族'}}</view>
					</picker>
				</uni-forms-item>

				<uni-forms-item label="手机号" label-width="80px" name="mobile">
					<uni-easyinput placeholder="请输入体检人手机号" :inputBorder="false" v-model="formData.mobile" />
				</uni-forms-item>

				<uni-forms-item label="体检类型" label-width="80px" name="physicalType">
					<uni-easyinput placeholder="请输入体检类型" :inputBorder="false" v-model="formData.physicalType"
						disabled />
				</uni-forms-item>

			</uni-forms>
		</view>

	</view>
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		components: {
			gppDatePicker
		},
		data() {
			return {
				formData: {
					personName: '张三',
					idCard: '510521200007207393',
					sex: '男',
					age: '22',
					birthday: '2023-04-27',
					nation: "01",
					physicalType: '',
					mobile: '18783023088',
					avatar: '',
				},

				//民族选择
				index: 0,
				nation: [],

				//出生日期选择
				startDate: "1900-01-01",
				endDate: '2023-04-27',
				pickerDate: '2000-01-01',

				//表单验证规则
				rules: {
					personName: {
						rules: [{
							required: true,
							errorMessage: '请输入体检人姓名',
						}, ]
					},
					idCard: {
						rules: [{
								required: true,
								errorMessage: '请输入体检人身份证号',
							},
							{
								validateFunction: (_rule, value, _data, callback) => {
									if (this.$utils.validate.idCard(value)) {
										callback();
									} else {
										callback("请输入正确的身份证号");
									}
								},
							},
						]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '请输入体检人年龄',
						}, ]
					},
					mobile: {
						rules: [{
								required: true,
								errorMessage: '请输入体检人手机号',
							},
							{
								validateFunction: (_rule, value, _data, callback) => {
									if (this.$utils.validate.tel(value)) {
										callback();
									} else {
										callback("请输入正确的手机号");
									}
								},
							}
						]
					},

				},


				//头像信息
				imageStyles: {
					width: 80,
					height: 80,
					border: {
						radius: '10%'
					}
				},

				// 单选数据源

				//默认选择男
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],

				//婚姻状况
				marriage: [{
					text: '未婚',
					value: 0
				}, {
					text: '已婚',
					value: 1
				}],

			};
		},

		computed: {
			//获取当前体检类型
			currentCate() {
				return this.$store.getters["m_mainInfo/currentCate"];
			},
			sexs() {
				return [{
						text: "男",
						value: "男",
					},
					{
						text: "女",
						value: "女",
					},
				];
			},
		},
		mounted() {
			this.endDate = this.$utils.formatDate();
			this.formData.physicalType = this.currentCate
			this.getDictAsOptions()
		},

		watch: {
			//根据身份证号自动判断性别 年龄 出生日期
			"formData.idCard": {
				handler(val) {
					const {
						age,
						gender,
						birthday,
						valid
					} = this.$utils.idCard.info(val);

					const birth = "" + birthday;

					if (valid) {
						Object.assign(this.formData, {
							age: age,
							sex: gender === "M" ? "男" : "女",
							birthday: birth.slice(0, 4) + '-' + birth.slice(4, 6) + '-' + birth.slice(6)
						});
					}
				},
			},
		},

		methods: {
			//上传图片
			upload(e) {
				const tempFilePaths = e.tempFilePaths; //e是获取的图片源
				console.log(tempFilePaths);
			},
			//获取民族字典
			async getDictAsOptions() {
				try {
					const res = await this.$api.common.getDictAsOptions("nation");
					this.nation = res
				} catch (error) {
					console.error(error.message);
				}
			},
			//改变出生日期
			onCancel(e) {
				console.log(e);
			},
			onConfirm(e) {
				console.log(e);
				this.formData.birthday = e.dateValue;
			},
			//改变体检类型
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.formData.nation = this.nation[e.detail.value].value
			},
			validate(callback) {
				return this.$refs["formData"]?.validate(callback)
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.form {
			width: 100%;
			background-color: #fff;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.uni-forms-item {
				border-bottom: 1px solid #efefef;
			}

			/deep/ .uni-forms {
				padding: 20rpx 30rpx 10rpx 30rpx;
			}

			/deep/ .uni-forms-item__content {
				margin: auto;
			}

			/deep/.uni-forms-item__error {
				left: 3.5%;
			}

			.formData {
				/deep/ uni-picker {
					font-size: 15px;
					margin-left: 20rpx;
				}

				.uni-input {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						right: 40rpx;
						//css画下箭头
						width: 15rpx;
						height: 15rpx;
						border-top: 2rpx solid #333;
						border-right: 2rpx solid #333;
						transform: rotate(135deg);
					}
				}

				/deep/ .uni-forms-item__label {
					&>uni-text {
						width: 100%;
						display: inline-block;

						&>span {
							width: 100%;
							display: inline-block;
							text-align: justify;
							text-align-last: justify;
						}
					}
				}

				/deep/ .uni-forms-item__label,
				.uni-input-input,
				.uni-easyinput__placeholder-class {
					font-size: 30rpx;
				}

				/deep/ .uni-easyinput__content-input {
					font-size: 30rpx;
				}

				/deep/ .is-disabled {
					background-color: #ffffff !important;
					color: #0d0d0d !important;
				}


				.upAvatar {
					display: flex;

					.left {
						flex: 80%;
						display: flex;
						flex-direction: column;
						justify-content: center;

						p {
							font-size: 28rpx;
						}

						span {
							font-size: 26rpx;
							color: gray;
							margin-top: 10rpx;
						}
					}

					.right {
						flex: 20%;
					}
				}
			}
		}

		.submitButton {
			position: absolute;
			bottom: 20rpx;
			width: 95%;
			border-radius: 100rpx;
			background-color: #1d7dfc;
			color: #fff;

		}
	}
</style>