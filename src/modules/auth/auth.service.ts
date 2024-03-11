import { HttpStatus, Injectable } from '@nestjs/common';
import { ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto } from './dto/auth.dto';
import { LoginOrPasswordWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }
}
