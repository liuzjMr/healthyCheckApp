<template>
	<view class="container">
		<!-- 体检人员 -->
		<uni-section title="体检人员" type="line" class="addPersonTitle">
			<template v-slot:right>
				<span class="more" @click="goAddPersonList">添加更多成员</span>
			</template>
			<navigator class="addPerson" :url="'/subpkg/addPersonList/addPersonList'" v-if="personList.length == 0">
				+ 添加体检人员
			</navigator>

			<!-- 添加的人员列表 -->
			<view class="personList">
				<!-- 人员信息 -->
				<view class="personItem" v-for="(person, index) in personList" :key="index">
					<view class="left">
						<image src="../../static/icons/用户,男,头像.png" mode=""></image>
					</view>
					<view class="right">
						<p>
							<span class="title">体检人:</span><span class="content">{{ person.personName }}</span>
						</p>
						<p>
							<span class="title">身份证号:</span><span class="content">{{ person.idCard }}</span>
						</p>
					</view>
					<view class="del">
						<span @click="delItem(index)">删除</span>
					</view>
				</view>
			</view>
		</uni-section>

		<!-- 体检时间 -->
		<view class="time">
			<uni-forms ref="formData" :model="formData" class="formData" :rules="validateRules">
				<uni-forms-item label="体检日期" label-width="80px" name="chooseDay">
					<choose-date v-model="formData.chooseDay" :org-id="currentHospital" placeholder="请选择体检日期"
						auto-select />
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 注意事项 -->
		<view class="attention">

			<view style="padding: 20rpx;">
				<view class="text">
					注意事项
				</view>

				<view class="red">
					<p>体检日期为周一至周五上午8:00~11:30,节假日除外</p>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<button class="submitButton" @click="submitInfo()">提交预约</button>

		<!-- 输入框示例 -->
		<uni-popup ref="confirm" type="dialog" class="popupConfirm">
			<uni-popup-dialog ref="inputClose" mode="input" @confirm="yes">
				确认提交体检信息?
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import moment from 'moment';
	import ChooseDate from "./components/ChooseDate.vue"
	export default {
		components: {
			ChooseDate
		},
		data() {
			return {
				formData: {
					name: '',
					sex: 2,
					phone: '',
					code: '',
					personId: '',
					today: '',
					chooseDay: ''

				},
				//人员信息
				personData: '',
				//人员列表
				personList: [],
				//传给下一个页面的后端返回参数
				orderRes: '',
			};
		},
		computed: {
			//获取当前store里的套餐id
			currentPakeage() {
				return this.$store.state.m_mainInfo.currentPakeage
			},
			//获取当前store里的单位名字
			groupUnitId() {
				return this.$store.state.m_mainInfo.groupUnitId
			},
			//获取当前store里的单位信用代码
			groupUnitName() {
				return this.$store.state.m_mainInfo.groupUnitName
			},
			//团检预约时的多个套餐id
			groupPakeage() {
				return this.$store.state.m_mainInfo.groupPakeage
			},
			//获取当前的类型
			currentCate() {
				return this.$store.state.m_mainInfo.currentCate
			},
			//获取当前选择的医院
			currentHospital() {
				return this.$store.state.m_mainInfo.currentHospital
			},
			validateRules() {
				return {
					chooseDay: {
						rules: [{
							required: true,
							trigger: "change",
							errorMessage: "请选择体检日期",
						}, ],
					},
				}
			}
		},
		onLoad(options) {
			//获取当前日期
			let today = moment(new Date()).format("YYYY-MM-DD");
			this.formData.today = today

			//1.从本地获得人员列表 有的话就展示 没有就显示体检体检人员
			if (uni.getStorageSync('personList')) {
				this.personList = JSON.parse(uni.getStorageSync('personList'))
				// console.log(this.personList,'personList');
			}

			//2.如果路由存在参数 则获取路由传参的人员信息 先新增至当前personList
			if (options.personData) {
				const personData = JSON.parse(options.personData); // 字符串转对象
				this.personList.push(personData);
			}

			//3.使用当前的personData 循环显示所有新增人员信息
			if (this.personData != '') {
				this.personList.push(this.personData)
			}

			//4.本地持久化路由传入的人员信息对象
			uni.setStorageSync('personList', JSON.stringify(this.personList))

			//5.清除路由参数并进行刷新 防止每次刷新多存一个数据的bug
			if (Object.keys(this.$route.query).length != 0) {
				this.$router.push({
					query: {}
				}); // 删除页面参数
				this.$router.go(0) //刷新一次页面
			}


		},
		methods: {
			//去往人员添加
			goAddPersonList() {
				uni.navigateTo({
					url: '/subpkg/addPersonList/addPersonList'
				})
			},

			// 添加新的人员信息
			addNewPerson(person) {
				// 将新的人员信息添加到数据数组中
				this.personList.push(person);
			},

			//单位预约提交确认
			async yes() {

				//如果是职业体检且是团检且是多选套餐 : 传多个套餐
				if (this.groupPakeage.length != 0 && this.currentCate === '职业体检') {
					try {
						const params = Object.assign({
							checkDate: this.$utils.formatDate(this.formData.chooseDay),
							checkOrgId: this.currentHospital,
							groupUnitId: this.groupUnitId,
							groupUnitName: this.groupUnitName,
							comboIds: this.groupPakeage,
							tGroupPersonData: this.personList,
						});

						const saved = await this.$api.appointment.order.saveOrUpdateCareerPersonInfo(Object.assign(
							params))

						this.orderRes = saved

						uni.navigateTo({
							url: '/subpkg/appointment_detail/appointment_detail?orderRes=' + JSON.stringify(
								this
								.orderRes)
						})

					} catch (err) {
						uni.$showMsg(err.message)
					};
				} else {
					//其他体检类型 : 传单个套餐
					try {
						// console.log(this.currentPakeage);
						const params = Object.assign({
							checkDate: this.$utils.formatDate(this.formData.chooseDay),
							checkOrgId: this.currentHospital,
							groupUnitId: this.groupUnitId,
							groupUnitName: this.groupUnitName,
							comboId: this.currentPakeage,
							tGroupPersonData: this.personList,
						});

						const saved = await this.$api.appointment.order.addPracticeTGroupOrder(Object.assign(
							params))

						this.orderRes = saved

						uni.navigateTo({
							url: '/subpkg/appointment_detail/appointment_detail?orderRes=' + JSON.stringify(
								this
								.orderRes)
						})

					} catch (err) {
						uni.$showMsg(err.message)
					};

				}


			},

			//提交体检人员信息
			submitInfo() {
				if (this.formData.chooseDay === '') {
					uni.showToast({
						title: '请选择体检日期!',
						duration: 2000,
						icon: "none",
					})
					return
				}

				this.$refs.confirm.open()
			},
			//删除当前项
			delItem(index) {
				// console.log(index);
				this.personList.splice(index, 1)
				uni.setStorageSync('personList', JSON.stringify(this.personList))
			}
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

		.addPersonTitle {
			width: 100%;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.more {
				display: block;
				width: 200rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				border-radius: 10rpx;
				color: #fff;
				background-color: #4ba6f8;
			}

			.addPerson {
				width: 90%;
				height: 80rpx;
				margin: auto;
				margin-top: 20rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 20rpx;
				color: #4ba6f8;
				border: 1px dashed #4ba6f8;
			}

			.personList {
				width: 95%;
				margin: auto;
				padding: 20rpx;

				.personItem {
					display: flex;
					align-items: center;
					height: 180rpx;
					border-radius: 20rpx;
					margin-bottom: 20rpx;
					border: 1px solid #4ba6f8;


					.left {
						flex: 2.5;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 20rpx;

						image {
							width: 130rpx;
							height: 130rpx;
							border-radius: 10rpx;
						}
					}

					.right {
						flex: 8;
						display: flex;
						height: 100rpx;
						flex-direction: column;
						justify-content: space-around;

						p {

							.title {
								font-weight: bold;
							}

							.content {
								float: right;
								color: gray;
							}
						}
					}

					.del {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100rpx;

						span {
							color: orangered;
						}
					}
				}
			}
		}

		.time {
			width: 100%;
			height: 105rpx;
			background-color: #fff;
			margin-top: 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.formData {
				padding: 20rpx;
			}
		}

		.attention {
			width: 100%;
			margin-top: 20rpx;
			background-color: #fff;
			height: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

			.text {
				font-size: 28rpx;
			}

			.red {
				display: flex;
				color: red;
				font-size: 26rpx;
				margin-top: 10rpx;
				justify-content: space-between;

				span {
					color: #1d7dfc;
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