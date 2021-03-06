const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://ipvigilante.com/' + ip, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let result = { latitude: data["data"]["latitude"], longitude: data["data"]["longitude"] };
    callback(null, result);

  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const lat = coords["latitude"];
  const lon = coords["longitude"];
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover time. Response: ${body.reason}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data);

  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return 'fetch' + error;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return 'coord' + error;
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return error;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };