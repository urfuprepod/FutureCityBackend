import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { databaseModule } from './database/database.module';
import { TagsModule } from './tags/tags.module';
import { FutureStatusModule } from './future-status/future-status.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthorsModule } from './authors/authors.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    UsersModule,
    databaseModule,
    TagsModule,
    FutureStatusModule,
    DocumentsModule,
    AuthorsModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
