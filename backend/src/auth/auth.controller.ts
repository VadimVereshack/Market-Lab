import { Controller, Post, Body, HttpCode, Req, Res, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import type { RegisterDto, RegSupplierProfileDto, AuthRequest, Response } from './types';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guard/auth-local.guard';
import { AuthJwtGuard } from './guard/auth-jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }


  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.register(dto);

    res.cookie('authToken', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return result;
  }


  @UseGuards(AuthLocalGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    if (!req.user) throw new UnauthorizedException();

    const result = await this.auth.login(req.user.id);

    res.cookie('authToken', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return result;
  }


  @UseGuards(AuthJwtGuard)
  @Get('session/user')
  async getSession(@Req() req: AuthRequest) {
    return req.user || null;
  }


  @UseGuards(AuthJwtGuard)
  @Post('request-supplier')
  async requestSupplier(
    @Req() req: AuthRequest,
    @Body() dto: RegSupplierProfileDto,
  ) {
    if (!req.user) throw new UnauthorizedException();
    return this.auth.requestSupplier(req.user.id, dto);
  }


  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authToken');
    return { message: 'Logged out successfully' };
  }
}
