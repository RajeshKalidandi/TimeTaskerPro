import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const socketAuth = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      throw new Error('Authentication error');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
}; 