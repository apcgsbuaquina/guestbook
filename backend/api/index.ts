import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

const expressApp = express();
let cachedApp: any;

async function bootstrap() {
    if (!cachedApp) {
        const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

        app.enableCors({
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: 'GET,POST',
            credentials: true,
        });

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );

        await app.init();
        cachedApp = app;
    }

    return expressApp;
}

export default async (req: any, res: any) => {
    const app = await bootstrap();
    app(req, res);
};
