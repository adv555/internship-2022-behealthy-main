import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('Chat (Temporary)')
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(readonly chatService: ChatService) {}
  @Get()
  @ApiOperation({ summary: 'Return all chats' })
  @ApiOkResponse({
    description: 'All chats successfully returned in array',
    type: [Chat],
  })
  getAll() {
    return this.chatService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return chat by id' })
  @ApiOkResponse({
    description: 'Chat with specified id has been successfully returned',
    type: Chat,
  })
  getOne(@Param('id') id: number) {
    return this.chatService.getOne(id);
  }

  @Get('practitioners/:id')
  @ApiOperation({ summary: 'Return chats by practitioner id' })
  @ApiOkResponse({
    description: 'Chats have been successfully returned',
    type: [Chat],
  })
  getChatListByPractitionerId(
    @Param('id') id: number,
    @Query('status') status: boolean,
  ) {
    return this.chatService.getAllByPractitionerId(id, status);
  }
  @Get('patients/:id')
  @ApiOperation({ summary: 'Return chats by patient id' })
  @ApiOkResponse({
    description: 'Chats have been successfully returned',
    type: [Chat],
  })
  getChatListByPatientId(
    @Param('id') id: number,
    @Query('status') status: boolean,
  ) {
    return this.chatService.getAllByPatientId(id, status);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiBody({
    type: CreateChatDto,
  })
  @ApiOkResponse({
    description: 'New chat has been successfully created',
    type: Chat,
  })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update partially chat by id.' })
  @ApiBody({ type: UpdateChatDto })
  @ApiOkResponse({
    description: 'Chat with specified id has been successfully updated',
    type: Chat,
  })
  update(@Param('id') id: number, @Body() data: UpdateChatDto) {
    return this.chatService.update(id, data);
  }
  @Get('patient/:id/practitioner/:pid')
  @ApiOperation({ summary: 'Get a chat by ids' })
  @ApiOkResponse({
    description: 'Chat has been successfully returned',
    type: Chat,
  })
  getOneByIds(@Param('id') id: number, @Param('pid') pid: number) {
    return this.chatService.getOneByIds(id, pid);
  }
}
