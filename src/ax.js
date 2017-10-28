import axios from 'axios';
let ax = axios.create({
  baseURL: 'https://lunch-menu.herokuapp.com/parse/classes/Menu',
  timeout: 1000,
  headers: {
    'X-Parse-Application-Id': 'nAixMGyDvVeNfeWEectyJrvtqSeKregQs2gLh9Aw'
  }
});

// let tomorrowDate = new Date();
// tomorrowDate.setDate(new Date().getDate() + 1);

// let tomorrow = tomorrowDate.toISOString().substring(0, 10);
// let today = new Date().toISOString().substring(0, 10);

// console.log(today);
// console.log(tomorrow);

let today = '2017-10-19 00:00:00';
let tomorrow = '2017-10-20 00:00:00';


ax.getLunchForToday = function () {
  return ax.post('', {
    'where': {
      'date': {
        '$gte': {
          '__type': 'Date',
          'iso': today
        },
        '$lte': {
          '__type': 'Date',
          'iso': tomorrow
        }
      },
    },
    '_method': 'get'
  });
};
export default ax;