import { Module } from '@nestjs/common';
import { CompService } from './comp.service';
import { CompController } from './comp.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CompController],
  providers: [CompService, PrismaService]
})
export class CompModule { }
