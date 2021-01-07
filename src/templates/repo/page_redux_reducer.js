function f(options) {
  const {ts} = options
  return (
    `import {COUNT, LOG} from './constants'

${ts?'type Actions =\n| { type: COUNT, payload: number }\n| { type: LOG, payload: string }':''}

const reducer = (state, action${ts?': Actions':''}) => {
  const {type, payload} = action
  return state
}

export default reducer`
  )
}
