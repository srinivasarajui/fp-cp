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
export class Invoice {
  @ApiProperty({ example: 'sample', description: 'The ID generated' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'invoice name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'invoice name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 'invoice name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  client: string;

  @ApiProperty({
    example: 'invoice name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  manager: string;

  @ApiProperty({
    example: 'invoice name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  dueAmount: number;

  @ApiProperty({
    example: 'invoice type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  type: string;

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
export class InvoiceService extends TypeOrmCrudService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private repository: Repository<Invoice>,
  ) {
    super(repository);
  }
}

@ApiTags('Invoices')
@Crud({
  model: {
    type: Invoice,
  },
})
@ApiBearerAuth('access-token')
@Controller('invoices')
export class InvoiceController implements CrudController<Invoice> {
  constructor(public service: InvoiceService) {}
}

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [TypeOrmModule.forFeature([Invoice])],
})
export class InvoiceModule {}
