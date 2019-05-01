const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function findFilesInDeep (dir, fileRegex) {
    let paths = findFiles(dir, fileRegex)
    let filePath = paths.map(item => {
      return {
        obsolutePath: item,
        fileName: fileRegex.exec(item)[0],
      }
    });
    return filePath;
}

function findFiles(filePath, reg) {
  var paths = [];
  var files = fs.readdirSync(filePath)
  files.forEach((filename) => {
    var filedir = path.join(filePath, filename);
    var stats = fs.lstatSync(filedir);
    var isFile = stats.isFile();
    var isDir = stats.isDirectory();
    if (isFile) {
      if (reg.test(filename)) {
        paths.push(filedir);
      }
    }
    if (isDir) {
      paths = paths.concat(findFiles(filedir, reg));//递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
  return paths;
}

async function copyFile (sourcePath, targetPath) {     
  return await _copyFile(sourcePath, targetPath);
}

async function _copyFile (sourcePath, targetPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(sourcePath, {}, (err, data) => {
      if (err) {
        return reject(err);
      }
      const targetDir = path.dirname(targetPath);
      mkdirp(targetDir, function (err) {
        if (err) return reject(err);
        fs.writeFile(targetPath, data, { flag: 'w' }, (err) => {
          if (err) return reject(err);
          resolve(targetPath + '=>文件已被保存');
        })
      });
    })
  })
}

async function asyncForEach (arr, fn, err) {
  if (!Array.isArray(arr) || !arr.length) {
    err(new Error('必须传入有效数组'));
    return false;
  }
  const callback = async () => {
    if (arr.length) {
      const item = arr.pop();
      try {
        await fn(item, callback)
      } catch (error) {
        err(error)
      }
    } else {
      err(null);
    }
  }
  const item = arr.pop();
  try {
    await fn(item, callback);
  } catch (error) {
    err(error)
  }
}

function log (...x) {
  console.log(...x)
}

exports.findFilesInDeep = findFilesInDeep;
exports.log = log;
exports.copyFile = copyFile;
exports.asyncForEach = asyncForEach;