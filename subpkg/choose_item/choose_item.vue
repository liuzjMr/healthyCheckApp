<template>
	<view class="container">
		<view class="hospital">
			{{hosptiaName}}
		</view>

		<!-- 搜索框 -->
		<view class="search">
			<u-search placeholder="搜索套餐" v-model="keyword" height="34" bg-color="#efefef" shape="square"
				@custom="searchBank" @search='searchBank'></u-search>
		</view>

		<uni-data-checkbox v-model="typeIndex" :localdata="type" class="checkBox" @change='switchType' />

		<view class="choosed">
			<span class="chooseItem">已选择{{selectedIndexs.length}}项</span>
			<span class="clear" @click="clearAll">清除所有</span>
		</view>

		<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
			@selection-change="selectionChange" class="table">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">套餐名字</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in comboList" :key="index">
				<uni-td align="center">
					<view class="name">{{ item.name }}</view>
				</uni-td>
			</uni-tr>
		</uni-table>

		<view class="total">
			共 {{comboList.length}} 个套餐
		</view>

		<view class="bottomBtn">
			<button class="submit" @click="confirm">完成选择</button>
		</view>

		<!-- 输入框示例 -->
		<uni-popup ref="confirm" type="dialog" class="popupConfirm">
			<uni-popup-dialog ref="inputClose" mode="input" title="确认体检项目" value="已勾选的项目" @confirm="yes">
				<view class="choosedItem" v-for="(item,index) in this.selectedItems" :key="index">
					<p>{{item.name}}</p>
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import tableData from '../../common/table.js'
	export default {
		data() {
			return {
				//当前医院的名字
				hosptiaName: '',
				// 搜索关键词
				keyword: '',
				//查询到的套餐列表
				comboList: [],
				//选择的套餐类型
				chooseType: '上岗前',
				// 表格数据
				tableData: [],
				// 每页数据量
				pageSize: 999,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				//套餐分类
				typeIndex: 0,
				//已选择的序列号
				selectedIndexs: 0,
				type: [{
					text: '上岗前',
					value: 0
				}, {
					text: '在岗期间',
					value: 1
				}, {
					text: '离岗时',
					value: 2
				}, {
					text: '离岗后',
					value: 3
				}, {
					text: '应急健康检查',
					value: 4
				}],
			}
		},
		computed: {
			//提取出已经选择的项目
			selectedItems() {
				return this.selectedIndexs.map(i => this.comboList[i])
			},
			//计算总价
			totalPrice() {
				return this.selectedItems.reduce((a, b) => a + Number(b.price), 0)
			},
			//已勾选项目的名字
			selectedName() {
				let arr = [];
				this.selectedItems.forEach(e => {
					arr.push(e.name)
				})
				return arr
			},
			//当前选择的医院信息
			hosptialInfo() {
				return this.$store.getters["m_hospital/info"];
			}
		},
		onLoad() {
			this.queryTComboList()

			this.hosptiaName = this.hosptialInfo.name

			this.selectedIndexs = []
		},
		methods: {
			//查询所有套餐列表
			async queryTComboList() {
				try {
					const {
						records: comboList
					} = await this.$api.appointment.combo.queryTComboList({
						pageSize: 999,
						careerStage: this.chooseType,
						name: this.keyword
					});
					this.comboList = comboList;
					console.log(this.comboList);
				} catch (error) {
					uni.$showMsg(error.message);
				}
			},

			//搜索套餐
			searchBank() {
				this.queryTComboList()
			},

			//切换套餐类型
			switchType(e) {
				this.chooseType = e.detail.data.text
				this.queryTComboList()
			},

			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index;
			},
			//清除所有
			clearAll() {
				this.selectedIndexs = [];
				this.$refs.table.clearSelection();
			},
			//完成选择
			confirm() {

				if (this.selectedItems == '') {
					uni.showToast({
						title: '请选择套餐项目!',
						duration: 2000,
						icon: "none",
					})
					return
				}

				this.$refs.confirm.open()
			},
			//确认
			yes() {
				this.$store.dispatch('m_combo/setInfo', this.selectedItems)

				const temp = this.selectedItems;
				let arr = []
				temp.forEach(e => {
					arr.push(e.id)
				})

				this.$store.dispatch('m_mainInfo/setGroupPakeage', arr)

				uni.navigateTo({
					url: '/subpkg/order_info/order_info'
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		background-color: #fff;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.hospital {
			display: flex;
			width: 100%;
			height: 100rpx;
			line-height: 120rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			font-weight: bold;
			font-size: 34rpx;
		}

		.search {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding: 30rpx;
		}

		.checkBox {
			width: 95%;
			height: 120rpx;
			display: flex;
			justify-content: center;

			/deep/ .checklist-box {
				margin: 15rpx 40rpx 20rpx 10rpx;
			}
		}

		.choosed {
			width: 95%;
			height: 70rpx;
			display: flex;
			align-items: center;
			background-color: #f0faff;
			border: 1px solid #bce3ff;
			border-radius: 10rpx;
			margin-top: 20rpx;

			.chooseItem {
				margin-left: 20rpx;
			}

			.clear {
				font-size: 30rpx;
				margin-left: 20rpx;
				color: #1d7dfc;
			}
		}

		.table {
			height: 500px;
			margin-top: 30rpx;
			border-bottom: 1px solid #ebeef5;

			/deep/ .checkbox {
				padding: 0 20px;
			}
		}

		.total {
			flex: 12%;
			height: 100rpx;
			margin-top: 30rpx;
		}

		.uni-pagination-box {
			margin-top: 30rpx;
		}

		.bottomBtn {
			position: fixed;
			width: 100%;
			height: 100rpx;
			bottom: 0rpx;
			z-index: 1;

			.submit {
				width: 95%;
				border-radius: 100rpx;
				background-color: #1d7dfc;
				color: #fff;
			}
		}

		.popBox {
			background-color: #fff;
			width: 200rpx;
			height: 200rpx;
		}

		.popupConfirm {
			/deep/ .uni-dialog-content {
				display: flex;
				flex-direction: column;
				line-height: 50rpx;
			}
		}
	}
</style>