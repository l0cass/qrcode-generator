import QRCode from 'qrcode';

const qrCodeContainer = document.getElementById("qrcode");
const downloadQrCodeButton = document.querySelector("#download-qrcode")

downloadQrCodeButton.classList.add("hidden")

function generateQrCode(event) {
  event.preventDefault();

  downloadQrCodeButton.classList.remove("hidden")

  const existingQrcode = document.querySelector("canvas")

  if (existingQrcode) {
    existingQrcode.remove()
  }

  const qrcodeUrl = document.querySelector('[name="field-url"]').value;

  const createQrcode = document.createElement("canvas");
  QRCode.toCanvas(createQrcode, qrcodeUrl, { width: 250 }, function (error) {
    if (error) {
      console.error("Erro ao gerar o QR Code:", error);
      return;
    }

    qrCodeContainer.appendChild(createQrcode);
  });

  downloadQrCodeButton.href = createQrcode.toDataURL("image/png");
  downloadQrCodeButton.download = "qrcode.png";
}

document.querySelector("form").addEventListener("submit", generateQrCode);
