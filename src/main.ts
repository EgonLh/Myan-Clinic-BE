import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger configuration
  app.enableCors({
    origin: 'http://localhost:3001', // your frontend URL
    credentials: true, // if you need cookies
  });
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for Myan Clinic project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
