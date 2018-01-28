// const graphql = require('graphql');
// const schema = require('./schema.js');

function main(params) {
  if (params.id) {
    return Promise.resolve({ payload: 'Report Id = ' + params.id + '!' });
  } else {
    return Promise.reject('Error!');
  }
}

// function report(params) {
//   if (params.query) {
//     console.log(params);
//     graphql(schema, params.query).then(result => {
//       return Promise.resolve(result)
//     });
//   }
//   else {
//     return Promise.reject('Error!');
//   }
// }

// function reports(params) {
//   if (params.query) {
//     graphql(schema, params.query).then(result => {
//       return Promise.resolve(result)
//     });
//   }
//   else {
//     graphql(schema).then(result => {
//       return Promise.resolve(result)
//     });
//   }
// }

// module.exports.report = report;
// module.exports.reports = reports;