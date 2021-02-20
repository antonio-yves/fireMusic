import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function loginMiddleware(request: Request, response: Response, next: NextFunction){
    const { authorization } = request.headers;

    if(!authorization){
        return response.status(401).json({"error": "You cannot access this page"});
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'olamundo');
        const { id } = data as TokenPayload;

        request.userId = id;
        return next();
    } catch {
        return response.status(401).json({"error": "You cannot access this page"});
    }

}