<template>
	<view class="single-person">
		<uni-section title="体检人信息" type="line" titleFontSize="16px" />

		<!-- 输入体检信息表 -->
		<uni-forms ref="formData" :rules="rules" :model="formData" class="formData">
			<uni-forms-item label="体检人" label-width="80px" name="personName">
				<uni-easyinput placeholder="请输入体检人姓名" :inputBorder="false" v-model="formData.personName"
					class="input" />
			</uni-forms-item>

			<uni-forms-item label="身份证号" label-width="80px" name="idCard">
				<uni-easyinput placeholder="请输入体检人身份证号" type="idcard" :inputBorder="false" v-model="formData.idCard" />
			</uni-forms-item>

			<uni-forms-item label="年龄" label-width="80px" name="age">
				<uni-easyinput placeholder="请输入体检人年龄" :inputBorder="false" v-model="formData.age" type="number"
					class="input" />
			</uni-forms-item>

			<uni-forms-item label="出生日期" label-width="80px" name="birth" v-if="this.currentCate === '从业体检'">
				<gpp-date-picker v-model="formData.birth" @onCancel="onCancel" @onConfirm="onConfirm"
					:startDate="startDate" :endDate="endDate" :defaultValue="formData.birth"
					style="margin-left: 20rpx;font-size: 30rpx;">
					{{formData.birth}}
				</gpp-date-picker>
			</uni-forms-item>

			<uni-forms-item label="性别" label-width="90px" name="sex">
				<uni-data-checkbox v-model="formData.sex" :localdata="sexs" />
			</uni-forms-item>

			<uni-forms-item label="民族" label-width="80px" name="nation" v-if="this.currentCate === '从业体检'">
				<picker :value="index" :range="nation" range-key="label" @change="bindPickerChange">
					<view class="uni-input">{{this.index?nation[index].label:'汉族'}}</view>
				</picker>
			</uni-forms-item>

			<uni-forms-item label="手机号" label-width="80px" name="mobile">
				<uni-easyinput type="tel" placeholder="请输入体检人手机号" :inputBorder="false" v-model="formData.mobile"
					class="phone" />
			</uni-forms-item>

			<uni-forms-item label="体检类型" label-width="80px" name="physicalType">
				<uni-easyinput type="tel" placeholder="请输入体检类型" :inputBorder="false" v-model="formData.physicalType"
					disabled />
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		model: {
			prop: "modelValue",
			event: "update:modelValue",
		},
		props: {
			modelValue: {
				type: Object,
				required: true,
			},
		},
		emits: ["update:modelValue"],
		components: {
			gppDatePicker
		},
		computed: {
			//获得当前选择的体检类型
			currentCate() {
				return this.$store.getters["m_mainInfo/currentCate"]
			},
			//表单验证规则
			rules() {
				return {
					personName: {
						rules: [{
								required: true,
								errorMessage: "请输入体检人姓名",
							},
							{
								minLength: 2,
								maxLength: 50,
								errorMessage: "姓名长度在 {minLength} 到 {maxLength} 个字符",
							},
						],
					},
					age: {
						rules: [{
							required: true,
							errorMessage: "请输入体检人年龄",
						}, ],
					},
					mobile: {
						rules: [{
								required: true,
								errorMessage: "请输入体检人手机号",
							},
							{
								validateFunction: (_rule, value, _data, callback) => {
									if (this.$utils.validate.tel(value)) {
										callback();
									} else {
										callback("请输入正确的手机号");
									}
								},
							},
						],
					},
					idCard: {
						rules: [{
								required: true,
								errorMessage: "请输入体检人身份证号",
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
						],
					},
				};
			},
			// 单选数据源
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
			//婚姻状况
			marriage() {
				return [{
						text: "未婚",
						value: 0,
					},
					{
						text: "已婚",
						value: 1,
					},
				];
			},
		},
		data() {
			return {
				formData: {

				},

				//出生日期选择
				startDate: "1900-01-01",
				endDate: '2023-04-27',
				pickerDate: '2000-01-01',

				//民族选择
				index: 0,
				nation: [],

			}
		},
		mounted() {
			this.endDate = this.$utils.formatDate();
			this.formData.physicalType = this.currentCate;
			this.getDictAsOptions()
		},
		watch: {
			modelValue: {
				handler(val) {
					if (val === this.formData) return;

					this.formData = this.$$createForm(val);
				},
				immediate: true,
			},
			formData: {
				handler(val) {
					this.$emit("update:modelValue", val);
				},
				deep: true,
			},
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
							birth: birth.slice(0, 4) + '-' + birth.slice(4, 6) + '-' + birth.slice(6)
						});
					}
				},
			},
		},
		methods: {
			//传递的表单字段
			$$createForm(model) {
				return Object.assign({
						personName: "",
						idCard: "",
						age: "",
						birth: this.$utils.formatDate(),
						sex: 0,
						mobile: "",
						nation: "01",
						physicalType: ""
					},
					model
				);
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
				this.formData.birth = e.dateValue;
			},

			//改变体检类型
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.formData.nation = this.nation[e.detail.value].value
			},
			validate(callback) {
				return new Promise((resolve, reject) => {
					this.$refs["formData"]?.validate((err, formData) => {
						typeof callback === "function" && callback(err, formData);
						if (!err) {
							resolve(formData);
						} else {
							reject(err);
						}
					});
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.single-person {
		width: 100%;
		height: auto;
		background-color: #fff;

		.formData {
			padding: 1rpx 30rpx;

			//放大内部字体大小
			/deep/ .uni-easyinput__placeholder-class {
				font-size: 30rpx;
			}

			/deep/ .uni-forms-item__label {
				font-size: 30rpx;
				text-align: justify;
			}

			/deep/ .uni-easyinput__content-input {
				font-size: 30rpx;
			}

			/deep/ uni-picker {
				font-size: 15px;
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

			/deep/ .is-disabled {
				background-color: #ffffff !important;
				color: #0d0d0d !important;
			}

			/deep/ .uni-forms-item {
				border-bottom: 1px solid #efefef;
			}

			/deep/ .uni-forms-item__content {
				margin: auto;
			}

			/deep/.uni-forms-item__error {
				left: 3.5%;
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
</style>