const { exec, execSync } = require('child_process');
const path = require('path')
class GitCommand {
  constructor(options = {}) {
    this._actionType = options.actionType;
    this._cwd = options.cwd;
    this._next = null;
    this._args = options.args || [];
    this._validate = options.validate || void 0;
    this._gitOptions = { cwd: this._cwd };
  }
  validate(input) {
    if (typeof(this._validate) == 'function') {
      return this._validate(input);
    } else if (this._validate instanceof RegExp) {
      return this._validate.test(input);
    } 
    return true;
  }
  async run() {
    return await this.asyncAction(this._actionType, this._args);
  }

  asyncAction(actionType, args) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(args) || typeof (args) == 'string') {
        const shell = ['git'].concat(actionType, args).join(' ')
        exec(shell, this._gitOptions, (error, stdout, stderr) => {
          // console.log(`${shell} [${this._gitOptions.cwd}]`)
          if (error) {
            return reject(stderr);
          }
          resolve(stdout);
        })

      } else {
        reject('参数必须是数组或者字符串')
      }
    })
  }

}

module.exports = GitCommand;