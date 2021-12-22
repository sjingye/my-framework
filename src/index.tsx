import React from 'react'
import ReactDOM from 'react-dom'

import App from './pages/App'

// 这个时候，你 npm run start 并尝试改变局部的代码，保存后发现整个页面还是会进行刷新，
// 如果你希望得到上面所说的“局部刷新”，需要在项目入口文件加以下代码。
// npm install --save-dev @types/webpack-env
if (module?.hot) {
    module.hot.accept()
  }

ReactDOM.render(<App />, document.getElementById('root'))
