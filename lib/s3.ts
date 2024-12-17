import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface UploadFile {
  buffer: Buffer;
  mimetype: string;
  originalFilename: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: UploadFile, fileName: string): Promise<string> => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `products/${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype || undefined,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/products/${fileName}`;
};