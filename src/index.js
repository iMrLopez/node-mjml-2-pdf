var http = require("http");
var mjml2html = require("mjml");
var html_to_pdf = require('html-pdf-node');

//create a server object:
http
  .createServer(function (req, res) {
    const htmlOutput = mjml2html(
      `<mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-divider border-color="#F45E43"></mj-divider>
          <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello World</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`,
      { minify: true }
    );


    let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    
    let file = { content: htmlOutput.html };
    // or /
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      console.log("PDF Buffer:-", pdfBuffer);
    });

    res.write(htmlOutput.html); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
