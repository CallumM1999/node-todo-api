const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'password1234!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => console.log(hash))
// })

var hashedPassword = '$2a$10$3HABVJ0eYSgoi0lhS4pd/.eTv4E4DvSImwr53lF46TSx4IRq/Xie6';

bcrypt.compare(password, hashedPassword, (err, res) => console.log(res))
