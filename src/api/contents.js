import request from '@/util/request'

export function getContent (dateTime) {
  return request({
    url: process.env.BASE_API + '/display.do?date=' + dateTime,
    method: 'get'
  })
}
