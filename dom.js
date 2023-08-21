/**
 * A set of methods for working with the DOM
 *
 * @constructor
 */

const dom = function (element) {
  let node = element || null;

  let nodes = [];

  const dom = {};

  dom.get = () => {
    return node;
  };

  dom.getAll = () => {
    return nodes;
  }

  dom.each = callback => {
    for (let key = 0; key < nodes.length; key++) {
      callback(nodes[key])
    }
  }

  dom.length = () => {
    return node.length;
  }

  // events

  dom.ready = handler => {
    const method = 'addEventListener';
    document[method] ? document[method]('DOMContentLoaded', handler) : window.attachEvent('onload', handler)
  }

  dom.click = callback => dom.setEventHandler('click', callback)

  dom.blur = callback => dom.setEventHandler('blur', callback)

  dom.change = callback => dom.setEventHandler('change', callback)

  dom.setEventHandler = (eventName, callback) => node.addEventListener(eventName, callback)

  // find

  dom.find = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    node = parent.querySelector(string)

    return dom;
  }

  dom.findLast = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    const elems = parent.querySelectorAll(string);

    node = elems[elems.length - 1];

    return dom;
  }

  dom.findAll = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    nodes = parent.querySelectorAll(string);

    return dom;
  }

  dom.findById = (id, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    node = parent.getElementById ? parent.getElementById(id) : parent.all ? parent.all[id][1] : parent.layers[id];

    return dom;
  }

  dom.findByName = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    node = parent.getElementsByName ? parent.getElementsByName(name)[0] : parent.all ? parent.all[name] : parent.layers[name];

    return dom;
  }

  dom.findObj = (val, parent) => {
    node = typeof (val) === 'object' ? val : dom.findById(val, parent) || dom.findByName(val, parent) || dom.findByClass(val, parent)

    return dom;
  }

  dom.findAllByTag = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    if (parent.getElementsByTagName) {
      nodes = parent.getElementsByTagName(name);
    }

    return dom;
  }

  dom.findByTag = (name, parent) => {
    node = dom.findAllByTag(name, parent)[0]

    return dom;
  }

  dom.findAllByName = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    node = parent.getElementsByName ? parent.getElementsByName(name) : parent.all ? parent.all[name] : parent.layers[name];

    return dom;
  }

  dom.findAllByClass = (className, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    if (parent.getElementsByClassName(className)) {
      nodes = parent.getElementsByClassName(className);
    }

    return dom;
  }

  dom.findByClass = (className, parent) => {
    dom.findAllByClass(className, parent);
    if (nodes !== undefined) {
      node = nodes[0];
    }

    return dom;
  }

  dom.findLastByClass = (className, parent) => {
    dom.findAllByClass(className, parent);
    if (nodes !== undefined) {
      node = nodes[nodes.length - 1];
    }

    return dom;
  }

  dom.parent = () => {
    return node.parentNode;
  }

  dom.child = string => {
    dom.find(string, node);

    return dom;
  }

  dom.children = string => {
    dom.findAll(string, node);

    return dom;
  }

  dom.create = string => {
    let div = document.createElement('div');
    div.innerHTML = string.trim();

    return div.firstChild;
  }

  dom.replace = string => {
    const newItem = dom.create(string);
    node.parentNode.replaceChild(newItem, node);

    return dom;
  }

  dom.html = html => {
    if (node === null || node === undefined) {
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

  dom.val = value => {
    if (node === null || node === undefined) {
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

  dom.addClass = value => {
    let cls = dom.getAttr('class');
    dom.setAttr('class', cls + ' ' + value)
    return dom;
  }

  dom.removeClass = value => {
    let cls = dom.getAttr('class');
    if (cls === '') {
      return dom;
    }
    let clsArr = cls.split(' ');
    for (let i in clsArr) {
      if (clsArr[i] === value) {
        clsArr.splice(i, 1);
      }
    }
    dom.setAttr('class', clsArr.join(' '))
    return dom;
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
