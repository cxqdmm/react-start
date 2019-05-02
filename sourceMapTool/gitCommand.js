const { exec, execSync } = require('child_process');
const path = require('path')
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

function createSpinner(title = "") {
  const spinner = new Spinner(title)
  spinner.setSpinnerString(0);
  return spinner;
}
class GitCommand {
  constructor(args = {}) {
    this._options = args.options || {};
    this._action = args.action;
    this._cwd = args.cwd;
    this._next = null;
    this._shouldExec = this._options.shouldExec || void 0;
    this._gitOptions = { cwd: this._cwd };
  }
  shouldExec(input) {
    if (typeof(this._shouldExec) == 'function') {
      return this._shouldExec(input);
    } else if (this._shouldExec instanceof RegExp) {
      return this._shouldExec.test(input);
    } 
    return true;
  }
  async run() {
    return await this.asyncAction(this._action);
  }

  asyncAction(action) {
    return new Promise((resolve, reject) => {
        const shell = ['git'].concat(action).join(' ')
        const spinner = createSpinner(chalk.blueBright(shell));
        spinner.start()
        setTimeout(() => {
          exec(shell, this._gitOptions, (error, stdout, stderr) => {
            spinner.stop();
            process.stdout.write('\n');
            if (error) {
              return reject(stderr);
            }
            resolve(stdout);
          })
        }, 300)
    })
  }

}

module.exports = GitCommand;