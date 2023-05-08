<template>
	<view class="choose-date">
		<view class="choose-date__trigger">
			<button size="mini" @click="handleOpenCalendar" v-if="!$slots['trigger']" style="width: 100%;">
				<text v-if="model === ''" :style="[{color: '#999'}]">{{ placeholder }}</text>
				<text v-else> {{ formatDate(model) }} </text>
			</button>
			<slot name="trigger" :model="this.model"></slot>
		</view>
		<view class="choose-date__calendar">
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
			event: "update:modelValue"
		},
		props: {
			modelValue: {
				type: null,
				required: true
			},
			orgId: {
				type: String,
				default: undefined
			},
			autoSelect: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: "请选择日期"
			}
		},
		emits: ["update:modelValue"],
		data() {
			return {
				model: "",
				infos: [],
				loading: false
			}
		},
		computed: {
			hospitalAvailableDays() {
				return this.$store.getters["m_hospital/availableDays"]
			},
			hospitalId() {
				return this.$store.getters["m_hospital/id"]
			},
			queryForm() {
				return {
					beginDate: this.formatDate(new Date()),
					endDate: this.$utils.date().add(this.hospitalAvailableDays - 1, "day").format("YYYY-MM-DD"),
					checkOrgId: this.orgId ?? this.hospitalId
				}
			},
			selected() {
				if (this.loading) return undefined;
				return Array.from(Array(this.hospitalAvailableDays).keys()).map((i) => {
					const date = this.$utils.date().add(i, "day").format("YYYY-MM-DD");

					const item = this.infos.find((i) => date === i.orderDate);

					return {
						date,
						info: item?.status === "1" ? "可预约" : "已约满",
					};
				});
			},
		},
		watch: {
			infos() {
				const info = this.infos.find(i => this.isSameDate(this.modelValue, i.orderDate));

				if (info?.status === "1") return;

				this.model = ""
			},
			modelValue(val) {
				if (this.isSameDate(this.model, val)) return;

				this.model = this.formatDate(val)
			},
			model(val) {
				this.$emit("update:modelValue", val)
			}
		},
		methods: {
			async getAppointmentInfo(q) {
				if (this.loading) return;
				this.loading = true;
				try {
					const params = Object.assign({}, this.queryForm, q)

					if (!params.checkOrgId) {
						this.model = "";

						return
					}
					this.infos = await this.$api.appointment.order.getAppointmentInfo(params);

					if (!this.modelValue && this.autoSelect) {
						const availiableDate = this.infos.find(i => i.status === "1");

						if (availiableDate) {
							this.model = availiableDate.orderDate;
						}
					}
				} catch (error) {
					uni.$showMsg(error.message)
				}
				this.loading = false;
			},

			formatDate(date) {
				return this.$utils.formatDate(date, "YYYY-MM-DD")
			},

			isSameDate(d1, d2) {
				return this.$utils.date(d1).isSame(d2)
			},

			//日历禁用日期
			calendarDisableDate(date) {
				return !this.infos.some(
					(i) => i.status === "1" && this.isSameDate(date, i.orderDate)
				);
			},

			//设置日历日期cell样式类
			getCalerndarItemClass(date) {
				return this.infos.some(
						(i) => i.status === "1" && this.isSameDate(date, i.orderDate)
					) ?
					"available" :
					"full";
			},

			handleOpenCalendar() {
				this.getAppointmentInfo();
				this.$refs["calendar"]?.open();
			},

			handleCalendarConfirm({
				fulldate
			}) {
				const info = this.infos.find((i) =>
					this.isSameDate(fulldate, i.orderDate)
				);
				console.log(fulldate);

				if (info?.status === "1") {
					this.model = fulldate;
				}
			},


		}
	}
</script>

<style lang="scss" scoped>
	.choose-date {
		height: 100%;
		display: flex;
		align-items: center;

		&__info {
			display: flex;
			align-items: center
		}

		&__trigger {
			display: flex;
			align-items: center;
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