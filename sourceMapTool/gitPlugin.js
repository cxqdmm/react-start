const GitCommand = require('./gitCommand');
class gitPlugin {
  constructor(options) {
    this.options = options;
    if (!options.cwd) {
      throw 'you should specify a folder to execute git command'
    }
    this.commands = [];
    this.cmdList = [];
    this._cwd = this.options.cwd;
    this._isRunning = false;
  }
  setCwd(cwd) {
    this._cwd = cwd;
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
    this.cmdList.push(nextCmd);
  }
  isRunning() {
    return this._isRunning;
  }
  run(runcallback) {
    this._isRunning = true;
    let nextCmd;
    let complite = (err) => {
      this._isRunning = false;
      this.cmdList = [];
      runcallback(err);
    }
    let callback = (err, data) => {
      if (err) {
        console.log(err)
        return complite(err)
      }
      nextCmd = this.cmdList.shift();
      if (nextCmd) {
        this.runCmd(nextCmd, data, callback)
      } else {
        return complite();
      }
    }
    try {
      if (this.cmdList.length) {
        nextCmd = this.cmdList.shift();
        this.runCmd(nextCmd, null, callback)
      } else {
        complite('没有执行git命令');
      }
    } catch (error) {
      complite(error);
    }

  }
  async runCmd(cmd, lastcmdout, callback) {
    if (typeof (cmd._validate) == 'function') {
      if (cmd._validate(lastcmdout)) {
        try {
          const output = await cmd.run();
          callback(null, output);
        } catch (error) {
          callback(error);
        }
      } else {
        callback(null)
      }
    } else {
      cmd.run(callback)
    }
  }
}
module.exports = gitPlugin;