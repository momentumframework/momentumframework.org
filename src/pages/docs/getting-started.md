---
title: "Getting Started | Momentum Framework"
---

# Getting Started

## Prerequisites

### Deno

First and foremost, Momentum requires that Deno is installed on your system.
Momentum is known to be compatible with version 1.7.0 and up. For information on
how to install, please see the [Deno guide](https://deno.land/#installation).

## Install

To get started with Momentum, we recommend using the Momentum CLI. It is
entirely possible to use Momentum without the Momentum CLI by leveraging the mod
files available on deno.land at https://deno.land/x/momentum/.

### Installing the Momentum CLI

The Momentum CLI is a command-line interface to expedite project creation, file
generation, and become a centralized location of add-on tools to help your
Momentum development workflow. To install the CLI, use the following command:

```bash
deno run -A https://deno.land/x/momentum/cli/install.ts
```

Note if you’d like to be explicit with permissions, the following are currently
required: `--allow-run --allow-read --allow-write --allow-net`.

#### Momentum CLI Requirements

The Momentum CLI currently uses Git to enable new project scaffolding and
templating, but Git is not required outside of the `mvf new` command.

### Creating and Running Momentum Projects

### Using the Momentum CLI

#### Creating a New Project

To create a new project, use the following Momentum CLI command:

```bash
mvf new my-api
```

This will clone the
[default starter project](https://github.com/momentumframework/momentum-api-starter)
to `./my-api`. It is also possible to clone a different repository as your
starting template:

```bash
mvf new my-api --repository-url https://github.com/momentumframework/momentum-api-starter
```

#### Running the Default Starter Project

Inside of your new project (i.e. after running `cd ./my-api`), you can run the
following command to start your web application:

```bash
deno run --allow-net --allow-env -c tsconfig.json src/main.ts
```

This will start the webserver at http://localhost:3000 by default or will use
your system environment variable “PORT” instead of port 3000.

##### Optional: Velociraptor

[Velociraptor](https://github.com/umbopepato/velociraptor) is a fantastic
community-supported script runner. While there is no forced integration with
Momentum or Momentum CLI at this time, it is an excellent tool and we recommend
leveraging it to simplify your development experience. The default start project
has set up a few basic scripts that are ready for use with Velociraptor:

- `vr start`: Executes the `src/main.ts` file to start the webserver.
- `vr startdev`: Executes the `src/main.ts` file to start the webserver.
  Initializes a file watcher to check for file changes and trigger a webserver
  restart.
- `vr test`: Runs all Deno tests in the `src` folder.
- `vr format`: Runs Deno format in the `src` folder.

### Using the Starter Repository

The
[default starter repository](https://github.com/momentumframework/momentum-api-starter)
can be cloned or downloaded from Github:

```bash
git clone https://github.com/momentumframework/momentum-api-starter my-api
cd my-api
deno run -A -c tsconfig.json main.ts
```

### Starting from Scratch

If you prefer not to use the Momentum CLI or the provided starter repository,
you are free to do so. To support Momentum, the following dependencies are
required:

```ts
// deps.ts
export * from "https://deno.land/x/momentum/core/mod.ts";
export * from "https://deno.land/x/momentum/di/mod.ts";
// export * from "https://deno.land/x/momentum/platform-oak/mod.ts"; // if running a webserver via Oak
```

Momentum uses decorators and Reflect metadata to support its dependency
injection. To support these features, the following `tsconfig.json` file is
required and must be referenced by `deno run` with the `-c` flag:

```json
// tsconfig.json
{ 
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
