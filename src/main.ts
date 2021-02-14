import { platformMomentum } from "./deps.ts";
import { AppModule } from "./app.module.ts";
import { StaticSiteGeneratorService } from "./static-site-generator.service.ts";

const platform = await platformMomentum().bootstrapModule(AppModule);

const ssg = await platform.resolve<StaticSiteGeneratorService>(
  StaticSiteGeneratorService,
);

await Promise.all([
  ssg.compilePages(),
  ssg.copyContent(),
]);
