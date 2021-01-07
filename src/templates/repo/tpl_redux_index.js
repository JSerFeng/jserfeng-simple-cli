function tplReduxIndex() {
  return (
    `import { createStore } from "redux"
import reducer from './reducer'
import * as actions from './actions'

const initialState = {}

const store = createStore(reducer, initialState)

export { store, actions }`
  )
}
