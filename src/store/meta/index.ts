export interface MetaInterface {
  _meta: 'initial' | 'pending' | 'success' | 'failure'
}

export const metaState: MetaInterface = {
  _meta: 'initial',
}
