import { Appkey } from '@config'

type AppStorageKey = keyof typeof Appkey
type AppStorageBase = 'localStorage' | 'sessionStorage'

export default class AppStorage {
  private storageBase: AppStorageBase

  constructor(key?: AppStorageBase) {
    this.storageBase = key || 'localStorage'
  }

  public set = (key: AppStorageKey, value?: string) =>
    window[this.storageBase].setItem(key, value || Appkey[key])

  public get = (key: AppStorageKey) => window[this.storageBase].getItem(key)
  public unset = (key: AppStorageKey) => window[this.storageBase].removeItem(key)
}
