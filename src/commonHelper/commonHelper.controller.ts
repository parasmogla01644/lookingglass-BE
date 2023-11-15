import { Body, Controller, Post } from '@nestjs/common';
import { CommonHelperService } from './commonHelper.service';
import { SignedUrlDto } from './dtos/signed-url.dto';
import { CustomerMaillDto } from './dtos/customer_mail.dto';

@Controller()
export class CommonHelperController {
  constructor(private readonly helperService: CommonHelperService) {}

  @Post('/signed-url')
  getS3SignedUrl(@Body() signedUrlDto: SignedUrlDto) {
    return this.helperService.getS3SignedUrl(signedUrlDto);
  }

  @Post('/send-mail')
  sendMail(@Body() typeFormData: CustomerMaillDto) {
    return this.helperService.sendEmail(typeFormData);
  }
}
