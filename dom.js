/**
 * A set of methods for working with the DOM
 * @constructor
 *
 * @author Andrey Serdyuk imndsu@gmail.com
 * @copyright (c) 2023 IMND
 */

const dom = function (element) {
  let node = element || null;

  let nodes = [];

  const wrapper = {};

  wrapper.get = () => {
    return node;
  };

  wrapper.getAll = () => {
    return nodes;
  }

  wrapper.each = (callback) => {
    for (let key = 0; key < nodes.length; key++) {
      callback(nodes[key])
    }
  }

  wrapper.length = () => {
    return node.length;
  }

  // events

  wrapper.ready = handler => {
    const method = 'addEventListener';
    document[method] ? document[method]('DOMContentLoaded', handler) : window.attachEvent('onload', handler)
  }

  wrapper.click = callback => wrapper.setEventHandler('click', callback)

  wrapper.blur = callback => wrapper.setEventHandler('blur', callback)

  wrapper.change = callback => wrapper.setEventHandler('change', callback)

  wrapper.setEventHandler = (event, callback) => node.addEventListener(event, callback)

  // find

  wrapper.find = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    node = parent.querySelector(string)

    return wrapper;
  }

  wrapper.findLast = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    const elems = parent.querySelectorAll(string);

    node = elems[elems.length - 1];

    return wrapper;
  }

  wrapper.findAll = (string, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    nodes = parent.querySelectorAll(string);

    return wrapper;
  }

  wrapper.findById = (id, parent) => {
    if (parent === undefined) {
      parent = document;
    }

    node = parent.getElementById ? parent.getElementById(id) : parent.all ? parent.all[id][1] : parent.layers[id];

    return wrapper;
  }

  wrapper.findByName = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    node = parent.getElementsByName ? parent.getElementsByName(name)[0] : parent.all ? parent.all[name] : parent.layers[name];

    return wrapper;
  }

  wrapper.findObj = (val, parent) => {
    node = typeof (val) === 'object' ? val : wrapper.findById(val, parent) || wrapper.findByName(val, parent) || wrapper.findByClass(val, parent)

    return wrapper;
  }

  wrapper.findAllByTag = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    if (parent.getElementsByTagName) {
      nodes = parent.getElementsByTagName(name);
    }

    return wrapper;
  }

  wrapper.findByTag = (name, parent) => {
    node = wrapper.findAllByTag(name, parent)[0]

    return wrapper;
  }

  wrapper.findAllByName = (name, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    node = parent.getElementsByName ? parent.getElementsByName(name) : parent.all ? parent.all[name] : parent.layers[name];

    return wrapper;
  }

  wrapper.findAllByClass = (className, parent) => {
    if (parent === undefined) {
      parent = document;
    }
    if (parent.getElementsByClassName(className)) {
      nodes = parent.getElementsByClassName(className);
    }

    return wrapper;
  }

  wrapper.findByClass = (className, parent) => {
    wrapper.findAllByClass(className, parent);
    if (nodes !== undefined) {
      node = nodes[0];
    }

    return wrapper;
  }

  wrapper.findLastByClass = (className, parent) => {
    wrapper.findAllByClass(className, parent);
    if (nodes !== undefined) {
      node = nodes[nodes.length - 1];
    }

    return wrapper;
  }

  wrapper.parent = () => {
    return node.parentNode;
  }

  wrapper.child = (string) => {
    wrapper.find(string, node);

    return wrapper;
  }

  wrapper.children = (string) => {
    wrapper.findAll(string, node);

    return wrapper;
  }

  wrapper.create = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string.trim();

    node = div.firstChild;

    return wrapper;
  }

  wrapper.replace = (string) => {
    const newItem = wrapper.create(string);
    node.parentNode.replaceChild(newItem, node);
  }

  wrapper.html = (html) => {
    if (node === null || node === undefined) {
      return '';
    }
    if (html === undefined) {
      return node.innerHTML
    }
    node.innerHTML = html;

    return wrapper;
  }

  wrapper.id = (id) => {
    if (id === undefined) {
      return node.id;
    } else {
      node.id = id;
      return wrapper;
    }
  }

  wrapper.class = (className) => {
    if (className === undefined) {
      return node.className;
    } else {
      node.className = className;
      return wrapper;
    }
  }

  wrapper.val = (value) => {
    if (node === null || node === undefined) {
      return '';
    }
    const objType = node.type;
    if (objType === 'checkbox') {
      if (value === undefined) {
        return node.checked;
      } else {
        node.checked = value;
        return wrapper;
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
      }
    } else if (node.value !== undefined) {
      if (objType === 'text' || objType === 'password' || objType === 'hidden' || objType === 'select-one') {
        if (value === undefined) {
          return node.value;
        } else {
          node.value = value;
          return wrapper;
        }
      }
      if (objType === 'textarea' || objType === 'submit') {
        if (value === undefined) {
          return node.innerHTML;
        } else {
          node.innerHTML = value;
          return wrapper;
        }
      }
    } else if (node.innerHTML !== undefined) {
      if (value === undefined) {
        return node.innerHTML;
      } else {
        node.innerHTML = value;
        return wrapper;
      }
    }
  }

  wrapper.getAttr = (attr) => {
    if (node.getAttribute) {
      return node.getAttribute(attr);
    }
  }

  wrapper.setAttr = (attr, value) => {
    if (node.setAttribute) {
      node.setAttribute(attr, value);
    }
    return wrapper;
  }

  wrapper.attr = (attr, value) => {
    if (value === undefined) {
      return wrapper.getAttr(attr);
    } else {
      wrapper.setAttr(attr, value);
    }
  }

  wrapper.addClass = (value) => {
    let cls = wrapper.getAttr('class');
    wrapper.setAttr('class', cls + ' ' + value)
  }

  wrapper.removeClass = (value) => {
    let cls = wrapper.getAttr('class');
    if (cls === '') {
      return;
    }
    let clsArr = cls.split(' ');
    for (let i in clsArr) {
      if (clsArr[i] === value) {
        clsArr.splice(i, 1);
      }
    }
    wrapper.setAttr('class', clsArr.join(' '))
  }

  wrapper.clear = object => {
    wrapper.findObj(object);
    if (node === undefined) {
      return;
    }
    const objType = node.type;
    if (objType === undefined) {
      return;
    }
    if (objType === 'checkbox') {
      node.checked = '';
      return wrapper;
    } else if (objType === 'select-one' || objType === 'select-multiple') {
      node.selectedIndex = 0;
      return wrapper;
    } else if (node.value !== undefined) {
      if (objType === 'text' || objType === 'password' || objType === 'hidden' || objType === 'textarea' || objType === 'select-one') {
        node.value = '';
        return wrapper;
      }
    } else if (node.innerHTML) {
      node.innerHTML = '';
      return wrapper;
    }
  }

  wrapper.clearForm = () => {
    const form = wrapper.findObj(arguments[0]);
    const controls = form.childNodes;
    for (let i in controls) {
      wrapper.clear(controls[i]);
    }
  }

  wrapper.hide = objID => {
    wrapper.findById(objID);
    node.className = 'hidden';
  }

  wrapper.renderTemplate = (template, vars) => {
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

  return wrapper;
};

export default dom;
