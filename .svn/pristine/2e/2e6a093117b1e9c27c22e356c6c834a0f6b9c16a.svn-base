import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import {
	GetBarCodeData,
	SnCodeUpdateBar
} from '../../api/splitBarcode.js';
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			formData: {
				oldBarcode: '',
				newBarcode: '',
				original_qty: 0
			},
			netData: {
				PART_NO: ' ',
				PART_NAME: ' ',
				ORIGINAL_QUANTITY: ' ',
				PART_DESC: ' '
			},
			newNetData: {},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true,
			autoNextFocus: false
		}
	},
	methods: {
		async handleCheckOldBarcode() {
			this.autoFocus = false
			if (!this.formData.oldBarcode) {
				uni.showModal({
					title: '提示',
					content: '请输入旧条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			const res = await GetBarCodeData(this.formData.oldBarcode)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.autoNextFocus = true
				this.netData = res.Data
				return false
			}
			this.$voice.error()
			uni.showModal({
				title: '提示',
				content: res.Msg || '条码不存在',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.formData.oldBarcode = ''
						this.autoFocus = true
					}
				}
			})
		},
		async handleCheckNewBarcode() {
			this.autoNextFocus = false
			if (!this.formData.newBarcode) {
				uni.showModal({
					title: '提示',
					content: '请输入新条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoNextFocus = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			const res = await GetBarCodeData(this.formData.newBarcode)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.newNetData = res.Data
				console.log('============ ', JSON.stringify(this.newNetData))
				return false
			}
			uni.showModal({
				title: '提示',
				content: res.Msg || '条码不存在',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.formData.newBarcode = ''
						this.autoNextFocus = true
					}
				}
			})
		},
		async submitForm() {
			if (!this.formData.oldBarcode) {
				uni.showModal({
					title: '提示',
					content: '请输入旧条码',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (!this.formData.newBarcode) {
				uni.showModal({
					title: '提示',
					content: '请输入新条码',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (!this.formData.original_qty) {
				uni.showModal({
					title: '提示',
					content: '请选择拆分数量',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (this.netData.PART_NO !== this.newNetData.PART_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '料号不一致',
					showCancel: false
				})
				return false
			}
			const res = await SnCodeUpdateBar(this.formData)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '操作成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			this.$voice.error()
			uni.showModal({
				title: '提示',
				content: res.Msg || '操作失败',
				showCancel: false
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		},
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.currentSelection = ref
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleChange(e) {
			this.formData.original_qty = e[0];
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox
	},
	onLoad() {
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onHide() {
		clearTimeout(this.timer)
	}
}