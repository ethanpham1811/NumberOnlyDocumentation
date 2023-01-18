# Penguin Web App

## Overview

> This project provides FE source code for Penguin Project base on [Angular 12](https://angular.io/) for web app client side.
> The default settings are targeting to Singapore market version, Please run the country selector project to switch the settings.

## Crossbrowsers support

> The browser version must at least match the below chart or above for the `animation` & `fallback` to work properly

|         |     |
| ------- | --: |
| Chrome  |  20 |
| Firefox |  28 |
| Safari  | 6.1 |
| Edge    |  12 |
| IE      |  11 |
| Opera   |  12 |

## Packages & Dependencies

This project was used with:

|                                                       |        |
| ----------------------------------------------------- | ------ |
| [Angular CLI](https://github.com/angular/angular-cli) | 12.0.5 |
| [Node](https://nodejs.org/)                           | 16.3.0 |
| [Package Manager](https://www.npmjs.com/package/npm)  | 7.18.1 |

### Dependencies

|                     |         |
| ------------------- | ------: |
| @angular/cdk        |  12.0.5 |
| @angular/common     |  12.0.5 |
| @ngx-translate/core |  13.0.0 |
| @angular/core       |  12.0.5 |
| ng-zorro-antd       | ^11.4.2 |
| exceljs             |   4.2.1 |
| lodash              | 4.17.21 |
| moment              |  2.29.1 |
| rxjs                |   6.6.0 |
| tslib               |   2.1.0 |

### Dev dependencies

|                               |          |
| ----------------------------- | -------: |
| @angular-devkit/architect     | 0.1200.3 |
| @angular-devkit/build-angular |   12.0.5 |
| @angular-devkit/core          |   12.0.5 |
| @angular-devkit/schematics    |   12.0.5 |
| @angular/cdk                  |   12.0.5 |
| @angular/cli                  |   12.0.5 |
| @schematics/angular           |   12.0.5 |
| rxjs                          |    6.6.7 |
| typescript                    |    4.2.4 |
| eslint                        |   7.26.0 |
| jasmine-core                  |   3.7.0" |
| karma                         |    6.3.0 |

## Run development server

### Auto reload

1. Run `npm start`
2. Navigate to [4200](http://localhost:4200/)

> Automatically reload if you change any of the source files.

### Disable auto reload

1. Run `npm run dev`
2. Navigate to [8169](http://localhost:8169/)

> Manually refresh the browser to get updates.

## Environments & configuration

- Development: src/environments/environment.ts
- Staging: src/environments/environment.staging.ts
- UAT: src/environments/environment.uat.ts
- Production: src/environments/environment.prod.ts

Api endpoints:

1. Find to specific environment file above:
2. Edit key **API_URL** to change api endpoints
   `https://peguin-<env>-api.com`

## Build

With specific environment, you can run build process with `build:[enviroment]`

1. Build for development: `npm build:development`
2. Build for production: `npm build:production`
3. Build for uat: `npm build:uat`
4. Build for staging: `npm build:staging`

File on folder **src/environments** will be auto detected for build process

## Linting

Run `npm run lint` before pushing to repository. Remember, **fix all highlight** before pushing, thank you!

> Add this comment on top of the next line you want ignore eslint just in case
> `// eslint-disable-next-line <lint>`
> with <lint> one of below:

- `@angular-eslint/directive-selector`
- `@angular-eslint/component-selector`

for further reference, check .eslintrc.json

## Deployment

Keys need that is used to access the `.env` variables in runtime:

1. **BASE_COUNTRY**: country
2. **BASE_LANGUAGE**: language
3. **API_BASE_URL**: api request

## Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## End-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

> You could use Cypress for automation testing.

## Maintenance

View file [maintaince](./maintaince.md) for more information

## Structure of project

> Folder structure options and [naming conventions](https://angular.io/guide/styleguide)

### Global folder

```
[root]
  └── _html 			#html demostration
  ├── _mockup			#mockup for testing ui
  ├── _templates		#templates for ui
  ├── src 			#main folder for source code
  ├── .browserslistrc
  ├── .editorconfig
  ├── .eslintignore
  ├── .eslintrc.json
  ├── .gitattributes
  ├── .gitignore
  ├── .prettierignore
  ├── .prettierrc
  ├── angular.json
  ├── karma.conf.js
  ├── package.json
  ├── tsconfig.app.json
  ├── tsconfig.eslint.json
  ├── tsconfig.json
  └── tsconfig.spec.json
```

### Source code folder

```
[root]
  ├─── src
  │	├── _configs
  │	├── _cores
  │	│	├── _enums
  │	│	├── _helpers
  │	│	├── _interceptors
  │	│	├── _interfaces
  │	│	├── _models
  │	│	└── _services
  │	│		├── api.service.ts
  │	│		└── index.ts
  │	└─── core.module.ts
  │	├── _fakes
  │	├── _shares
  │	│	├── _enums
  │	│	├── _guards
  │	│	├── _interceptors
  │	│	├── _interfaces
  │	│	├── _modules
  │	│	│	├── index.ts
  │	│	│	└── translate-lazy.module.ts
  │	│	└── _services
  │	│	│	├── index.ts
  │	│	│	├── session.service.spec.ts
  │	│	│	└── session.service.ts
  │	└──── shared.module.ts
  │	├── app
  │	│	├── authentication 			# authentication module
  │	│	├── inside 				# user logged module
  │	│	├── outside 				# public routes module
  │	│	├── app-routing.module.ts		# app routes
  │	│	├── app.component.html			# app html display
  │	│	├── app.component.scss			# app style
  │	│	├── app.component.spec.ts 		# app test
  │	│	├── app.component.ts			# app main component
  │	│	└── app.module.ts			# app main module
  │	├── assets
  │	│	└── main.scss			# main scss file
  │	└── environments
  │		├──environment.prod.ts		#production env
  │		├── environment.staging.ts	#staging env
  │		├── environment.ts		#dev env
  │		└── environment.uat.ts		#uat env
  ├─ favicon.ico
  ├─ index.html
  ├─ main.ts
  ├─ polyfills.html
  ├─ styles.scss
  └─ test.ts
```

### The sample module structures

```
[root]
  ├─── src
  │	├──   app
  │	│	├── sample	 #---> sample module
  │	│	│	├── _components
  │	│	│	├── _enums
  │	│	│	│	├── api.enum.ts		# api routing enum
  │	│	│	│	├── index.ts
  │	│	│	│	├── routes.ts 		# other constant
  │	│	│	│	├── sample-status.ts 	# other constant
  │	│	│	├── _guards
  │	│	│	│	├── sample.guard.ts
  │	│	│	│	└── index.ts
  │	│	│	├── _interfaces
  │	│	│	│	├── index.ts
  │	│	│	│	└── ISample.ts
  │	│	│	├── _models
  │	│	│	│	├── sample.model.ts
  │	│	│	│	└── index.ts
  │	│	│	├── _modules
  │	│	│	|	├── child-module-01
  │	│	│	|	|	└── child-module-01.module.ts
  │	│	│	|	├── child-module-02
  │	│	│	|	|	└── child-module-02.module.ts
  │	│	│	|	├── child-module-03
  │	│	│	|	|	└── child-module-03.module.ts
  │	│	│	│	└── index.ts
  │	│	│	├── _pipes
  │	│	│	|	├── status-sample.pipe.ts
  │	│	│	|	├── colour-sample.pipe.ts
  │	│	│	│	└── index.ts
  │	│	│	└── _services
  │	│	│		├── index.ts
  │	│	│		├── sample.service.spec.ts
  │	│	│		└── sample.service.ts
  │	│	├── sample-routing.module.ts
  │	│	├── sample.component.html
  │	│	├── sample.component.scss
  │	│	├── sample.component.ts
  │	│	└── sample.module.ts
  │	...
```

## Technical tips

## Code scaffolding

Use default [angular-cli](https://angular.io/cli/generate) as below:
Run

> ng generate **schematic** **schematic-name** > _or_
> ng g **schematic** **schematic-name**

Exp: Generate module report

> ng generate module report
> or
> ng g module report

To generate a new **schematic**.
You can also use others schematic as: directive, pipe, service, class, guard, interface, enum, module.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page or contact tech leader for more detail.

## Reference

1. [Angular Document](https://angular.io/)
2. [Angular Material Document](https://material.angular.io/)
3. [MomentJS](https://momentjs.com/)
4. [Lodash](https://lodash.com/docs/4.17.15)
5. [Ngx Translate](https://github.com/ngx-translate/core)
6. [SCSS Lang](https://sass-lang.com/)
7. [Typescript Lang](https://www.typescriptlang.org/)
8. [Karma](https://karma-runner.github.io)
