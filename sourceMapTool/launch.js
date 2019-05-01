
const { AsyncSeriesWaterfallHook } = require("tapable");
const GitCommand = require('./gitCommand');
 class AsyncHook {
  constructor() {
    this.hook = new AsyncSeriesWaterfallHook(['data']);
  }
  tapAsync(name,fn) {
    this.hook.tapAsync(name, fn);
    return this;
  }
  callAsync(callback) {
    this.hook.callAsync('', callback)
  }
}
class GitHook {
  constructor(options) {
    this.options = options;
    if (!options.cwd) {
      throw 'you should specify a folder to execute git command'
    }
    this._cwd = this.options.cwd;
    this.hook = new AsyncHook();
  }
  tap(actionType, args = [], validate) {
    if (typeof (actionType) == 'string' && actionType.trim() != '') {
      this.addCommand(actionType.trim(), args, validate);
    } else {
      console.warn('actionType must be a string')
    }
    return this;
  }
  addCommand(actionType, args, validate = void 0) {
    let nextCmd = new GitCommand({
      actionType: actionType,
      next: null,
      args: args,
      validate: validate,
      cwd: this._cwd
    })
    this.tapAsync(actionType, nextCmd);
  }
  tapAsync(name, cmd) {
    this.hook.tapAsync(name, async (input, callback) => {
        if (cmd.validate(input)) {
          try {
            const output = await cmd.run();
            callback(null, output);
          } catch (error) {
            callback(error);
          }
        } else {
          callback(null, input)
        }
    })
  }
  run(callback) {
    this.hook.callAsync(callback)
  }
}

exports.GitHook = GitHook;
exports.AsyncHook = AsyncHook;