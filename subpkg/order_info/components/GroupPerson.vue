<template>
	<view class="group-person">
		<uni-section title="体检人员" type="line">
			<!-- 添加的人员列表 -->
			<view class="person-content">
				<view class="person-content__list" v-if="personList.length">
					<view class="personList">
						<!-- 人员信息 -->
						<view class="personList-item" v-for="(person, index) in personList" :key="index">
							<view class="personList-item__img">
								<image src="/static/icons/用户,男,头像.png" mode=""></image>
							</view>
							<view class="personList-item__content">
								<p>
									<span class="title">体检人:</span><span class="content">{{ person.personName }}</span>
								</p>
								<p>
									<span class="title">身份证号:</span><span class="content">{{ person.idCard }}</span>
								</p>
							</view>
							<view class="personList-item__action">
								<span @click="handleRemovePerson(index)">删除</span>
							</view>
						</view>
					</view>
				</view>
				<view class="person-content__action">
					<button @click="handleAddPerson">+ 添加体检人员</button>
				</view>
			</view>
		</uni-section>

		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="base" type="info" title=" 添加人员信息 " @close="closeDialog"
				@confirm="handleDialogConfirm" :before-close="true" style="width: 100%;">
				<group-add-person ref="addPerson"></group-add-person>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import GroupAddPerson from "./GroupAddPerson.vue";
	export default {
		components: {
			GroupAddPerson,
		},
		model: {
			prop: "modelValue",
			event: "update:modelValue",
		},
		props: {
			modelValue: {
				type: Array,
				required: true,
			},
		},
		emits: ["update:modelValue"],
		data() {
			return {
				personList: [],
			};
		},
		watch: {
			modelValue(val) {
				if (val === this.personList) return;

				this.personList = this.$$createForm(val);
			},
			personList: {
				handler(val) {
					this.$emit("update:modelValue", val);
				},
				deep: true,
			},
		},
		methods: {
			$$createForm(model) {
				return Object.assign({
						personName: "",
						idCard: "",
						age: "",
						birthday: "",
						sex: 0,
						mobile: "",
						physicalType: ""
					},
					model
				);
			},

			openDialog() {
				this.$refs["dialog"]?.open();
			},

			closeDialog() {
				this.$refs["dialog"]?.close();
			},

			handleAddPerson() {
				this.openDialog();
			},

			handleDialogConfirm() {
				this.$refs["addPerson"].validate((err, formData) => {
					if (!err) {
						this.personList.push(formData);

						this.closeDialog();
					}
				});
			},

			handleRemovePerson(index) {
				this.personList.splice(index, 1);
			},
		},
	};
</script>

<style lang="scss" scoped>
	/deep/ .uni-dialog {
		&-title {
			padding: 32rpx 0;
		}

		&-content {
			padding: 0;
		}
	}

	.person-content {
		display: flex;
		flex-direction: column;
		padding: 0 2.5%;

		&__list {
			margin-bottom: 32rpx;
		}

		&__action {
			&>button {
				background-color: #fff;
				color: #4ba6f8;
				border-radius: 20rpx;
				border: 1px dashed #4ba6f8;
				margin-top: 20rpx;
			}
		}
	}

	.personList {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;

		&-item {
			display: flex;
			padding: 35rpx;
			border-radius: 20rpx;
			border: 1px solid #4ba6f8;

			&>*+* {
				margin-left: 16rpx;
			}

			&__img {
				width: 90rpx;
				height: 90rpx;

				&>image {
					width: 100%;
					height: 100%;
				}
			}

			&__content {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&>p {
					display: flex;
					justify-content: space-between;
				}
			}

			&__action {
				width: 90rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: red;
			}
		}

		&>*+* {
			margin-top: 32rpx;
		}
	}
</style>