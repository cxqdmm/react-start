const path = require('path');
const fs = require('fs');
const { AsyncHook, GitHook } = require('./launch');
const chalk = require('chalk');
const { findFilesInDeep, copyFile, asyncForEach, log} = require('./util')

const sourceDir = path.resolve(__dirname, '../build');
const targetDir = path.resolve(__dirname, '../../source-map/react-start');
const fileRegex = /[^\/]*\.js\.map$/;

const mainProcess = new AsyncHook();
mainProcess
  .tapAsync('searchMapFile', (dir, callback) => {
    log(chalk.yellow('搜索sourcemap文件'));
    let sourceMaps = findFilesInDeep(sourceDir, fileRegex);
    if (Array.isArray(sourceMaps) && sourceMaps.length) {
      callback(null, sourceMaps);
    } else {
      callback(new Error('没有搜索到sourcemap文件'));
    }
  })
  .tapAsync('copyMapfile', (data, callback) => {
    log(chalk.yellow('move sourcemap to ', targetDir));
    let hasNewMapfile = false;
    asyncForEach(data, async (file, next) => {
      const targetPath = path.join(targetDir, file.fileName);
      if (!fs.existsSync(targetPath)) {
        hasNewMapfile = true;
        const text = await copyFile(file.obsolutePath, targetPath);
        log(chalk.green(text));
      }
      next();
    },(err) => {
      if (err) {
        return callback(err)
      }
      // if (!hasNewMapfile) {
      //   log(chalk.yellow('没有新的sourcemap'));
      //   return false;
      // }
      callback(null);
    })
  })
  .tapAsync('pushGit', (data, callback) => {
    log(chalk.yellow('提交文件到git'));
    let gitHook = new GitHook({ cwd: targetDir });
    gitHook
        .tap('rev-parse --abbrev-ref HEAD', {
          describe:'当前分支名',
        })
        .tap('checkout master', {
          shouldExec: (data) => !/^master$/.test(data),
        })
        .tap('pull')
        .tap('status')
        .tap('add .', {
          shouldExec: /use "git add"/,
        })
        .tap('status')
        .tap('commit -m "提交更改"',  {
          shouldExec: /Changes to be committed/,
        })
        .tap('status')
        .tap('push origin master', {
          shouldExec: /use "git push"/,
        })
        .run(err => {
            if (err) {
              callback(err);
            }
        })
  })
  .callAsync((err) => {
    if (err instanceof Error) {
      return log(chalk.red(err.message));
    } else if (typeof(err) == 'string') {
      log(chalk.red(err));
    }
  })



