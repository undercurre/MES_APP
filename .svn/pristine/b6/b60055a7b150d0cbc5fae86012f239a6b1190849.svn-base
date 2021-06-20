import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

// 获取站点
export function Station (query) {
  return request.get('api/SfcsOperationSites/LoadData', requestOptions(query))
}

// 呼叫配置
export function CallConfig (callTypeCode) {
	console.log(callTypeCode)
	return request.get('api/SfcsOperationSites/CallWindow', requestOptions(callTypeCode))
}

// 通过站点ID获取该站位对应呼叫记录
export function GetRecordBySiteId (query) {
  return request.get('api/SfcsOperationSites/GetRecordBySiteId', requestOptions(query))
}

// 通过站位ID获取该站位对应呼叫记录（点击[呼叫]执行）
export function AddCallRecord (params) {
  return request.post('api/SfcsOperationSites/AddCallRecord', params, requestOptions())
}

// 通过站位ID获取该站位对应呼叫记录（点击 签到 的action）
export function EditCallRecord (params) {
  return request.post('api/SfcsOperationSites/EditCallRecord', params, requestOptions())
}