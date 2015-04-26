### Custom JQuery
Deadline         | Folder Name
-----------------|----------------
22.04.2015 23:59 | custom-jquery

Реализовать урезаную по функционалу, но идентичную по синтаксису версию JQuery
Методы которые нужно реализовывать:
* [addClass](http://api.jquery.com/addClass/)
* [append](http://api.jquery.com/append/)
* [html](https://api.jquery.com/html/)
* [attr](http://api.jquery.com/attr/)
* [children](http://api.jquery.com/children/)
* [css](http://api.jquery.com/css/)
* [data](http://api.jquery.com/data/)
* [on](http://api.jquery.com/on/)
* [one](http://api.jquery.com/one/)
* [each](https://api.jquery.com/each/)

### Доп. условия:
* chaining

### Пример
```javascript

$('.my-class')
	.each(function (index) {
		$(this).html('<b>' + index + '</b>')
	})
	.append($('div'))
	.addClass('my-super-class')
	.css({
		backgroundColor: 'rebeccapurple'
	});

```
