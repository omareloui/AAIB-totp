import { Injectable, NotFoundException } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

authenticator.options = {
  window: 2,
};

@Injectable()
export class TotpService {
  private db: Record<string, string> = {};

  private getSecret(email: string): string {
    const secret = this.db[email];
    if (!secret) throw new NotFoundException({}, "Can't find the user");
    return secret;
  }

  generate(email: string) {
    const secret = this.getSecret(email);
    const token = authenticator.generate(secret);
    return { token, generatedOn: Date.now() };
  }

  verify(email: string, token: string) {
    const secret = this.db[email];
    const isValid = authenticator.verify({ token, secret });
    return isValid;
  }

  register(email: string) {
    const secret = authenticator.generateSecret();
    this.db[email] = secret;
    return { email, secret };
  }

  async getQRCode(email: string) {
    const secret = this.getSecret(email);
    const uri = authenticator.keyuri(email, 'AAIB', secret);
    const imageData = await toDataURL(uri);
    return { uri, imageData: imageData! };
  }
}
