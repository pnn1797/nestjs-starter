import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [JwtModule.register({}), HttpModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
