import { Client } from '@line/bot-sdk';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LineService {
  private lineClient: Client;
  logger = new Logger(LineService.name);

  constructor() {
    // this.lineClient = new Client({
    //   channelAccessToken: configService.get<string>(
    //     'LINE_CHANNEL_ACCESS_TOKEN',
    //   ),
    //   channelSecret: configService.get<string>('LINE_CHANNEL_SECRET'),
    // });
  }
}
