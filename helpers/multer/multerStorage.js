import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';

import createMissingDirectories from '../createDirSync';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const awsS3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const localPdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const finalDirectory = 'pdfFileConversion';
    file.uploadedAt = Date.now();
    const storagelocation = createMissingDirectories(finalDirectory);
    file.location = `${storagelocation}/${file.originalname}`;
    cb(null, storagelocation);
  },
  filename: function (req, file, cb) {
    cb(null, `input.pdf`);
  },
});

const AWSReportStorage = (contentDisposition = 'inline') =>
  multerS3({
    s3: awsS3,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition,
    bucket: process.env.S3_REPORT_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: async function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

export { localPdfStorage, AWSReportStorage };
