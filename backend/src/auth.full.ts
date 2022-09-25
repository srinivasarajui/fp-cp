import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Module,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UsersModule, UsersService } from './users.full';
import { LocalStrategy, jwtConstants, JwtStrategy } from './auth.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, LocalAuthGuard, Public } from './auth.gaurd';

export class UserInfo {
  @ApiProperty({
    description: 'The email of the user',
    example: 'sample',
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'The user id',
  })
  @IsNotEmpty()
  userId: string;
}

export class UserDto {
  @ApiProperty({
    description: 'The Username of the user',
    example: 'sample',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password of user',
    example: 'pass@123',
  })
  readonly password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService
  ) {}

  @ApiCreatedResponse({
    description: 'User logged in',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDto: UserDto) {
    const user = await this.usersService.findByUserName(userDto.username);
    return {
      access_token: this.jwtTokenService.sign({
        username: user.username,
        userId: user.id,
      }),
      displayName: user.displayName,
      //TODO
      validUpto: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
