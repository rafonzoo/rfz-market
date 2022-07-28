export * from '@config/store'
export * from '@config/theme'

export enum AppRoutes {
  beranda = '/',
  akun = '/akun',
  masuk = '/akun/masuk',
  daftar = '/akun/daftar',
}

export enum AppRoutesApi {
  userVerify = '/api/auth/user/verify',
  userLogout = '/api/auth/user/logout',
}

export enum Appkey {
  AC_SSID_CLIENT = 'AC_SSID_CLIENT',
  AC_SSID_SECURE = 'AC_SSID_SECURE',
  AL_SSID_ONLOAD = 'AL_SSID_ONLOAD',
}

export enum AppRequestStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
}
