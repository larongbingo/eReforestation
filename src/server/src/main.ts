import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import compression = require("compression");
import helmet = require("helmet");
import cors = require("cors");
import express from "express";

import { AppModule } from "./app.module";
import { checkEnvFile } from "./modules/config/Config.Module";

async function bootstrap() {
  await checkEnvFile();
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("eReforestation")
    .setDescription("The APIs of eReforestation website")
    .setVersion("0.1")
    .addTag("Public")
    .addTag("Participant")
    .addTag("Admin")
    .addTag("SuperUser")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true }));
  app.use("/images", express.static("static"));
  app.use(express.json({limit: "100mb"}));
  app.use(express.urlencoded({limit: "100mb", extended: true}));
  app.use(helmet());
  app.use(cors());
  app.use(compression());

  await app.listen(8080);
}
bootstrap();
