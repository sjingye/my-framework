# my framework

项目中常用配置文件的作用及配置方式:
🍊 tslint、stylelint 及 prettier 的配置
🍉 代码提交规范的第三方工具强制约束方式实现
🍓 webpack 配置 react + typescript 开发与生产环境及优化
🍑 rollup 构建组件打包环境并发布至 npm 的全流程
🍏 利用 react-testing-library 对 react 组件进行测试
🥝 持续集成（CI）、Github Actions

* lint-staged: 只对我们 git 缓存区最新改动过的文件进行以上的格式化和 lint 规则校验
* husky: 它会提供一些钩子，比如执行 git commit 之前的钩子 pre-commit ，借助这个钩子我们就能执行 lint-staged 所提供的代码文件格式化及 lint 规则校验
