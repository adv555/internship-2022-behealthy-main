import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.BACKEND_PORT}/api/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  authenticate(req: any, options: any) {
    options.state = req.query?.role;
    super.authenticate(req, options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, emails } = profile;
    const user = {
      id,
      email: emails[0].value,
      accessToken,
    };

    done(null, user);
  }
}
