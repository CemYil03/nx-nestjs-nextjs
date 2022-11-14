import { NestApplication, NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/_modules/app.module';

async function bootstrap(): Promise<void> {
    const app: NestApplication = await NestFactory.create(AppModule, { cors: true });

    app.use(graphqlUploadExpress({ maxFiles: 10 }));

    app.use(cookieParser());

    const globalPrefix: string = 'api';

    app.setGlobalPrefix(globalPrefix);

    const port: string | number = process.env.PORT || 3333;

    await app.listen(port);
}

void bootstrap();
