import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';

const encryptFile = async () => {
  const filePath = path.join(`${__dirname}`, '../assets/private/pdfFileConversion/input.pdf');
  const doc = await PDFNet.PDFDoc.createFromFilePath(filePath);

  if (!(await doc.initSecurityHandler())) {
    console.log('Document authentication error...');
    ret = 1;
  }

  // Encrypt the document
  const newHandler = await PDFNet.SecurityHandler.createDefault();

  // Set a new password required to open a document
  newHandler.changeUserPasswordUString('test');

  // Note: document takes the ownership of newHandler.
  doc.setSecurityHandler(newHandler);

  // Save the changes
  const outputFilePath = path.join(`${__dirname}`, '../assets/private/pdfFileConversion/output.pdf');
  await doc.save(outputFilePath, 0);
};

async function encryptPdf(params) {
  await PDFNet.runWithCleanup(encryptFile, process.env.PDFTRONKEY)
    .catch(function (error) {
      console.log('Error1: ' + JSON.stringify(error));
    })
    .then(function () {
      console.log('success', process.env.PDFTRONKEY);
      // PDFNet.shutdown();
    });
  return null;
}

export { encryptPdf };
