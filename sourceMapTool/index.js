const path = require('path');
const { AsyncHook, GitHook } = require('./launch');
const chalk = require('chalk');
const { findFilesInDeep, copyFile, asyncForEach, log} = require('./util')

const sourceDir = path.resolve(__dirname, '../webapp/script');
const targetDir = path.resolve(__dirname, '../../finance-static-frontend-sourcemap/mxjd-vip-com');
const fileRegex = /[^\/]*\.js\.map$/;

const mainProcess = new AsyncHook();
mainProcess
  .tapAsync('searchMapFile', (dir, callback) => {
    log(chalk.yellow('搜索sourcemap文件。。。'));
    let sourceMaps = findFilesInDeep(sourceDir, fileRegex);
    if (Array.isArray(sourceMaps) && sourceMaps.length) {
      callback(null, sourceMaps);
    } else {
      callback(new Error('没有搜索到sourcemap文件'));
    }
  })
  .tapAsync('copyMapfile', (data, callback) => {
    log(chalk.yellow('copy文件到', targetDir));
    asyncForEach(data, async (file, next) => {
      const text = await copyFile(file.obsolutePath, path.join(targetDir, file.fileName));
      log(chalk.green(text));
      next();
    },(err) => {
      if (err) {
        return callback(err)
      }
      callback(null);
    })
  })
  .tapAsync('pushGit', (data, callback) => {
    log(chalk.yellow('提交文件到git'));
    let gitHook = new GitHook({ cwd: targetDir });
    gitHook
        .tap('checkout', 'master')
        .tap('pull', ['origin', 'master'])
        .tap('status')
        .tap('add', '.', (data) => /use "git add"/.test(data))
        .tap('status')
        .tap('commit', ['-m', '"提交更改"'], (data) => /Changes to be committed/.test(data))
        .tap('status')
        .tap('push', ['origin', 'master'], (data) => /use "git push"/.test(data))
        .run(err => {
            if (err) {
                console.log(err);
            }
        })
  })
  .callAsync((err) => {
    log(chalk.red(err.message));
  })



