/**
 * A set of methods for working with the DOM
 *
 * @constructor
 */

const dom = function (argument) {
  let node;
  let nodes = [];

  const dom = {};

  function getParent (parent) {
    if (parent === undefined) {
      parent = (node === undefined) ? document : node;
    }
    return parent;
  }

  function setNodes(_nodes) {
    nodes = _nodes;

    if (nodes) {
      node = nodes[0]
    }
  }

  // find

  dom.find = (selector, parent) => {
    node = getParent(parent).querySelector(selector)

    return dom;
  }

  dom.findLast = (selector, parent) => {
    const elems = getParent(parent).querySelectorAll(selector);
    node = elems[elems.length - 1];

    return dom;
  }

  dom.findAll = (selector, parent) => {
    setNodes(getParent(parent).querySelectorAll(selector));

    return dom;
  }

  dom.findById = (id, parent) => {
    parent = getParent(parent);

    node = parent.getElementById ? parent.getElementById(id) : parent.all ? parent.all[id][1] : parent.layers[id];

    return dom;
  }

  dom.findByName = (name, parent) => {
    parent = getParent(parent);

    node = parent.getElementsByName ? parent.getElementsByName(name)[0] : parent.all ? parent.all[name] : parent.layers[name];

    return dom;
  }

  dom.findAllByName = (name, parent) => {
    parent = getParent(parent);

    node = parent.getElementsByName ? parent.getElementsByName(name) : parent.all ? parent.all[name] : parent.layers[name];

    return dom;
  }

  dom.findObj = (val, parent) => {
    node = typeof (val) === 'object' ? val : dom.findById(val, parent) || dom.findByName(val, parent) || dom.findByClass(val, parent)

    return dom;
  }

  dom.findAllByTag = (tagName, parent) => {
    parent = getParent(parent);

    if (parent.getElementsByTagName) {
      setNodes(parent.getElementsByTagName(tagName));
    }

    return dom;
  }

  dom.findByTag = (tagName, parent) => {
    node = dom.findAllByTag(tagName, parent)[0]

    return dom;
  }

  dom.findAllByClass = (className, parent) => {
    parent = getParent(parent);
    if (parent.getElementsByClassName(className)) {
      setNodes(parent.getElementsByClassName(className));
    }

    return dom;
  }

  dom.findByClass = (className, parent) => {
    dom.findAllByClass(className, parent);

    return dom;
  }

  dom.findLastByClass = (className, parent) => {
    dom.findAllByClass(className, parent);
    if (nodes) {
      node = nodes[nodes.length - 1];
    }

    return dom;
  }

  // events

  dom.ready = handler => {
    const method = 'addEventListener';
    document[method] ? document[method]('DOMContentLoaded', handler) : window.attachEvent('onload', handler)
  }

  dom.click = handler => {
    dom.setEventHandler('click', handler);

    return dom;
  }

  dom.blur = handler => {
    dom.setEventHandler('blur', handler);

    return dom;
  }

  dom.change = handler => {
    dom.setEventHandler('change', handler);

    return dom;
  }

  dom.setEventHandler = (eventName, handler) => {
    node.addEventListener(eventName, handler);

    return dom;
  }

  if (typeof argument === 'string' || argument instanceof String) {
    dom.findAll(argument);
  } else if (typeof argument === 'function' || argument instanceof Function) {
    dom.ready(argument);
  } else {
    node = argument;
  }

  // the rest methods

  dom.get = () => {
    return node;
  };

  dom.getAll = () => {
    return nodes;
  }

  dom.each = handler => {
    for (let key = 0; key < nodes.length; key++) {
      handler(nodes[key])
    }
  }

  dom.length = () => {
    return node.length;
  }

  dom.parent = () => {
    return node.parentNode;
  }

  dom.child = selector => {
    dom.find(selector, node);

    return dom;
  }

  dom.children = selector => {
    dom.findAll(selector, node);

    return dom;
  }

  dom.create = selector => {
    let div = document.createElement('div');
    div.innerHTML = selector.trim();

    return div.firstChild;
  }

  dom.replace = selector => {
    const newItem = dom.create(selector);
    node.parentNode.replaceChild(newItem, node);

    return dom;
  }

  dom.html = html => {
    if (node === undefined) {
      return '';
    }
    if (html === undefined) {
      return node.innerHTML
    }
    node.innerHTML = html;

    return dom;
  }

  dom.id = id => {
    if (id === undefined) {
      return node.id;
    } else {
      node.id = id;
      return dom;
    }
  }

  dom.class = className => {
    if (className === undefined) {
      return node.className;
    } else {
      node.className = className;
      return dom;
    }
  }

  dom.addClass = className => {
    dom.class(`${dom.class()} ${className}`);
    return dom;
  }

  dom.removeClass = className => {
    dom.class(dom.class().replace(className, ''))
    return dom;
  }

  dom.val = value => {
    if (node === undefined) {
      return '';
    }
    const objType = node.type;
    if (objType === 'checkbox') {
      if (value === undefined) {
        return node.checked;
      } else {
        node.checked = value;
        return dom;
      }
    } else if (objType === 'select-one' || objType === 'select-multiple') {
      if (value === undefined) {
        return node.options[node.selectedIndex].value ? node.options[node.selectedIndex].value : node.options[node.selectedIndex].text;
      } else {
        let options = node.options;
        for (let key in options) {
          if (options[key].value === value) {
            node.selectedIndex = key;
          }
        }
        return dom;
      }
    } else if (node.value !== undefined) {
      if (objType === 'text' || objType === 'password' || objType === 'hidden' || objType === 'select-one') {
        if (value === undefined) {
          return node.value;
        } else {
          node.value = value;
          return dom;
        }
      }
      if (objType === 'textarea' || objType === 'submit') {
        if (value === undefined) {
          return node.innerHTML;
        } else {
          node.innerHTML = value;
          return dom;
        }
      }
    } else if (node.innerHTML !== undefined) {
      if (value === undefined) {
        return node.innerHTML;
      } else {
        node.innerHTML = value;
        return dom;
      }
    }
  }

  dom.getAttr = attrName => {
    if (node.getAttribute) {
      return node.getAttribute(attrName);
    }
  }

  dom.setAttr = (attrName, value) => {
    if (node.setAttribute) {
      node.setAttribute(attrName, value);
    }
    return dom;
  }

  dom.attr = (attrName, value) => {
    if (value === undefined) {
      return dom.getAttr(attrName);
    } else {
      dom.setAttr(attrName, value);
      return dom;
    }
  }

  dom.clear = object => {
    dom.findObj(object);
    if (node === undefined) {
      return dom;
    }
    const objType = node.type;
    if (objType === undefined) {
      return dom;
    }
    if (objType === 'checkbox') {
      node.checked = '';
    } else if (objType === 'select-one' || objType === 'select-multiple') {
      node.selectedIndex = 0;
    } else if (node.value !== undefined) {
      if (objType === 'text' || objType === 'password' || objType === 'hidden' || objType === 'textarea' || objType === 'select-one') {
        node.value = '';
      }
    } else if (node.innerHTML) {
      node.innerHTML = '';
    }

    return dom;
  }

  dom.clearForm = () => {
    const form = dom.findObj(arguments[0]);
    const controls = form.childNodes;
    for (let i in controls) {
      dom.clear(controls[i]);
    }

    return dom;
  }

  dom.hide = objID => {
    dom.findById(objID);
    node.className = 'hidden';
    return dom;
  }

  dom.renderTemplate = (template, vars) => {
    let openCurlPos = template.indexOf('{{'), closeCurlPos;
    while (openCurlPos !== -1) {
      closeCurlPos = template.indexOf('}}');
      let varName = template.substr(openCurlPos + 2, closeCurlPos - openCurlPos - 2).trim(),
        prev = template.substr(0, openCurlPos),
        post = template.substr(closeCurlPos + 2);
      template = template.substr(0, openCurlPos) + vars[varName] + template.substr(closeCurlPos + 2);

      openCurlPos = template.indexOf('{{');
    }
    return template;
  }

  return dom;
};

export default dom;
