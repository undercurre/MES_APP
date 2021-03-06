import request from '../utils/request.js'
import store from '../store'

// 获取条码信息
export function GetBarCodeData(barCode) {
	return request.get('apiSMT/GetBarCodeData', {
		params: {
			barCode
		}
	})
}

// 拆分条码
export function SnCodeUpdateBar({
	oldBarcode = '',
	newBarcode = '',
	original_qty = 0
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/SnCodeUpdateBar', {
		user: token,
		oldBarcode,
		newBarcode,
		original_qty
	})
}