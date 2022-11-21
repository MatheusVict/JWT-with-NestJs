import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/Users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
//Encontra o usuário
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Aqui crio o token
  async login(user: Partial<UsersEntity>) {
    const payload = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;

    try {
      user = await this.userService.findOneUser({ where: { email } });
    } catch (error) {
      return null;
    }
    const isPassworValid = await compareSync(password, user.password);

    if (!isPassworValid) return null;

    return user;
  }
}
