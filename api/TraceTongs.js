import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function GetTongsTypeList() {
	return request.get('api/MesTongsApply/GetTongsTypeList', requestOptions())
}
// 获取工装信息
export function LoadData(query) {
	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
}

export function TraceTongs(data) {
	return request.post('apiSMT/TraceTongs', data)
}

