import { Router } from 'express';
import multer from 'multer';
import { pdfEncrypt } from '../controller/pdfFileConverter';

import { localInterviewStorage } from '../helpers/multer/multerStorage';

const pdfUpload = multer({ storage: localInterviewStorage });

const router = Router();

router.post('/pdfEncrypt', [pdfUpload.single('pdf')], pdfEncrypt);

export default router;
