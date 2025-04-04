import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SendLoginCodeService } from '../../services/send-login-code.service';
import { VerifyLoginCodeService } from '../../services/verify-login-code.service';
import { LoginRequestDto } from '../dto/login-request.dto';
import { VerifyCodeDto } from '../dto/verify-code.dto';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdatePasswordService } from '../../services/update-password.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly sendLoginCodeService: SendLoginCodeService,
    private readonly verifyLoginCodeService: VerifyLoginCodeService,
    private readonly updatePasswordService: UpdatePasswordService,
  ) {}

  @Post('request-login')
  async requestLogin(@Body() dto: LoginRequestDto) {
    await this.sendLoginCodeService.execute(dto.email, dto.password);
    return { message: 'Code envoyé par email' };
  }

  @Post('verify-code')
  async verifyLogin(@Body() dto: VerifyCodeDto) {
    const token = await this.verifyLoginCodeService.execute(dto.email, dto.code);
    return { accessToken: token };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  async updatePassword(@Req() req, @Body() dto: UpdatePasswordDto) {
    await this.updatePasswordService.execute(
      req.user.userId,
      dto.currentPassword,
      dto.newPassword
    );
    return { message: 'Mot de passe mis à jour' };
  }
}
