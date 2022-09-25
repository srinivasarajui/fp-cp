import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable, Controller, Module } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Entity()
export class Order {
  @ApiProperty({ example: 'sample', description: 'The ID generated' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'order name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'ship type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  shipType: string;

  @ApiProperty({
    example: 'ship type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 'ship type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
  ) {
    super(repository);
  }
}

@ApiTags('Orders')
@Crud({
  model: {
    type: Order,
  },
})
@ApiBearerAuth('access-token')
@Controller('orders')
export class OrderController implements CrudController<Order> {
  constructor(public service: OrderService) {}
}

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
