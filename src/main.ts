import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  // ENV variable
  const appPort = configService.get('APP_PORT')
  const appName = configService.get('APP_NAME')
  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors)
      },
    }),
  )
  // OpenAPI
  const openApiConfig = new DocumentBuilder()
    .setTitle(`${appName} OpenAPI`)
    .setDescription(`The ${appName} API documentation`)
    .setVersion('1.0')
    .addTag(`${appName}`)
    .build()
  const document = SwaggerModule.createDocument(app, openApiConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(appPort)
}
bootstrap()
