import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Comp, Prisma, UserViewerOnComp } from '@prisma/client';
import { CompService } from './comp.service';

@Controller('comp')
export class CompController {
  constructor(private readonly compService: CompService) { }

  @Post()
  async create(@Body() data: Prisma.CompCreateInput): Promise<Comp> {
    return await this.compService.create(data);
  }

  @Get()
  async findAll(): Promise<Comp[]> {
    return await this.compService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comp> {
    return await this.compService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.CompUpdateInput): Promise<Comp> {
    return await this.compService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Comp> {
    return await this.compService.remove(id);
  }

  @Post(':compId/viewer/:userId')
  async referenceUserViewerOnComp(@Param('compId') compId: string, @Param('userId') userId: string): Promise<UserViewerOnComp> {
    return await this.compService.referenceUserViewerOnComp(userId, compId);
  }

  @Post(':compId/participant/:userId')
  async referenceUserParticipantOnComp(@Param('compId') compId: string, @Param('userId') userId: string): Promise<UserViewerOnComp> {
    return await this.compService.referenceUserParticipantOnComp(userId, compId);
  }
}
