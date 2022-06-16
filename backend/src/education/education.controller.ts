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
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { EducationService } from './education.service';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@ApiTags('Education')
@UseGuards(JwtAuthGuard)
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @ApiOperation({ summary: 'Get all educations of family with specified id.' })
  @ApiOkResponse({
    description:
      'All family practitioner education has been successfully returned in array',
    type: [Education],
  })
  @Get('all/:id')
  async getAllEducationFamilyPractitioners(@Param('id') id: number) {
    return this.educationService.getAllEducationFamilyPractitioners(id);
  }

  @ApiOperation({ summary: 'Get item education family practitioners.' })
  @ApiOkResponse({
    description: 'Education with specified id has been successfully returned',
    type: Education,
  })
  @Get(':id')
  getItemEducationFamilyPractitioners(@Param('id') id: number) {
    return this.educationService.getItemEducationFamilyPractitioners(id);
  }

  @ApiOperation({
    summary:
      'Create new education family practitioners and return new education.',
  })
  @ApiBody({ type: Education })
  @ApiCreatedResponse({
    description: 'Education has been successfully created',
    type: Education,
  })
  @Post()
  createEducationFamilyPractitioners(
    @Body() createEducationDto: CreateEducationDto,
  ) {
    return this.educationService.createEducationFamilyPractitioners(
      createEducationDto,
    );
  }

  @ApiOperation({
    summary:
      'Update item education family practitioners and return update education.',
  })
  @ApiBody({ type: Education })
  @ApiOkResponse({
    description: 'Education with specified id has been successfully updated',
    type: Education,
  })
  @Put(':id')
  updateEducationFamilyPractitioners(
    @Param('id') id: number,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.updateEducationFamilyPractitioners(
      id,
      updateEducationDto,
    );
  }

  @ApiOperation({ summary: 'Delete item education family practitioners.' })
  @ApiOkResponse({
    description: 'Education with specified id has been successfully removed',
    type: Boolean,
  })
  @Delete(':id')
  deleteItemEducationFamilyPractitioners(@Param('id') id: number) {
    return this.educationService.deleteItemEducationFamilyPractitioners(id);
  }
}
