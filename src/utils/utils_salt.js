const bcryptjs = require('bcryptjs');

function encrypt(aString) {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(aString, salt);
}


module.exports = {
    encrypt
}