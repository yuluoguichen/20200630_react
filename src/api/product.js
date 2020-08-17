import {ajax} from './ajax'
import {parseParameters} from '../utils/request'
const BASE = ''

export const reqGetProducts = (payload)=> ajax(`${BASE}/manage/product/list`,{...parseParameters(payload)},'GET');

//保存
export const reqAddProducts = (payload) => ajax(`${BASE}/manage/product/add`,{...payload.product},'POST')

//修改保存
export const reqUpdateProducts = (payload) => ajax(`${BASE}/manage/product/update`,{...payload.product},'POST')

//上下架
export const reqUpdateProductOnline = (payload) => ajax(`${BASE}/manage/product/updateStatus`,payload,'POST')
