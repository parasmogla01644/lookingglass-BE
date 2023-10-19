import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
      process.env = Object.assign(process.env, this.envConfig);
    } catch (e) {
      this.envConfig = process.env;
    }
  }

  public getValue(key: string): string {
    return this.envConfig[key] ? this.envConfig[key] : null;
  }
}
