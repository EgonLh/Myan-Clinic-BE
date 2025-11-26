/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) { }

  /**
   * Create a new File record and save uploaded file
   */
  async createWithFile(dto: CreateFileDto, file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Save the file to disk (uploads folder)
    const uploadDir = path.join(
      process.cwd(),
      'uploads',
      String(dto.storageId),
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const uploadPath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(uploadPath, file.buffer);

    // Save record in DB
    return this.prisma.file.create({
      data: {
        filename: file.originalname,
        log: dto.log,
        storageId: Number(dto.storageId),
      },
    });
  }

  /**
   * Update file metadata and optionally replace the uploaded file
   */
  async updateWithFile(
    id: number,
    dto: UpdateFileDto,
    file?: Express.Multer.File,
  ) {
    const data: any = { ...dto };

    if (file) {
      // Replace the physical file
      const uploadPath = path.join(
        __dirname,
        '../../uploads',
        file.originalname,
      );
      fs.writeFileSync(uploadPath, file.buffer);
      data.filename = file.originalname;
    }

    return this.prisma.file.update({
      where: { id },
      data,
    });
  }

  /**
   * Get all files with storage info
   */
  findAll() {
    return this.prisma.file.findMany({ include: { storage: true } });
  }

  /**
   * Get all files by storageId
   */
  async getFilesByStorageId(storageId: number) {
    return this.prisma.file.findMany({
      where: { storageId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Download a file by ID
   */
  async downloadFileById(id: number, res: any) {
    // Find file record
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new Error('File not found');
    }

    // Only allow PDF files
    const ext = path.extname(file.filename).toLowerCase();
    if (ext !== '.pdf') {
      throw new Error('Only PDF files can be downloaded');
    }

    // Resolve the file path
    const filePath = path.join(
      process.cwd(),
      'uploads',
      String(file.storageId),
      file.filename,
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found on disk');
    }
    // console.log("Name",file.filename);
    // Set headers for download
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${file.filename}`,
    );
    res.setHeader('Content-Type', 'application/pdf');

    // Create a readable stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  async deleteFile(id: number) {
    // Find the file record
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new Error('File not found');
    }

    // Delete the physical file from uploads folder
    const filePath = path.join(process.cwd(), 'uploads', file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the record from database
    await this.prisma.file.delete({ where: { id } });

    return { success: true, id };
  }
}
