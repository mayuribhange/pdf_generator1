const PDFDocument = require("pdfkit");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const generatePdf = (details) => {
  try {
    const {
      registerId,
      email,
      phoneNo,
      address,
      district,
      state,
      pinCode,
      country,
      name,
      lastName,
      appriciationText,
      dob,
      gender,
      bloodGroup,
    } = details;
    let certificatePath = path.resolve(
      __dirname,
      "../generated_pdf/certificate.pdf"
    );
    let imagesPath = path.resolve(__dirname, "../public/");
    const doc = new PDFDocument({
      size: [841.89, 595.28],
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    doc.pipe(fs.createWriteStream(certificatePath));
    const borderWidth = 20;
    const whiteBorderColor = "#ffffff";
    const blueBorderColor = "#6699CC";
    const borderRadius = 10;
    doc
      .rect(
        borderWidth / 2,
        borderWidth / 2,
        doc.page.width - borderWidth,
        doc.page.height - borderWidth
      )
      .lineWidth(borderWidth)
      .strokeColor(whiteBorderColor)
      .stroke();

    doc
      .roundedRect(
        borderWidth,
        borderWidth,
        doc.page.width - 2 * borderWidth,
        doc.page.height - 2 * borderWidth,
        borderRadius
      )
      .lineWidth(borderWidth)
      .strokeColor(blueBorderColor)
      .stroke();
    const imageWidth = 100;
    const imageHeigth = 100;
    const pageWidth = doc.page.width;
    const x = (pageWidth - imageHeigth) / 2;
    const y = 40;
    doc.image(`${imagesPath}/logo.jpeg`, x, y, {
      width: imageWidth,
      height: imageHeigth,
    });
    const leftMargin = x - 300;
    const textTopMargin = 65;
    doc.font("Helvetica").fontSize(14);
    doc.text(`Register-Id:- ${registerId}`, leftMargin, textTopMargin);
    doc.text(`E-Mail:- ${email}`, leftMargin, textTopMargin + 20);
    doc.text(`Phone No.:- +91-${phoneNo}`, leftMargin, textTopMargin + 40);

    const rightMargin = x + imageWidth + 120;
    doc.text(`${address}`, rightMargin, textTopMargin);
    doc.text(`${district} (${pinCode})`, rightMargin, textTopMargin + 20);
    doc.text(`(${state}) ${country}`, rightMargin, textTopMargin + 40);
    const topMargin = 70 + imageHeigth;
    doc
      .font(`${__dirname}/SEASRN__.ttf`)
      .fontSize(30)
      .fillColor("#6699CC")
      .text("Certifcate of Half Marathon", 0, topMargin, {
        align: "center",
      });
    doc.moveDown(0.5);
    doc.fontSize(16).fillColor("#000000").text(`This Certifcate Presented to`, {
      align: "center",
    });
    doc.moveDown(0.2);
    doc
      .font(`${__dirname}/Pacifico.ttf`)
      .fillColor("#C19A6B")
      .fontSize(20)
      .text(`${name.trim()} ${lastName.trim()}`, {
        align: "center",
      });
    const firstHalf = appriciationText
      .substring(0, appriciationText.length / 2 + 2)
      .trim();
    const secondHalf = appriciationText
      .substring(appriciationText.length / 2 + 2)
      .trim();
    doc.moveDown(0.4);
    doc
      .font("Helvetica")
      .fillColor("#000000")
      .fontSize(14)
      .text(`${firstHalf}`, {
        align: "center",
      });
    doc
      .font("Helvetica")
      .fillColor("#000000")
      .fontSize(14)
      .text(`${secondHalf}`, {
        align: "center",
      });
    doc.moveDown(2);
    doc
      .fontSize(13)
      .text(
        `                      Date of Birth: ${dob}                                       Gender: ${gender}                                                 Blood Group: ${bloodGroup}`
      );
    const x1 = (doc.page.width - imageHeigth) / 2;
    const y1 = doc.page.height - 170;
    doc.image(`${imagesPath}/certificate.jpeg`, x1, y1, {
      width: imageWidth,
      height: imageHeigth,
    });
    const bottomMargin = doc.page.height - 140;
    let now = moment().format("DD-MM-YYYY HH:MM:SS");
    doc.fontSize(11).text(`${now}`, 100, bottomMargin, {
      align: "left",
    });
    doc.text(`_________________________`, 80, bottomMargin + 20, {
      align: "left",
    });
    doc.text(`DATE-TIME`, 120, bottomMargin + 40, {
      align: "left",
    });
    doc.text(`_________________________`, 600, bottomMargin + 20, {
      align: "left",
    });
    doc.text(`SIGNATURE`, 650, bottomMargin + 45, {
      align: "left",
    });
    doc.end();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = generatePdf;
