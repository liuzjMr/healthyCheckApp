<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search">
			<u-search placeholder="请输入体检编号进行查找" v-model="keyword" :show-action="false" bg-color="#fff"></u-search>
		</view>
		
		<!-- 报告列表 -->
		<view class="list">
			<view class="header">
				<view class="left">
					体检时间:2023-03-12 08:00-09:30
				</view>
				<view class="right">
					已完成
				</view>
			</view>
			
			<view class="middle">
				<p class="type">入职入学体检【胸部DR、尿常规、心电图】</p>
				<p class="hosptial">西南医科大学附属中医医院(城北院区)</p>
				<p class="name">体检人：张三</p>
				<p class="number">体检编号：OD45145241545</p>
			</view>
			
			<view class="footer">
				<span>查看详情</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//搜索栏输入关键字
				keyword: ''
			};
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f6f6f6;
		position: absolute;
		width: 100%;
		height: 100%;

		.search {
			display: flex;
			align-items: center;
			width: 95%;
			height: 100rpx;
		}
		
		.list{
			width: 95%;
			height: 365rpx;
			background-color: #fff;
			border-radius: 10rpx;
			
			.header{
				display: flex;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;
				
				.left{
					flex: 8.5;
					font-size: 26rpx;
				}
				
				.right{
					flex: 1.5;
					text-align: center;
					font-size: 26rpx;
					color: gray;
				}
			}
			
			.middle{
				height: 170rpx;
				padding: 20rpx;
				border-bottom: 1px solid #efefef;
				
				.type{
					font-weight: bold;
				}
				
				.hosptial,
				.name,
				.number{
					margin-top: 10rpx;
					font-size: 26rpx;
					color: gray;
				}
			}
			
			.footer{
				display: flex;
				padding: 15rpx;
				float: right;
				
				span{
					display: block;
					width: 140rpx;
					height: 50rpx;
					font-size: 26rpx;
					text-align: center;
					line-height: 50rpx;
					margin-left: 20rpx;
					border-radius: 30rpx;
					font-weight: bold;
					border: 1px solid #efefef;
				}
			}
		}
		
	}
</style>