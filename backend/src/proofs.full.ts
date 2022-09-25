import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  Column,
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
export class Proof {
  @ApiProperty({ example: 'sample', description: 'The ID generated' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'proof name',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'proof type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column()
  type: string;

  @ApiProperty({
    example: 'ship type',
    description: 'The name of user who needs to be interviewed',
  })
  @Column({ nullable: true })
  status: string;

  @UpdateDateColumn()
  updatedDate: Date;
}

@Injectable()
export class ProofService extends TypeOrmCrudService<Proof> {
  constructor(
    @InjectRepository(Proof)
    private repository: Repository<Proof>,
  ) {
    super(repository);
  }
}

@ApiTags('Proofs')
@Crud({
  model: {
    type: Proof,
  },
})
@ApiBearerAuth('access-token')
@Controller('proofs')
export class ProofController implements CrudController<Proof> {
  constructor(public service: ProofService) {}
}

@Module({
  controllers: [ProofController],
  providers: [ProofService],
  imports: [TypeOrmModule.forFeature([Proof])],
})
export class ProofModule {}
