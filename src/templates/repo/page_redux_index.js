function pageReduxIndex() {
  return (
    `import reducer from './reducer'
import * as actions from './actions'

export {
  reducer,
  actions
}`
  )
}
