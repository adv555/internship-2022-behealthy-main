import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings-dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings-dto';
import { NotificationSettings } from './entities/notification_settings.entity';
import { NotificationSettingsService } from './notification_settings.service';

@ApiTags('Notification settings')
@UseGuards(JwtAuthGuard)
@Controller('notification-settings')
export class NotificationSettingsController {
  constructor(
    private notificationSettingsService: NotificationSettingsService,
  ) {}

  @ApiOperation({
    description: 'Get all notification settings',
  })
  @ApiOkResponse({
    description: 'Returned an array of notification settings',
    type: [NotificationSettings],
  })
  @Get()
  async getAllNotificationSettings() {
    return await this.notificationSettingsService.getAllSettings();
  }

  @ApiOperation({
    description: 'Get one notification settings by user ID',
  })
  @ApiOkResponse({
    description: 'Returned a user notification settings',
    type: NotificationSettings,
  })
  @Get(':id')
  async getNotificationSettingsByPractitionerId(@Param('id') id: string) {
    return await this.notificationSettingsService.getSettingsByPractitionerId(
      +id,
    );
  }

  @ApiOperation({
    description: 'Create a user notification settings',
  })
  @ApiOkResponse({
    description: 'Returned a user notification settings',
    type: NotificationSettings,
  })
  @Post()
  async createNotificationSettings(
    @Body() createNotificationSettingsDto: CreateNotificationSettingsDto,
  ) {
    return await this.notificationSettingsService.create(
      createNotificationSettingsDto,
    );
  }

  @ApiOperation({
    description: 'Update a user notification settings',
  })
  @Patch(':id')
  async updateNotificationSettings(
    @Param('id') id: string,
    @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
  ) {
    return await this.notificationSettingsService.update(
      +id,
      updateNotificationSettingsDto,
    );
  }

  @ApiOperation({
    description: 'Delete a user notification settings',
  })
  @Delete(':id')
  async deleteNotificationSettings(@Param('id') id: string) {
    return await this.notificationSettingsService.delete(+id);
  }
}
