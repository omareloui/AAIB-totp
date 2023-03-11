import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VerifyTotpDto, AddUserDto } from './dto/totp.dto';
import { TotpService } from './totp.service';

@Controller('auth/totp')
export class TotpController {
  constructor(private totpService: TotpService) {}

  @Get('generate')
  generateTotp(@Query('email') email: string) {
    return this.totpService.generate(email);
  }

  @Post('register')
  register(@Body() body: AddUserDto) {
    return this.totpService.register(body.email);
  }

  @Post('verify')
  verifyTotp(@Body() body: VerifyTotpDto) {
    return { isValid: this.totpService.verify(body.email, body.token) };
  }

  @Get('qrcode')
  getQRCode(@Query('email') email: string) {
    return this.totpService.getQRCode(email);
  }
}
