import {MultipartFile} from "@fastify/multipart";
import path from "path";
import fs from "node:fs";
import mime from 'mime-types';
import {pipeline} from "stream/promises";
import {FileNotFoundException} from "../exceptions/FileNotFoundException";

export class UploadService {
    async upload(id: string, file: MultipartFile) {
        const fileExtension = file.mimetype.split('/')[1];
        const fileName = `${id}.${fileExtension}`;
        const uploadDir = path.resolve('..', 'uploads');

        console.log(path.join(uploadDir, fileName));
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        await pipeline(file.file, fs.createWriteStream(path.join(uploadDir, fileName)));

        return fileName;
    }

    async get(fileName: string) {
        const uploadDir = path.resolve('..', 'uploads');
        const filePath = path.join(uploadDir, fileName);

        if (!fs.existsSync(filePath)) throw new FileNotFoundException();

        const stream = fs.createReadStream(filePath);
        const contentType = mime.lookup(filePath) || 'application/octet-stream';

        return { stream, contentType };
    }
}