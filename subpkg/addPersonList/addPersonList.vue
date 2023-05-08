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

				<uni-forms-item label="性别" label-width="90px" name="sex">
					<uni-data-checkbox v-model="formData.sex" :localdata="sex" />
				</uni-forms-item>

				<uni-forms-item label="体检类型" label-width="80px" name="physicalType">
					<uni-easyinput placeholder="请输入体检类型" :inputBorder="false" v-model="formData.physicalType"
						disabled />
				</uni-forms-item>

				<uni-forms-item label="手机号" label-width="80px" name="mobile">
					<uni-easyinput placeholder="请输入体检人手机号" :inputBorder="false" v-model="formData.mobile" />
				</uni-forms-item>

			</uni-forms </view>

			<!-- 提交按钮 -->
			<button class="submitButton" @click="submit('formData')">确定</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					personName: '',
					idCard: '',
					sex: 0,
					age: '',
					physicalType: '',
					mobile: '',
					avatar: '',
				},

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
			}
		},
		onLoad() {
			this.formData.physicalType = this.currentCate
		},

		watch: {
			//根据身份证号自动判断性别 年龄
			"formData.idCard": {
				handler(val) {
					const info = this.$utils.idCard.info(val);

					if (info.valid) {
						Object.assign(this.formData, {
							age: info.age,
							sex: info.gender === "M" ? 0 : 1,
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
			//表单验证 + 路由传参
			submit(ref) {
				this.$refs[ref].validate().then(res => {

					uni.navigateTo({
						url: '/subpkg/add_person/add_person?personData=' + encodeURIComponent(JSON
							.stringify(this.formData))
					})
				}).catch(err => {
					console.log('err', err);
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
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.form {
			width: 95%;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 20rpx;
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
				padding: 20rpx 30rpx 10rpx 30rpx;

				/deep/ .uni-forms-item__label,
				.uni-input-input,
				.uni-easyinput__placeholder-class {
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

						.avatarImg {}
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