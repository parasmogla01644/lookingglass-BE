import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { CustomerModule } from 'src/customer/customer.module';
import { ConfigService } from 'src/core/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from 'src/core/config.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.POSTGRES_SERVER,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        pool: { idle: 5000, min: 1 },
        ssl: true,
        autoLoadModels: true,
        synchronize: false,
        standardConformingStrings: false,
        // clientMinMessages: false,
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
