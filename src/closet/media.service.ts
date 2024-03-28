import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import validator from 'validator';

@Injectable()
export class MediaService {
  private AWS_S3: S3;

  constructor() {
    this.AWS_S3 = new S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  public async generatePresignedUrl(props: {
    fileName: string;
    path: string;
  }): Promise<{ uploadUrl: string; key: string; contentUrl: string }> {
    const { fileName, path } = props;

    const key = this.generateKeyForImageModule(path, fileName);
    const contentUrl = this.formatKey(key);
    const bucket = process.env.AWS_S3_BUCKET;

    const method = 'put';
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const uploadUrl = await this.AWS_S3.getSignedUrlPromise(
      `${method.toLowerCase()}Object`,
      params,
    );

    return { uploadUrl, key, contentUrl };
  }

  private generateKeyForImageModule(
    path: string,
    fileName: string,
    contentType?: string,
  ): string {
    const extension = this.findExtension(fileName);
    return `${path}/${new Date().getTime()}${extension}`;
  }

  public findExtension(key: string) {
    const keysArray = key.split('.');
    const last = keysArray[keysArray.length - 1];
    return '.' + last;
  }

  public formatKey(key: string) {
    if (key && validator.isURL(key)) {
      return key;
    }
    return `${process.env.AWS_CLOUDFRONT_VIDEO_URL}/${key}`;
  }

  deleteFromS3(bucket, key) {
    const params = { Bucket: bucket, Key: key };

    this.AWS_S3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack); // error
      else console.log(key, 'is deleted successfully'); // deleted
    });
  }
}
