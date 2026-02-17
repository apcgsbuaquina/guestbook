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
            origin: '*',
            methods: 'GET,POST',
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
