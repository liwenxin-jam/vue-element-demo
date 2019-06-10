const files = require.context("../components", true, /\.vue$/);
const modules = {};

// 引入全局组件，以c开头
files.keys().forEach(key => {
  let keyArray = key.replace(/(\.\/|\.vue)/g, "").split("/");
  modules["c-" + keyArray[1]] = files(key).default;
});

export default modules;
