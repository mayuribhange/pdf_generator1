const generatePdf = require("../utilis/generatePdf.js");
const pdfGeneratorValidator = require("../utilis/validator.js");

const generatePdfHandler = async (req, res) => {
  console.info("Successfully called generatePdfHandler function", req);
  try {
    const ValidatesResult = pdfGeneratorValidator();
    const ValidatesData = await ValidatesResult.validate(req.body);
    if (ValidatesData.error) {
      return res
        .status(400)
        .json({ message: ValidatesData.error.details[0].message });
    }
    let isPdfGenerated = await generatePdf(req.body);
    return res.status(200).json({ message: "Pdf generated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while generating pdf" });
  }
};

module.exports = generatePdfHandler;
