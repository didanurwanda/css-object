## CSS Object
management css in javascript object

#### Example

```js
var obj = {};

// class
obj = cssObject.addClass(obj, 'your class');
obj = cssObject.addClass(obj, ['class-a', 'class-b']);
obj = cssObject.removeClass(obj, 'class-a');

// attribute
obj = cssObject.attr(obj, 'ng-click', 'clickOk()');
obj = cssObject.attr(obj, {
	'ng-if' => 'scopeShow === true',
	'valign' => 'middle'
});
obj = cssObject.removeAttr(obj, 'valign');

// style
obj = cssObject.css(obj, 'width', '100px');
obj = cssObject.css(obj, {
	'margin-top' => '10px',
	'margin-bottom' => '5px'
});
obj = cssObject.removeCss(obj, 'margin-top');

// merge
obj = cssObject.merge(obj, obj2);
```