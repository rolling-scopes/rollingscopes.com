## Lecture #1 Plan

1. SPA: definition, why and how – 10 min.
2. Rich- vs thin- client – 10 min.
3. Server- and client-side rendering - 5 min.
4. AngularJS: overview, main concepts – 25 min.
5. MVC pattern in AngularJS – 10 min.
6. Sample seed project explanation (todomvc.com and boilerplate on github) – 15 min.
7. Workshop with explanations (controllers + directives).

## Images
http://lekcije.smiko.info/javascript/angularjs/uvod.html

## Practice 1 (5 steps) deadline 22-12-2014 12-00 send to andrei_yemialyanchik@epam.com:

1. http://goo.gl/grrTPW
2. http://goo.gl/CoqXPy
3. http://goo.gl/75hgJq
4. http://goo.gl/yOC4Vx
5. http://goo.gl/nriURP
Send only last step!

## Practice 2: (deadline 24-12-2014) verification tasks on the lecture or send to andrei_yemialyanchik@epam.com:
1. Add pagination parameters into Github $resourse search. See https://developer.github.com/v3/#pagination
2. Implement endless scrolling directive with default scope to show repositories from practice 1:
    * One response from Github should return 10 results.
    * When user reaches the end of the screen - next 10 results should be loaded (added to current array).

        Tips:
            * To save reference on existing array - use:
            Array.prototype.push.apply(results, newResults); // why? what is apply?
            * Subscribe on window scroll event
    * Sort results by server order (just remove filters from ngRepeat)
3. Create custom template for directive with isolated scope (template should contain  ngRepeat).
    * Pass following parameters over two-way binding property '=':

        scope: {
            search: "=",
            forks: "=",
            stars: "=",
            size: "=",
            perPage: "="
        }
    * Move method send() from controller to directive.
    * Call method send using angular events. See https://docs.angularjs.org/api/ng/type/$rootScope.Scope

        Tips:
            * Fire event from controller by: $rootScope.$broadcast('yourEventName'); // why $rootScope?
            * Subscribe on this event in directive
4. Back button still should work!!

Materials:
* Egghead: https://egghead.io/technologies/angularjs

* AngularJS basics: https://www.dropbox.com/s/jwz8muklazz520x/AngularJS%20basics.pptx?dl=0
* repositories.json: https://www.dropbox.com/s/9032a815aw2ec4m/repositories.json?dl=0

## Codeschool free course
https://www.codeschool.com/courses/shaping-up-with-angular-js
