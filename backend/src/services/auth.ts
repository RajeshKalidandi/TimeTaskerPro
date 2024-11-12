import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import RefreshToken from '../models/RefreshToken';

interface TokenPayload {
  id: string;
  type: 'access' | 'refresh';
}

export class AuthService {
  private static ACCESS_TOKEN_EXPIRY = '15m';
  private static REFRESH_TOKEN_EXPIRY = '30d';

  static generateTokens(userId: Types.ObjectId) {
    const accessToken = jwt.sign(
      { id: userId, type: 'access' } as TokenPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: userId, type: 'refresh' } as TokenPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  }

  static async saveRefreshToken(userId: Types.ObjectId, refreshToken: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await RefreshToken.create({
      user: userId,
      token: refreshToken,
      expiresAt
    });
  }

  static async revokeRefreshToken(token: string) {
    await RefreshToken.deleteOne({ token });
  }

  static async verifyRefreshToken(token: string) {
    const refreshToken = await RefreshToken.findOne({ token });
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return decoded;
  }
} 