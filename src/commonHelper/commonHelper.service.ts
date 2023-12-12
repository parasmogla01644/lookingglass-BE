import { Injectable } from '@nestjs/common';
import { SignedUrlDto } from './dtos/signed-url.dto';
import { S3 } from 'aws-sdk';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { CustomerMaillDto, MailDto } from './dtos/customer_mail.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommonHelperService {
  constructor(private readonly httpService: HttpService) {}
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

  sendEmailUser(typeFormData: MailDto) {
    var emailTemplate = `
    <html>
<body>
  <table align="center" style="background:#f7e2dd; margin: 50px auto; width: 650px;ont-family: arial; font-size: 12px; border: 2px solid #c85c42; border-collapse: collapse;" cellpadding="10">
  <tbody>
        <tr>
        <td align="center">
            <a href="https://lookingglasslifestyle.com/" target="_blank"><img src="https://lookingglasslifestyle.com/cdn/shop/files/lookingglass_Primary_Logo.png?v=1686603299&width=260" alt="logo">
            </a>
        </td>
    </tr>
    <tr>
        <td style="font-size: 16px;">
<p>hey <strong>${typeFormData.name}</strong> </p>
<p>We are so glad you found us! Your stylist is looking at your outfit selections right now and choosing which is best for YOU. Check your phone for a text message from us. Simply reply “hi” to that message to instantly connect with your stylist via texting. </p>
<p>
 We love helping women level up their look with our inclusive and affordable platform. 
</p>
<p>
 Thank you for being here, we can't wait to style you.
</p>
</td>
</tr>
    <tr>
        <td align="center">
            &nbsp;
        </td>
    </tr>
  
</tbody></table>
    </body>
    </html>`;

    return this.sendMail(
      emailTemplate,
      process.env.FROM_MAIL,
      [typeFormData.email || process.env.TO_MAIL],
      'Session Booked - Connect with your Stylist!',
    );
  }

  public async sendMail(
    emailTemplate: string,
    source: string,
    destination: string[],
    subject?: string,
  ) {
    const client = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const params = {
      Destination: {
        ToAddresses: destination,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailTemplate,
          },
        },
        Subject: { Data: subject },
      },
      Source: source,
    };

    try {
      const command = new SendEmailCommand(params);

      const response = await client.send(command);
      return { message: 'Success' };
      return response;
    } catch (err) {
      console.error('Email sending error:', err);
      return { message: 'UnSuccessful' };
    }
  }
  public async sendEmailStylist(typeFormData: CustomerMaillDto) {
    let extraMessage = `A client has just booked a ${typeFormData.type} styling session. Please head to this link- <a href="https://www.twilio.com/console/flex/service-login"> Twilio </a>
        <br />
        Head to the dashboard and accept their message response. Remember that our #1 goal is to make the client feel good about themselves. Do the best you can with the clothes you have to work with. 
        <br />`;
    if (typeFormData.type === 'video')
      extraMessage = `A client has just booked a ${typeFormData.type} styling session. Remember that our #1 goal is to make the client feel good about themselves. 
    Do the best you can with the clothes you have to work with. 
        `;

    var emailTemplate =
      `<html>
<body>
  <table align="center" style="background:#f7e2dd; margin: 50px auto; width: 650px;ont-family: arial; font-size: 12px; border: 2px solid #c85c42; border-collapse: collapse;" cellpadding="10">
  <tbody>
  	<tr>
  		<td align="center">
  			<a href="https://lookingglasslifestyle.com/" target="_blank"><img src="https://lookingglasslifestyle.com/cdn/shop/files/lookingglass_Primary_Logo.png?v=1686603299&width=260" alt="logo">
  			</a>
  		</td>
  	</tr>
  	<tr>
  		<td style="font-size: 16px;">
  			
     ${extraMessage}
        Leave them with a compliment and ensure them that they will look great for their event.
  		</td>
  	</tr>
  <tr>
      <td>
          <h1 style="text-align: center; color:#c85c42; margin: 15px 0 0; font-size:22px">User Data:</h1>
      </td>
  </tr>
  <tr>
      <td>
          <table width="100%" align="center" cellpadding="10">
              <tbody><tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Event:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.event}</td>
              </tr>
              <tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Feel:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.feel}</td>
              </tr>
              <tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">City:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.city}</td>
              </tr>
              <tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Date:</td>
                  <td style="color:#000; font-size:16px"><a style="color: #c85c42;" href="mailto:[email-575]">${typeFormData.date}</a></td>
              </tr>
              <tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Name:</td>
                  <td style="color:#000; font-size:16px"><a style="color:#c85c42;" href="tel:+1 (310) 000-0000" style="color:#000; font-size:16px">${typeFormData.name}</a></td>
              </tr>
               <tr>
                  <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Email:</td>
                  <td style="color:#000; font-size:16px">${typeFormData.email}</td>
              </tr>
              <tr>
              <td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Email:</td>
              <td style="color:#000; font-size:16px">${typeFormData.phone}</td>
          </tr>
` +
      `<tr><td valign="top" width="80" style="color:#000; font-size:16px;font-weight: bold;">Outfit:</td><td style="color:#000; font-size:16px">` +
      typeFormData.outfit?.map(
        (el, index) =>
          `<span key='${index}'>
          <a style="color:#c85c42;" href='${el}'>Image ${index + 1}</a>
      </span>`,
      ) +
      `</td></tr>` +
      `</tbody></table>
    </body>
    </html>`;

    return await this.sendMail(
      emailTemplate,
      process.env.FROM_MAIL,
      [typeFormData.email || process.env.FROM_MAIL],
      'URGENT: CLIENT STYLING SUBMISSION ',
    );
  }
  public async messageStylist(receiver: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_USERNAME}/Messages.json`,
        {
          To: receiver,
          MessagingServiceSid: process.env.MESSAGE_SERVICES_SID,
          Body: `URGENT! A client just booked a text session. Please head to twilio to start the styling session. Details for the client have been sent to you via email. `,
        },
        {
          auth: {
            username: process.env.TWILIO_USERNAME,
            password: process.env.TWILIO_PASSWORD,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    return data;
  }
  public async messageUser(receiver: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `https://studio.twilio.com/v2/Flows/${process.env.TWILIO_FLOWS_ID}/Executions`,
        {
          To: receiver || process.env.DEFAULT_RECEIVER_MESSAGE,
          From: process.env.FROM_MESSAGE,
        },
        {
          auth: {
            username: process.env.TWILIO_USERNAME,
            password: process.env.TWILIO_PASSWORD,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    return data;
  }
}
