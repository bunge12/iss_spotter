const { nextISSTimesForMyLocation } = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
}); */

/* fetchCoordsByIP('162.245.144.188', (error, data) => {
  if (error) {
    console.log(error);
  }
  console.log(data);
}); */

/* fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log(error);
  }
  console.log(data);
}); */

const timeConvert = (timestamp) => {
  return new Date(timestamp * 1000);
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (let time of passTimes["response"]) {
    console.log(`Next pass at ${timeConvert(time.risetime)} for ${time.duration} seconds!`);
  }
});