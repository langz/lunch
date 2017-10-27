import axios from 'axios';
let ax = axios.create({
  baseURL: 'http://lunch-menu.herokuapp.com/parse/classes/Menu',
  timeout: 1000,
  headers: {
    'X-Parse-Application-Id': 'nAixMGyDvVeNfeWEectyJrvtqSeKregQs2gLh9Aw'
  }
});
ax.getLunchForToday = function () {
  return ax.post('', {
    'where': {
      'date': {
        '$gte': {
          '__type': 'Date',
          'iso': '2017-10-19 00:00:00'
        },
        '$lte': {
          '__type': 'Date',
          'iso': '2017-10-20 00:00:00'
        }
      },
    },
    '_method': 'get'
  });
};
export default ax;