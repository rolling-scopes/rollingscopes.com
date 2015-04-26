Deadline         | Folder Name
-----------------|---------
01.04            | linked-list

### Doubly Linked List
Implement data structure "doubly linked list". It should be done as a stand-alone, independent component, which can be used wherever needed. D.L.L. should have the following methods (you can add your own methods, but the 9 listed below must be and named exactly as stated):
* head (returns head of the list)
* tail (returns tail of the list)
* append (param: new data; add new item to the end of the list)
* deleteAt (param: index; deletes item by index; error handling)
* at (returns item by index; error handling)
* insertAt (inserts item by index; new item should be placed at the specified index)
* reverse (rearranges the list's items back-to-front)
* each (param: function; applies specified function to each item of the list)
* indexOF(param: item; return index of the specified item (first entry))

Some of the list's methods should be chainable.
```javascript
var list = new List();
...
list.append(item1).append(item2).append(item3).deleteAt(2).reverse().at(0)
```
##### DON'T USE ARRAYS FOR STORING ITEMS INSIDE DDL!
