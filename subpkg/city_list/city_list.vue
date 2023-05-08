<template>
	<view class="container">
		<citySelect @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity"
			:obtainCitys="obtainCitys" :isSearch="true" ref="citys"></citySelect>
	</view>
</template>

<script>
	import citySelect from "@/components/city-select/city-select.vue"
	import citys from '@/common/citys.js'
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'title',
				//当前城市
				activeCity: {
					id: 1,
					title: '泸州市'
				},
				//热门城市
				hotCity: [{
						id: 0,
						title: '成都市'
					},
					{
						id: 1,
						title: '重庆市'
					}
				],
				//显示的城市数据
				obtainCitys: [{
						id: 0,
						title: '南京市'
					},
					{
						id: 1,
						title: '北京市'
					},
					{
						id: 2,
						title: '天津市'
					},
					{
						id: 3,
						title: '九江市'
					},
					{
						id: 4,
						title: '宜春市'
					},
					{
						id: 5,
						title: '上饶市'
					},
					{
						id: 6,
						title: '开封市'
					},
					{
						id: 7,
						title: '鹤壁市'
					},
					{
						id: 8,
						title: '周口市'
					},
					{
						id: 9,
						title: '长沙市'
					},
					{
						id: 10,
						title: '常德市'
					},
					{
						id: 11,
						title: '江门市'
					},
					{
						id: 12,
						title: '南宁市'
					},
					{
						id: 13,
						title: '自贡市'
					}
				]
			}
		},
		components: {
			citySelect
		},
		methods: {
			cityClick(item) {
				uni.showToast({
					icon: 'none',
					title: 'item: ' + JSON.stringify(item),
					// #ifdef MP-WEIXIN
					duration: 3000,
					// #endif
					mask: true
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		/deep/ .city-select .hot-title {
			padding-left: 20rpx;
		}

		/deep/ .city-select .hot-city {
			padding-left: 20rpx;
		}
	}
</style>