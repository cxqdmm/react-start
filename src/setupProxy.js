const path = require('path');
const fs = require('fs');
function getMockFile(filePath) {
  filePath = path.join(process.cwd(),'mock',filePath) + '.js';
  if (!fs.existsSync(filePath)) {
    throw new Error('file not exist');
  }
  if (require.cache[require.resolve(filePath)]) {
    delete require.cache[require.resolve(filePath)];
  }
  let json = require(filePath);
  return json
}
module.exports = function proxy(app) {

  app.use(function(req, res, next) {
    if (req.xhr) {
      try {
        const json = getMockFile(req.path);
        res.send(json);
      } catch (error) {
        next();
      }
    } else {
      next();
    }
  })
}