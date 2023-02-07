import { Router } from 'express';
import multer from 'multer';
import { pdfEncrypt } from '../controller/pdfFileConverter';

import { localPdfStorage } from '../helpers/multer/multerStorage';

const pdfUpload = multer({ storage: localPdfStorage });

const router = Router();

router.post('/pdfEncrypt', [pdfUpload.single('pdf')], pdfEncrypt);

export default router;
