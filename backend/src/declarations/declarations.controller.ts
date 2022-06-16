import { UpdateDeclarationDto } from './dto/update-declarations.dto';
import { CreateDeclarationDto } from './dto/create-declarations.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeclarationsService } from './declarations.service';
import { Declarations } from './entities/declarations.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/enums/roles.enum';
import { Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('Declarations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('declarations')
export class DeclarationsController {
  constructor(private declarationsService: DeclarationsService) {}

  @Get('family-practitioners/:id')
  @ApiOperation({
    summary: 'Get all declarations of family practitioners with specified id.',
  })
  @ApiOkResponse({
    description:
      'All family practitioners declarations has been successfully returned in array',
    type: [Declarations],
  })
  getAllFamilyPractitionerDeclarations(@Param('id') id: number) {
    return this.declarationsService.getAllFamilyPractitionerDeclarations(id);
  }

  @Get('family-practitioners/:id/status')
  @ApiOperation({
    summary:
      'Get all declarations of family practitioner with specified status.',
  })
  @ApiOkResponse({
    description: 'Declarations has been successfully returned in array',
    type: [Declarations],
  })
  getDeclarationsByStatus(
    @Param('id') id: number,
    @Query('status') status: string,
  ) {
    return this.declarationsService.getDeclarationsByStatus(id, status);
  }

  @Get('patient/:id')
  @ApiOperation({
    summary: 'Get all declarations of patient with specified id.',
  })
  @ApiOkResponse({
    description:
      'All patients declarations has been successfully returned in array',
    type: [Declarations],
  })
  getAllPatientDeclarations(@Param('id') id: number) {
    return this.declarationsService.getAllPatientDeclarations(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get declaration by id.' })
  @ApiOkResponse({
    description: 'Declaration with specified id has been successfully returned',
    type: Declarations,
  })
  getItemDeclarations(@Param('id') id: number) {
    return this.declarationsService.getItemDeclarations(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new declaration with patient and family practitioner.',
  })
  @ApiBody({ type: Declarations })
  @ApiCreatedResponse({
    description: 'New declaration has been successfully returned',
    type: Declarations,
  })
  createDeclarations(@Body() createDeclarationsDto: CreateDeclarationDto) {
    return this.declarationsService.createDeclarations(createDeclarationsDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a declaration by id.' })
  @ApiBody({ type: Declarations })
  @ApiOkResponse({
    description: 'Declaration with specified id has been successfully updated',
    type: Declarations,
  })
  updateDeclarations(
    @Param('id') id: number,
    @Body() updateDeclarationsDto: UpdateDeclarationDto,
  ) {
    return this.declarationsService.updateDeclarations(
      id,
      updateDeclarationsDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a declaration by id.' })
  @ApiOkResponse({
    description: 'Declaration with specified id has been successfully removed',
    type: Boolean,
  })
  @Roles(Role.PRACTITIONER)
  deleteDeclarations(@Param('id') id: number) {
    return this.declarationsService.deleteDeclarations(id);
  }
}
