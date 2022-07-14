import { AppRoutes } from 'core/client'

export const isProtectedPage = (string: string) => {
  const protectedRoutes = [AppRoutes.masuk, AppRoutes.daftar]
  return protectedRoutes.includes(string as AppRoutes)
}
