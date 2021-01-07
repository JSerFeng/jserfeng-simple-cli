function tplApi(options) {
  const {ts} = options
  if (ts) {
    return (
      `import request from "../index";

interface Response<T> {
  data: T,
  flag: boolean,
  msg: string
}

type ResData = number[]

const getData = async (): Promise<Response<ResData>> => {
  const res = await request.post<any, Response<ResData>>('/list')
  return res
}`
    )
  } else {
    return (
      `import request from "../index";

const getData = async () => {
  const res = await request.post('/list')
  return res
}`
    )
  }
}
