import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comp, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async create(data: Prisma.CompCreateInput): Promise<Comp> {
    return await this.prismaService.comp.create({
      data: {
        ...data,
        date_time: new Date(data.date_time),
        user_admin: {
          connect: { id: "e90a0a81-a66e-4c8c-ad32-8df19bdddeff" }
        }
      }
    });
  }

  async findAll(): Promise<Comp[]> {
    return await this.prismaService.comp.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} comp`;
  }

  async update(id: string, data: Prisma.CompUpdateInput): Promise<Comp> {
    const comp = await this.prismaService.comp.findFirst({ where: { id } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.comp.update({
      where: { id },
      data
    });
  }

  async remove(id: string): Promise<Comp> {
    const comp = await this.prismaService.comp.findFirst({ where: { id } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.comp.delete({ where: { id } });
  }
}
