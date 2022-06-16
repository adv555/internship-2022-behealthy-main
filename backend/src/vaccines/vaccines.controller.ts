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
import { VaccinesService } from './vaccines.service';
import { CreateVaccinesDto } from './dto/create-vaccines.dto';
import { UpdateVaccinesDto } from './dto/update-vaccines.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Vaccines } from './entities/vaccines.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@ApiTags('Vaccines')
@UseGuards(JwtAuthGuard)
@Controller('vaccines')
export class VaccinesController {
  constructor(private vaccinesService: VaccinesService) {}

  @Get('all/:id') // this param id is patient id;
  @ApiOperation({ summary: 'Get all vaccines of patient with specified id.' })
  @ApiOkResponse({
    description:
      "All patient's vaccines has been successfully returned in array",
    type: [Vaccines],
  })
  getAllVaccinesPatient(@Param('id') id: number) {
    return this.vaccinesService.getAllVaccinesPatient(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vaccine by id.' })
  @ApiOkResponse({
    description: 'Vaccine with specified id has been successfully returned',
    type: Vaccines,
  })
  getItemVaccinePatient(@Param('id') id: number) {
    return this.vaccinesService.getItemVaccinePatient(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new patient vaccine.' })
  @ApiBody({ type: Vaccines })
  @ApiCreatedResponse({
    description: "New patient's vaccine has been successfully returned",
    type: Vaccines,
  })
  createVaccinePatient(@Body() createVaccinesDto: CreateVaccinesDto) {
    return this.vaccinesService.createVaccinePatient(createVaccinesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a patient vaccine by id.' })
  @ApiBody({ type: Vaccines })
  @ApiOkResponse({
    description: 'Vaccine with specified id has been successfully updated',
    type: Vaccines,
  })
  async updateVaccinesPatient(
    @Param('id') id: number,
    @Body() updateVaccinesDto: UpdateVaccinesDto,
  ) {
    return this.vaccinesService.updateVaccinesPatient(id, updateVaccinesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a patient vaccine by id.' })
  @ApiOkResponse({
    description: 'Vaccine with specified id has been successfully removed',
  })
  async deleteItemVaccinesPatient(@Param('id') id: number) {
    return this.vaccinesService.deleteItemVaccinesPatient(id);
  }
}
