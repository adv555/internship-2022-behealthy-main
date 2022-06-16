import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/enums/roles.enum';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
@ApiTags('Contact')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create a new contact.' })
  @ApiBody({ type: CreateContactDto })
  @ApiCreatedResponse({
    description: 'Contact has been successfully created.',
    type: Contact,
  })
  @Post()
  @Roles(Role.PATIENT)
  create(@Body() data: CreateContactDto) {
    return this.contactService.create(data);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of patient's contacts." })
  @ApiOkResponse({
    description: 'List of contacts have been successfully returned',
    type: [Contact],
  })
  @Roles(Role.PATIENT)
  findAllByPatientId(@Query('patient_id') id: number) {
    return this.contactService.findAllByPatientId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact by id.' })
  @ApiOkResponse({
    description: 'Contact with specified id have been successfully returned',
    type: Contact,
  })
  @Roles(Role.PATIENT)
  findOne(@Param('id') id: number) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update partially contact by id.' })
  @ApiBody({ type: UpdateContactDto })
  @ApiOkResponse({
    description: 'Contact with specified id has been successfully updated',
    type: Contact,
  })
  @Roles(Role.PATIENT)
  update(@Param('id') id: number, @Body() data: UpdateContactDto) {
    return this.contactService.update(id, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace contact by id.' })
  @ApiBody({ type: CreateContactDto })
  @ApiOkResponse({
    description: 'Contact with specified id has been successfully replaced',
    type: Contact,
  })
  @Roles(Role.PATIENT)
  replace(@Param('id') id: number, @Body() data: CreateContactDto) {
    return this.contactService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove contact by id.' })
  @ApiOkResponse({
    description: 'Contact with specified id has been successfully removed',
    type: Contact,
  })
  @Roles(Role.PATIENT)
  remove(@Param('id') id: number) {
    return this.contactService.delete(id);
  }
}
