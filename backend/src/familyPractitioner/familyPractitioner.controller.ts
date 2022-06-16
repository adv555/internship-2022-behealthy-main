import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FamilyPractitionerService } from './familyPractitioner.service';
import { CreateFamilyPractitionerDto } from './dto/create-family-practitioner.dto';
import { UpdateFamilyPractitionerDto } from './dto/update-family-practitioner.dto';
import { FamilyPractitioner } from './entities/familyPractitioner';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('Family Practitioner')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('family-practitioner')
export class FamilyPractitionerController {
  constructor(
    private readonly familyPractitionerService: FamilyPractitionerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new family practitioner.' })
  @ApiBody({ type: FamilyPractitioner })
  @ApiCreatedResponse({
    description: "New patient's vaccine has been successfully returned",
    type: FamilyPractitioner,
  })
  create(@Body() createFamilyPractitionerDto: CreateFamilyPractitionerDto) {
    return this.familyPractitionerService.create(createFamilyPractitionerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all family practitioner' })
  @ApiOkResponse({
    description:
      'All family practitioner has been successfully returned in array',
    type: [FamilyPractitioner],
  })
  findAll() {
    return this.familyPractitionerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get family practitioner by id.' })
  @ApiOkResponse({
    description:
      'Family practitioner with specified id has been successfully returned',
    type: FamilyPractitioner,
  })
  findOne(@Param('id') id: string) {
    return this.familyPractitionerService.findOne(+id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get family practitioner by user id.' })
  @ApiOkResponse({
    description:
      'Family practitioner with specified user id has been successfully returned',
    type: FamilyPractitioner,
  })
  findByUserId(@Param('id') id: string) {
    return this.familyPractitionerService.findByUserId(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a family practitioner by id.' })
  @ApiBody({ type: FamilyPractitioner })
  @ApiOkResponse({
    description:
      'Family practitioner with specified id has been successfully updated',
    type: FamilyPractitioner,
  })
  @Roles(Role.PRACTITIONER)
  update(
    @Param('id') id: string,
    @Body() updateFamilyPractitionerDto: UpdateFamilyPractitionerDto,
  ) {
    return this.familyPractitionerService.update(
      +id,
      updateFamilyPractitionerDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a family practitioner vaccine by id.' })
  @ApiOkResponse({
    description:
      'Family practitioner with specified id has been successfully removed',
  })
  @Roles(Role.PRACTITIONER)
  remove(@Param('id') id: string) {
    return this.familyPractitionerService.remove(+id);
  }
}
