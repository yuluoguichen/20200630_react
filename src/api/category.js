import {ajax} from './ajax'
const BASE = '';

export const reqCategory = (parentId) => ajax(`${BASE}/manage/category/list`,{parentId},'GET');

// 添加分类
export const reqAddCategory = ({categoryName, parentId}) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')