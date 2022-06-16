import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatMessageService } from './chat-message.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/enums/roles.enum';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private service: ChatMessageService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new declaration with patient and family practitioner.',
  })
  @ApiBody({ type: ChatMessage })
  @ApiCreatedResponse({
    description: 'New declaration has been successfully returned',
    type: ChatMessage,
  })
  @Roles(Role.PRACTITIONER)
  createMessage(@Body() dto: CreateChatMessageDto) {
    return this.service.createMessage(dto);
  }
}
