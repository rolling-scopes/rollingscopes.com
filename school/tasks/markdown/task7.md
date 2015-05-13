### Implement simple Iterator pattern.

**Requirements:**

1. Bidirectional iteration with a sliding window (yielding sub-arrays) with configurable width starting from the 0th element.
2. Iteration should be configurable to be cyclic (jumping to the 0th element after reaching the end of the sequence and likewise to the last element from the 0th when iterating backwards) or non-cyclic (default behavior).
3. Iterator should accept a custom window transformation/positioning function as a parameter, applied at each iteration step.
4. Iterated array should be observed (with Array.observe or a different Observer pattern implementation) and Iterator instances should react to array modifications accordingly (item removal, insertion and appending should be supported).

Required API:
```javascript
- iterator.forward(n);  // moves iteration window forward on n items 
                        // and returns current values (if n isn't passed moves on 1 item).
- iterator.backward(n); // moves iteration window backward on n items
                        // and returns current values (if n isn't passed moves on 1 item).
- iterator.current();   // returns current values.
- iterator.jumpTo(i);   // moves iteration window to i'th posiiton (don't return values).
```

The whole functionality ~~should~~ must be covered with tests. The best solution to follow TDD.
For testing please use mocha+chai+sinon and mocha-chai-sinon plugin (if needed).

#### Code readability and maintainability are !important.
