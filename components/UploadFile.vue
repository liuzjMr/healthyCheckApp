<template>
	<view>
		<camera></camera>

		<button type="primary" @click="takePhoto">拍照</button>
	</view>
</template>

<script>
	export default {
		methods: {
			takePhoto() {
				console.log("click")
				const ctx = uni.createCameraContext();

				ctx.takePhoto({
					quality: "high",
					success: (e) => {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style>
</style>
