import ajax from './ajax';

const BASE= ''

export const reqLogin = (params) => (ajax(BASE + '/login',params,'POST'));
