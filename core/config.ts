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
