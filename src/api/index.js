import {Jsonp ,ajax} from './ajax';


const BASE = ''

export const reqLogin = (params) => (ajax(BASE + '/login', params, 'POST'));

export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
   return Jsonp({ url, city })
}
