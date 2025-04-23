// generateHash.js
const bcrypt = require('bcrypt');

const password = process.argv[2] || 'En_pushaa_salasanaani_githubiin';
bcrypt.hash(password, 10)
  .then(hash => {
    console.log('Hash:', hash);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
