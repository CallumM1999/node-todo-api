const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 4
};

var token = jwt.sign(data, '123abc');
console.log('token', token);

var decoded = jwt.verify(token, '123abc')
console.log('decoded', decoded);


// var message = 'I am using number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// if (hash === SHA256(message).toString()) {
//   console.log('match');
// } else {
//   console.log('dont match');
// }
//
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// };
//
// console.log(`token: ${token.hash}`)
