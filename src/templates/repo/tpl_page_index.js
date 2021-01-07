function tplPage(options) {
  const {pageName, ts, redux} = options
  return (
    `${redux ? 'import {connect} from \'react-redux\'' : ''}
${ts ? 'interface Props {\n\n}' : ''}

const ${pageName} = (props${ts ? ': Props' : ''}) => {
  return (
    <>
    
    </>
  )  
}

${redux ? `export default connect()(${pageName})` : `export default ${pageName}`}`
  )
}
