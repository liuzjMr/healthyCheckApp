<template>
	<view class="choose-date">
		<view class="choose-date__trigger">
			<button size="mini" @click="open" v-if="!$slots['trigger']">
				<text v-if="model === ''" :style="[{ color: '#999' }]">{{
          placeholder
        }}</text>
				<text v-else> {{ formatDate(model) }} </text>
			</button>
			<slot name="trigger" :model="this.model"></slot>
		</view>
		<view class="choose-date__calendar" style="z-index: 999;">
			<uni-calendar type="date" :date="model" :border="false" ref="calendar" :insert="false" :selected="selected"
				:disable-date="calendarDisableDate" :item-class-name="getCalerndarItemClass"
				@confirm="handleCalendarConfirm" />
		</view>
	</view>
</template>

<script>
	export default {
		model: {
			prop: "modelValue",
			event: "update:modelValue",
		},
		props: {
			modelValue: {
				type: null,
				required: true,
			},
			autoSelect: {
				type: Boolean,
				default: true,
			},
			placeholder: {
				type: String,
				default: "请选择日期",
			},
		},
		emits: ["update:modelValue"],
		data() {
			return {
				model: "",
				infos: [],
				loading: false,
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
					beginDate: this.formatDate(new Date()),
					endDate: this.$utils
						.date()
						.add(this.hospitalAvailableDays - 1, "day")
						.format("YYYY-MM-DD"),
					checkOrgId: this.hospitalId,
				};
			},
			selected() {
				if (this.loading) return [];
				return Array.from(Array(this.hospitalAvailableDays).keys()).map((i) => {
					const date = this.$utils.date().add(i, "day").format("YYYY-MM-DD");

					const item = this.infos.find((i) => date === i.orderDate);

					return {
						date,
						info: item && this.isAvailable(item) ? "可预约" : "已约满",
					};
				});
			},
		},
		watch: {
			infos() {
				if (this.autoSelect) {
					if (this.modelValue) {
						const info = this.infos.find((i) => this.isSameDate(this.modelValue, i.orderDate));

						if (info && this.isAvailable(info)) return;
					}

					const availiableDate = this.infos.find((i) => this.isAvailable(i));

					if (availiableDate) {
						Object.assign(this, {
							model: availiableDate.orderDate
						})
					}
				}
			},
			modelValue: {
				handler(val) {

					if (this.isSameDate(this.model, val)) return;

					this.model = this.formatDate(val);
				},
				immediate: true
			},
			model: {
				handler(val) {
					this.$emit("update:modelValue", val);
				},
				immediate: true
			},

		},
		mounted() {
			this.getAppointmentInfo()
		},
		methods: {
			async getAppointmentInfo(q) {
				if (this.loading) return;
				this.loading = true;
				try {
					const params = Object.assign({}, this.queryForm, q);

					if (!params.checkOrgId) {
						this.model = "";

						return;
					}
					this.infos = await this.$api.appointment.order.getAppointmentInfo(
						params
					);


				} catch (error) {
					uni.$showMsg(error.message);
				}
				this.loading = false;
			},

			open() {
				this.getAppointmentInfo();
				this.$refs["calendar"]?.open();
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

			formatDate(date) {
				return this.$utils.formatDate(date, "YYYY-MM-DD");
			},

			isSameDate(d1, d2) {
				return this.$utils.date(d1).isSame(d2);
			},


			//日历禁用日期
			calendarDisableDate(date) {
				return !this.infos.some(
					(i) => this.isAvailable(i) && this.isSameDate(date, i.orderDate)
				);
			},

			//设置日历日期cell样式类
			getCalerndarItemClass(date) {
				return this.infos.some(
						(i) => this.isAvailable(i) && this.isSameDate(date, i.orderDate)
					) ?
					"available" :
					"full";
			},

			handleCalendarConfirm({
				fulldate
			}) {
				const info = this.infos.find((i) =>
					this.isSameDate(fulldate, i.orderDate)
				);

				if (this.isAvailable(info)) {
					this.model = fulldate;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.choose-date {
		height: 100%;
		display: flex;
		align-items: center;

		&__info {
			display: flex;
			align-items: center;
		}

		&__trigger {
			align-items: center;
			padding-left: 20rpx;
			width: 100%;

			&>button {
				padding: 0;
				height: 36px;
				font-size: 14px;
				display: flex;
				align-items: center;
				background-color: transparent;

				&:after {
					border: none;
				}
			}
		}

		&__calendar {
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
		}
	}
</style>
