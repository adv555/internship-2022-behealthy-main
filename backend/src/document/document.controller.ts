import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Documents } from './entities/documents.entity';

@ApiTags('Documents')
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get('all/:id')
  @ApiOperation({ summary: 'Get all documents of user with specified id.' })
  @ApiOkResponse({
    description:
      "All patient's vaccines has been successfully returned in array",
    type: [Documents],
  })
  getAllDocumentsOfUser(@Param('id') id: number) {
    return this.documentService.getAllDocumentsOfUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by id.' })
  @ApiOkResponse({
    description: 'Document with specified id has been successfully returned',
    type: Documents,
  })
  getItemDocumentOfUser(@Param('id') id: number) {
    return this.documentService.getItemDocumentOfUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user documents.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        user_id: { type: 'integer', example: 1 },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
            description: 'Files to upload',
          },
          minItems: 1,
          maxLength: 2,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Document has been successfully created',
    type: Documents,
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @Body() body: CreateDocumentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.documentService.uploadFile(body, files);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user document by id.' })
  @ApiBody({ type: Documents })
  @ApiOkResponse({
    description: 'Document with specified id has been successfully updated',
    type: Documents,
  })
  updateDocumentToUser(
    @Param('id') id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.updateDocumentToUser(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user document by id.' })
  @ApiOkResponse({
    description: 'Document with specified id has been successfully removed',
    type: Boolean,
  })
  deleteDocumentToUser(@Param('id') id: number) {
    return this.documentService.deleteDocumentToUser(id);
  }
}
