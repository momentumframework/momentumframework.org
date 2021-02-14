---
title: "Techniques | Momentum Framework"
---

# Techniques

## MVC

The Model-View-Controller (MVC) is an architectural pattern that separates an
application into three components: the model, the view, and the controller. This
design is popularized by the likes of Ruby On Rails and ASP.NET MVC and remains
a popular paradigm for building scalable and extensible applications.

### Creating a new MVC Application with Momentum CLI

To create a new project with all of the MVC module configurations set up, use
the following Momentum CLI command:

```bash
mvf new my-mvc-application -r https://github.com/momentumframework/momentum-mvc-starter
```

### Installation

Momentum MVC can be added to your application by importing the `MvcModule` into
your root module.

```ts
// deps.ts

// Momentum
export * from "https://deno.land/x/momentum/core/mod.ts";
export * from "https://deno.land/x/momentum/di/mod.ts";
export * from "https://deno.land/x/momentum/platform-oak/mod.ts";

// Momentum MVC
export * from "https://deno.land/x/momentum/mvc/mod.ts";
```

```ts
// app.module.ts

import { MvcModule, MvModule } from "./deps.ts";

@MvModule({
  imports: [
    MvcModule.register({}),
  ],
})
export class AppModule {}
```

### Configuration

The MvcModuleOptions object passed in as the `register` argument on `MvcModule`
offers a number of configurations with helpful defaults:

- `viewFolder`: The root folder containing the application views. By default,
  this is `src/views`.
- `layoutFolder`: The folder containing the layout views. By default, this is
  `src/views/_layout`.
- `partialsFolder`: The folder containing partial views. By default, this is
  `src/views/_partials`.
- `defaultLayout`: The name of the file in the layout folder to use as the
  layout. To disable globally, pass `false`. By default, this is `main`.
- `cacheTemplates`: Indicates of the application should cache templates for
  rendering. When set to true, the templates will be read from disk and
  pre-compiled only once.

### View Engines

The View Engine is the tool used to compile dynamic templates into servable
HTML. Momentum’s modularity allows for swapping out the view engine in the
`MvcModule` registration with the `viewEngineModule` parameter.

#### Handlebars

Handlebars is currently supported by Momentum with the `MvcHandlebarsModule`.

##### Installation

Add the following module dependency:

```ts
// deps.ts
export * from "https://deno.land/x/momentum/mvc-handlebars/mod.ts";
```

Once imported, add the `MvcHandlebarsModule` to the `MvcModule` registration.

```ts
import { MvcHandlebarsModule, MvcModule, MvModule } from "./deps.ts";

@MvModule({
  imports: [
    MvcModule.register({
      viewEngineModule: MvcHandlebarsModule,
    }),
  ],
})
export class AppModule {}
```

##### Helpers

##### renderBody Helper

The `{{{ renderBody }}}` helper is used by layouts to render a view inside of
the layout. Note that the three braces are required as they tell Handlebars not
to escape the HTML rendered by the helper.

```ts
// src/views/_layout/main.hbs

<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
  {{{ renderBody }}}
</body>
</html>
```

### Views

Documentation coming soon.

### Areas

Documentation coming soon.

### ViewHelpers

Documentation coming soon.

### Partials

Documentation coming soon.

## Static Files

Static files can be served by Momentum using the StaticFileModule.

### Installation

Static files can be added to your application by importing the
`StaticFileModule` into your root module.

```ts
// deps.ts

export * from "https://deno.land/x/momentum/static-files/mod.ts";
```

### Configuration

The StaticFilesConfig object passed in as the `register` argument on
`StaticFilesModule` offers a number of configurations with helpful defaults:

- `serverRoot`: The path on the server where the static files are stored. By
  default, this is `/src/content`.
- `contentRoot`: The path from which to serve static files. By default, this is
  `/content`, i.e. “http://localhost:3000/content”.
- `mimeMap`: The custom MIME types to use per file. This is an object with the
  extension as the key and MIME type as the value, i.e.
  `{ ".css": "text/css" }`.
