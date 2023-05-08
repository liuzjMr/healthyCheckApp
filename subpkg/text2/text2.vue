<!-- 新增人员页 -->
<template>
  <view>
    <!-- 表单 -->
    <form>
      <input type="text" v-model="name" placeholder="姓名" />
      <input type="text" v-model="age" placeholder="年龄" />
      <button type="submit" @click="submit">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      age: '',
    };
  },

  methods: {
    // 提交表单
    submit() {
      // 构造新的人员信息对象
      const person = {
        name: this.name,
        age: this.age,
      };

      // 返回列表页并将新的人员信息传递过去
      uni.navigateBack({
        delta: 1,
        success() {
          const pages = getCurrentPages();
		  console.log(111);
          const listPage = pages[pages.length - 1];
          listPage.addNewPerson(person);
        },
      });
    },
  },
};
</script>




<!-- <template>
	<div class="box">
		<div class="tab" ref="tab">
			<div v-for="(item, index) in tabs" :key="index">
				<div :class="{ active: active === index }" @click="switchTab(index)">
					{{ item }}
				</div>
			</div>
		</div>
		<div class="cont" ref="cont">
			<div class="cont_1" ref="cont_1">内容一</div>
			<div class="cont_2" ref="cont_2">内容二</div>
			<div class="cont_3" ref="cont_3">内容三</div>
		</div>
		<div class="back-top" @click="backTop"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tabs: ["tab1", "tab2", "tab3"],
				active: 0,
				cont1: null,
				cont2: null,
				cont3: null,
				isClickTab: false
			};
		},
		methods: {
			backTop() { // 回到顶部
				this.cont1.scrollIntoView({
					block: "start",
					behavior: "smooth"
				});
			},
			switchTab(index) { // 锚点跳转 根据当前index切换到对应的页面内容
				if (index === 0) {
					this.cont1.scrollIntoView({
						block: "start", //上边框与视窗顶部平齐
						behavior: "smooth" // 平滑过渡
					});
				} else if (index === 1) {
					this.cont2.scrollIntoView({
						block: "start",
						behavior: "smooth"
					});
				} else {
					this.cont3.scrollIntoView({
						block: "start",
						behavior: "smooth"
					});
				}
			}
		},
		mounted() {
			console.log(this.$refs["cont_1"]);
			this.cont1 = this.$refs["cont_1"];
			this.cont2 = this.$refs["cont_2"];
			this.cont3 = this.$refs["cont_3"];
			const tabH = this.$refs["tab"].offsetHeight;
			// 添加scroll事件监听
			this.$refs["cont"].addEventListener("scroll", () => {
				if (this.cont3.getBoundingClientRect().top <= tabH) {
					this.active = 2;
					return false;
				}
				if (this.cont2.getBoundingClientRect().top <= tabH) {
					this.active = 1;
					return false;
				}
				if (this.cont1.getBoundingClientRect().top <= tabH) {
					this.active = 0;
				}
			});
		}
	};
</script>
<style lang="scss" scoped>
	.box {
		font-size: 28px;
		overflow-x: auto;
		height: 100vh;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;

		.tab {
			height: 88px;
			background: #fff;
			line-height: 88px;
			color: #666;
			display: -webkit-flex;
			display: flex;
			justify-content: space-around;

			.active {
				font-size: 32px;
				color: #333;

				&::after {
					display: block;
					content: "";
					width: 36px;
					height: 6px;
					margin: auto;
					margin-top: -10px;
					background: rgba(255, 51, 0, 1);
					border-radius: 3px;
				}
			}
		}

		.cont {
			height: 300px;
			flex-grow: 1;
			overflow: auto;

			.cont_1 {
				height: 400px;
				background: pink;
			}

			.cont_2 {
				height: 800px;
				background: yellow;
			}

			.cont_3 {
				height: 100%;
				background: lightgreen;
			}
		}

		.back-top {
			width: 80px;
			height: 80px;
			background: url(../../static/home/1.jpg) center / 100% 100% no-repeat;
			border-radius: 50%;
			position: fixed;
			bottom: 120px;
			right: 32px;
		}
	}
</style> -->