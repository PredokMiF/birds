const path = require('path');
const pug = require('pug');

module.exports = async function pugPatch(ctx, next) {
    ctx.render = function(relPath, options) {
        return pug.renderFile(
            path.join(__dirname, '..', 'templates', relPath) + '.pug',
            { cache: false, compileDebug: true, pretty: true, ...options }
        )
    }
    
    await next();
}
