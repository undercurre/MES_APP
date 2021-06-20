<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">转工单作业</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						站点
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled="" :maxlength="-1" type="text" v-model="currentStation.OPERATION_SITE_NAME"  placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value">
						<picker  mode="selector" :range="WONOList" range-key="WO_NO" @change="handleChangeWONO">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="WONOList[WONOIndex] ? WONOList[WONOIndex] : ''" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						输入数据
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="enterVal" placeholder=" " :focus="autoFocus" @confirm="EnterCheckRee">
					</view>
				</view>
			</view>
			<view class="view-status" style="background-color: #fff;box-shadow: 0 1px 10rpx #e5e5e5;" >
				<view class="view-item" v-for="(item, index) in statusList" :key="index" :class="{active: checkStatusIndex === index}"
				 @tap="handleChangeStatus(index)">{{ item.SBU_CHINESE }}</view>
			</view>
			<view class="form-item u-table-data" v-if="checkStatusIndex === 0" style="margin-top: 20rpx;">
				<u-table style="position: relative;">
					<u-tr style="position: sticky;top: 0;">
						<u-th style="width: 140rpx">部件名称</u-th>
						<u-th style="width: 180rpx">应收集数量</u-th>
						<u-th style="width: 180rpx">已收集数量</u-th>
						<u-th style="width: 140rpx">部件料号</u-th>
						<u-th style="width: 140rpx">数据格式</u-th>
					</u-tr>
					<u-tr v-for="(item, index) in collectList" :key="index">
						<u-td style="width: 280rpx;overflow: hidden;line-height: 21px;">{{ item.OBJECT_NAME }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.NEED_ASSEMBLY_QTY }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.COLLECTED_QTY }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.DATA_FORMAT }}</u-td>
						<u-td style="width: 140rpx;overflow: hidden;line-height: 21px;">{{ item.PART_NO }}</u-td>
					</u-tr>
				</u-table>
			</view>
			<view v-else style="border: 1px solid #e5e5e5;width: 100%;margin-top: 20rpx;height: 400rpx;overflow: auto;">
			{{NewsInfo}}
			</view>
		</view>
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">退出</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script>
import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	Sites,
	SaveSite, // 保存站点
	CollectData
} from '@/api/CollectProducts.js'
import {
	GetWONO
} from '@/api/tranOrder.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			WONOList: [],
			WONOIndex: -1,
			// 保存站点
			SiteFrom: {
				SiteId: '',
				UserName: ''
			},
			SiteObj: '',
			enterVal: '',
			NewsInfo: '',
			statusBarHeight: 0,
			checkStatusIndex: 0,
			statusList: [{
					ID: '1',
					SBU_CHINESE: '采集数据'
				},
				{
					ID: '2',
					SBU_CHINESE: '消息区'
				},
			],
			collectList: [],
			autoFocus: true,
		
			LINEID: ''
		}
	},
	onLoad() {
		var lineBox = this.$store.state.system.lineList
		lineBox.map((v, i) => {
			if (this.$store.state.system.currentLine === i) {
				this.LINEID = v.SMT_LINE_ID
				this.getSites()
			}
		})
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
		
		this.SiteFrom.UserName = this.userInfo.USER_NAME
		
		const stationIndex = this.$store.getters.currentStation;
		const stationList = this.$store.getters.stationList;
		this.currentStation = stationList[stationIndex]
		
		GetWONO({
			WO_NO: ''
		}).then(res => {
			this.WONOList = res.Result.map(item => item.WO_NO)
			})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getSites() {
			console.log(this.LINEID, 'this.LINEID')
			var obj = {
				OPERATION_LINE_ID: this.LINEID,
				Page: 1,
				Limit: 1000000
			}
			const res = await Sites(obj)
			const data = JSON.parse(res.Result)
			this.zhichengList = data || []
		},
		handleChangeWONO(e) {
			this.WONOIndex = e.detail.value
			this.SiteFrom.SiteId = this.currentStation.ID || ''
			this.getSaveSite()
		},
		async getSaveSite() {
			const res = await SaveSite(this.SiteFrom)
			this.SiteObj = res.Result || {}
		},
		async EnterCheckRee(e) {
			if (!this.SiteFrom.SiteId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false
			this.SiteObj.data = this.enterVal
			const res = await CollectData(this.SiteObj)
			console.log(res, 'CollectData')
			if (res.Result) {
				this.SiteObj = res.Result
				this.NewsInfo = res.Result.msg || ''
				this.collectList = res.Result.collectDataViews || []
				// this.collectList = [{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	}
				// ]
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}


		},
		handleChangeStatus(index) {
			this.checkStatusIndex = index
		},
		resetFormData(isVibrate = false) {

			this.zhichengIndex = -1
			this.enterVal = ''
			this.NewsInfo = ''
			this.collectList = []
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		}
	}
}

</script>

<style scoped lang="scss">
@import '~@/styles/publics.scss';
.form-label {
	width: 5em!important;
}
.form-content{
	padding-bottom: 0rpx;
	.form-item{
		align-items: center;
	}
}
.u-table-data{
	overflow: auto;
	height: 770rpx;
}
.view-status {
	height: 100rpx;
	position: relative;
	// margin-left: -25rpx;
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	// padding: 0 30rpx;
	box-shadow: none !important;
}
.view-item {
	width: 20%;
	height: 100%;
	color: #666;
	font-size: 32rpx;
	line-height: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.view-item.active:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2rpx;
	background-color: rgb(51, 122, 183);
	width: 100%;
}
.view-item.active {
	color: rgb(51, 122, 183);
}
.u-th,
.u-td {
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	display: inline-block;
}
</style>

