function tplActions(options) {
  const { ts } = options
  if (ts) {
    return `import Types from './constants'

interface AddAction {
  type: Types.COUNT,
  payload: number
}
interface LogAction {
  type: Types.LOG,
  payload: string
}

export type Actions = AddAction | LogAction

export const setLog = (): LogAction => ({
  type: Types.LOG,
  payload: 'Hello Ts'
})
export const addNum = (): AddAction => ({
  type: Types.COUNT,
  payload: 1
})`
  } else {
    return `import Types from './constants'

export const setLog = () => ({
  type: Types.LOG,
  payload: 'Hello Ts'
})
export const addNum = () => ({
  type: Types.COUNT,
  payload: 1
})`
  }
}
