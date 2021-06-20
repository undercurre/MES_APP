<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">站点配置</text></view>
			</view>
		</graceHeader>
		
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<image style="width: 250px;" src="/static/logo_2.png" lazy-load mode="widthFix" class="logo"></image>
				</view>
			<form class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item item-border">
					<text class="grace-form-label">线体</text>
					<view class="grace-form-body">
						<text class="grace-form-label">{{ currentLine.LINE_NAME }}</text>
					</view>
				</view>
				<view class="grace-form-item item-border">
					<text class="grace-form-label">站点</text>
					<view class="grace-form-body">
						<picker mode="selector" :range="StationtoList" @change="picker">
							<div class="picker-s">
								<input class="form-input" :style="{
								color: StationtoList[listIndex] ? '#333' : 'rgb(138, 138, 138)' ,textAlign:'left',width:'100%'
							}" disabled type="text" :value="StationtoList[listIndex] ? StationtoList[listIndex] : '请选择站点'"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
			</form>
		
			<view style="width:700rpx;margin: 0 auto;">
				<view class="flex-right" style="align-items: center;"><text class="sys-no">当前版本：IMS {{ current_version }}</text></view>
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">取消</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script>
import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	SysConnectPTS
} from '@/api/work.js'
import * as config from '@/utils/config.js'
import {
	Station
} from '@/api/ESOP.js'
export default {
	data() {
		return {
			currentLine: null,
			StationtoList: [],
			listIndex: -1
		}
	},
	computed: {
		current_version() {
			return this.$store.state.system.versionId
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			this.$store.commit('system/SET_CURRENTSTATION', this.listIndex)
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '站点设置成功',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						uni.navigateBack({
							delta: 1
						})
					}
				}
			})
		},
		picker(e) {
			this.listIndex = parseInt(e.detail.value)
		},
		initPage() {
			// 读取当前线体
			const lineList = this.$store.getters.lineList || [];
			const index = this.$store.getters.currentLine;
			console.log(lineList)
			this.currentLine = lineList[index]
			// 加载站点列表
			this.getStatusList()
			// 读取当前站点
			this.listIndex = this.$store.getters.currentStation;
		},
		async getStatusList () {
			const stationList=this.$store.getters.stationList
			console.log(stationList)
			if(stationList){
				this.StationtoList=stationList.map(item => item.OPERATION_SITE_NAME) || [];
			}
		},
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.initPage()
	},
	onShow() {
		
	}
}
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
.marginTop {
	margin-top: 100rpx;
}
.logo {
	width: 250rpx;
	height: 68rpx;
}
.grace-form-label {
	width: 168rpx;
	font-size: 36rpx;
	color: #444444;
}
.grace-form-input {
	text-align: left;
	font-size: 36rpx;
	color: #333;
}
.grace-form-item {
	padding: 10rpx 0;
}
.item-border {
/* 	border-bottom-color: #e5e5e5;
	border-bottom-width: 1rpx;
	border-style: solid; */
	border-bottom: 1rpx solid #e5e5e5;
}
.grace-login-three-items {
	width: 88rpx;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 60rpx;
	color: #3688ff;
	text-align: center;
	margin: 10rpx;
}
.main-tit {
	color: #ffffff;
}
.flex-right {
	width: 700rpx;
	height: 100rpx;
	flex-direction: row;
	text-align: right;
	justify-content: flex-end;
	margin-top: 20rpx;
}
.grace-text {
	font-size: 34rpx;
	color: #555;
	text-align: right;
	margin-right: 25rpx;
}
.sys-no {
	font-size: 32rpx;
	color: #555;
}
</style>

