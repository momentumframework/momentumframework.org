---
title: "Concepts | Momentum Framework"
---

# Concepts

## Modules

A Momentum module is a container of related injectable dependencies that form a cohesive group of functionality. These dependencies may be module imports, controllers, services, or providers. Each Momentum application must have a least one root module, called AppModule by convention, and is used by Momentum platforms to bootstrap and start the application.

### ModuleMetadata

Momentum modules are decorated by `@MvModule()` with an object argument containing the following properties:

* `imports`: Other modules with exported injectables to be made available to this module.
* `providers`: The Injectables available to this module.
* `controllers`: The Controllers available to this module.
* `exports`: Providers that are made accessible to modules that use this module as an import.

### Dynamic Modules

Documentation coming soon.

#### Async Modules

Documentation coming soon.

### ModuleRef

Documentation coming soon.

### Module Constructor Injection

Documentation coming soon.

## Providers

### @Injectable()

`@Injectable()` marks a class as Provider. A provider is an injectable dependency that is added to the Momentum dependency tree. Providers can be services, factories, repositories, helper utilities, or anything of that nature.

#### Module Providers and Global Providers

Providers are classes decorated by `@Injectable()`. By default, providers are globally injectable. However, it is possible to scope these providers to a module with optional exporting out of that module.

The following is an example of a global provider, `MotorcycleService`. This class can be injected into any injectable, regardless of what module that injectable may or may not be scoped to.

```ts
import { Injectable } from "../deps.ts";

@Injectable()
export class MotorcycleService {}
```

The following is an example of a non-global provider, `BicycleService`. In this example, `BicycleService` is available to any injectable inside the `BicycleModule` as well as any injectable inside the `StoreModule`, such as `StoreService`. It is not available to any module that does not expressly import the `BicycleModule`.

```ts
import { Injectable, MvModule } from "../deps.ts";

@Injectable({ global: false })
export class BicycleService {}

@MvModule({
  imports: [BicycleModule],
  providers: [BicycleService],
  exports: [BicycleService],
})
export class BicycleModule {
}

@Injectable({ global: false })
export class StoreService {
  constructor(
    private readonly bicycleService: BicycleService,
  ) {
  }
}

@MvModule({
  imports: [BicycleModule],
  providers: [StoreService],
})
export class StoreModule {
}
```

### Scope Types

Documentation coming soon.

### Deferred Resolution

Documentation coming soon.

### Optional Resolution

Documentation coming soon.

### Custom Providers

While constructor providers (i.e. providing the class symbol) is the simplest and most common form of module provider, more advanced form of module providers are available for more advanced use cases.

#### useProvider

Documentation coming soon.

#### useFactory

Documentation coming soon.

#### useClass

Documentation coming soon.

#### useValue

Documentation coming soon.

## Controllers

A controller is a class that handles the *request from* and *response to* a client. Using the `@Controller()` decorator and route decorators, a class can be designated to handle routing HTTP requests to action methods for server-side processing. 

### Creating a Controller

To create a controller, create a new class and decorate it with the `@Controller()` decorator. To set the base path of all routes inside of this class, pass a string `route` parameter to the controller as such:

```ts
// app.controller.ts
import { Controller } from "./deps.ts";

@Controller("app")
export class AppController {
}
```

All routes designated inside of this class will now be prefixed with the root path “/app”, i.e. “http://localhost:3000/app”. Leaving this value as an empty string (“”) will respond to the root URL of the application server, i.e. “http://localhost:3000/”.

Once the class is created and decorated with `@Controller()`, it must now be imported into a Momentum module for route resolution.

```ts
// app.module.ts
import { AppController } from "./app.controller.ts";

@MvModule({
  controllers: [AppController],
})
export class AppModule {}
```

### Routing to Actions

#### HTTP Verb Decorators

Each HTTP verb (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) has a corresponding routing decorator (`@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`) which accepts an optional `route` path as a string parameter, which defaults to the controller route when undefined.

```ts
// app.controller.ts
import { AppService } from "./app.service.ts";
import { Controller, Get } from "./deps.ts";

@Controller("")
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get("health")
  getHealthStatus() {
    return this.appService.getHealthStatus();
  }
}
```

#### Request Parameters and Decorators

Momentum provides many decorators to make handling requests and parsing request details simple.

##### @Param()

The `@Param()` decorator allows for extracting a parameter from an assigned parameter of an HTTP request.

```ts
// curl --request GET --url http://localhost:3000/bicyles/id1

@Controller("bicycles")
export class BicycleController {
  @Get(":id")
  getBike(@Param(“id”) id: string) {
    return { status: "ok"; }
  }
}
```

##### @Query()

The `@Query()` decorator allows for extracting a parameter from the query string of an HTTP request.

```ts
// curl --request GET --url http://localhost:3000/bicyles?brand=Fuji

@Controller("bicycles")
export class BicycleController {
  @Get("")
  getBikes(@Query(“brand”) brand: string) {
    return []
  }
}

##### @Body()

The `@Body()` decorator allows for extracting the request body from an HTTP request.

```ts
// curl --request POST --url http://localhost:3000/bicyles --data '{ "brand": "Fuji", "model": "Absolute 2.1" }’

@Controller("bicycles")
export class BicycleController {
  @Post()
  createBike(@Body() requestBody: { brand: string, model: string }) {
    // ...
  }
}
```

##### @Cookie()

The `@Cookie()` decorator allows for extracting a cookie from an HTTP request by name.

```ts
// curl --request GET --url http://localhost:3000/bicyles/view-history

@Controller("bicycles")
export class BicycleController {
  @Get("view-history")
  getViewHistory(@Cookie("userId") userId: string) {
    return [];
  }
}
```

##### @Header()

The `@Header()` decorator allows for extracting a header from an HTTP request by name.

```
// curl --request POST --url http://localhost:3000/bicyles --header 'Authorization: Bearer username:hunter2' --data '{ "brand": "Fuji", "model": "Absolute 2.1" }’

@Controller("bicycles")
export class BicycleController {
  @Post()
  createBike(@Header("Authorization") authHeader: string, @Body() requestBody: { brand: string, model: string }) {
    // ...
  }
}
```

##### @Req()

Documentation coming soon.

##### @Res()

Documentation coming soon.

##### @Context()

Documentation coming soon.

## Filters

Documentation coming soon.

## Middleware

Documentation coming soon.
