import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  signJwt(payload: any, jwtSignOptions?: JwtSignOptions) {
    return this.jwtService.sign(payload, jwtSignOptions);
  }

  verifyJwt(token: string, jwtSignOptions?: JwtSignOptions) {
    return this.jwtService.verify(token, jwtSignOptions);
  }
}
