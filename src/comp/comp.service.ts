import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comp, Prisma, UserParticipantOnComp, UserViewerOnComp } from '@prisma/client';
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
          connect: { id: "720f9744-69f0-4b5f-9697-9f75d2e31094" }
        }
      }
    });
  }

  async findAll(): Promise<Comp[]> {
    return await this.prismaService.comp.findMany();
  }

  async findOne(id: string): Promise<Comp> {
    return await this.prismaService.comp.findFirst({ where: { id } });
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

  async referenceUserViewerOnComp(userId: string, compId: string): Promise<UserViewerOnComp> {
    const user = await this.prismaService.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const comp = await this.prismaService.comp.findFirst({ where: { id: compId } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.userViewerOnComp.create({
      data: {
        comp_id: comp.id,
        user_id: user.id
      }
    });
  }

  async referenceUserParticipantOnComp(userId: string, compId: string): Promise<UserParticipantOnComp> {
    const user = await this.prismaService.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const comp = await this.prismaService.comp.findFirst({ where: { id: compId } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.userParticipantOnComp.create({
      data: {
        comp_id: comp.id,
        user_id: user.id
      }
    });
  }

  async deleteReferenceUserViewerOnComp(userId: string, compId: string): Promise<UserViewerOnComp> {
    const user = await this.prismaService.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const comp = await this.prismaService.comp.findFirst({ where: { id: compId } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    const userViewerOnCompReference = await this.prismaService.userViewerOnComp.findFirst({
      where: {
        user_id: userId,
        comp_id: compId
      }
    });
    if (!userViewerOnCompReference) {
      throw new HttpException('reference_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.userViewerOnComp.delete({
      where: {
        user_id_comp_id: {
          user_id: userId,
          comp_id: compId
        }
      }
    });
  }

  async deleteReferenceUserParticipantOnComp(userId: string, compId: string): Promise<UserParticipantOnComp> {
    const user = await this.prismaService.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const comp = await this.prismaService.comp.findFirst({ where: { id: compId } });
    if (!comp) {
      throw new HttpException('comp_not_found', HttpStatus.NOT_FOUND);
    }

    const userViewerOnCompReference = await this.prismaService.userParticipantOnComp.findFirst({
      where: {
        user_id: userId,
        comp_id: compId
      }
    });
    if (!userViewerOnCompReference) {
      throw new HttpException('reference_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.userParticipantOnComp.delete({
      where: {
        user_id_comp_id: {
          user_id: userId,
          comp_id: compId
        }
      }
    });
  }
}
