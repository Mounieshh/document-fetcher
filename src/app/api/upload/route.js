import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
const requiredEnvVars = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BUCKET_NAME',
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: false,
});


const Bucket = process.env.AWS_BUCKET_NAME;

export const s3uploadFile = async (file, filePath) => {
  const fileBuffer = await file.arrayBuffer();
  const fileKey = `${filePath}/${file.name}`;
  const hash = crypto.createHash('sha256').update(Buffer.from(fileBuffer)).digest('base64');

  const uploadParams = {
    Bucket: Bucket,
    Key: fileKey,
    Body: Buffer.from(fileBuffer),
    ChecksumSHA256: hash, 
  };
  console.log(uploadParams);


  const command = new PutObjectCommand(uploadParams);
  const response = await s3Client.send(command);
  
  return response;
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf');

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'No valid PDF file provided' }, { status: 400 });
    }

    const filePath = 'uploads';
    const response = await s3uploadFile(file, filePath);

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}/${file.name}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error.message, error.stack);
    return NextResponse.json({ error: `Failed to upload PDF: ${error.message}` }, { status: 500 });
  }
}