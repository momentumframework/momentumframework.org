import { MvModule } from "./deps.ts";
import { StaticSiteGeneratorService } from "./static-site-generator.service.ts";

@MvModule({
  providers: [StaticSiteGeneratorService],
  imports: [],
})
export class AppModule {}
