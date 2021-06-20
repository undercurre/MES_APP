import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

// 获取工单
export function GetWONO (query) {
  return request.get('api/MesProductionLinePreparation/GetWONO', requestOptions(query))
}