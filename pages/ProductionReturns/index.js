import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import {
	GetProductionInfoByReel,
	CreateIssueApplyDoc
} from '@/api/ProductionReturns.js'
export default {
	data() {
		return {
			form: {
				reelCode: '',
				PART_CODE: '',
				PART_DESC: '',
				DOCNO: '',
				MO: '',
				WH: '',
				LineNo:'',
				QUANTITY: null,
			},
			selectionEnd: 0,
			autoFocus: true, // 物料条码
			autoFocusNewLocation: false // 退料数量
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async submitForm() {
			this.autoFocus = this.autoFocusNewLocation = false
			const map = {
				"reelCode": {
					"msg": "请输入物料条码",
					"field": "autoFocus"
				},
				"QUANTITY": {
					"msg": "请输入退料数量",
					"field": "autoFocusNewLocation"
				}
			}
			try {
				Object.keys(map).forEach(item => {
					if (!this.form[item]) {
						uni.showModal({
							title: '提示',
							content: map[item].msg || '',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this[map[item].field] = true
								}
							}
						})
						this.$voice.errro()
						throw Error(map[item].msg)
					}
				})
				uni.showModal({
					title: "提示",
					content: "确定要提交?",
					success: (res) => {
						if (res.confirm) {
							this.submitData()
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})

			} catch (e) {

			}
		},
		async submitData() {
			
			this.form.QUANTITY =Number(this.form.QUANTITY)
			const res = await CreateIssueApplyDoc(this.form)
			// console.log(res,'====res')
			if (res.Code === config.SUCCESS_CODE && res.Data) {
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '保存成功',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.resetFormData()
					}
				}
			})
			} else{
				uni.showModal({
					title: '提示',
					content: res.Msg || '保存失败',
					showCancel: false,
					success: _ => {
					}
				})
				this.$voice.error()
				return false
			}
		},
		// 物料条码
		async getLoadScraperData() {
			this.autoFocus = false
			if (!this.form.reelCode) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetProductionInfoByReel(this.form.reelCode)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				const data = JSON.parse(res.Data)
				if (data) {
					if(data instanceof Array){
						this.form.PART_CODE = data[0].PART_CODE || ''
						this.form.PART_DESC = data[0].PART_DESC || ''
						this.form.DOCNO = data[0].DOCNO || ''
						this.form.MO = data[0].MO || ''
						this.form.WH = data[0].WH || ''
						this.form.LineNo = data[0].LINE_NO||  ''
					} else {
						this.form.PART_CODE = data.PART_CODE || ''
						this.form.PART_DESC = data.PART_DESC || ''
						this.form.DOCNO = data.DOCNO || ''
						this.form.MO = data.MO || ''
						this.form.WH = data.WH || ''
						this.form.LineNo = data.LINE_NO||  ''
					}
					this.autoFocusNewLocation = true
				} else {
					this.form.reelCode = ''
					this.form.PART_CODE = ''
					this.form.PART_DESC = ''
					this.form.DOCNO = ''
					this.form.MO = ''
					this.form.WH = ''
					this.form.LineNo = ''
					this.autoFocus = true
				}
			} else{
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取物料条码失败,请重新输入',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.reelCode = ''
							this.form.reelCode = ''
							this.form.PART_CODE = ''
							this.form.PART_DESC = ''
							this.form.DOCNO = ''
							this.form.MO = ''
							this.form.WH = ''
							this.form.LineNo = ''
						}
					}
				})
				this.form.reelCode = ''
				this.$voice.error()
				return false
			}
			
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {

	}
}
