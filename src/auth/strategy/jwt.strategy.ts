import { Request } from 'express'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import axios from 'axios'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Strategy } from 'passport-strategy'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local-token') {
  constructor(
    private jwt: JwtService,
    private readonly configService: ConfigService,
  ) {
    super()
  }

  async authenticate(req: Request): Promise<void> {
    const token = req.headers.authorization
    if (!token) {
      this.fail(new UnauthorizedException('Token not found'), 401)
      return
    }

    try {
      //TODO: Declare customer credential API URL here
      const url = ``
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      })
      if (response.status) {
        const decode: any = await this.jwt.decode(token.split(' ')[1])
        this.success({ ...decode, token })
      } else {
        this.fail(new UnauthorizedException('Invalid token'), 401)
      }
    } catch (error) {
      this.fail(new UnauthorizedException('Error validating token'), 401)
    }
  }
}
