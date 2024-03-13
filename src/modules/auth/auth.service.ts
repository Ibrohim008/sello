import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { ILoginData, IRegister } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import {
  LoginOrPasswordWrongException,
  UserAlreadyExistException,
} from './exception/auth.exception';
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

  async register(dto: RegisterDto): Promise<ResData<IRegister>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (foundUser) {
      throw new UserAlreadyExistException();
    }

    const { data: user } = await this.userService.create(dto);
    const token = await this.jwtService.signAsync({ id: user.id });

    return new ResData<IRegister>('Created', HttpStatus.CREATED, {
      user: user,
      token,
    });
  }
}
