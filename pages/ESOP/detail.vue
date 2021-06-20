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
			<view class="form-content" style="padding-bottom: 0;">
				<view class="form-item">
					<view class="form-label align-right">
						站点
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled="" :maxlength="-1" type="text" v-model="sendCall.OPERATION_SITE_NAME"
						 placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						呼叫类型
					</view>
					<view class="form-value disabled">
						<input class="form-input " disabled="" :maxlength="-1" type="text" v-model="type" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						呼叫代码
					</view>
					<view class="form-value">
						<picker mode="selector" :range="callList.map(item => item.CALL_CODE)" @change="picker">
							<div class="picker-s">
								<input class="form-input" :style="{
										color: callList.map(item => item.CALL_CODE)[codeIndex] ? '#333' : 'rgb(138, 138, 138)' ,textAlign:'left',width:'100%'
									}"
								 disabled type="text" :value="callList.map(item => item.CALL_CODE)[codeIndex] ? callList.map(item => item.CALL_CODE)[codeIndex] : '请选择呼叫代码'"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						呼叫内容
					</view>
					<view class="form-value">
						<textarea class="form-textarea" @blur="bindTextAreaBlur" auto-height :value="content" placeholder='请填写呼叫内容' />
						</view>
				</view>
					<scroll-view scroll-x>
						
						<u-table class="tableInfor" type="selection" emptyText="没有数据"
							style="position: relative;overflow: scroll;width: 1820rpx;" :style="{
						height: msgContentHeight + 'px'
					}">
							<u-tr style="position: sticky;top: 0;overflow: scroll;">
								<u-th style="flex: 0;">
									<u-checkbox @change="checkAllChange" v-model="tableAllChecked">
									</u-checkbox>
								</u-th>
								<u-th style="width: 200rpx;">呼叫编号</u-th>
								<u-th style="width: 400rpx;">线体名称</u-th>
								<u-th style="width: 400rpx;">站位名称</u-th>
								<u-th style="width: 400rpx;">呼叫时间</u-th>
								<u-th style="width: 200rpx;">呼叫代码</u-th>
								<u-th style="width: 200rpx;">呼叫内容</u-th>
							</u-tr>
								<u-tr v-for="(item, index) in callTable" :key="item.Id">
									<u-td style="flex: 0;">
										<u-checkbox :value="item.selectStatus" @change="checkBoxChange(item.CALL_NO)"/>
									</u-td>
									<u-td style="width: 200rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.CALL_NO }}</u-td>
									<u-td style="width: 400rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.OPERATION_LINE_NAME }}</u-td>
									<u-td style="width: 400rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.OPERATION_SITE_NAME }}</u-td>
									<u-td style="width: 400rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.CREATE_TIME }}</u-td>
									<u-td style="width: 200rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.CALL_CODE }}</u-td>
									<u-td style="width: 200rpx;overflow: hidden;white-space:nowrap;line-height: 21px;">{{ item.CALL_CONTENT }}</u-td>
								</u-tr>
						</u-table>
					</scroll-view>
				
			</view>
		</view>
	
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn" @tap="sign_but">
					<text class="tix">签到</text>
				</view>
				<view class="toolbar-btn primary" @tap="shout_but">
					<text class="tix">呼叫</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script>
	import graceHeader from '../../graceUI/components/graceHeader.vue';
	import gracePage from '../../graceUI/components/gracePage.vue';
	import {
		CallConfig,
		GetRecordBySiteId,
		AddCallRecord,
		EditCallRecord
	} from '@/api/ESOP.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				type: null,
				callList: [],
				content: '',
				codeIndex: -1,
				callTable: [],
				siteID: null,
				lineID: null,
				callTypeCode: null,
				tableAllChecked: false,
				checkedCALL_NOs: [],
				signArr:{
					CHECKIN_OPERATOR: '', // 账号
					CALL_RECORD_IDS: '' // id
				},
				sendCall:{},
				msgContentHeight:200
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			initPage(option) {
				this.initRecord(option)
			},
			selectType(type) {
				this.callTypeCode = type;
				switch (type) {
					case '0':
						this.type = '缺料呼叫'
						break;
					case '1':
						this.type = '品质呼叫'
						break;
					case '2':
						this.type = '设备呼叫'
						break;
					case '3':
						this.type = '帮助呼叫'
						break;
				};
				this.sendCall.callTypeCode=type
				this.initCall(this.sendCall).then(res => {
					console.log(res)
					this.callList = res.Result
				});
			},
			async initCall(callTypeCode) {
				return await CallConfig(callTypeCode)
			},
			async initRecord(option) {
				const lineList = this.$store.getters.lineList || [];
				const lineIndex = this.$store.getters.currentLine;
				const stationList = this.$store.getters.stationList || [];
				const stationIndex = this.$store.getters.currentStation;
				console.log(stationList[stationIndex])
				
				this.sendCall.LINE_NAME=lineList[lineIndex].LINE_NAME
				this.sendCall.OPERATION_SITE_NAME=stationList[stationIndex].OPERATION_SITE_NAME
				this.sendCall.OPERATOR=this.userInfo.USER_NAME
				this.selectType(option.type)
				
				this.lineID = lineList[lineIndex].SMT_LINE_ID;
				this.siteID = stationList[stationIndex].ID;
				let query = {
					Page: 1,
					Limit: 15,
					OPERATION_LINE_ID: this.lineID,
					SITEID: this.siteID
				}
				const res = await GetRecordBySiteId(query)
				if (res.Result) {
					this.callTable = JSON.parse(res.Result)
					this.callTable.map(item => item.selectStatus = false)
				}
			},
			picker(e) {
				this.codeIndex = parseInt(e.detail.value)
				this.content = this.callList[this.codeIndex].CHINESE
			},
			bindTextAreaBlur(e) {
				this.content = e.detail.value
			},
			async shout_but() {
				if (this.codeIndex === -1) {
					uni.showModal({
						title: '提示',
						content: '请选择呼叫代码',
						showCancel: false,
					})
					return
				}
				if (this.content === '') {
					uni.showModal({
						title: '提示',
						content: '请输入呼叫内容',
						showCancel: false,
					})
					return
				}
				
				const params = {
					CALL_TYPE_CODE: this.callTypeCode,
					CALL_CONTENT: this.content,
					CALL_CODE: this.callList.map(item => item.CALL_CODE)[this.codeIndex],
					OPERATION_SITE_ID: this.siteID ? this.siteID : '000',
					OPERATOR: this.userInfo.USER_NAME
				}
				const res = await AddCallRecord(params)
				if (res.Result) {
					var myDate = new Date()
					var obj = {
						CREATE_TIME: myDate.toLocaleString(),
						OPERATOR: this.userInfo.USER_NAME,
						CALL_CONTENT: this.content
					}
					uni.showModal({
						title: '提示',
						content: '呼叫成功',
						showCancel: false,
						success: () => {
							this.goback()
						}
					})
				}	
			},
			// 签到
				
			    async sign_but () {
					var ids = ''
					      for (var i = 0; i < this.callTable.length; i++) {
							if(this.callTable[i].selectStatus){
								ids += this.callTable[i].Id + '|'
							}
					      }
					console.log(ids, 'ids')
					this.signArr.CALL_RECORD_IDS = ids
			      if (this.signArr.CALL_RECORD_IDS === '') {
			        uni.showModal({
			        	title: '提示',
			        	content: '请选择签到的一行',
			        	showCancel: false,
			        })
			        return false
			      }
			      const res = await EditCallRecord(this.signArr)
			      if (res.Result) {
			        uni.showModal({
			        	title: '提示',
			        	content: '签到成功',
			        	showCancel: false,
						success: () => {
							this.goback()
						}
			        })
			      }
			    },
			checkAllChange(e){
				this.$forceUpdate(this.callTable.forEach(item => item.selectStatus = e.value))
			},
			checkBoxChange(e){
				this.callTable.forEach(item => {
					if(item.CALL_NO === e){
						this.$forceUpdate(item.selectStatus = !item.selectStatus)
					}
				})
			}
		},
		components: {
			graceHeader,
			gracePage
		},
		onLoad(option) {
			this.initPage(option)
		},
		onShow() {
				uni.getSystemInfo({
					success: _ => {
						const windowHeight = _.windowHeight
						this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(300)
					}
				})
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/styles/publics.scss';
	.grace-form {
		margin-top: 20rpx !important;
	}
	.toolbar-btn {
		width: 30% !important;
	}
	.u-checkbox{
		justify-content: center;
	}
	/* #ifdef APP-PLUS */
	.tableInfor{
		   display: -webkit-box;
	}
	/* #endif */
</style>
