const bcrypt = require('bcrypt');

exports.hash = (password) => bcrypt.hash(password, 10);
exports.compare = (password, hash) => bcrypt.compare(password, hash);