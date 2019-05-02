
const { AsyncSeriesWaterfallHook } = require("tapable");
const GitCommand = require('./gitCommand');

class AsyncHook {
  constructor() {
    this.hook = new AsyncSeriesWaterfallHook(['data']);
  }
  tapAsync(name, fn) {
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
  tap(action, options = {}) {
    if (typeof (action) == 'string' && action.trim() != '') {
      this.addCommand(action.trim(), options);
    } else {
      console.warn('action must be a string')
    }
    return this;
  }
  addCommand(action, options) {
    let nextCmd = new GitCommand({
      action: action,
      next: null,
      options: options,
      cwd: this._cwd
    })
    this.tapAsync(action, nextCmd);
  }
  tapAsync(name, cmd) {
    this.hook.tapAsync(name, async (input, callback) => {
      const shouldExec = cmd.shouldExec(input);
      if (shouldExec) {
        try {
          const output = await cmd.run();
          callback(null, output.trim());
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