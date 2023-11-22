import { Body, Controller, Post } from '@nestjs/common';
import { CommonHelperService } from './commonHelper.service';
import { SignedUrlDto } from './dtos/signed-url.dto';
import {
  CustomerMaillDto,
  MailDto,
  MessageDto,
} from './dtos/customer_mail.dto';

@Controller()
export class CommonHelperController {
  constructor(private readonly helperService: CommonHelperService) {}

  @Post('/signed-url')
  getS3SignedUrl(@Body() signedUrlDto: SignedUrlDto) {
    return this.helperService.getS3SignedUrl(signedUrlDto);
  }

  @Post('/email-stylist')
  sendMail(@Body() typeFormData: CustomerMaillDto) {
    return this.helperService.sendEmailStylist(typeFormData);
  }
  @Post('/email-user')
  sendMailCustomer(@Body() typeFormData: MailDto) {
    return this.helperService.sendEmailUser(typeFormData);
  }
  @Post('/message-stylist')
  sendMessage(@Body() numberDto: MessageDto) {
    return this.helperService.messageStylist(numberDto.number);
  }
  @Post('/message-user')
  sendmessageCustomer(@Body() numberDto: MessageDto) {
    return this.helperService.messageUser(numberDto.number);
  }
}
