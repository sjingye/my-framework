const path = require("path");
const fs = require("fs");
/**
 * process.cwd(): 返回 Node.js 进程的当前工作目录
 * fs.realpathSync: 通过解析 .、.. 和符号链接同步地计算规范路径名。
 */
const appdirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => {
  /**
   * path.resolve(): 方法将路径或路径片段的序列解析为绝对路径
   * 参照 http://nodejs.cn/api/path.html#pathresolvepaths
   */
  return path.resolve(appdirectory, relativePath);
};

module.exports = {
  appSrc: resolveApp("src"),
};
