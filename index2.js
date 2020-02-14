const { nextISSTimesForMyLocation } = require('./iss_promised');

const timeConvert = (timestamp) => {
  return new Date(timestamp * 1000);
};
const printResult = (array) => {
  for (let time of array) {
    console.log(`Next pass at ${timeConvert(time.risetime)} for ${time.duration} seconds!`);
  }
};


nextISSTimesForMyLocation().then((passTimes) => {
  printResult(passTimes);
})
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });