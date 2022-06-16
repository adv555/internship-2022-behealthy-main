import { UpdateVisitDto } from './dto/update-visit.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit } from './entities/visit.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@ApiTags('Visit')
@UseGuards(JwtAuthGuard)
@Controller('visit')
export class VisitController {
  constructor(private visitService: VisitService) {}

  @ApiOperation({ summary: 'Get all visit patient to family practitioners .' })
  @ApiResponse({ status: 200, type: [Visit] })
  @Get('all/:id') // this param id it declaration id;
  getAllVisitPatient(@Param('id') id: number) {
    return this.visitService.getAllVisitPatientToDeclaration(id);
  }

  @ApiOperation({ summary: 'Get item visit patient to family practitioners.' })
  @ApiResponse({ status: 200, type: Visit })
  @Get(':id')
  getItemVisitPatient(@Param('id') id: number) {
    return this.visitService.getItemVisitPatientToId(id);
  }

  @ApiOperation({ summary: 'Create visit patient to family practitioners.' })
  @ApiResponse({ status: 201, type: Visit })
  @Post('create')
  createVisitPatient(@Body() createVaccinesDto: CreateVisitDto) {
    return this.visitService.createVisitPatient(createVaccinesDto);
  }

  @ApiOperation({ summary: 'Update info visit patient.' })
  @ApiResponse({ status: 200, type: Visit })
  @Put(':id')
  async updateVisitPatient(
    @Param('id') id: number,
    @Body() updateVaccinesDto: UpdateVisitDto,
  ) {
    return this.visitService.updateVisitPatient(id, updateVaccinesDto);
  }

  @ApiOperation({ summary: 'Delete visit patient to family practitioners.' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete(':id')
  async deleteItemVisitPatient(@Param('id') id: number) {
    return this.visitService.deleteVisitPatient(id);
  }
}
