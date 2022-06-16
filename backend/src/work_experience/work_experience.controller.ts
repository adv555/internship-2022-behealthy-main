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
import { CreateWorkExperienceDto } from './dto/create-work_experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work_experience.dto';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperience } from './entities/work_experience.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('Work Experience')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('work-experience')
export class WorkExperienceController {
  constructor(private workExperienceService: WorkExperienceService) {}

  @Get('all/:id')
  @ApiOperation({
    summary:
      'Get all work experience of family practitioner with specified id.',
  })
  @ApiOkResponse({
    description:
      'All family practitioner work experience has been successfully returned in array',
    type: [WorkExperience],
  })
  getAllWorkExperience(@Param('id') id: number) {
    return this.workExperienceService.getAllWorkExperience(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work experience by id.' })
  @ApiOkResponse({
    description:
      'Work experience with specified id has been successfully returned',
    type: WorkExperience,
  })
  @Roles(Role.PRACTITIONER)
  getItemWorkExperience(@Param('id') id: number) {
    return this.workExperienceService.getItemWorkExperience(id);
  }

  @Post('')
  @ApiOperation({
    summary: 'Create a new family practitioner work experience.',
  })
  @ApiBody({ type: WorkExperience })
  @ApiCreatedResponse({
    description:
      'New family practitioner work experience has been successfully returned',
    type: WorkExperience,
  })
  createWorkExperience(
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
  ) {
    return this.workExperienceService.createWorkExperience(
      createWorkExperienceDto,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a family practitioner work experience by id.',
  })
  @ApiBody({ type: WorkExperience })
  @ApiOkResponse({
    description:
      'Work experience with specified id has been successfully updated',
    type: WorkExperience,
  })
  @Roles(Role.PRACTITIONER)
  updateWorkExperience(
    @Param('id') id: number,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ) {
    return this.workExperienceService.updateWorkExperience(
      id,
      updateWorkExperienceDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a family practitioner work experience by id.',
  })
  @ApiOkResponse({
    description:
      'Work experience with specified id has been successfully removed',
    type: WorkExperience,
  })
  @Roles(Role.PRACTITIONER)
  deleteItemWorkExperience(@Param('id') id: number) {
    return this.workExperienceService.deleteItemWorkExperience(id);
  }
}
