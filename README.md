# imnd-dom

A set of methods for working with the DOM

**Methods:**

find element:
```
find(selector, parent)
findLast(selector, parent)
findAll(selector, parent)
findById(id, parent)
findByName(name, parent)
findAllByName(name, parent)
findObj(val, parent)
findAllByTag(tagName, parent)
findByTag(tagName, parent)
findAllByClass(className, parent)
findByClass(className, parent)
findLastByClass(className, parent)
```
event handling:
```
ready(handler)
click(handler)
blur(handler)
change(handler)
setEventHandler(eventName, handler)
```
the rest methods:
```
get()
getAll()
each(handler)
length()
parent()
child(selector)
children(selector)
create(selector)
replace(selector)
html(html)
id(id)
class(className)
addClass(className)
removeClass(className)
val(value)
getAttr(attrName)
setAttr(attrName, value)
attr(attrName, value)
clear(object)
clearForm()
hide(objID)
renderTemplate(template, vars)
```
**Usage:**
```
import dom from 'imnd-dom';

dom([selector])
    .html([html])
    .class([class name])
    ...
;
```
