import { PDFNet }  from '@pdftron/pdfnet-node' // you may need to set up NODE_PATH environment variable to make this work.

const main = async() => {
   const doc = await PDFNet.PDFDoc.createFromFilePath('./VFP.pdf');


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
  await doc.save('./output.pdf', 0);
};

// add your own license key as the second parameter, e.g. in place of 'YOUR_LICENSE_KEY'.
PDFNet.runWithCleanup(main, 'demo:1675185495043:7d5726ea03000000001a8924c5cd18455dafbe755225b54ac834c154df').catch(function(error) {
  console.log('Error: ' + JSON.stringify(error));
}).then(function(){ PDFNet.shutdown(); });