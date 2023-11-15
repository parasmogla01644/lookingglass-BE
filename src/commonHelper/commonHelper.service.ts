import { Injectable } from '@nestjs/common';
import { SignedUrlDto } from './dtos/signed-url.dto';
import { S3 } from 'aws-sdk';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
@Injectable()
export class CommonHelperService {
  public async getS3SignedUrl(params: SignedUrlDto) {
    const res = await this.generatePresignedUrl(params);
    return {
      message: 'success',
      result: { url: res },
    };
  }

  public async generatePresignedUrl({
    key,
    content,
    method = 'get',
    expires_in = 604800, // 7 days expiry time
  }) {
    const bucketName = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;

    let params: any = {};
    switch (method.toLowerCase()) {
      case 'get':
        params = {
          Bucket: bucketName,
          Key: key,
        };
        break;
      case 'put':
        params = {
          Bucket: bucketName,
          Key: key,
          ContentType: content,
          Expires: expires_in,
        };
        break;
      default:
        break;
    }
    const AWS_S3 = new S3({
      region: region,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    return AWS_S3.getSignedUrlPromise(`${method.toLowerCase()}Object`, params);
  }

  public async sendEmail(typeFormData) {
    var emailTemplate =
      `
    <html>
<body>
  <table align="center" style="margin: 50px auto; width: 650px;ont-family: arial; font-size: 12px; border: 1px solid #000; border-collapse: collapse;" cellpadding="10">
  <tbody>
  <tr>
      <td>
          <h1 style="text-align: center; color:#000; margin: 15px 0 0; color: #000; font-size:22px">User Data:</h1>
      </td>
  </tr>
  <tr>
      <td>
          <table width="100%" align="center" cellpadding="10">
              <tbody><tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Event:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.event}</td>
              </tr>
              <tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Feel:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.feel}</td>
              </tr>
              <tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">City:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.city}</td>
              </tr>
              <tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Date:</td>
                  <td style="color:#000; font-size:16px"><a style="color: #000;" href="mailto:[email-575]">${typeFormData.date}</a></td>
              </tr>
              <tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Name:</td>
                  <td style="color:#000; font-size:16px"><a href="tel:+1 (310) 000-0000" style="color:#000; font-size:16px">${typeFormData.name}</a></td>
              </tr>
               <tr>
                  <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Email:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.email}</td>
              </tr>
              <tr>
              <td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Phone:</td>
              <td style="color:#000; font-size:16px">${typeFormData.phone}</td>
          </tr>
` +
      `<tr><td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Outfit:</td><td style="color:#000; font-size:16px">` +
      typeFormData.outfit?.map(
        (el, index) =>
          `<span key='${index}'>
          <a href='${el}'>Image ${index + 1}</a>
      </span>`,
      ) +
      `</td></tr>` +
      `<tr><td valign="top" width="180" style="color:#000; font-size:16px;font-weight: bold;">Optional Outfit:</td><td style="color:#000; font-size:16px">
  ` +
      // typeFormData.optional_outfit?.map(
      //   (el, index) =>
      //     `<span key='${index}'>
      //       <a href='${el}'>Image ${index + 1}</a>
      //   </span>`
      // ) +
      `</td></tr></tbody></table>
    </body>
    </html>`;

    const params = {
      Destination: {
        ToAddresses: [typeFormData.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailTemplate,
          },
        },
        Subject: { Data: 'Testing email' },
      },
      Source: 'lana@lookingglasslifestyle.com',
    };

    try {
      const command = new SendEmailCommand(params);

      const response = await client.send(command);
      return { message: 'Success' };
      return response;
    } catch (err) {
      console.error('Email sending error:', err);
    }
  }
}
