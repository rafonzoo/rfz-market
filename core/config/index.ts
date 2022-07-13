export enum Routes {
  beranda = '/',
  akun = '/akun',
  masuk = '/akun/masuk',
  daftar = '/akun/daftar',
}

export enum Appkey {
  tokenCookie = 'X-SSID-TOKEN',
  tokenStates = 'X-SSID-STATE',
}

export const isProtected = (string: string) => {
  const protectedRoutes = [Routes.masuk, Routes.daftar]
  return protectedRoutes.includes(string as Routes)
}
