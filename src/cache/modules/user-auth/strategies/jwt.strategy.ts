import { UnauthorizedException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '../../../config/config.service'
import { Configuration } from '../../../config/config.keys'
import { AuthRepository } from '../repositories/auth.repository'
import { IJwtPayload } from '../../user-auth/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET)
    })
  }

  /**
   * Validates user
   * @param payload 
   * @returns 
   */
  async validate(payload: IJwtPayload) {
    const id = payload.id;
    // TODO: convert to cache to check
    const user = await this._authRepository.findOne({ where: { id: id }, });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
