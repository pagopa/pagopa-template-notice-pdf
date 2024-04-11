var QRCode = require("qrcode-svg");

function genQrCode(data) {
  var qrcode = new QRCode({
    content: data,
    padding: 0,
    width: 256,
    height: 256,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    join: true,
  });
  qrcode.save(data+".svg", function (error) {
    if (error) throw error;
  });
  return data+".svg";
}

module.exports = genQrCode;
