export enum AppRoutes {
  beranda = '/',
  akun = '/akun',
  masuk = '/akun/masuk',
  daftar = '/akun/daftar',
}

export enum AppRoutesApi {
  postVerifyUser = '/api/auth/verify',
  postUserSignout = '/api/auth/logout',
}

export enum Appkey {
  tokenCookie = 'X-SSID-TOKEN',
  tokenStates = 'X-SSID-STATE',
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
