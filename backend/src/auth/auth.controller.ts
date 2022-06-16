import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RestoreForgottenPasswordDto } from './dto/restore-forgotten-password';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user with the local strategy by email and password.',
  })
  @ApiOkResponse({
    description: 'User has been successfully login in the system',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(
      req.user.dataValues.id,
      req.user.dataValues.email,
    );
  }

  /* eslint-disable */
  @ApiOperation({ summary: 'Login user with the google strategy.' })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['PATIENT', 'PRACTITIONER', 'ADMIN'],
  })
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req: any) {}
  /* eslint-enable */

  @ApiOperation({ summary: 'Redirect to the response from google API.' })
  @ApiOkResponse({
    description: 'User has been successfully login in the system',
  })
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Request() req: any, @Response() res: any) {
    const user = await this.authService.loginWithGoogle(req);

    return res.redirect(
      `http://${process.env.FRONTEND_HOSTNAME}:${
        process.env.FRONTEND_PORT
      }/portal/${user.role.toLowerCase()}?email=${user.email}&t=${
        user.accessToken
      }&r=${user.refreshToken}`,
    );
  }

  @ApiOperation({ summary: 'Refresh token with JWT strategy.' })
  @ApiOkResponse({
    description: 'Refresh token was succesfully updated in the Redis store',
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req: any) {
    return await this.authService.refresh(req.user.id, req.user.refreshToken);
  }

  @ApiOperation({ summary: 'Update user password.' })
  @ApiBody({
    type: UpdatePasswordDto,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('reset')
  async reset(@Request() req: any, @Body() passwordsDto: UpdatePasswordDto) {
    return await this.authService.resetPassword(req.user.id, passwordsDto);
  }

  @ApiOperation({ summary: 'Activation link send' })
  @ApiOkResponse({
    description: 'Activation link was succesfully sent to the user email',
  })
  @Get('activate/:link')
  async activate(@Param('link') link: string, @Response() res: any) {
    const user = await this.authService.activate(link);

    if (user.role === 'PATIENT') {
      return res.redirect(
        `http://localhost:${process.env.FRONTEND_PORT}/patient/questionary/info`,
      );
    } else if (user.role === 'PRACTITIONER') {
      return res.redirect(
        `http://localhost:${process.env.FRONTEND_PORT}/practitioner/questionnaire/info`,
      );
    } else if (user.role === 'ADMIN') {
      return res.redirect(
        `http://localhost:${process.env.FRONTEND_PORT}/admin`,
      );
    }
  }

  @Get('restore-password/:link')
  @ApiOperation({
    summary: 'Send email with a confirmation link to a user.',
  })
  async completePasswordChange(
    @Param('link') link: string,
    @Response() res: any,
  ) {
    const user = await this.authService.activate(link);

    return res.redirect(
      `http://localhost:${process.env.FRONTEND_PORT}/create-new-password?id=${user.id}&link_id=${link}`,
    );
  }

  @Post('restore-forgotten-password/:id')
  @ApiOperation({
    summary: 'Complete to restore forgotten user password',
  })
  @ApiBody({
    type: RestoreForgottenPasswordDto,
  })
  async restoreForgottenPassword(@Param('id') id: string, @Body() dto: RestoreForgottenPasswordDto) {
    await this.authService.updateForgottenPassword(
      +id,
      dto.password,
      dto.linkId
    );
  }

  @ApiOperation({ summary: 'Update email link send' })
  @ApiOkResponse({
    description: 'Update email link was succesfully sent to the user email',
  })
  @Get('update-email/:link')
  async updateEmail(@Param('link') link: string, @Response() res: any) {
    await this.authService.activate(link);
    return res.redirect(
      `http://localhost:${process.env.FRONTEND_PORT}/sign-in`,
    );
  }
}
