const alpr = require('./alpr.js');

alpr.decode("licensePlate.jpg").then((result) => {
  console.log("Found " + result.total + " license plate(s)");

  //loop through results
  // result.license.forEach(function(license, index){
  //   console.log("license [" + index + "] " + license);
  // });
  // result.licenseConfidence.forEach(function(license, index){
  //   console.log("license [" + index + "] Confidence: " + license);
  // });

  //check results by array index
  console.log(result.license[0]);
  console.log(result.licenseConfidence[0]);
}).catch((error) => {
  console.log(error);
});
