import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthUtil } from './common/auth/auth.util';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  app.get(AuthUtil).initialize();
  
  //デプロイまでにもう少し厳格なcorsルールつける
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
