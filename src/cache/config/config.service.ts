import * as fs from 'fs';
import { parse } from 'dotenv';

/**
 * ConfigService
 */
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV === 'development';
    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      const envFilePath = __dirname + '/../../.env.production';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env.production file does not exist');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
