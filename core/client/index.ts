export enum AppRoutes {
  beranda = '/',
  akun = '/akun',
  masuk = '/akun/masuk',
  daftar = '/akun/daftar',
}

export enum Appkey {
  tokenCookie = 'X-SSID-TOKEN',
  tokenStates = 'X-SSID-STATE',
}

export enum AppRequest {
  postVerifyUser = '/api/auth/verify',
  postUserSignout = '/api/auth/logout',
}
