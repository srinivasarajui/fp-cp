import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Injectable, Controller, Module } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The ID generated' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: 'sample@gmail.com',
    description: 'The email of use user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'sample',
    description: 'The user name which should be unique',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: '9550794178',
    description: 'The user name which should be unique',
  })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({
    example: 'sample',
    description: 'The display name used to show on screen',
  })
  @Column({ nullable: true })
  displayName: string;

  @ApiProperty({
    example: 'pass@123',
    description: 'The password',
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'sample',
    description: 'The business name used to show on screen',
  })
  @Column({ nullable: true })
  business: string;

  @ApiProperty({
    example: 'sample',
    description: 'The business name used to show on screen',
  })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({
    example: 'sample',
    description: 'The business name used to show on screen',
  })
  @Column({ nullable: true })
  isStudent: boolean;
}

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
  findByUserName(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email: email,
    });
  }
}

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
})
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
