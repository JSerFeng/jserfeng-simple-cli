function tplReducer(options) {
  const { ts } = options

  const normalTempalte = `import { combineReducers } from 'redux'
import Types from './constants'

const baseReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.COUNT:
      return { ...state, count: action.payload }
    case Types.LOG:
      return { ...state, log: action.payload }
    default:
      return state
  }
}

const reducer = combineReducers({ baseReducer })

export default reducer`
  const tsTemplate = `import { combineReducers } from 'redux'
import { Actions } from './actions'
import Types from './constants'

interface State {
  count?: number,
  log?: string
}

const baseReducer = (state: State = {}, action: Actions): State => {
  /** Do not destruct "action" here for it may lose its  binding of "type" and "payload" with action */
  /** 不要在这里解构action，不然可能会让type和payload对不上同一个action */
  switch (action.type) {
    case Types.COUNT:
      return { ...state, count: action.payload }
    case Types.LOG:
      return { ...state, log: action.payload }
    default:
      return state
  }
}

const reducer = combineReducers({ baseReducer })

export default reducer`
  return ts ? tsTemplate : normalTempalte
}
