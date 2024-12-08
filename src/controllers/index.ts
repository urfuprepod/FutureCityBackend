import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {diskStorage} from 'multer'
import { extname } from "path";

@Controller('upload')
export class UploadController {
    @Post('files')
    @UseInterceptors(
        FilesInterceptor('file', 1, {
            storage: diskStorage({
                destination: './static',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
                }
            }),
        })
    )
    handleFileUpload(@UploadedFiles() files: Array<Express.Multer.File>) {
        return {
            message: 'Чиназес',
            files
        }
    }
}