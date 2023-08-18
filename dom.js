/**
 * Набор методов для работы с DOM
 *
 * @constructor
 */

const
  ready = a => {
    const b = document,
      c = "addEventListener";
    b[c] ? b[c]("DOMContentLoaded", a) : window.attachEvent("onload", a)
  },

  click = (obj, func) => obj.addEventListener("click", func),

  blur = (obj, func) => obj.addEventListener("blur", func),

  find = (string, obj) => {
    if (obj === undefined) {
      obj = document;
    }
    return obj.querySelector(string);
  },

  findLast = (string, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    const elems = doc.querySelectorAll(string);

    return elems[elems.length - 1];
  },

  findAll = (string, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    return doc.querySelectorAll(string);
  },

  findById = (id, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    return doc.getElementById ? doc.getElementById(id) : doc.all ? doc.all[id][1] : doc.layers[id];
  },

  findByName = (name, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    return doc.getElementsByName ? doc.getElementsByName(name)[0] : doc.all ? doc.all[name] : doc.layers[name];
  },

  findObj = (obj, doc) => typeof (obj) === "object" ? obj : findById(obj, doc) || findByName(obj, doc),

  findAllByTag = (name, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    if (doc.getElementsByTagName) {
      return doc.getElementsByTagName(name);
    }
  },

  findByTag = (name, doc) => findAllByTag(name, doc)[0],

  findAllByName = (name, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    return doc.getElementsByName ? doc.getElementsByName(name) : doc.all ? doc.all[name] : doc.layers[name];
  },

  findAllByClass = (className, doc) => {
    if (doc === undefined) {
      doc = document;
    }
    if (doc.getElementsByClassName(className)) {
      return doc.getElementsByClassName(className);
    }
  },

  findByClass = (className, doc) => {
    const objs = findAllByClass(className, doc);
    if (objs !== undefined) {
      return objs[0];
    }
  },

  findLastByClass = (className, doc) => {
    const objs = findAllByClass(className, doc);
    if (objs !== undefined) {
      return objs[objs.length - 1];
    }
  },

  create = (string) => {
    let div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.firstChild;
  },

  replace = (object, string) => {
    const newItem = create(string);
    object.parentNode.replaceChild(newItem, object);
  },

  html = (object, html) => {
    let obj = findObj(object);
    if (obj === null || obj === undefined) {
      return "";
    }
    if (html === undefined) {
      return obj.innerHTML
    }
    obj.innerHTML = html;
  },

  val = (object, value) => {
    let obj = findObj(object);
    if (obj === null || obj === undefined) {
      return "";
    }
    const objType = obj.type;
    if (objType === "checkbox") {
      if (value === undefined) {
        return obj.checked;
      } else {
        obj.checked = value;
      }
    } else if (
      objType === "select-one"
      || objType === "select-multiple"
    ) {
      if (value === undefined) {
        return obj.options[obj.selectedIndex].value ? obj.options[obj.selectedIndex].value : obj.options[obj.selectedIndex].text;
      } else {
        let options = obj.options;
        for (let key in options) {
          if (options[key].value === value) {
            obj.selectedIndex = key;
          }
        }
      }
    } else if (obj.value !== undefined) {
      if (
        objType === "text"
        || objType === "password"
        || objType === "hidden"
        || objType === "select-one"
      ) {
        if (value === undefined) {
          return obj.value;
        } else {
          obj.value = value;
        }
      }
      if (
        objType === "textarea"
        || objType === "submit"
      ) {
        if (value === undefined) {
          return obj.innerHTML;
        } else {
          obj.innerHTML = value;
        }
      }
    } else if (obj.innerHTML !== undefined) {
      if (value === undefined) {
        return obj.innerHTML;
      } else {
        obj.innerHTML = value;
      }
    }
  },

  getAttr = (obj, attr) => {
    if (obj.getAttribute) {
      return obj.getAttribute(attr);
    }
  },

  setAttr = (obj, attr, value) => {
    if (obj.setAttribute) {
      obj.setAttribute(attr, value);
    }
  },

  attr = (obj, attr, value) => {
    obj = findObj(obj);
    if (value === undefined) {
      return getAttr(obj, attr);
    } else {
      setAttr(obj, attr, value);
    }
  },

  addClass = (obj, value) => {
    let cls = getAttr(obj, "class");
    setAttr(obj, "class", cls + " " + value)
  },

  removeClass = (obj, value) => {
    let cls = getAttr(obj, "class");
    if (cls === '') {
      return;
    }
    let clsArr = cls.split(" ");
    for (let i in clsArr) {
      if (clsArr[i] === value) {
        clsArr.splice(i, 1);
      }
    }
    setAttr(obj, "class", clsArr.join(" "))
  },

  clear = object => {
    let obj = findObj(object);
    if (obj === undefined) {
      return;
    }
    const objType = obj.type;
    if (objType === undefined) {
      return;
    }
    if (objType === "checkbox") {
      obj.checked = "";
    } else if (objType === "select-one" || objType === "select-multiple") {
      obj.selectedIndex = 0;
    } else if (obj.value !== undefined) {
      if (
           objType === "text"
        || objType === "password"
        || objType === "hidden"
        || objType === "textarea"
        || objType === "select-one"
      ) {
        obj.value = "";
      }
    } else if (obj.innerHTML) {
      obj.innerHTML = "";
    }
  },

  clearForm = () => {
    const form = findObj(arguments[0]);
    const controls = form.childNodes;
    for (let i in controls) {
      clear(controls[i]);
    }
  },

  hide = objID => {
    findById(objID).className = "hidden";
  },

  renderTemplate = (template, vars) => {
    let openCurlPos = template.indexOf("{{"), closeCurlPos;
    while (openCurlPos !== -1) {
      closeCurlPos = template.indexOf("}}");
      let
        varName = template.substr(openCurlPos + 2, closeCurlPos - openCurlPos - 2).trim(),
        prev = template.substr(0, openCurlPos),
        post = template.substr(closeCurlPos + 2)
      ;
      template = template.substr(0, openCurlPos) + vars[varName] + template.substr(closeCurlPos + 2);

      openCurlPos = template.indexOf("{{");
    }
    return template;
  }
;

export {
  ready,
  click,
  blur,
  find,
  findLast,
  findAll,
  findObj,
  findById,
  findByTag,
  findAllByTag,
  findByName,
  findAllByName,
  findByClass,
  findLastByClass,
  findAllByClass,
  create,
  replace,
  html,
  val,
  attr,
  getAttr,
  setAttr,

  addClass,
  removeClass,

  clearForm,
  clear,
  hide,

  renderTemplate
};
