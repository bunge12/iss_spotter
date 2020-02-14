const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const data = JSON.parse(body);
  return request('https://ipvigilante.com/' + data.ip);
};

const fetchISSFlyOverTimes = (location) => {
  const { latitude, longitude } = JSON.parse(location).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(location => fetchISSFlyOverTimes(location))
    .then(body => console.log(body))
    .catch(() => {
      console.log(error);
    })
}

module.exports = { nextISSTimesForMyLocation };