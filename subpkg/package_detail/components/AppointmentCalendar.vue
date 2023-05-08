<template>
	<view class="time">
		<view class="header">
			<span>可约时间</span>
			<span class="fast" v-if="lateAvailableItem">最快可约{{
          $utils.formatDate(lateAvailableItem.orderDate, "MM月DD日")
        }}</span>
		</view>
		<!-- 可约时间组件 -->
		<view class="calendar">
			<uni-table border stripe id="myTable">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th v-for="item of tableHeaders" align="center" width="120rpx" class="week"
						:data-col="item.date" :key="item.key">
						{{ item.week }}
						<span><a>{{ item.date }}</a></span>
					</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr :stripe="true">
					<uni-td v-for="item of tableData" :key="item.date" align="center" :data-col="item.date">
						<view :class="{
							'td-content': true,
							max: item.status === '0',
							available: isAvailable(item),
						}">
							<text v-if="isAvailable(item)" @click="handleAppointment(item)">预约</text>
							<text v-else style="color: #333">已约满</text>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	const AppointmentStatus = {
		unavailable: 0, //不可预约
		available: 1, // 可预约
		full: 2, // 约满
	};
	export default {
		options: {
			styleIsolation: 'shared'
		},
		props: {
			tComboId: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				items: [],
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
					beginDate: "",
					endDate: "",
				};
			},
			tableHeaders() {
				return Array.from(Array(this.hospitalAvailableDays).keys()).map((i) => {
					const day = this.$utils.date().add(i, "day");

					return {
						date: day.format("MM/DD"),
						week: this.$utils.parseWeek(day.day()),
						key: day.format("YYYY-MM-DD"),
					};
				});
			},
			tableData() {
				return this.tableHeaders.map((h) => {
					const date = h.key;
					const item = this.items.find((i) =>
						this.$utils.isSomeDay(date, i.orderDate)
					);

					return Object.assign({
							date,
						},
						item
					);
				});
			},
			lateAvailableItem() {
				return this.items.find((i) => this.isAvailable(i))
			},
		},
		mounted() {
			this.query();
		},
		methods: {
			async query() {
				try {
					const now = new Date();
					const params = {
						beginDate: this.$utils.formatDate(now, "YYYY-MM-DD"),
						endDate: this.$utils
							.date(now)
							.add(this.hospitalAvailableDays - 1, "day")
							.format("YYYY-MM-DD"),
						checkOrgId: this.hospitalId,
					};

					this.items = await this.$api.appointment.order.getAppointmentInfo(
						params
					);
					this.$emit("queried", this.items);
				} catch (err) {
					uni.$showMsg(err.message);
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
			handleAppointment(item) {
				this.$emit("appt", item.orderDate);
				// uni.navigateTo({
				// 	url: "/subpkg/order_info/order_info?chooseDay=" +
				// 		item.orderDate +
				// 		`&tcombos=${this.tComboId}`,
				// });
			},
		},
	};
</script>

<style lang="scss" scoped>
	.time {
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		padding-bottom: 30rpx;
		background-color: #fff;
		margin-top: 20rpx;

		.header {
			display: flex;
			flex-direction: row;

			.fast {
				margin-top: 10rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
				color: gray;
				cursor: pointer;
			}
		}

		.calendar {
			width: 100%;
			margin-top: 20rpx;

			/deep/ .uni-table-th {
				padding: 20rpx 0;
				color: #000;
				font-weight: normal;
			}

			/deep/ .uni-table-th-content {
				display: flex;
				flex-direction: column;
			}

			/deep/ .uni-table-td {
				height: 110rpx;
				padding: 0;
				color: #fff;
			}

			.td-content {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.max {
				color: gray;
				background-color: #fff;
			}

			.available {
				cursor: pointer;
				background-color: #2c80f9;
			}

			/deep/ .weekDay {
				color: gray;
			}
		}
	}
</style>
