import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User has been successfully created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users and return an array of them.' })
  @ApiOkResponse({
    description: 'All users have been successfully returned in array',
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({
    description: 'User with specified id have been successfully returned',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user by email.' })
  @ApiOkResponse({
    description: 'User with specified email has been successfully returned',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User with specified id has been successfully updated',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('/avatar/:id')
  @ApiOperation({ summary: 'Update a user avatar by id.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Files to upload',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'User avatar with specified id has been successfully updated',
    type: User,
  })
  @UseInterceptors(FilesInterceptor('avatar'))
  updateAvatar(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.userService.updateAvatar(id, body, files[0]);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove user by id and password.' })
  @ApiOkResponse({
    description: 'User with specified id has been successfully removed',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Body() userData: { password: string }) {
    return this.userService.remove(+id, userData);
  }
}
