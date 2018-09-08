const fs = require("fs");
const {promisify} = require("util");
const co = require("co");
const path = require("path");
const filePath = path.join(__dirname, "../package.json")
// 回调函数模式
fs.readFile(filePath, (err, data) => {
  if(err) return console.log(err);
  data = JSON.parse(data);
  console.log("回调函数模式：" + data.name);
});

// Promise模式
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  })
}
readFileAsync(filePath)
  .then(data => {
    data = JSON.parse(data);
    console.log("promise模式：" + data.name);
  })
  .catch(err => {
    console.log("error", JSON.stringify(err));
  });

// generator模式
co(function *() {
  let readFileAsync = promisify(fs.readFile);
  let data = yield readFileAsync(filePath);
  data = JSON.parse(data);
  console.log("generator：" + data.name);
});

// async模式
async function init() {
  let readFileAsync = promisify(fs.readFile);
  let data = await readFileAsync(filePath);
  data = JSON.parse(data);
  console.log("async：" + data.name);
}
init();
