import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CompModule } from './comp/comp.module';

@Module({
  imports: [UserModule, CompModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
