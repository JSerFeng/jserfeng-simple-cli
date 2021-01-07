function tplRoutes() {
  return (
    `import Home from "../pages/home";

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home page'
  },
  /* __routes__ */
]

export default routes`
  )
}
