<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search">
			<u-search placeholder="搜机构" v-model="keyword" height="34" bg-color="#efefef" shape="square"
				:focus="true"></u-search>
		</view>

		<!-- 搜索建议列表 -->
		<view class="suggList" v-if="searchResults.length !== 0">
			<view class="suggItem" v-for="(item,i) in searchResults" :key="i">
				<u-icon name="search" size="18" style="margin-top: 3rpx;"></u-icon>
				<view class="name">{{item.name}}</view>
			</view>
		</view>

		<!-- 历史搜索 -->
		<view class="historySearch" v-if="searchResults.length == 0">
			<view class="header">
				<span>历史搜索</span>
				<u-icon name="trash" size="18" @click="clearHistory" />
			</view>

			<span class="history">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" class="tag"></uni-tag>
			</span>
		</view>

		<!-- 热门搜索 -->
		<view class="hotSearch" v-if="searchResults.length == 0">
			<p>热门搜索</p>
			<view class="hotSearchList">
				<span class="index_top">01</span>
				<span class="name">西南医科大学附属中医医院</span>
			</view>

			<view class="hotSearchList">
				<span class="index_top">02</span>
				<span class="name">泸州市人民医院</span>
			</view>

			<view class="hotSearchList">
				<span class="index_top">03</span>
				<span class="name">泸州市中医医院</span>
			</view>

			<view class="hotSearchList">
				<span class="index">04</span>
				<span class="name">美年大健康门诊部</span>
			</view>

			<view class="hotSearchList">
				<span class="index">05</span>
				<span class="name">江阳区卫生院</span>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//搜索关键词
				keyword: '',
				//搜索历史
				historyList: [],
				//搜索的结果列表
				searchResults: [],
				//节流延时器
				timer: null
			};
		},
		onLoad() {
			//获取本地搜索记录
			this.historyList = JSON.parse(uni.getStorageSync('keyword') || '[]')
		},
		methods: {
			//向后端发送请求，拿到所有的搜索建议数据
			async getSearchList() {
				try {
					//为空则不搜索
					if (this.keyword.length == 0) {
						this.searchResults = []
						return
					}
					const res = await this.$api.appointment.hospital.getAllCheckOrg({
						name: this.keyword
					})
					this.searchResults = res
					//调用保存
					this.saveSearchHistory()
				} catch (error) {
					console.log(error);
				}
			},
			//清除历史记录
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('keyword', '')
			},
			//保存搜索关键词
			saveSearchHistory() {
				this.historyList.push(this.keyword)

				//转换为set数组 进行去重 并且保证最新的输入值在数组最后
				const set = new Set(this.historyList)
				set.delete(this.keyword)
				set.add(this.keyword)
				//再转换回来
				this.historyList = Array.from(set)

				//持久化存储
				uni.setStorageSync('keyword', JSON.stringify(this.historyList))

			}
		},
		watch: {
			//监听keyword
			keyword: {
				immediate: true,
				//节流
				handler(newValue, oldValue) {
					//清除延时器
					clearTimeout(this.timer)
					//开启延时器
					this.timer = setTimeout(() => {
						// console.log(newValue);
						this.keyword = newValue
						this.getSearchList()
					}, 300)
				}
			}
		},
		computed: {
			//翻转数组 最后搜索的记录在最前面
			histories() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;

		.search {
			width: 93%;
			margin-top: 20rpx;

			/deep/ .u-search__content__input {
				font-size: 26rpx;
			}
		}

		.suggList {
			width: 100%;
			margin-top: 10rpx;

			.suggItem {
				display: flex;
				padding: 20rpx 30rpx;

				.name {
					font-size: 30rpx;
					margin-left: 20rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

			}
		}

		.historySearch {
			width: 100%;
			display: flex;
			flex-direction: column;

			.header {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx 20rpx 30rpx;
				margin-top: 30rpx;
				font-size: 28rpx;
			}

			.history {
				display: inline-block;
				width: 90%;
				line-height: 80rpx;
				font-size: 28rpx;
				padding: 0 30rpx;
				word-wrap: break-word;
				white-space: normal;


				/deep/ .uni-tag {
					color: #000;
					font-weight: normal;
					font-size: 28rpx;
					background-color: #efefef;
					border-color: #efefef;
					border-radius: 28rpx;
				}

				.tag {
					margin-right: 15rpx;

				}
			}
		}

		.hotSearch {
			display: flex;
			flex-direction: column;
			width: 100%;

			p {
				padding: 30rpx 0 10rpx 30rpx;
				font-size: 28rpx;
			}


			.hotSearchList {
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;

				.index_top,
				.index {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: orangered;
				}

				.index {
					color: gray;
				}

				.name {
					margin-left: 30rpx;
					font-size: 30rpx;
				}
			}
		}
	}
</style>