import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.user.update({
      where: { id },
      data
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.user.delete({ where: { id } });
  }
}
