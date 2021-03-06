import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import graceSelectMenu from '@/graceUI/components/graceSelectMenu.vue';
import {
	GetSmtServerList,
	GetMesOperationLines
} from '@/api/system.js'
import {
	Station
} from '@/api/ESOP.js'
import * as config from '@/utils/config.js'
import { mapState, mapMutations } from 'vuex'
import {
	SysConnectPTS
} from '@/api/work.js'
export default {
	data() {
		return {
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			PDA_ID: '',
			timer: null
		};
	},
	computed: {
		...mapState({
			lineList: state => state.system.lineList,
			currentLine: state => state.system.currentLine,
			current_version: state => state.system.versionId
		}),
		list() {
			const arr = []
			const lineList = this.lineList || []
			lineList.map(item => {
				arr.push(item.LINE_NAME)
			})
			return arr
		},
		listIndex() {
			const index = this.currentLine
			return index === null ? -1 : index
		}
	},
	methods: {
		...mapMutations({
			SET_PDA_ID: 'system/SET_PDA_ID',
			SET_CURRENTLINE: 'system/SET_CURRENTLINE',
			SET_LINELIST: 'system/SET_LINELIST',
			SET_STATIONLIST: 'system/SET_STATIONLIST'
		}),
		async submitForm(e) {
			const formData = e.detail.value;
			if (this.listIndex < 0 || !this.list[this.listIndex]) {
				uni.showModal({
					title: '提示',
					content: '请选择线体',
					showCancel: false
				})
				return false
			}
			if (!formData.PDA_ID) {
				uni.showModal({
					title: '提示',
					content: '请输入PDA_ID',
					showCancel: false
				})
				return false
			}
			// TODO 链接监控台
			if (false && this.lineList[this.currentLine].SERVICE_URL) {
				const res = await SysConnectPTS(this.lineList[this.currentLine].SERVICE_URL)
				if (res.Code !== config.SUCCESS_CODE || !res.Data) {
					uni.showModal({
						title: '提示',
						content: res.Msg || '连接监控台失败',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
			}
			this.SET_PDA_ID(formData.PDA_ID)
			const lineList = this.$store.getters.lineList || [];
			const index = this.$store.getters.currentLine;
			const currentLine = lineList[index];
			await this.getStation()
			this.$voice.success()
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		picker(e) {
			this.SET_CURRENTLINE(parseInt(e.detail.value))
		},
		async getStation() {
			const lineList = this.$store.getters.lineList || [];
			const index = this.$store.getters.currentLine;
			const currentLine = lineList[index];
			if(currentLine)
			await Station({
						  OPERATION_LINE_ID: currentLine.SMT_LINE_ID,
			}).then(res => {
				this.SET_STATIONLIST(JSON.parse(res.Result))
			})
		},
		async getLineList() {
			const res = await Promise.all([
				await GetSmtServerList(),
				await GetMesOperationLines()
			])
			let count = 0
			if (res) {
				res.map(item => {
					if (item.Code === config.SUCCESS_CODE && item.Data) {
						count++
					}
				})
			}
			if (count !== 2) {
				uni.showModal({
					title: '提示',
					content: res.Msg,
					showCancel: false,
					success: result => {

					}
				})
			} else {
				const data = []
				this.SET_LINELIST(data.concat(res[0].Data, res[1].Data))
				this.SET_CURRENTLINE(-1)
			}
		},
		handleFocus(e) {
			const value = this.PDA_ID
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceSelectMenu
	},
	onLoad() {
		this.getLineList()
		this.getStation()
		this.PDA_ID = this.$store.getters.PDA_ID || Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
	},
	onShow() {
		
	},
	onUnload() {
		
	}
};
