const exec = require('child_process').exec;

module.exports = {
  decode: async function(filePath){
    console.log("alpr()");
    return new Promise((resolve, reject) => {
      function puts(error, stdout, stderr){
        if(error){
          reject({"status": "error", "msg": "Could not exceute command 'alpr'!"});
        }
        else {
          if(stdout.indexOf("No license plates found.") >= 0){
            reject({"status": "error", "msg": "ALPR could not find license plate"});
          }
          else {
            const alprResultArr = stdout.split("-");

            const total = alprResultArr[0].indexOf(":") + 1;
            let licenseArr = [];
            let licenseConfidenceArr = [];

            alprResultArr.splice(0, 1);
            alprResultArr.forEach(function(license, index){
              licenseArr[index] = license.split("	 ")[0].replace(/\s/g, "");
              let tmp = license.split("	 ")[1].replace(/\s/g, "");
              licenseConfidenceArr[index] = tmp.substring(tmp.indexOf(":") + 1);
            });

            if(total >= 1){
              resolve({
                "total": total,
                "license": licenseArr,
                "licenseConfidence": licenseConfidenceArr
              });
            }
            else {
              reject({"status": "error", "msg": "Could not process ALPR results"});
            }
          }
        }
      }
      setTimeout(function(){
        exec("alpr " + filePath, puts);
      }, 750);
    });
  }
}
