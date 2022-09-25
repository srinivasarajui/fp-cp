import { Injectable, Controller, Module, Get } from '@nestjs/common';

@Injectable()
class CommonService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Controller()
class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  getHello(): string {
    return this.commonService.getHello();
  }
}

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
