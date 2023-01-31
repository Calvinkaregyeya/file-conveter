import path from 'path';

import { encryptPdf } from '../services/pdfFileConverter';
import catchAsync from '../helpers/errorhandler/catchAsync';

const pdfEncrypt = catchAsync(async (req, res) => {
  const filePath = path.join(`${__dirname}`, '..', `/assets/private/`);
  const fileDownload = await download(download_link);

  fs.writeFileSync(filePath, fileDownload);

  // Download the file into the browser.
  res.download(filePath);
  res.on('finish', () => {
    // Delete the downloaded file if the response is closed
    fs.unlinkSync(filePath);
  });
});

export { pdfEncrypt };
