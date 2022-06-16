import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateInsurance } from './dto/create-insurance.dto';
import { InsuranceService } from './insurance.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Insurance } from './entities/insurance.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('Insurance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insurance: InsuranceService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all insurances.' })
  @ApiOkResponse({
    description:
      'All patient insurances have been successfully returned in array',
    type: [Insurance],
  })
  @Roles(Role.PATIENT)
  getAllInsurance() {
    return this.insurance.getAllInsurancePatient();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get insurance by id.' })
  @ApiOkResponse({
    description:
      'Patient insurance with specified id have been successfully returned',
    type: Insurance,
  })
  @Roles(Role.PATIENT)
  getInsurance(@Param('id', ParseIntPipe) id: number) {
    return this.insurance.getInsurancePatient(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create an insurance' })
  @ApiBody({ type: Insurance })
  @ApiCreatedResponse({
    description: 'Patient insurance have been successfully created',
    type: Insurance,
  })
  @Roles(Role.PATIENT)
  createInsurance(@Body() body: CreateInsurance) {
    return this.insurance.createInsurancePatient(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update insurance by id.' })
  @ApiBody({ type: Insurance })
  @ApiOkResponse({
    description:
      'Patient insurance with specified id have been successfully updated',
    type: Insurance,
  })
  @Roles(Role.PATIENT)
  editInsurance(
    @Param('id', ParseIntPipe) id: number,
    @Body() insurance: CreateInsurance,
  ) {
    return this.insurance.updateInsurancePatient(id, insurance);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove insurance by id.' })
  @ApiOkResponse({
    description:
      'Patient insurance with specified id have been successfully removed',
  })
  @Roles(Role.PATIENT)
  deleteInsurance(@Param('id', ParseIntPipe) id: number) {
    return this.insurance.deleteInsurancePatient(id);
  }
}
