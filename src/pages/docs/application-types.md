---
title: "Application Types | Momentum Framework"
---

# Application Types

## About Platforms

Momentum supports multiple types of applications and it does so via the
“platform” paradigm. Inside of the `main.ts` file, the platform bootstraps a
root module via the `bootstrapModule()` method to start the application
according to its designated behaviors outlined in the following sections.

## Console Applications

Momentum can be used to build powerful console applications by leveraging
`platformMomentum`.

```ts
import { CliModule } from "./cli/cli.module.ts";
import { CliService } from "./cli/cli.service.ts";
import { platformMomentum } from "./deps.ts";

// Bootstrap the module and build the dependency tree
const platform = await platformMomentum().bootstrapModule(CliModule);

// Resolve a service to do work
const program = await platform.resolve<CliService>(CliService);

// Do work
program.startProgram();
```

## Web Applications

Momentum can be used as a scalable web application framework by leveraging the
[Oak](https://oakserver.github.io/oak/) platform. Oak is a middleware HTTP
framework akin to Express and Koa in NodeJS. Momentum wraps the Oak request
pipeline and makes it easy to build a dependency injection-supported server-side
web application, such as a REST APIs or MVC applications.

```ts
import { AppModule } from "./app.module.ts";
import { platformOak } from "./deps.ts";

const platform = await platformOak().bootstrapModule(AppModule);

const port = parseInt(Deno.env.get("PORT") ?? "3000");

await platform.listen({ port });
```

### Customizing the Oak Application and Router

`platformOak()` when given no parameters creates a default instantiation of both
`Application` and `Router` from the Oak module. It is possible to create your
own instantiation of these classes and pass them into `platformOak()`. For
example, you can add custom event listeners by creating a new `Application` and
calling `addEventListener()`.

```ts
import { Application } from "https://deno.land/x/oak/application.ts";
import { Router } from "https://deno.land/x/oak/router.ts";
import { platformOak } from "./deps.ts";
import { AppModule } from "./app.module.ts";

const app = new Application();
const router = new Router();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log([
    `Listening on `,
    secure ? "https://" : "http://",
    hostname ?? "localhost",
    `:${port}`,
  ].join(""));
});

const platform = await platformOak(app, router).bootstrapModule(AppModule);

const port = parseInt(Deno.env.get("PORT") ?? "3000");
await platform.listen({ port });
```
