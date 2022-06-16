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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateRelativesDto } from './dto/create-relatives.dto';
import { UpdateRelativesDto } from './dto/update-relatives.dto';
import { Relatives } from './entities/relatives.entity';
import { RelativesService } from './relatives.service';

@ApiTags('Relatives')
@UseGuards(JwtAuthGuard)
@Controller('relatives')
export class RelativesController {
  constructor(private relativesService: RelativesService) {}

  @Get('all/:id')
  @ApiOperation({ summary: 'Get all relatives of patient with specified id.' })
  @ApiOkResponse({
    description:
      "All patient's relatives has been successfully returned in array",
    type: [Relatives],
  })
  getAllRelativesToByIdPatient(@Param('id') id: number) {
    return this.relativesService.getAllRelativesToByIdPatient(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get relative by id.' })
  @ApiOkResponse({
    description: 'Relative with specified id has been successfully returned',
    type: Relatives,
  })
  getItemRelativesToById(@Param('id') id: number) {
    return this.relativesService.getItemRelativesToById(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new patient relative.' })
  @ApiBody({ type: Relatives })
  @ApiCreatedResponse({
    description: "New patient's relative has been successfully returned",
    type: Relatives,
  })
  createRelative(@Body() createRelativesDto: CreateRelativesDto) {
    return this.relativesService.createRelative(createRelativesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a patient relative by id.' })
  @ApiBody({ type: Relatives })
  @ApiOkResponse({
    description: 'Relative with specified id has been successfully updated',
    type: Relatives,
  })
  updateRelative(
    @Param('id') id: number,
    @Body() updateRelativesDto: UpdateRelativesDto,
  ) {
    return this.relativesService.updateRelative(id, updateRelativesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a patient relative by id.' })
  @ApiOkResponse({
    description: 'Relative with specified id has been successfully removed',
    type: Relatives,
  })
  deleteItemRelatives(@Param('id') id: number) {
    return this.relativesService.deleteItemRelative(id);
  }
}
