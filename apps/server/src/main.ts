import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/_modules/app.module';

async function bootstrap(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

    app.set('trust proxy', 1);

    app.use(graphqlUploadExpress({ maxFiles: 10 }));

    app.use(cookieParser());

    const globalPrefix: string = 'api';

    app.setGlobalPrefix(globalPrefix);

    const port: string | number = process.env.PORT || 3333;

    await app.listen(port);
}

void bootstrap();
