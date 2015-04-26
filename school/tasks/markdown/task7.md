Implement simple Iterator pattern.

1. Bidirectional iteration with a sliding window (yielding sub-arrays) with configurable width starting from the 0th element.
2. Iteration should be configurable to be cyclic (jumping to the 0th element after reaching the end of the sequence and likewise to the last element from the 0th when iterating backwards) or non-cyclic (default behavior).
3. Iterator should accept a custom window transformation/positioning function as a parameter, applied at each iteration step.
4. Iterated array should be observed (with Array.observe or a different Observer pattern implementation) and Iterator instances should react to array modifications accordingly (item removal, insertion and appending should be supported).

Code readability and maintainability are !important.
