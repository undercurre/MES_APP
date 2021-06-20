<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">安灯区</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<!-- 宫格布局 -->
				<view style="font-size: 16px;color: #666;line-height: 3;font-weight: 600;">安灯类型</view>
				<view class="grace-grids">
					<view class="grace-grids-items two" v-for="item in typeList" :key="item.id" @click="selectType(item.id)">
						<image class="grace-grids-icon-img" lazy-load :src="item.icon" mode="widthFix"></image>
						<text class="grace-grids-text">{{ item.text }}呼叫</text>
					</view>
				</view>
		</view>
	</gracePage>
		<!-- <view slot="gBody" class="grace-body">
			<view class="topBox">
				<view class="blockTop title">安灯类型</view>
				<view class="blockTop" @click="selectType(0)">
					<text>缺料</text>
				</view>
				<view class="blockTop" @click="selectType(1)">
					<text>品质</text>
				</view>
				<view class="blockTop" @click="selectType(2)">
					<text>设备</text>
				</view>
				<view class="blockTop" @click="selectType(3)">
					<text>帮助</text>
				</view>
			</view>
		</view> -->
</template>

<script>
	import graceHeader from '../../graceUI/components/graceHeader.vue';
	import gracePage from '../../graceUI/components/gracePage.vue';
	export default {
		data() {
			return {
				typeList:[{
					id: 0,
					text: '缺料',
					icon: '/static/newIcons/less.png'
				},{
					id: 1,
					text: '品质',
					icon: '/static/newIcons/qual.png'
				},{
					id: 2,
					text: '设备',
					icon: '/static/newIcons/equi.png'
				},{
					id: 3,
					text: '帮助',
					icon: '/static/newIcons/help.png'
				}]
			}
		},
		components: {
			graceHeader,
			gracePage
		},
		onLoad() {
			this.initPage()
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			selectType(type) {
				uni.navigateTo({
					url: `/pages/ESOP/detail?type=${type}`
				})
			},
			initPage() {
				// 检查当前是否配置站点
				let station = this.$store.getters.currentStation;
				if (!station && station !== 0) {
					uni.showModal({
						title: '提示',
						content: '没有设置站点，请到设置页的站点配置进行配置',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: `/pages/stationSet/stationSet`
								})
							} else if (res.cancel) {
								console.log('取消')
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
.demo_body {
	padding: 200rpx 150rpx;
}
.index_logo {
	width: 320rpx;
	height: 52rpx;
	margin-top: 188rpx;
}
.demo {
	margin-top: 20rpx;
}
.two {
	width: 350rpx;
	/* height: 233.3333333333333rpx; */
	/* height: 180rpx; */
	margin-bottom: 20rpx;
}
.three:active {
	background-color: rgb(239, 241, 246);
	/* background-color: red; */
}
.five {
	width: 140rpx;
}
.grace-grids-icon-img {
	width: 120rpx;
	height: 120rpx;
	zoom: 0.7;
}
.grace-grids-text {
	font-size: 32rpx;
	line-height: 34rpx;
	margin-top: 10px;
	color: #555;
}

.backTo {
	display: flex;
	align-items: center;
	width: 750rpx;
	position: relative;
	margin-left: -25rpx;
	height: 100rpx;
	background: #fffbe8;
	box-sizing: border-box;
	padding: 0 25rpx;
	color: #ed6a0c;
}

.backTo .b-img {
	width: 40rpx;
	height: 40rpx;
}

.backTo .b-txt {
	font-size: 16px;
	line-height: 1;
	color: rgb(79,125,145);
	margin-left: 20rpx;
}
</style>
