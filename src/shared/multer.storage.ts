import { diskStorage } from 'multer'
import { join, extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerOptions = {
    limits: {
        fileSize: 10485760,
      },
    storage: diskStorage({
        destination: (req, file, cb) => {
            const dirPath = join(__dirname, '/../temp')
            cb(null, dirPath)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + extname(file.originalname));
        }
    })
}