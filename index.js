const e = require("express");
const bodyParser = require("body-parser");
const GeneratePdfRouter = require("./src/routes/generatePdf.js");
const path = require("path");
const app = e();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/pdf", GeneratePdfRouter);
const public = path.join(__dirname, "src/public");
const certificate = path.join(__dirname, "src/generated_pdf");
app.use(e.static(public));
app.use(e.static(certificate));

app.listen(9101, async () => {
  console.info(`Server is running at port: 9101`);
});
