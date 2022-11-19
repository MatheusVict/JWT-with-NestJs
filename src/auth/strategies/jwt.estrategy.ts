import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; //Como é uma estrategia para o jwt vem do pass jwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // BearerToken igual no jwt da outra aula
      ignoreExpiration: false, // não ignora expiração, ou seja, expirou não funciona mais
      secretOrKey: process.env.SECRET_KEY, // Secrete definida no jwt ele da um match
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email }; //Passa um Header Authorization com valor de Bearer token
  }
}
