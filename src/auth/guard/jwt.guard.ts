import { AuthGuard } from '@nestjs/passport'

// by default is jwt by jwt passport strategy
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }
}
