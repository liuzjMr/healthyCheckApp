<template>
	<view class="container">
		<!-- 单位信息 -->
		<view class="info">
			<view class="form">
				<uni-forms ref="formData" :model="formData" class="formData" :rules="rules">
					<uni-forms-item label="单位名称" label-width="80px" name="groupUnitName">
						<uni-easyinput placeholder="请输入单位名称" :inputBorder="false" v-model="formData.groupUnitName" />
					</uni-forms-item>

					<uni-forms-item label="信用代码" label-width="80px" name="groupUnitId">
						<uni-easyinput placeholder="请输入单位统一社会信用代码" :inputBorder="false"
							v-model="formData.groupUnitId" />
					</uni-forms-item>

					<uni-forms-item label="体检类型" label-width="80px" name="type">
						<picker :value="index1" :range="type" @change="bindPickerChange1">
							<view class="uni-input">{{type[index1]}}</view>
						</picker>
					</uni-forms-item>

					<!-- <uni-forms-item label="所属地区" label-width="80px" name="location">
						<picker :value="index2" :range="location" @change="bindPickerChange2">
							<view class="uni-input">{{location[index2]}}</view>
						</picker>
					</uni-forms-item> -->

					<!-- <uni-forms-item label="联系人" label-width="80px" name="contact">
						<uni-easyinput placeholder="请输入联系人姓名" :inputBorder="false" v-model="formData.contact" />
					</uni-forms-item>

					<uni-forms-item label="电话" label-width="80px" name="phone">
						<uni-easyinput placeholder="请输入联系人电话" :inputBorder="false" v-model="formData.phone" />
					</uni-forms-item> -->

				</uni-forms>
			</view>
		</view>

		<!-- 提交按钮 并进行验证-->
		<view class="bottomBtn">
			<button class="submit" @click="submit('formData')">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					groupUnitName: '',
					groupUnitId: '91510800714474320D',
					type: '',
					location: '',
					contact: '',
					phone: '',
					code: '',
				},
				//两个下拉选择框的数据源
				index1: 0,
				index2: 0,
				type: ['健康体检', '从业体检', '职业体检'],
				location: ['泸州', '成都', '重庆', '上海'],


				// 表单验证规则
				rules: {
					groupUnitName: {
						rules: [{
							required: true,
							errorMessage: '请输入单位名称',
						}, ]
					},
					groupUnitId: {
						rules: [{
							required: true,
							errorMessage: '请输入信用代码',
						}, {
							validateFunction: (_rule, value, _data, callback) => {
								if (this.$utils.validate.deptCreditCode(value)) {
									callback();
								} else {
									callback("请输入正确的信用代码");
								}
							},
						}, ]
					},
					contact: {
						rules: [{
							required: true,
							errorMessage: '请输入联系人姓名',
						}, ]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入联系人电话',
						}, ]
					},
				},

				// 单选数据源

				//性别选择,默认选择男
				radio1: 0,
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],

				//多选数据源

				//单位类型
				unitType: [{
					text: '食品生产经营',
					value: 0
				}, {
					text: '药品销售',
					value: 1
				}, {
					text: '公共场所',
					value: 2
				}],

				//是否禁用验证码
				disabled: false,
			};
		},
		computed: {
			//获取当前的类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate
			},

		},
		onLoad() {
			//默认体检类型
			if (this.currentCate == '健康体检') {
				this.index1 = 0
			} else if (this.currentCate == '从业体检') {
				this.index1 = 1
			} else {
				this.index1 = 2
			}

			//为了双向绑定多出来的步骤
			this.formData.type = this.type[this.index1]
			this.formData.location = this.location[this.index2]
		},
		methods: {
			//改变体检类型
			bindPickerChange1: function(e) {
				this.index1 = e.detail.value
				this.formData.type = this.type[e.detail.value]
			},
			//改变所属地区
			bindPickerChange2: function(e) {
				this.index2 = e.detail.value
				this.formData.location = this.location[e.detail.value]
			},
			// 触发提交表单 先进行表单验证
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
					//单位的名字
					this.$store.dispatch("m_mainInfo/setGroupUnitName", this.formData.groupUnitName);

					//单位的信用代码
					this.$store.dispatch("m_mainInfo/setGroupUnitId", this.formData.groupUnitId);

					uni.navigateTo({
						url: '/subpkg/add_person/add_person'
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		},
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.info {
			width: 95%;
			padding: 20rpx;


			.form {
				padding: 20rpx 30rpx;
				background-color: #fff;
				border-radius: 20rpx;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

				.formData {
					.uni-forms-item {
						border-bottom: 1px solid #efefef;
					}

					.uni-forms-item__label {
						text-align: justify;
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

				}

				// 微信小程序兼容样式
				/deep/.uni-forms-item__error {
					left: 3.5%;
				}

				/deep/ .uni-forms-item__label {
					color: #000;
					font-size: 15px;
				}

				/deep/ .uni-forms-item__content {
					margin: auto;
				}



				/deep/ .uni-easyinput__placeholder-class {
					font-size: 15px
				}

				/deep/ .placeholder {
					font-size: 15px
				}

				/deep/ uni-picker {
					font-size: 15px;
					margin-left: 20rpx;
				}

				.groupCate {

					/deep/ .checklist-text {
						font-size: 26rpx;
					}

					.checkbox {
						padding: 20rpx;
					}
				}

			}

		}



		.license {
			width: 95%;
			border-radius: 20rpx;
			margin-bottom: 120rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			/deep/ .uni-section {
				border-radius: 20rpx;
			}
		}



		.bottomBtn {
			position: fixed;
			width: 100%;
			height: 100rpx;
			bottom: 0rpx;
			background-color: #f6f6f6;

			.submit {
				width: 95%;
				border-radius: 100rpx;
				background-color: #1d7dfc;
				color: #fff;
			}
		}


	}
</style>