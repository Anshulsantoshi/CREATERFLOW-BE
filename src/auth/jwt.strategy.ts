import {Injectable} from '@nestjs/common'
import {PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Token kahan dhoondna hai? (Header mein 'Authorization' ke andar)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // 2. Expire token ko reject karna hai? (Haan)
      ignoreExpiration: false,
      
      // 3. Secret Key wahi honi chahiye jo AuthModule mein thi
      secretOrKey: 'SECRET_KEY_123', 
    });
  }

  // Jab token sahi niklega, toh ye function chalega
  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}