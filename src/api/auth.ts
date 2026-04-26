import request from '../utils/request'

export const loginApi = (data: { username: string; password: string }) => {
  return request.get('/?path=login', {
    params: data,
  }) as Promise<{ token: string; role: string }>
}
