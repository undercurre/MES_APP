import request from '../utils/request.js'

// 线体
export function GetSmtServerList() {
	return request.get('apiSMT/GetSmtServerList')
}

// 菜单
export function GetRoleMenu(roleIDs) {
	return request.get('System/GetRoleMenu', {
		params: {
			roleIDs
		}
	})
}

// TPS电脑连接
export function GetSmtServerUrl(SMT_LINE_ID) {
	return request.get('apiSMT/GetSmtServerUrl', {
		params: {
			SMT_LINE_ID
		}
	})
}

// 获取生产线体
export function GetMesOperationLines() {
	return request.get('apiSMT/GetMesOperationLines')
}
