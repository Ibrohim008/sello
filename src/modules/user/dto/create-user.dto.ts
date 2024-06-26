import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enum";

export class CreateUserDto {
    @ApiProperty({
        type: String,
      })
      @IsString()
      @IsNotEmpty()
      login: string;
    
      @ApiProperty({
        type: String,
      })
      @IsString()
      @IsNotEmpty()
      password: string;
    
      @ApiProperty({
        type: String,
      })
      @IsString()
      @IsNotEmpty()
      fullName: string;
    
      @ApiProperty({
        enum: RoleEnum,
      })
      @IsEnum(RoleEnum)
      @IsNotEmpty()
      role: RoleEnum;
}
