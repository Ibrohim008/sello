import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IRegister {
  user: UserEntity;
  token: string;
}
