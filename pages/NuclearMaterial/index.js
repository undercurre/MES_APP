import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
// import {
// 	ConfirmPDAFeederCheckData,
// 	SavePDAFeederCheckData,
// 	AuditFeederCheckData,
// 	LoadPDAFeederCheckInfo
// } from '@/api/SmtFeeder.js'
import {
	GetPickingListData,
	CheckPickingByReelCode
} from '@/api/MesPartShelf.js'

export default {
	computed: {
		isfilter() {
			return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		},
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},

	data() {
		return {
			Form: {
				// CHECK_CODE: '',// 飞达点检编号(新增不传)
				// FEEDER_BODYMARK	: '', //飞达编号（必传）
				// CHECK_USER: '', //点检人员（必传）
				// CHECK_REMARKS: '',// 点检备注
				WoNo: '', //工单(*)
				REELCODE: '', //物料条码
				UserName: '', //用户(*)
				Page: 1,
				Limit: 15
			},
			totalCount: 0,
			autoFocus: true,
			autoFocusNext: false,
			list: []
		}
	},
	onLoad(e) {
		// console.log(e,'eee MSTID')
		// this.formData.ID = e.MSTID || 0
		// this.Form.CHECK_CODE = e.EEDER || ''
		// if(this.Form.CHECK_CODE){
		// 	console.log('11111')
		// 	this.getdata()
		// } else{
		// 	this.getLoadPDAFeederCheckInfo()
		// }
		//  this.list =[
		//   {
		//     "HID": 0,
		//     "PART_NAME": "热敏电阻",
		//     "PART_CODE": "110400400200012X",
		//     "QTY": 70,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   },
		//   {
		//     "HID": 0,
		//     "PART_NAME": "板板连接器插头",
		//     "PART_CODE": "110801600200008X",
		//     "QTY": 70,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   },
		//   {
		//     "HID": 0,
		//     "PART_NAME": "红外发射管",
		//     "PART_CODE": "112200400100007X",
		//     "QTY": 70,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   },
		//   {
		//     "HID": 0,
		//     "PART_NAME": "红外接收管",
		//     "PART_CODE": "112200500100004X",
		//     "QTY": 70,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   },
		//   {
		//     "HID": 0,
		//     "PART_NAME": "PCB板",
		//     "PART_CODE": "111408000200127X",
		//     "QTY": 70,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   },
		//   {
		//     "HID": 0,
		//     "PART_NAME": "圆体间隔柱",
		//     "PART_CODE": "120700700600001X",
		//     "QTY": 140,
		//     "CHECK_QTY": 0,
		//     "STATUS": "未核对"
		//   }
		// ]

	},
	methods: {
		async getLoadPDAFeederCheckInfo() {
			const res = await LoadPDAFeederCheckInfo(this.userInfo.USER_NAME)
			if (res.Result) {
				this.list = res.Result || []
			}
		},
		async getWoNo() {
			if (!this.Form.WoNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工单',
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
			this.Form.UserName = this.userInfo.USER_NAME
			const res = await GetPickingListData(this.Form)
			if (res.Result) {
				const data = res.Result || []
				// if (this.Form.Page === 1) {
				this.list = data
				// } else {
				// 	this.list = this.list.concat(data)
				// }
				// this.Form.Page++
				this.totalCount = res.TotalCount
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}

		},
		// 分页
		changeReason3(e) {
			this.Form.Page = e.current
			this.getWoNo()
		},
		detailClick(item) {
			console.log(item, 'item')
			uni.navigateTo({
				url: '/pages/NuclearMaterial/NuclearDetails?HID=' + item.HID + '&&QTY=' + item.QTY + '&&CHECK_QTY=' + item.CHECK_QTY
			})
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.Form.WoNo) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入工单',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.autoFocusNext = false
						}
					}
				})
				return false
			}
			if (!this.Form.REELCODE) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入物料',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = false
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await CheckPickingByReelCode(this.Form)
			if (res.Result) {
				this.Form.REELCODE = ''
				this.Form.WoNo = ''
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {}
				})
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

	},

	components: {
		graceHeader,
		gracePage,
		uniPagination
	},
	// onShow() {
	// 	this.Form.Page = 1
	// 	// this.getWoNo()
	// 	// this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	// },
	// onPullDownRefresh() {
	// 	this.Form.Page = 1
	// 	this.list = []
	// 	this.getWoNo()
	// },
	// onReachBottom() {
	// 	this.getWoNo()
	// }
}
