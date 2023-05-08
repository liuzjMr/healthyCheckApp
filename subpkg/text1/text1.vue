<template>
	<view>
		<view class="wrap">
			<u-swiper :list="list"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						url: '/static/hosptial/11.png',
						title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
					},
					{
						url: '/static/hosptial/22.png',
						title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
					},
					{
						url: '/static/hosptial/33.png',
						title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
					}
				]
			};
		},
		onLoad() {},

		methods: {


		},
	};
</script>