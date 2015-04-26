# Build ToDoApp with Gulp

[Download](http://rolling-scopes.github.io/front-end-course/tasks/gulp-build-task.zip) app

Install missing front-end dependencies with `bower`

* backbone (v1.1.2)
* backbone.localstorage (v1.1.16)
* jquery (v2.1.3)
* underscore (v1.7.0)

Also you will need `npm` packages

* todomvc-app-css (v1.0.0)
* todomvc-common (v1.0.1)

Required styles:

`node_modules/todomvc-common/base.css`

`node_modules/todomvc-app-css/index.css`

Required tasks:
* jshint
* uglify
* cssmin

Default gulp task should run all this tasks

Optional:
* useref
