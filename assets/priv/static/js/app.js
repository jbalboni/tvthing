/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

var assert = __webpack_require__(2);
var objectAssign = __webpack_require__(35);

function pick(object, keys) {
  return keys.reduce(function (prev, key) {
    if (object[key]) {
      prev[key] = object[key];
    }
    return prev;
  }, {});
}

function getKeysNotIn(obj, allowedKeys) {
  var notAllowed = [];
  for (var key in obj) {
    if (allowedKeys.indexOf(key) === -1) {
      notAllowed.push(key);
    }
  }
  return notAllowed;
}

function objectValues(obj) {
  var values = [];
  for (var key in obj) {
    values.push(obj[key]);
  }
  return values;
}

function extend() {
  var params = objectValues(arguments);
  params.unshift({});
  return objectAssign.get().apply(undefined, params);
}

function merge(object, keys) {
  return {
    base: keys ? pick(object, keys) : object,
    with: function (object2, keys2) {
      object2 = keys2 ? pick(object2, keys2) : object2;
      return extend(this.base, object2);
    }
  };
}

function blacklist(object, blacklistedKeys) {
  return Object.keys(object).reduce(function (p, key) {
    if (blacklistedKeys.indexOf(key) === -1) {
      p[key] = object[key];
    }
    return p;
  }, {});
}

function camelToSnake(str) {
  var newKey = '';
  var index = 0;
  var code;
  var wasPrevNumber = true;
  var wasPrevUppercase = true;

  while (index < str.length) {
    code = str.charCodeAt(index);
    if ((!wasPrevUppercase && code >= 65 && code <= 90) || (!wasPrevNumber && code >= 48 && code <= 57)) {
      newKey += '_';
      newKey += str[index].toLowerCase();
    } else {
      newKey += str[index].toLowerCase();
    }
    wasPrevNumber = (code >= 48 && code <= 57);
    wasPrevUppercase = (code >= 65 && code <= 90);
    index++;
  }

  return newKey;
}

function snakeToCamel(str) {
  var parts = str.split('_');
  return parts.reduce(function (p, c) {
    return p + c.charAt(0).toUpperCase() + c.slice(1);
  }, parts.shift());
}

function toSnakeCase(object, exceptions) {
  if (typeof object !== 'object' || assert.isArray(object) || object === null) {
    return object;
  }
  exceptions = exceptions || [];

  return Object.keys(object).reduce(function (p, key) {
    var newKey = exceptions.indexOf(key) === -1 ? camelToSnake(key) : key;
    p[newKey] = toSnakeCase(object[key]);
    return p;
  }, {});
}

function toCamelCase(object, exceptions) {
  if (typeof object !== 'object' || assert.isArray(object) || object === null) {
    return object;
  }

  exceptions = exceptions || [];

  return Object.keys(object).reduce(function (p, key) {
    var newKey = exceptions.indexOf(key) === -1 ? snakeToCamel(key) : key;
    p[newKey] = toCamelCase(object[key]);
    return p;
  }, {});
}

module.exports = {
  toSnakeCase: toSnakeCase,
  toCamelCase: toCamelCase,
  blacklist: blacklist,
  merge: merge,
  pick: pick,
  getKeysNotIn: getKeysNotIn,
  extend: extend
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && 'undefined' != typeof parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var toString = Object.prototype.toString;

function attribute(o, attr, type, text) {
  type = type === 'array' ? 'object' : type;
  if (o && typeof o[attr] !== type) {
    throw new Error(text);
  }
}

function variable(o, type, text) {
  if (typeof o !== type) {
    throw new Error(text);
  }
}

function value(o, values, text) {
  if (values.indexOf(o) === -1) {
    throw new Error(text);
  }
}

function check(o, config, attributes) {
  if (!config.optional || o) {
    variable(o, config.type, config.message);
  }
  if (config.type === 'object' && attributes) {
    var keys = Object.keys(attributes);

    for (var index = 0; index < keys.length; index++) {
      var a = keys[index];
      if (!attributes[a].optional || o[a]) {
        if (!attributes[a].condition || attributes[a].condition(o)) {
          attribute(o, a, attributes[a].type, attributes[a].message);
          if (attributes[a].values) {
            value(o[a], attributes[a].values, attributes[a].value_message);
          }
        }
      }
    }
  }
}

/**
 * Wrap `Array.isArray` Polyfill for IE9
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 *
 * @param {Array} array
 * @private
 */
function isArray(array) {
  if (this.supportsIsArray()) {
    return Array.isArray(array);
  }

  return toString.call(array) === '[object Array]';
}

function supportsIsArray() {
  return (Array.isArray != null);
}

module.exports = {
  check: check,
  attribute: attribute,
  variable: variable,
  value: value,
  isArray: isArray,
  supportsIsArray: supportsIsArray
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function redirect(url) {
  global.window.location = url;
}

function getDocument() {
  return global.window.document;
}

function getWindow() {
  return global.window;
}

module.exports = {
  redirect: redirect,
  getDocument: getDocument,
  getWindow: getWindow
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) module.exports = definition();
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else context[name] = definition();
})('urljoin', this, function () {

  function normalize (str, options) {

    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');

    // remove consecutive slashes
    str = str.replace(/([^:\s])\/+/g, '$1/');

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    str = str.replace(/(\?.+)\?/g, '$1&');

    return str;
  }

  return function () {
    var input = arguments;
    var options = {};

    if (typeof arguments[0] === 'object') {
      // new syntax with array and options
      input = arguments[0];
      options = arguments[1] || {};
    }

    var joined = [].slice.call(input, 0).join('/');
    return normalize(joined, options);
  };

});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var error = __webpack_require__(15);
var objectHelper = __webpack_require__(0);

function wrapCallback(cb, options) {
  options = options || {};
  options.ignoreCasing = options.ignoreCasing ? options.ignoreCasing : false;

  return function (err, data) {
    var errObj;

    if (!err && !data) {
      return cb(error.buildResponse('generic_error', 'Something went wrong'));
    }

    if (!err && data.err) {
      err = data.err;
      data = null;
    }

    if (!err && data.error) {
      err = data;
      data = null;
    }

    if (err) {
      errObj = {
        original: err
      };

      if (err.response && err.response.statusCode) {
        errObj.statusCode = err.response.statusCode;
      }

      if (err.response && err.response.statusText) {
        errObj.statusText = err.response.statusText;
      }

      if (err.response && err.response.body) {
        err = err.response.body;
      }

      if (err.err) {
        err = err.err;
      }

      errObj.code = err.error || err.code || err.error_code || err.status || null;
      errObj.description = err.errorDescription || err.error_description || err.description || err.error || err.details || err.err || null;

      if (err.name) {
        errObj.name = err.name;
      }

      if (err.policy) {
        errObj.policy = err.policy;
      }

      return cb(errObj);
    }

    if (data.type && (data.type === 'text/html' || data.type === 'text/plain')) {
      return cb(null, data.text);
    }

    if (options.ignoreCasing) {
      return cb(null, data.body || data);
    }

    return cb(null, objectHelper.toCamelCase(data.body || data));
  };
}

module.exports = wrapCallback;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* eslint-disable no-console */

function Warn(options) {
  this.disableWarnings = options.disableWarnings;
}

Warn.prototype.warning = function (message) {
  if (this.disableWarnings) {
    return;
  }

  console.warn(message);
};

module.exports = Warn;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(64);
var parse = __webpack_require__(63);
var formats = __webpack_require__(19);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_auth0_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_auth0_js__);
/* harmony export (immutable) */ __webpack_exports__["d"] = login;
/* harmony export (immutable) */ __webpack_exports__["e"] = logout;
/* harmony export (immutable) */ __webpack_exports__["b"] = addUser;
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserInfo;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPicture;


const webAuth = new __WEBPACK_IMPORTED_MODULE_0_auth0_js___default.a.WebAuth({
  domain: "jbalboni.auth0.com",
  clientID: "8EpeFtat3Qc6iQmxplRRvWwJ3OoZxMKf",
  redirectUri: `${window.location.protocol}//${window.location.host}/login`,
  responseType: 'token',
  scope: 'openid email'
});

function login() {
  webAuth.authorize();
}

function logout() {
  webAuth.logout();
}

function addUser(hash) {
  return new Promise((resolve, reject) => {
    webAuth.parseHash(hash, (err, authResult) => {
      if (err) {
        reject(err);
      }

      fetch('/api/public/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: authResult.idToken
        })
      }).then(response => {
        if (response.ok) {
          localStorage.setItem('idToken', authResult.idToken);
          localStorage.setItem('accessToken', authResult.accessToken);
          return response.json();
        }
        return Promise.reject(response.statusText);
      }).then(({ user, watchlist }) => {
        resolve({
          user,
          watchlist,
          accessToken: authResult.accessToken,
          idToken: authResult.idToken
        });
      }).catch(message => {
        reject(message);
      });
    });
  });
}

function getUserInfo(idToken) {
  return fetch('/api/public/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: idToken
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.statusText);
  });
}

function getPicture(accessToken) {
  return new Promise((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err, user) => {
      if (!err) {
        resolve(user.picture);
      } else {
        reject(err);
      }
    });
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-param-reassign */
var request = __webpack_require__(21);
var base64Url = __webpack_require__(14);
var version = __webpack_require__(10);

// ------------------------------------------------ RequestWrapper

function RequestWrapper(req) {
  this.request = req;
  this.method = req.method;
  this.url = req.url;
  this.body = req._data;
  this.headers = req._header;
}

RequestWrapper.prototype.abort = function () {
  this.request.abort();
};

RequestWrapper.prototype.getMethod = function () {
  return this.method;
};

RequestWrapper.prototype.getBody = function () {
  return this.body;
};

RequestWrapper.prototype.getUrl = function () {
  return this.url;
};

RequestWrapper.prototype.getHeaders = function () {
  return this.headers;
};

// ------------------------------------------------ RequestObj

function RequestObj(req) {
  this.request = req;
}

RequestObj.prototype.set = function (key, value) {
  this.request = this.request.set(key, value);
  return this;
};

RequestObj.prototype.send = function (body) {
  this.request = this.request.send(body);
  return this;
};

RequestObj.prototype.withCredentials = function () {
  this.request = this.request.withCredentials();
  return this;
};

RequestObj.prototype.end = function (cb) {
  this.request = this.request.end(cb);
  return new RequestWrapper(this.request);
};

// ------------------------------------------------ RequestBuilder

function RequestBuilder(options) {
  this._sendTelemetry = options._sendTelemetry === false ? options._sendTelemetry : true;
  this._telemetryInfo = options._telemetryInfo || null;
  this.headers = options.headers || {};
}

RequestBuilder.prototype.setCommonConfiguration = function (ongoingRequest, options) {
  options = options || {};

  if (options.noHeaders) {
    return ongoingRequest;
  }

  var headers = this.headers;
  ongoingRequest = ongoingRequest.set('Content-Type', 'application/json');

  var keys = Object.keys(this.headers);

  for (var a = 0; a < keys.length; a++) {
    ongoingRequest = ongoingRequest.set(keys[a], headers[keys[a]]);
  }

  if (this._sendTelemetry) {
    ongoingRequest = ongoingRequest.set('Auth0-Client', this.getTelemetryData());
  }
  return ongoingRequest;
};

RequestBuilder.prototype.getTelemetryData = function () {
  var clientInfo = this._telemetryInfo || { name: 'auth0.js', version: version.raw };
  var jsonClientInfo = JSON.stringify(clientInfo);
  return base64Url.encode(jsonClientInfo);
};

RequestBuilder.prototype.get = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(request.get(url), options));
};

RequestBuilder.prototype.post = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(request.post(url), options));
};

RequestBuilder.prototype.patch = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(request.patch(url), options));
};

module.exports = RequestBuilder;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = { raw: '8.6.0' };


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchShows;
/* harmony export (immutable) */ __webpack_exports__["b"] = searchShows;


function fetchShows(idToken) {
  return fetch('/api/shows', {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp.statusText);
  });
}


function searchShows(term) {
  return fetch(`/api/public/search?query=${term}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp.statusText);
  }).then(response => {
    return response.results;
  });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);

var RequestBuilder = __webpack_require__(9);
var qs = __webpack_require__(7);
var objectHelper = __webpack_require__(0);
var assert = __webpack_require__(2);
var responseHandler = __webpack_require__(5);
var parametersWhitelist = __webpack_require__(36);
var Warn = __webpack_require__(6);

var PasswordlessAuthentication = __webpack_require__(32);
var DBConnection = __webpack_require__(31);

/**
 * Creates a new Auth0 Authentication API client
 * @constructor
 * @param {Object} options
 * @param {String} options.domain your Auth0 domain
 * @param {String} options.clientID your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} [options.redirectUri] url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} [options.responseType] type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @see {@link https://auth0.com/docs/api/authentication}
 */
function Authentication(options) {
  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    domain: { type: 'string', message: 'domain option is required' },
    clientID: { type: 'string', message: 'clientID option is required' },
    responseType: { optional: true, type: 'string', message: 'responseType is not valid' },
    responseMode: { optional: true, type: 'string', message: 'responseMode is not valid' },
    redirectUri: { optional: true, type: 'string', message: 'redirectUri is not valid' },
    scope: { optional: true, type: 'string', message: 'scope is not valid' },
    audience: { optional: true, type: 'string', message: 'audience is not valid' },
    _disableDeprecationWarnings: { optional: true, type: 'boolean', message: '_disableDeprecationWarnings option is not valid' },
    _sendTelemetry: { optional: true, type: 'boolean', message: '_sendTelemetry option is not valid' },
    _telemetryInfo: { optional: true, type: 'object', message: '_telemetryInfo option is not valid' }
  });
  /* eslint-enable */

  this.baseOptions = options;

  this.baseOptions._sendTelemetry = this.baseOptions._sendTelemetry === false ?
                                        this.baseOptions._sendTelemetry : true;

  this.baseOptions.rootUrl = 'https://' + this.baseOptions.domain;

  this.request = new RequestBuilder(this.baseOptions);

  this.passwordless = new PasswordlessAuthentication(this.request, this.baseOptions);
  this.dbConnection = new DBConnection(this.request, this.baseOptions);

  this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}

/**
 * Builds and returns the `/authorize` url in order to initialize a new authN/authZ transaction
 *
 * @method buildAuthorizeUrl
 * @param {Object} options
 * @param {String} [options.domain] your Auth0 domain
 * @param {String} [options.clientID] your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} options.redirectUri url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} options.responseType type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.state] value used to mitigate XSRF attacks. {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
 * @param {String} [options.nonce] value used to mitigate replay attacks when using Implicit Grant. {@link https://auth0.com/docs/api-auth/tutorials/nonce}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
 * @see {@link https://auth0.com/docs/api/authentication#social}
 */
Authentication.prototype.buildAuthorizeUrl = function (options) {
  var params;
  var qString;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' });

  params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'responseType',
    'responseMode',
    'redirectUri',
    'scope',
    'audience'
  ]).with(options);

  /* eslint-disable */
  assert.check(params, { type: 'object', message: 'options parameter is not valid' }, {
    clientID: { type: 'string', message: 'clientID option is required' },
    redirectUri: { optional: true, type: 'string', message: 'redirectUri option is required' },
    responseType: { type: 'string', message: 'responseType option is required' },
    nonce: { type: 'string', message: 'nonce option is required', condition: function(o) {
      return o.responseType.indexOf('code') === -1 && o.responseType.indexOf('id_token') !== -1;
    } },
    scope: { optional: true, type: 'string', message: 'scope option is required' },
    audience: { optional: true, type: 'string', message: 'audience option is required' }
  });
  /* eslint-enable */

  // eslint-disable-next-line
  if (this.baseOptions._sendTelemetry) {
    params.auth0Client = this.request.getTelemetryData();
  }

  if (params.connection_scope && assert.isArray(params.connection_scope)) {
    params.connection_scope = params.connection_scope.join(',');
  }

  params = objectHelper.toSnakeCase(params, ['auth0Client']);
  params = parametersWhitelist.oauthAuthorizeParams(this.warn, params);

  qString = qs.stringify(params);

  return urljoin(this.baseOptions.rootUrl, 'authorize', '?' + qString);
};

/**
 * Builds and returns the Logout url in order to initialize a new authN/authZ transaction
 *
 * If you want to navigate the user to a specific URL after the logout, set that URL at the returnTo parameter. The URL should be included in any the appropriate Allowed Logout URLs list:
 *
 * - If the client_id parameter is included, the returnTo URL must be listed in the Allowed Logout URLs set at the client level (see Setting Allowed Logout URLs at the App Level).
 * - If the client_id parameter is NOT included, the returnTo URL must be listed in the Allowed Logout URLs set at the account level (see Setting Allowed Logout URLs at the Account Level).
 * @method buildLogoutUrl
 * @param {Object} options
 * @param {String} [options.clientID] identifier of your client
 * @param {String} [options.returnTo] URL to be redirected after the logout
 * @param {Boolean} [options.federated] tells Auth0 if it should logout the user also from the IdP.
 * @see {@link https://auth0.com/docs/api/authentication#logout}
 */
Authentication.prototype.buildLogoutUrl = function (options) {
  var params;
  var qString;

  assert.check(options, {
    optional: true,
    type: 'object',
    message: 'options parameter is not valid'
  });

  params = objectHelper.merge(this.baseOptions, ['clientID'])
                .with(options || {});

  // eslint-disable-next-line
  if (this.baseOptions._sendTelemetry) {
    params.auth0Client = this.request.getTelemetryData();
  }

  params = objectHelper.toSnakeCase(params, ['auth0Client', 'returnTo']);

  qString = qs.stringify(params);

  return urljoin(this.baseOptions.rootUrl, 'v2', 'logout', '?' + qString);
};

/**
 * @callback authorizeCallback
 * @param {Error} [err] error returned by Auth0 with the reason of the Auth failure
 * @param {Object} [result] result of the Auth request
 * @param {String} [result.accessToken] token that allows access to the specified resource server (identified by the audience parameter or by default Auth0's /userinfo endpoint)
 * @param {Number} [result.expiresIn] number of seconds until the access token expires
 * @param {String} [result.idToken] token that identifies the user
 * @param {String} [result.refreshToken] token that can be used to get new access tokens from Auth0. Note that not all clients can request them or the resource server might not allow them.
 */

/**
 * @callback tokenCallback
 * @param {Error} [err] error returned by Auth0 with the reason of the Auth failure
 * @param {Object} [result] result of the Auth request
 * @param {String} result.accessToken token that allows access to the specified resource server (identified by the audience parameter or by default Auth0's /userinfo endpoint)
 * @param {Number} result.expiresIn number of seconds until the access token expires
 * @param {String} [result.idToken] token that identifies the user
 * @param {String} [result.refreshToken] token that can be used to get new access tokens from Auth0. Note that not all clients can request them or the resource server might not allow them.
 */

/**
 * Makes a call to the `oauth/token` endpoint with `password` grant type to login to the default directory.
 *
 * @method loginWithDefaultDirectory
 * @param {Object} options
 * @param {String} options.username email or username of the user that will perform Auth
 * @param {String} options.password the password of the user that will perform Auth
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @param {tokenCallback} cb function called with the result of the request
 * @see   {@link https://auth0.com/docs/api-auth/grant/password}
 */
Authentication.prototype.loginWithDefaultDirectory = function (options, cb) {
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    username: { type: 'string', message: 'username option is required' },
    password: { type: 'string', message: 'password option is required' },
    scope: { optional: true, type: 'string', message: 'scope option is required' },
    audience: { optional: true, type: 'string', message: 'audience option is required' }
  });

  options.grantType = 'password';

  return this.oauthToken(options, cb);
};

/**
 * Makes a call to the `oauth/token` endpoint with `password-realm` grant type
 *
 * @method login
 * @param {Object} options
 * @param {String} options.username email or username of the user that will perform Auth
 * @param {String} options.password the password of the user that will perform Auth
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @param {Object} options.realm the HRD domain or the connection name where the user belongs to. e.g. `Username-Password-Authentication`
 * @param {tokenCallback} cb function called with the result of the request
 * @see   {@link https://auth0.com/docs/api-auth/grant/password}
 */
Authentication.prototype.login = function (options, cb) {
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    username: { type: 'string', message: 'username option is required' },
    password: { type: 'string', message: 'password option is required' },
    realm: { type: 'string', message: 'realm option is required' },
    scope: { optional: true, type: 'string', message: 'scope option is required' },
    audience: { optional: true, type: 'string', message: 'audience option is required' }
  });

  options.grantType = 'http://auth0.com/oauth/grant-type/password-realm';

  return this.oauthToken(options, cb);
};

/**
 * Makes a call to the `oauth/token` endpoint
 *
 * @method oauthToken
 * @private
 */
Authentication.prototype.oauthToken = function (options, cb) {
  var url;
  var body;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'oauth', 'token');

  body = objectHelper.merge(this.baseOptions, [
    'clientID',
    'scope',
    'audience'
  ]).with(options);

  assert.check(body, { type: 'object', message: 'options parameter is not valid' }, {
    clientID: { type: 'string', message: 'clientID option is required' },
    grantType: { type: 'string', message: 'grantType option is required' },
    scope: { optional: true, type: 'string', message: 'scope option is required' },
    audience: { optional: true, type: 'string', message: 'audience option is required' }
  });

  body = objectHelper.toSnakeCase(body, ['auth0Client']);
  body = parametersWhitelist.oauthTokenParams(this.warn, body);

  body.grant_type = body.grant_type;

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

/**
 * Performs authentication calling `/oauth/ro` endpoint with username
 * and password for a given connection name.
 *
 * This method is not compatible with API Auth so if you need to fetch API tokens with audience
 * you should use {@link login} or {@link loginWithDefaultDirectory}.
 *
 * @method loginWithResourceOwner
 * @param {Object} options
 * @param {String} options.username email or username of the user that will perform Auth
 * @param {String} options.password the password of the user that will perform Auth
 * @param {Object} options.connection the connection name where the user belongs to. e.g. `Username-Password-Authentication`
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.device] name of the device/browser where the Auth was requested
 * @param {tokenCallback} cb function called with the result of the request
 */
Authentication.prototype.loginWithResourceOwner = function (options, cb) {
  var url;
  var body;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    username: { type: 'string', message: 'username option is required' },
    password: { type: 'string', message: 'password option is required' },
    connection: { type: 'string', message: 'connection option is required' },
    scope: { optional: true, type: 'string', message: 'scope option is required' }
  });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'oauth', 'ro');

  body = objectHelper.merge(this.baseOptions, [
    'clientID',
    'scope'
  ]).with(options, ['username', 'password', 'scope', 'connection', 'device']);

  body = objectHelper.toSnakeCase(body, ['auth0Client']);

  body.grant_type = body.grant_type || 'password';

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

/**
 * Makes a call to the `/ssodata` endpoint.
 * We recommend to avoid using this method and rely on your tenant hosted login page and using prompt=none via {@link renewAuth} method.
 *
 * @method getSSOData
 * @param {Boolean} withActiveDirectories tells Auth0 to return AD data
 * @param {Function} cb
 */
Authentication.prototype.getSSOData = function (withActiveDirectories, cb) {
  var url;
  var params = '';

  if (typeof withActiveDirectories === 'function') {
    cb = withActiveDirectories;
    withActiveDirectories = false;
  }

  assert.check(withActiveDirectories, { type: 'boolean', message: 'withActiveDirectories parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  if (withActiveDirectories) {
    params = '?' + qs.stringify({
      ldaps: 1,
      client_id: this.baseOptions.clientID
    });
  }

  url = urljoin(this.baseOptions.rootUrl, 'user', 'ssodata', params);

  return this.request
    .get(url, { noHeaders: true })
    .withCredentials()
    .end(responseHandler(cb));
};

/**
 * @callback userInfoCallback
 * @param {Error} [err] error returned by Auth0
 * @param {Object} [userInfo] user information
 */

/**
 * Makes a call to the `/userinfo` endpoint and returns the user profile
 *
 * @method userInfo
 * @param {String} accessToken token issued to a user after Auth
 * @param {userInfoCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#get-user-info}
 */
Authentication.prototype.userInfo = function (accessToken, cb) {
  var url;

  assert.check(accessToken, { type: 'string', message: 'accessToken parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'userinfo');

  return this.request
    .get(url)
    .set('Authorization', 'Bearer ' + accessToken)
    .end(responseHandler(cb, { ignoreCasing: true }));
};

/**
 * @callback delegationCallback
 * @param {Error} [err] error returned by Auth0 with the reason why the delegation failed
 * @param {Object} [result] result of the delegation request. The payload depends on what ai type was used
 */

/**
 * Makes a call to the `/delegation` endpoint with either an `id_token` or `refresh_token`
 *
 * @method delegation
 * @param {Object} options
 * @param {String} [options.clientID] client identifier
 * @param {String} options.grantType  grant type used for delegation. The only valid value is `urn:ietf:params:oauth:grant-type:jwt-bearer`
 * @param {String} [options.idToken] valid token of the user issued after Auth. If no `refresh_token` is provided this parameter is required
 * @param {String} [options.refreshToken] valid refresh token of the user issued after Auth. If no `id_token` is provided this parameter is required
 * @param {String} [options.target] the target client id of the delegation
 * @param {String} [options.scope] either `openid` or `openid profile email`
 * @param {String} [options.apiType] the api to be called
 * @param {delegationCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#delegation}
 */
Authentication.prototype.delegation = function (options, cb) {
  var url;
  var body;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    grant_type: { type: 'string', message: 'grant_type option is required' }
  });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'delegation');

  body = objectHelper.merge(this.baseOptions, ['clientID'])
                .with(options);

  body = objectHelper.toSnakeCase(body, ['auth0Client']);

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

/**
 * Fetches the user country based on the ip.
 *
 * @method getUserCountry
 * @private
 * @param {Function} cb
 */
Authentication.prototype.getUserCountry = function (cb) {
  var url;

  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'user', 'geoloc', 'country');

  return this.request
    .get(url)
    .end(responseHandler(cb));
};

module.exports = Authentication;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var base64 = __webpack_require__(17);

function padding(str) {
  var mod = (str.length % 4);
  var pad = 4 - mod;

  if (mod === 0) {
    return str;
  }

  return str + (new Array(1 + pad)).join('=');
}

function stringToByteArray(str) {
  var arr = new Array(str.length);
  for (var a = 0; a < str.length; a++) {
    arr[a] = str.charCodeAt(a);
  }
  return arr;
}

function byteArrayToString(array) {
  var result = '';
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

function encode(str) {
  return base64.fromByteArray(stringToByteArray(str))
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_'); // Convert '/' to '_'
}

function decode(str) {
  str = padding(str)
    .replace(/-/g, '+') // Convert '-' to '+'
    .replace(/_/g, '/'); // Convert '_' to '/'

  return byteArrayToString(base64.toByteArray(str));
}

module.exports = {
  encode: encode,
  decode: decode
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

function buildResponse(error, description) {
  return {
    error: error,
    errorDescription: description
  };
}

function invalidJwt(description) {
  return buildResponse('invalid_token', description);
}

module.exports = {
  buildResponse: buildResponse,
  invalidJwt: invalidJwt
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var random = __webpack_require__(39);
var storage = __webpack_require__(40);

var DEFAULT_NAMESPACE = 'com.auth0.auth.';

function TransactionManager(options) {
  options = options || {};
  this.namespace = options.namespace || DEFAULT_NAMESPACE;
  this.keyLength = options.keyLength || 32;
}

TransactionManager.prototype.process = function (options) {
  var transaction;

  if (options.responseType.indexOf('code') !== -1) {
    return options;
  }

  if (options.responseType.indexOf('id_token') !== -1 && !!options.nonce) {
    return options;
  }

  transaction = this.generateTransaction(options.appState, options.state, options.nonce);

  options.state = transaction.state;

  if (options.responseType.indexOf('id_token') !== -1) {
    options.nonce = transaction.nonce;
  }

  return options;
};

TransactionManager.prototype.generateTransaction = function (appState, state, nonce) {
  var transaction = state || random.randomString(this.keyLength);
  nonce = nonce || random.randomString(this.keyLength);

  storage.setItem(this.namespace + transaction, {
    nonce: nonce,
    appState: appState
  });

  return {
    state: transaction,
    nonce: nonce
  };
};

TransactionManager.prototype.getStoredTransaction = function (transaction) {
  var transactionData;

  transactionData = storage.getItem(this.namespace + transaction);
  storage.removeItem(this.namespace + transaction);
  return transactionData;
};

module.exports = TransactionManager;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var base64 = __webpack_require__(17);

function padding(str) {
  var mod = (str.length % 4);
  var pad = 4 - mod;

  if (mod === 0) {
    return str;
  }

  return str + (new Array(1 + pad)).join('=');
}

function byteArrayToString(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

function stringToByteArray(str) {
  var arr = new Array(str.length);
  for (var a = 0; a < str.length; a++) {
    arr[a] = str.charCodeAt(a);
  }
  return arr;
}

function byteArrayToHex(raw) {
  var HEX = '';

  for (var i = 0; i < raw.length; i++) {
    var _hex = raw[i].toString(16);
    HEX += (_hex.length === 2 ? _hex : '0' + _hex);
  }

  return HEX;
}

function encodeString(str) {
  return base64.fromByteArray(stringToByteArray(str))
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_'); // Convert '/' to '_'
}


function decodeToString(str) {
  str = padding(str)
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/_/g, '/'); // Convert '_' to '/'

  return byteArrayToString(base64.toByteArray(str));
}


function decodeToHEX(str) {
  return byteArrayToHex(base64.toByteArray(padding(str)));
}

module.exports = {
  encodeString: encodeString,
  decodeToString: decodeToString,
  byteArrayToString: byteArrayToString,
  stringToByteArray: stringToByteArray,
  padding: padding,
  byteArrayToHex: byteArrayToHex,
  decodeToHEX: decodeToHEX
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = __webpack_require__(53);
var RequestBase = __webpack_require__(66);
var isObject = __webpack_require__(11);
var isFunction = __webpack_require__(65);
var ResponseBase = __webpack_require__(67);
var shouldRetry = __webpack_require__(68);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var WinChan = (function() {
  var RELAY_FRAME_NAME = "__winchan_relay_frame";
  var CLOSE_CMD = "die";

  // a portable addListener implementation
  function addListener(w, event, cb) {
    if(w.attachEvent) w.attachEvent('on' + event, cb);
    else if (w.addEventListener) w.addEventListener(event, cb, false);
  }

  // a portable removeListener implementation
  function removeListener(w, event, cb) {
    if(w.detachEvent) w.detachEvent('on' + event, cb);
    else if (w.removeEventListener) w.removeEventListener(event, cb, false);
  }


  // checking for IE8 or above
  function isInternetExplorer() {
    if (typeof navigator === 'undefined') {
      return false;
    }

    var rv = -1; // Return value assumes failure.
    var ua = navigator.userAgent;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    // IE > 11
    else if (ua.indexOf("Trident") > -1) {
      var re = new RegExp("rv:([0-9]{2,2}[\.0-9]{0,})");
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }

    return rv >= 8;
  }

  // checking Mobile Firefox (Fennec)
  function isFennec() {
    try {
      // We must check for both XUL and Java versions of Fennec.  Both have
      // distinct UA strings.
      var userAgent = navigator.userAgent;
      return (userAgent.indexOf('Fennec/') != -1) ||  // XUL
             (userAgent.indexOf('Firefox/') != -1 && userAgent.indexOf('Android') != -1);   // Java
    } catch(e) {}
    return false;
  }

  // feature checking to see if this platform is supported at all
  function isSupported() {
    return (typeof window !== 'undefined' && window.JSON && window.JSON.stringify &&
            window.JSON.parse && window.postMessage);
  }

  // given a URL, extract the origin. Taken from: https://github.com/firebase/firebase-simple-login/blob/d2cb95b9f812d8488bdbfba51c3a7c153ba1a074/js/src/simple-login/transports/WinChan.js#L25-L30
  function extractOrigin(url) {
    if (!/^https?:\/\//.test(url)) url = window.location.href;
    var m = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(url);
    if (m) return m[1];
    return url;
  }

  // find the relay iframe in the opener
  function findRelay() {
    var loc = window.location;
    var frames = window.opener.frames;
    for (var i = frames.length - 1; i >= 0; i--) {
      try {
        if (frames[i].location.protocol === window.location.protocol &&
            frames[i].location.host === window.location.host &&
            frames[i].name === RELAY_FRAME_NAME)
        {
          return frames[i];
        }
      } catch(e) { }
    }
    return;
  }

  var isIE = isInternetExplorer();

  if (isSupported()) {
    /*  General flow:
     *                  0. user clicks
     *  (IE SPECIFIC)   1. caller adds relay iframe (served from trusted domain) to DOM
     *                  2. caller opens window (with content from trusted domain)
     *                  3. window on opening adds a listener to 'message'
     *  (IE SPECIFIC)   4. window on opening finds iframe
     *                  5. window checks if iframe is "loaded" - has a 'doPost' function yet
     *  (IE SPECIFIC5)  5a. if iframe.doPost exists, window uses it to send ready event to caller
     *  (IE SPECIFIC5)  5b. if iframe.doPost doesn't exist, window waits for frame ready
     *  (IE SPECIFIC5)  5bi. once ready, window calls iframe.doPost to send ready event
     *                  6. caller upon reciept of 'ready', sends args
     */
    return {
      open: function(opts, cb) {
        if (!cb) throw "missing required callback argument";

        // test required options
        var err;
        if (!opts.url) err = "missing required 'url' parameter";
        if (!opts.relay_url) err = "missing required 'relay_url' parameter";
        if (err) setTimeout(function() { cb(err); }, 0);

        // supply default options
        if (!opts.window_name) opts.window_name = null;
        if (!opts.window_features || isFennec()) opts.window_features = undefined;

        // opts.params may be undefined

        var iframe;

        // sanity check, are url and relay_url the same origin?
        var origin = opts.origin || extractOrigin(opts.url);
        if (origin !== extractOrigin(opts.relay_url)) {
          return setTimeout(function() {
            cb('invalid arguments: origin of url and relay_url must match');
          }, 0);
        }

        var messageTarget;

        if (isIE) {
          // first we need to add a "relay" iframe to the document that's served
          // from the target domain.  We can postmessage into a iframe, but not a
          // window
          iframe = document.createElement("iframe");
          // iframe.setAttribute('name', framename);
          iframe.setAttribute('src', opts.relay_url);
          iframe.style.display = "none";
          iframe.setAttribute('name', RELAY_FRAME_NAME);
          document.body.appendChild(iframe);
          messageTarget = iframe.contentWindow;
        }

        var w = opts.popup || window.open(opts.url, opts.window_name, opts.window_features);
        if (opts.popup) {
          w.location.href = opts.url;
        }

        if (!messageTarget) messageTarget = w;

        // lets listen in case the window blows up before telling us
        var closeInterval = setInterval(function() {
          if (w && w.closed) {
            cleanup();
            if (cb) {
              cb('User closed the popup window');
              cb = null;
            }
          }
        }, 500);

        var req = JSON.stringify({a: 'request', d: opts.params});

        // cleanup on unload
        function cleanup() {
          if (iframe) document.body.removeChild(iframe);
          iframe = undefined;
          if (closeInterval) closeInterval = clearInterval(closeInterval);
          removeListener(window, 'message', onMessage);
          removeListener(window, 'unload', cleanup);
          if (w) {
            try {
              w.close();
            } catch (securityViolation) {
              // This happens in Opera 12 sometimes
              // see https://github.com/mozilla/browserid/issues/1844
              messageTarget.postMessage(CLOSE_CMD, origin);
            }
          }
          w = messageTarget = undefined;
        }

        addListener(window, 'unload', cleanup);

        function onMessage(e) {
          if (e.origin !== origin) { return; }
          try {
            var d = JSON.parse(e.data);
          } catch(err) {
            if (cb) {
              cb(err);
            } else {
              throw err;
            }
          }

          if (d.a === 'ready') {
            messageTarget.postMessage(req, origin);
          } else if (d.a === 'error') {
            cleanup();
            if (cb) {
              cb(d.d);
              cb = null;
            }
          } else if (d.a === 'response') {
            cleanup();
            if (cb) {
              cb(null, d.d);
              cb = null;
            }
          }
        }

        addListener(window, 'message', onMessage);

        return {
          close: cleanup,
          focus: function() {
            if (w) {
              try {
                w.focus();
              } catch (e) {
                // IE7 blows up here, do nothing
              }
            }
          }
        };
      },
      onOpen: function(cb) {
        var o = "*";
        var msgTarget = isIE ? findRelay() : window.opener;
        if (!msgTarget) throw "can't find relay frame";
        function doPost(msg) {
          msg = JSON.stringify(msg);
          if (isIE) msgTarget.doPost(msg, o);
          else msgTarget.postMessage(msg, o);
        }

        function onMessage(e) {
          // only one message gets through, but let's make sure it's actually
          // the message we're looking for (other code may be using
          // postmessage) - we do this by ensuring the payload can
          // be parsed, and it's got an 'a' (action) value of 'request'.
          var d;
          try {
            d = JSON.parse(e.data);
          } catch(err) { }
          if (!d || d.a !== 'request') return;
          removeListener(window, 'message', onMessage);
          o = e.origin;
          if (cb) {
            // this setTimeout is critically important for IE8 -
            // in ie8 sometimes addListener for 'message' can synchronously
            // cause your callback to be invoked.  awesome.
            setTimeout(function() {
              cb(o, d.d, function(r) {
                cb = undefined;
                doPost({a: 'response', d: r});
              });
            }, 0);
          }
        }

        function onDie(e) {
          if (e.data === CLOSE_CMD) {
            try { window.close(); } catch (o_O) {}
          }
        }
        addListener(isIE ? msgTarget : window, 'message', onMessage);
        addListener(isIE ? msgTarget : window, 'message', onDie);

        // we cannot post to our parent that we're ready before the iframe
        // is loaded. (IE specific possible failure)
        try {
          doPost({a: "ready"});
        } catch(e) {
          // this code should never be exectued outside IE
          addListener(msgTarget, 'load', function(e) {
            doPost({a: "ready"});
          });
        }

        // if window is unloaded and the client hasn't called cb, it's an error
        var onUnload = function() {
          try {
            // IE8 doesn't like this...
            removeListener(isIE ? msgTarget : window, 'message', onDie);
          } catch (ohWell) { }
          if (cb) doPost({ a: 'error', d: 'client closed window' });
          cb = undefined;
          // explicitly close the window, in case the client is trying to reload or nav
          try { window.close(); } catch (e) { }
        };
        addListener(window, 'unload', onUnload);
        return {
          detach: function() {
            removeListener(window, 'unload', onUnload);
          }
        };
      }
    };
  } else {
    return {
      open: function(url, winopts, arg, cb) {
        setTimeout(function() { cb("unsupported browser"); }, 0);
      },
      onOpen: function(cb) {
        setTimeout(function() { cb("unsupported browser"); }, 0);
      }
    };
  }
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WinChan;
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Main__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Nav__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Search__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_auth__ = __webpack_require__(8);










class App extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      accessToken: props.accessToken,
      idToken: props.idToken,
      watchlist: null
    };
  }
  componentDidMount() {
    if (this.state.idToken != null) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_auth__["a" /* getUserInfo */])(this.state.idToken).then(({ user, watchlist }) => {
        this.setState({ user, watchlist });
      });
    }
  }
  setUserInfo({
    user,
    watchlist,
    accessToken,
    idToken
  }) {
    this.setState({ user, watchlist, accessToken, idToken }, () => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact_router__["a" /* route */])('/'));
  }
  render() {
    const { user, accessToken, idToken } = this.state;
    const isLoggedIn = this.state.user !== null;
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_4__Nav__["a" /* default */], { accessToken: accessToken, isLoggedIn: isLoggedIn }),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_5__Search__["a" /* default */], null),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        __WEBPACK_IMPORTED_MODULE_1_preact_router__["b" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_2__Main__["a" /* default */], { path: '/', isLoggedIn: isLoggedIn, idToken: idToken }),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_3__Login__["a" /* default */], {
          path: '/login',
          setUserInfo: (...args) => this.setUserInfo(...args)
        })
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_auth__ = __webpack_require__(8);



class Login extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  componentDidMount() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_auth__["b" /* addUser */])(window.location.hash).then(result => {
      this.props.setUserInfo(result);
    });
  }
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'div',
      null,
      'Logging you in...'
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Login;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_actions__ = __webpack_require__(12);





class Main extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  constructor() {
    super();
    this.state = {
      shows: []
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.idToken) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_actions__["a" /* fetchShows */])(this.props.idToken).then(shows => {
        this.setState({ shows });
      });
    }
  }
  componentWillReceiveProps({ isLoggedIn, idToken }) {
    if (!this.props.isLoggedIn && isLoggedIn && idToken) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_actions__["a" /* fetchShows */])(idToken).then(shows => {
        this.setState({ shows });
      });
    }
  }
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'div',
      null,
      this.state.shows.map(show => __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'div',
        { 'class': 'card' },
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'header',
          { 'class': 'card-header' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'p',
            { 'class': 'card-header-title' },
            show.name
          )
        )
      ))
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Main;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_auth__ = __webpack_require__(8);



class Nav extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  constructor() {
    super();
    this.state = { picture: null };
  }

  componentWillMount() {
    if (this.props.isLoggedIn && this.props.accessToken != null) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_auth__["c" /* getPicture */])(this.props.accessToken).then(picture => {
        this.setState({ picture });
      });
    }
  }
  componentWillReceiveProps(props) {
    if (props.isLoggedIn && !this.props.isLoggedIn && this.props.accessToken != null) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_auth__["c" /* getPicture */])(this.props.accessToken).then(picture => {
        this.setState({ picture });
      });
    }
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const picture = this.state.picture;
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'nav',
      { 'class': 'nav has-shadow' },
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'div',
        { 'class': 'container' },
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { 'class': 'nav-left' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'a',
            { 'class': 'nav-item' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('img', { src: 'images/icon_144.png', alt: 'TV set logo' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'a',
            { 'class': 'nav-item is-tab' },
            'Active'
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'a',
            { 'class': 'nav-item is-tab' },
            'Snoozed'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'span',
          { 'class': 'nav-toggle' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('span', null),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('span', null),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('span', null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { 'class': 'nav-right nav-menu' },
          !isLoggedIn && __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'button',
            { 'class': 'button is-link nav-item', onClick: __WEBPACK_IMPORTED_MODULE_1__lib_auth__["d" /* login */] },
            'Sign in'
          ),
          isLoggedIn && __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'span',
            { 'class': 'nav-item' },
            picture != null && __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('img', { 'class': 'profile__img', src: picture, alt: 'Profile' }),
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'button',
              { 'class': 'button is-link nav__auth-link', onClick: __WEBPACK_IMPORTED_MODULE_1__lib_auth__["e" /* logout */] },
              'Sign out'
            )
          )
        )
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Nav;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_actions__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SearchResults__ = __webpack_require__(29);






class Search extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  constructor() {
    super();
    this.state = {
      term: '',
      list: [],
      loading: false
    };
  }
  search() {
    this.setState({ loading: true });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_actions__["b" /* searchShows */])(this.state.term).then(list => {
      this.setState({ list, loading: false });
    });
  }
  updateTerm(term) {
    this.setState({ term });
  }
  render() {
    const buttonClasses = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('button', 'is-info', 'is-medium', {
      'is-loading': this.state.loading
    });
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'div',
      { 'class': 'container search__container' },
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'div',
        { 'class': 'search__field-container' },
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { 'class': 'search__field' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { 'class': 'field has-addons' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'p',
              { 'class': 'control is-expanded' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', {
                'class': 'input is-medium',
                type: 'text',
                placeholder: 'Find a show',
                onKeyUp: ({ key }) => key === 'Enter' ? this.search() : null,
                onChange: e => this.updateTerm(e.target.value)
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'p',
              { 'class': 'control' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'button',
                { 'class': buttonClasses, onClick: () => this.search() },
                'Search'
              )
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_3__SearchResults__["a" /* default */], { results: this.state.list })
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Search;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchResults;


function SearchResults({ results }) {
  return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
    'ul',
    { 'class': 'columns is-multiline' },
    results.map(result => __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'li',
      { key: result.id, 'class': 'column is-one-third' },
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'div',
        { 'class': 'card' },
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { 'class': 'card-image' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'figure',
            { 'class': 'image is-16by9' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('img', { src: result.artwork_208x117, alt: 'Promotional art' })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { 'class': 'card-content' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'h2',
            { 'class': 'title' },
            result.title
          )
        )
      )
    ))
  );
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_app_scss__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_app_scss__);




__WEBPACK_IMPORTED_MODULE_0_preact___default.a.render(__WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_1__components_App__["a" /* default */], {
  accessToken: localStorage.getItem('accessToken'),
  idToken: localStorage.getItem('idToken')
}), document.getElementById('appRoot'));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);

var objectHelper = __webpack_require__(0);
var assert = __webpack_require__(2);
var responseHandler = __webpack_require__(5);

function DBConnection(request, options) {
  this.baseOptions = options;
  this.request = request;
}

/**
 * @callback signUpCallback
 * @param {Error} [err] error returned by Auth0 with the reason why the signup failed
 * @param {Object} [result] result of the signup request
 * @param {Object} result.email user's email
 * @param {Object} result.emailVerified if the user's email was verified
 */

/**
 * Creates a new user in a Auth0 Database connection
 *
 * @method signup
 * @param {Object} options
 * @param {String} options.email user email address
 * @param {String} options.password user password
 * @param {String} options.connection name of the connection where the user will be created
 * @param {signUpCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#signup}
 */
DBConnection.prototype.signup = function (options, cb) {
  var url;
  var body;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    connection: { type: 'string', message: 'connection option is required' },
    email: { type: 'string', message: 'email option is required' },
    password: { type: 'string', message: 'password option is required' }
  });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'dbconnections', 'signup');

  body = objectHelper.merge(this.baseOptions, ['clientID'])
                .with(options);

  body = objectHelper.blacklist(body, ['scope']);

  body = objectHelper.toSnakeCase(body, ['auth0Client']);

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

/**
 * @callback changePasswordCallback
 * @param {Error} [err] error returned by Auth0 with the reason why the request failed
 */

/**
 * Request an email with instruction to change a user's password
 *
 * @method changePassword
 * @param {Object} options
 * @param {String} options.email address where the user will recieve the change password email. It should match the user's email in Auth0
 * @param {String} options.connection name of the connection where the user was created
 * @param {changePasswordCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#change-password}
 */
DBConnection.prototype.changePassword = function (options, cb) {
  var url;
  var body;

  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    connection: { type: 'string', message: 'connection option is required' },
    email: { type: 'string', message: 'email option is required' }
  });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'dbconnections', 'change_password');

  body = objectHelper.merge(this.baseOptions, ['clientID'])
                .with(options, ['email', 'connection']);

  body = objectHelper.toSnakeCase(body, ['auth0Client']);

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

module.exports = DBConnection;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);

var objectHelper = __webpack_require__(0);
var assert = __webpack_require__(2);
var qs = __webpack_require__(7);
var responseHandler = __webpack_require__(5);

function PasswordlessAuthentication(request, options) {
  this.baseOptions = options;
  this.request = request;
}

PasswordlessAuthentication.prototype.buildVerifyUrl = function (options) {
  var params;
  var qString;

  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    connection: { type: 'string', message: 'connection option is required' },
    verificationCode: { type: 'string', message: 'verificationCode option is required' },
    phoneNumber: { optional: false, type: 'string', message: 'phoneNumber option is required',
            condition: function (o) { return !o.email; } },
    email: { optional: false, type: 'string', message: 'email option is required',
            condition: function (o) { return !o.phoneNumber; } }
  });
  /* eslint-enable */

  params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'responseType',
    'responseMode',
    'redirectUri',
    'scope',
    'audience'
  ]).with(options);

  // eslint-disable-next-line
  if (this.baseOptions._sendTelemetry) {
    params.auth0Client = this.request.getTelemetryData();
  }

  params = objectHelper.toSnakeCase(params, ['auth0Client']);

  qString = qs.stringify(params);

  return urljoin(this.baseOptions.rootUrl, 'passwordless', 'verify_redirect', '?' + qString);
};

PasswordlessAuthentication.prototype.start = function (options, cb) {
  var url;
  var body;

  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    connection: { type: 'string', message: 'connection option is required' },
    send: { type: 'string', message: 'send option is required', values: ['link', 'code'],
            value_message: 'send is not valid ([link, code])' },
    phoneNumber: { optional: true, type: 'string', message: 'phoneNumber option is required',
            condition: function (o) { return o.send === 'code' || !o.email; } },
    email: { optional: true, type: 'string', message: 'email option is required',
            condition: function (o) { return o.send === 'link' || !o.phoneNumber; } },
    authParams: { optional: true, type: 'object', message: 'authParams option is required' }
  });
  /* eslint-enable */

  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'passwordless', 'start');

  body = objectHelper.merge(this.baseOptions, [
    'clientID',
    'responseType',
    'redirectUri',
    'scope'
  ]).with(options);

  if (body.scope) {
    body.authParams = body.authParams || {};
    body.authParams.scope = body.scope;
  }

  if (body.redirectUri) {
    body.authParams = body.authParams || {};
    body.authParams.redirect_uri = body.redirectUri;
  }

  if (body.responseType) {
    body.authParams = body.authParams || {};
    body.authParams.response_type = body.responseType;
  }

  delete body.redirectUri;
  delete body.responseType;
  delete body.scope;

  body = objectHelper.toSnakeCase(body, ['auth0Client', 'authParams']);

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

PasswordlessAuthentication.prototype.verify = function (options, cb) {
  var url;
  var cleanOption;

  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    connection: { type: 'string', message: 'connection option is required' },
    verificationCode: { type: 'string', message: 'verificationCode option is required' },
    phoneNumber: { optional: false, type: 'string', message: 'phoneNumber option is required',
            condition: function (o) { return !o.email; } },
    email: { optional: false, type: 'string', message: 'email option is required',
            condition: function (o) { return !o.phoneNumber; } }
  });
  /* eslint-enable */

  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  cleanOption = objectHelper.toSnakeCase(options, ['auth0Client']);

  url = urljoin(this.baseOptions.rootUrl, 'passwordless', 'verify');

  return this.request
    .post(url)
    .send(cleanOption)
    .end(responseHandler(cb));
};

module.exports = PasswordlessAuthentication;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var windowHandler = __webpack_require__(3);
var base64Url = __webpack_require__(14);

function create(name, value, days) {
  var date;
  var expires;

  if (windowHandler.getDocument().cookie === undefined
      || windowHandler.getDocument().cookie === null) {
    throw new Error('cookie storage not available');
  }

  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }

  windowHandler.getDocument().cookie = name + '=' + base64Url.encode(value) + expires + '; path=/';
}

function read(name) {
  var i;
  var cookie;
  var cookies;
  var nameEQ = name + '=';

  if (windowHandler.getDocument().cookie === undefined
      || windowHandler.getDocument().cookie === null) {
    throw new Error('cookie storage not available');
  }

  cookies = windowHandler.getDocument().cookie.split(';');

  for (i = 0; i < cookies.length; i++) {
    cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return base64Url.decode(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
}

function erase(name) {
  create(name, '', -1);
}

module.exports = {
  create: create,
  read: read,
  erase: erase
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var windowHelper = __webpack_require__(3);

function IframeHandler(options) {
  this.auth0 = options.auth0;
  this.url = options.url;
  this.callback = options.callback;
  this.timeout = options.timeout || 60 * 1000;
  this.timeoutCallback = options.timeoutCallback || null;
  this.usePostMessage = options.usePostMessage || false;
  this.iframe = null;
  this.timeoutHandle = null;
  this._destroyTimeout = null;
  this.transientMessageEventListener = null;
  this.transientEventListener = null;
}

IframeHandler.prototype.init = function () {
  var _this = this;
  var _window = windowHelper.getWindow();

  this.iframe = _window.document.createElement('iframe');
  this.iframe.style.display = 'none';
  this.iframe.src = this.url;

  if (this.usePostMessage) {
    // Workaround to avoid using bind that does not work in IE8
    this.transientMessageEventListener = function (e) {
      _this.messageEventListener(e);
    };

    _window.addEventListener('message', this.transientMessageEventListener, false);
  } else {
    // Workaround to avoid using bind that does not work in IE8
    this.transientEventListener = function () {
      _this.loadEventListener();
    };

    this.iframe.addEventListener('load', this.transientEventListener, false);
  }

  _window.document.body.appendChild(this.iframe);

  this.timeoutHandle = setTimeout(function () {
    _this.timeoutHandler();
  }, this.timeout);
};

IframeHandler.prototype.messageEventListener = function (e) {
  this.destroy();
  this.callbackHandler(e.data);
};

IframeHandler.prototype.loadEventListener = function () {
  var _this = this;
  _this.callback(this.iframe.contentWindow.location.hash);
};

IframeHandler.prototype.callbackHandler = function (result) {
  var error = null;

  if (result && result.error) {
    error = result;
    result = null;
  }

  this.callback(error, result);
};

IframeHandler.prototype.timeoutHandler = function () {
  this.destroy();
  if (this.timeoutCallback) {
    this.timeoutCallback();
  }
};

IframeHandler.prototype.destroy = function () {
  var _this = this;
  var _window = windowHelper.getWindow();

  clearTimeout(this.timeoutHandle);

  this._destroyTimeout = setTimeout(function () {
    if (_this.usePostMessage) {
      _window.removeEventListener('message', _this.transientMessageEventListener, false);
    } else {
      _this.iframe.removeEventListener('load', _this.transientEventListener, false);
    }

    _window.document.body.removeChild(_this.iframe);
  }, 0);
};

module.exports = IframeHandler;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/* eslint-disable no-continue */

function get() {
  if (!Object.assign) {
    return objectAssignPolyfill;
  }

  return Object.assign;
}

function objectAssignPolyfill(target) {
  'use strict';
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

module.exports = {
  get: get,
  objectAssignPolyfill: objectAssignPolyfill
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var objectHelper = __webpack_require__(0);

var tokenParams = [
// auth0
  'realm',
  'audience',
// oauth2
  'client_id',
  'client_secret',
  'redirect_uri',
  'scope',
  'code',
  'grant_type',
  'username',
  'password',
  'refresh_token',
  'assertion',
  'client_assertion',
  'client_assertion_type',
  'code_verifier'
];

var authorizeParams = [
// auth0
  'connection',
  'connection_scope',
  'auth0Client',
  'owp',
  'device',

  'protocol',
  '_csrf',
  '_intstate',

// oauth2
  'client_id',
  'response_type',
  'response_mode',
  'redirect_uri',
  'audience',
  'scope',
  'state',
  'nonce',
  'display',
  'prompt',
  'max_age',
  'ui_locales',
  'claims_locales',
  'id_token_hint',
  'login_hint',
  'acr_values',
  'claims',
  'registration',
  'request',
  'request_uri',
  'code_challenge',
  'code_challenge_method'
];

function oauthAuthorizeParams(warn, params) {
  var notAllowed = objectHelper.getKeysNotIn(params, authorizeParams);

  if (notAllowed.length > 0) {
    warn.warning('Following parameters are not allowed on the `/authorize` endpoing: [' + notAllowed.join(',') + ']');
  }

  return params;
}

function oauthTokenParams(warn, params) {
  return objectHelper.pick(params, tokenParams);
}

module.exports = {
  oauthTokenParams: oauthTokenParams,
  oauthAuthorizeParams: oauthAuthorizeParams
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(10);

function PluginHandler(webAuth, plugins) {
  this.plugins = plugins;

  for (var a = 0; a < this.plugins.length; a++) {
    if (this.plugins[a].version !== version.raw) {
      var pluginName = '';

      if (this.plugins[a].constructor && this.plugins[a].constructor.name) {
        pluginName = this.plugins[a].constructor.name;
      }

      throw new Error('Plugin ' + pluginName + ' version (' + this.plugins[a].version + ') ' +
        'is not compatible with the SDK version (' + version.raw + ')');
    }

    this.plugins[a].setWebAuth(webAuth);
  }
}

PluginHandler.prototype.get = function (extensibilityPoint) {
  for (var a = 0; a < this.plugins.length; a++) {
    if (this.plugins[a].supports(extensibilityPoint)) {
      return this.plugins[a].init();
    }
  }

  return null;
};

module.exports = PluginHandler;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
var WinChan = __webpack_require__(22);

var windowHandler = __webpack_require__(3);
var objectHelper = __webpack_require__(0);
var qs = __webpack_require__(7);

function PopupHandler() {
  this._current_popup = null;
}

PopupHandler.prototype.calculatePosition = function (options) {
  var width = options.width || 500;
  var height = options.height || 600;
  var _window = windowHandler.getWindow();

  var screenX = typeof _window.screenX !== 'undefined' ? _window.screenX : _window.screenLeft;
  var screenY = typeof _window.screenY !== 'undefined' ? _window.screenY : _window.screenTop;

  var outerWidth = typeof _window.outerWidth !== 'undefined'
    ? _window.outerWidth
    : _window.document.body.clientWidth;

  var outerHeight = typeof _window.outerHeight !== 'undefined'
    ? _window.outerHeight
    : _window.document.body.clientHeight;

  var left = screenX + ((outerWidth - width) / 2);
  var top = screenY + ((outerHeight - height) / 2);

  return { width: width, height: height, left: left, top: top };
};

PopupHandler.prototype.preload = function (options) {
  var _this = this;
  var _window = windowHandler.getWindow();
  var popupPosition = this.calculatePosition(options.popupOptions || {});
  var popupOptions = objectHelper.merge(popupPosition).with(options.popupOptions);
  var url = options.url || 'about:blank';
  var windowFeatures = qs.stringify(popupOptions, {
    encode: false,
    delimiter: ','
  });

  if (this._current_popup && !this._current_popup.closed) {
    return this._current_popup;
  }

  this._current_popup = _window.open(url, 'auth0_signup_popup', windowFeatures);

  this._current_popup.kill = function () {
    this.close();
    _this._current_popup = null;
  };

  return this._current_popup;
};

PopupHandler.prototype.load = function (url, relayUrl, options, cb) {
  var _this = this;
  var popupPosition = this.calculatePosition(options.popupOptions || {});
  var popupOptions = objectHelper.merge(popupPosition).with(options.popupOptions);

  var winchanOptions = objectHelper.merge({
    url: url,
    relay_url: relayUrl,
    window_features: qs.stringify(popupOptions, {
      delimiter: ',',
      encode: false
    }),
    popup: this._current_popup
  }).with(options);

  var popup = WinChan.open(winchanOptions, function (err, data) {
    _this._current_popup = null;
    return cb(err, data);
  });

  popup.focus();

  return popup;
};

module.exports = PopupHandler;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var windowHelper = __webpack_require__(3);

function randomString(length) {
  // eslint-disable-next-line
  var bytes = new Uint8Array(length);
  var result = [];
  var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

  var cryptoObj = windowHelper.getWindow().crypto || windowHelper.getWindow().msCrypto;
  if (!cryptoObj) {
    return null;
  }

  var random = cryptoObj.getRandomValues(bytes);

  for (var a = 0; a < random.length; a++) {
    result.push(charset[random[a] % charset.length]);
  }

  return result.join('');
}

module.exports = {
  randomString: randomString
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var StorageHandler = __webpack_require__(43);
var storage;

function getStorage(force) {
  if (!storage || force) {
    storage = new StorageHandler();
  }
  return storage;
}

module.exports = {
  getItem: function (key) {
    var value = getStorage().getItem(key);
    return value ? JSON.parse(value) : value;
  },
  removeItem: function (key) {
    return getStorage().removeItem(key);
  },
  setItem: function (key, value) {
    var json = JSON.stringify(value);
    return getStorage().setItem(key, json);
  },
  reload: function () {
    getStorage(true);
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var cookies = __webpack_require__(33);

function CookieStorage() {}

CookieStorage.prototype.getItem = function (key) {
  return cookies.read(key);
};

CookieStorage.prototype.removeItem = function (key) {
  cookies.erase(key);
};

CookieStorage.prototype.setItem = function (key, value) {
  cookies.create(key, value, 1);
};

module.exports = CookieStorage;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

function DummyStorage() {}

DummyStorage.prototype.getItem = function () { return null; };

DummyStorage.prototype.removeItem = function () {};

DummyStorage.prototype.setItem = function () {};

module.exports = DummyStorage;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var windowHandler = __webpack_require__(3);
var DummyStorage = __webpack_require__(42);
var CookieStorage = __webpack_require__(41);
var Warn = __webpack_require__(6);

function StorageHandler() {
  this.warn = new Warn({});
  this.storage = windowHandler.getWindow().localStorage || new CookieStorage();
}

StorageHandler.prototype.failover = function () {
  if (this.storage instanceof DummyStorage) {
    this.warn.warning('DummyStorage: ignore failover');
    return;
  } else if (this.storage instanceof CookieStorage) {
    this.warn.warning('CookieStorage: failing over DummyStorage');
    this.storage = new DummyStorage();
  } else {
    this.warn.warning('LocalStorage: failing over CookieStorage');
    this.storage = new CookieStorage();
  }
};

StorageHandler.prototype.getItem = function (key) {
  try {
    return this.storage.getItem(key);
  } catch (e) {
    this.warn.warning(e);
    this.failover();
    return this.getItem(key);
  }
};

StorageHandler.prototype.removeItem = function (key) {
  try {
    return this.storage.removeItem(key);
  } catch (e) {
    this.warn.warning(e);
    this.failover();
    return this.removeItem(key);
  }
};

StorageHandler.prototype.setItem = function (key, value) {
  try {
    return this.storage.setItem(key, value);
  } catch (e) {
    this.warn.warning(e);
    this.failover();
    return this.setItem(key, value);
  }
};

module.exports = StorageHandler;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// given a URL, extract the origin. Taken from: https://github.com/firebase/firebase-simple-login/blob/d2cb95b9f812d8488bdbfba51c3a7c153ba1a074/js/src/simple-login/transports/WinChan.js#L25-L30
function extractOrigin(url) {
  if (!/^https?:\/\//.test(url)) url = window.location.href;
  var m = /^(https?:\/\/[-_a-zA-Z.0-9:]+)/.exec(url);
  if (m) return m[1];
  return url;
}

module.exports = {
  extractOrigin: extractOrigin
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Authentication = __webpack_require__(13);
var Management = __webpack_require__(46);
var WebAuth = __webpack_require__(47);
var version = __webpack_require__(10);

module.exports = {
  Authentication: Authentication,
  Management: Management,
  WebAuth: WebAuth,
  version: version.raw
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);

var RequestBuilder = __webpack_require__(9);
var assert = __webpack_require__(2);
var responseHandler = __webpack_require__(5);

/**
 * Auth0 Management API Client (methods allowed to be called from the browser only)
 * @constructor
 * @param {Object} options
 * @param {Object} options.domain your Auth0 acount domain
 * @param {Object} options.token a valid API token
 */
function Management(options) {
  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    domain: { type: 'string', message: 'domain option is required' },
    token: { type: 'string', message: 'token option is required' },
    _sendTelemetry: { optional: true, type: 'boolean', message: '_sendTelemetry option is not valid' },
    _telemetryInfo: { optional: true, type: 'object', message: '_telemetryInfo option is not valid' }
  });
  /* eslint-enable */

  this.baseOptions = options;

  this.baseOptions.headers = { Authorization: 'Bearer ' + this.baseOptions.token };

  this.request = new RequestBuilder(this.baseOptions);
  this.baseOptions.rootUrl = urljoin('https://' + this.baseOptions.domain, 'api', 'v2');
}

/**
 * @callback userCallback
 * @param {Error} [err] failure reason for the failed request to Management API
 * @param {Object} [result] user profile
 */

/**
 * Returns the user profile
 *
 * @method getUser
 * @param {String} userId identifier of the user to retrieve
 * @param {userCallback} cb
 * @see https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id
 */
Management.prototype.getUser = function (userId, cb) {
  var url;

  assert.check(userId, { type: 'string', message: 'userId parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'users', userId);

  return this.request
    .get(url)
    .end(responseHandler(cb, { ignoreCasing: true }));
};

/**
 * Updates the user metdata. It will patch the user metdata with the attributes sent.
 *
 *
 * @method patchUserMetadata
 * @param {String} userId
 * @param {Object} userMetadata
 * @param {userCallback} cb
 * @see   {@link https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id}
 */
Management.prototype.patchUserMetadata = function (userId, userMetadata, cb) {
  var url;

  assert.check(userId, { type: 'string', message: 'userId parameter is not valid' });
  assert.check(userMetadata, { type: 'object', message: 'userMetadata parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  url = urljoin(this.baseOptions.rootUrl, 'users', userId);

  return this.request
    .patch(url)
    .send({ user_metadata: userMetadata })
    .end(responseHandler(cb, { ignoreCasing: true }));
};

/**
 * Link two users
 *
 * @method linkUser
 * @param {String} userId
 * @param {String} secondaryUserToken
 * @param {userCallback} cb
 * @see   {@link https://auth0.com/docs/api/management/v2#!/Users/post_identities}
 */
Management.prototype.linkUser = function (userId, secondaryUserToken, cb) {
  var url;
  /* eslint-disable */
  assert.check(userId, { type: 'string', message: 'userId parameter is not valid' });
  assert.check(secondaryUserToken, { type: 'string',
    message: 'secondaryUserToken parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });
  /* eslint-enable */

  url = urljoin(this.baseOptions.rootUrl, 'users', userId, 'identities');

  return this.request
    .post(url)
    .send({ link_with: secondaryUserToken })
    .end(responseHandler(cb, { ignoreCasing: true }));
};

module.exports = Management;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var IdTokenVerifier = __webpack_require__(60);

var assert = __webpack_require__(2);
var error = __webpack_require__(15);
var qs = __webpack_require__(7);
var PluginHandler = __webpack_require__(37);
var windowHelper = __webpack_require__(3);
var objectHelper = __webpack_require__(0);
var TransactionManager = __webpack_require__(16);
var Authentication = __webpack_require__(13);
var Redirect = __webpack_require__(49);
var Popup = __webpack_require__(48);
var SilentAuthenticationHandler = __webpack_require__(50);

/**
 * Handles all the browser's AuthN/AuthZ flows
 * @constructor
 * @param {Object} options
 * @param {String} options.domain your Auth0 domain
 * @param {String} options.clientID your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} [options.redirectUri] url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} [options.responseType] type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @param {Array} [options.plugins]
 * @see {@link https://auth0.com/docs/api/authentication}
 */
function WebAuth(options) {
  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    domain: { type: 'string', message: 'domain option is required' },
    clientID: { type: 'string', message: 'clientID option is required' },
    responseType: { optional: true, type: 'string', message: 'responseType is not valid' },
    responseMode: { optional: true, type: 'string', message: 'responseMode is not valid' },
    redirectUri: { optional: true, type: 'string', message: 'redirectUri is not valid' },
    scope: { optional: true, type: 'string', message: 'scope is not valid' },
    audience: { optional: true, type: 'string', message: 'audience is not valid' },
    leeway: { optional: true, type: 'number', message: 'leeway is not valid' },
    plugins: { optional: true, type: 'array', message: 'plugins is not valid' },
    _disableDeprecationWarnings: { optional: true, type: 'boolean', message: '_disableDeprecationWarnings option is not valid' },
    _sendTelemetry: { optional: true, type: 'boolean', message: '_sendTelemetry option is not valid' },
    _telemetryInfo: { optional: true, type: 'object', message: '_telemetryInfo option is not valid' }
  });

  if (options.overrides) {
    assert.check(options.overrides, { type: 'object', message: 'overrides option is not valid' }, {
      __tenant: { type: 'string', message: '__tenant option is required' },
      __token_issuer: { type: 'string', message: '__token_issuer option is required' }
    });
  }
  /* eslint-enable */

  this.baseOptions = options;
  this.baseOptions.plugins = new PluginHandler(this, this.baseOptions.plugins || []);

  this.baseOptions._sendTelemetry = this.baseOptions._sendTelemetry === false ?
    this.baseOptions._sendTelemetry : true;

  this.baseOptions.tenant = (this.overrides && this.overrides.__tenant)
    || this.baseOptions.domain.split('.')[0];

  this.baseOptions.token_issuer = (this.overrides && this.overrides.__token_issuer)
    || 'https://' + this.baseOptions.domain + '/';

  this.transactionManager = new TransactionManager(this.baseOptions.transaction);

  this.client = new Authentication(this.baseOptions);
  this.redirect = new Redirect(this.client, this.baseOptions);
  this.popup = new Popup(this, this.baseOptions);
}

/**
 * Parse the url hash and extract the Auth response from a Auth flow started with {@link authorize}
 *
 * Only validates id_tokens signed by Auth0 using the RS256 algorithm using the public key exposed
 * by the `/.well-known/jwks.json` endpoint of your account.
 * Tokens signed with other algorithms, e.g. HS256 will not be accepted.
 *
 * @method parseHash
 * @param {Object} options
 * @param {String} options.hash the url hash. If not provided it will extract from window.location.hash
 * @param {String} [options.state] value originally sent in `state` parameter to {@link authorize} to mitigate XSRF
 * @param {String} [options.nonce] value originally sent in `nonce` parameter to {@link authorize} to prevent replay attacks
 * @param {String} [options._idTokenVerification] makes parseHash perform or skip `id_token` verification. We **strongly** recommend validating the `id_token` yourself if you disable the verification.
 * @param {authorizeCallback} cb
 */
WebAuth.prototype.parseHash = function (options, cb) {
  var parsedQs;
  var err;
  var state;
  var transaction;
  var transactionNonce;

  if (!cb && typeof options === 'function') {
    cb = options;
    options = {};
  } else {
    options = options || {};
  }

  options._idTokenVerification = !(options._idTokenVerification === false);

  var _window = windowHelper.getWindow();

  var hashStr = options.hash === undefined ? _window.location.hash : options.hash;
  hashStr = hashStr.replace(/^#?\/?/, '');

  parsedQs = qs.parse(hashStr);

  if (parsedQs.hasOwnProperty('error')) {
    err = error.buildResponse(parsedQs.error, parsedQs.error_description);

    if (parsedQs.state) {
      err.state = parsedQs.state;
    }

    return cb(err);
  }

  if (!parsedQs.hasOwnProperty('access_token')
    && !parsedQs.hasOwnProperty('id_token')
    && !parsedQs.hasOwnProperty('refresh_token')) {
    return cb(null, null);
  }

  state = parsedQs.state || options.state;

  transaction = this.transactionManager.getStoredTransaction(state);
  transactionNonce = options.nonce || (transaction && transaction.nonce) || null;

  var applicationStatus = (transaction && transaction.appStatus) || null;
  if (parsedQs.id_token && options._idTokenVerification) {
    return this.validateToken(
      parsedQs.id_token,
      transactionNonce,
      function (validationError, payload) {
        if (validationError) {
          return cb(validationError);
        }
        return cb(null, buildParseHashResponse(parsedQs, applicationStatus, payload));
      });
  }

  if (parsedQs.id_token) {
    var verifier = new IdTokenVerifier({
      issuer: this.baseOptions.token_issuer,
      audience: this.baseOptions.clientID,
      leeway: this.baseOptions.leeway || 0,
      __disableExpirationCheck: this.baseOptions.__disableExpirationCheck
    });

    var decodedToken = verifier.decode(parsedQs.id_token);
    cb(null, buildParseHashResponse(parsedQs, applicationStatus, decodedToken.payload));
  } else {
    cb(null, buildParseHashResponse(parsedQs, applicationStatus, null));
  }
};

function buildParseHashResponse(qsParams, appStatus, token) {
  return {
    accessToken: qsParams.access_token || null,
    idToken: qsParams.id_token || null,
    idTokenPayload: token || null,
    appStatus: appStatus || null,
    refreshToken: qsParams.refresh_token || null,
    state: qsParams.state || null,
    expiresIn: qsParams.expires_in ? parseInt(qsParams.expires_in, 10) : null,
    tokenType: qsParams.token_type || null
  };
}

/**
 * @callback validateTokenCallback
 * @param {Error} [err] error returned by while validating the token
 * @param {Object} [payload] claims stored in the token
 */

/**
 * Decodes the a JWT and verifies its nonce value
 *
 * @method validateToken
 * @private
 * @param {String} token
 * @param {String} nonce
 * @param {validateTokenCallback} cb
 */
WebAuth.prototype.validateToken = function (token, nonce, cb) {
  var verifier = new IdTokenVerifier({
    issuer: this.baseOptions.token_issuer,
    audience: this.baseOptions.clientID,
    leeway: this.baseOptions.leeway || 0,
    __disableExpirationCheck: this.baseOptions.__disableExpirationCheck
  });

  verifier.verify(token, nonce, function (err, payload) {
    if (err) {
      return cb(error.invalidJwt(err.message));
    }

    cb(null, payload);
  });
};

/**
 * Executes a silent authentication transaction under the hood in order to fetch a new tokens for the current session.
 * This method requires that all Auth is performed with {@link authorize}
 *
 * @method renewAuth
 * @param {Object} options
 * @param {String} [options.domain] your Auth0 domain
 * @param {String} [options.clientID] your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} [options.redirectUri] url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} [options.responseType] type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.state] value used to mitigate XSRF attacks. {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
 * @param {String} [options.nonce] value used to mitigate replay attacks when using Implicit Grant. {@link https://auth0.com/docs/api-auth/tutorials/nonce}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
 */
WebAuth.prototype.renewAuth = function (options, cb) {
  var handler;
  var usePostMessage = !!options.usePostMessage;
  var _this = this;

  var params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'redirectUri',
    'responseType',
    'scope',
    'audience',
    '_csrf',
    'state',
    '_instate',
    'nonce'
  ]).with(options);

  params.responseType = params.responseType || 'token';
  params.responseMode = params.responseMode || 'fragment';
  if (!options.nonce) {
    params = this.transactionManager.process(params);
  }

  assert.check(params, { type: 'object', message: 'options parameter is not valid' });
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' });

  params.prompt = 'none';

  params = objectHelper.blacklist(params, ['usePostMessage', 'tenant']);

  handler = new SilentAuthenticationHandler(this, this.client.buildAuthorizeUrl(params));

  handler.login(usePostMessage, function (hash) {
    var transaction = _this.transactionManager.getStoredTransaction(params.state);
    var transactionNonce = options.nonce || (transaction && transaction.nonce) || null;
    var transactionState = options.state || (transaction && transaction.state) || null;
    _this.parseHash({ hash: hash, nonce: transactionNonce, state: transactionState }, cb);
  });
};

/**
 * Request an email with instruction to change a user's password
 *
 * @method changePassword
 * @param {Object} options
 * @param {String} options.email address where the user will recieve the change password email. It should match the user's email in Auth0
 * @param {String} options.connection name of the connection where the user was created
 * @param {changePasswordCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#change-password}
 */
WebAuth.prototype.changePassword = function (options, cb) {
  return this.client.dbConnection.changePassword(options, cb);
};

/**
 * Starts a passwordless authentication transaction.
 *
 * @method passwordlessStart
 * @param {Object} options
 * @param {String} options.send what will be sent via email which could be `link` or `code`. For SMS `code` is the only one valud
 * @param {String} [options.phoneNumber] phone number where to send the `code`. This parameter is mutually exclusive with `email`
 * @param {String} [options.email] email where to send the `code` or `link`. This parameter is mutually exclusive with `phoneNumber`
 * @param {String} options.connection name of the passwordless connection
 * @param {Object} [options.authParams] additional Auth parameters when using `link`
 * @param {Function} cb
 * @see   {@link https://auth0.com/docs/api/authentication#passwordless}
 */
WebAuth.prototype.passwordlessStart = function (options, cb) {
  return this.client.passwordless.start(options, cb);
};

/**
 * Creates a new user in a Auth0 Database connection
 *
 * @method signup
 * @param {Object} options
 * @param {String} options.email user email address
 * @param {String} options.password user password
 * @param {String} options.connection name of the connection where the user will be created
 * @param {signUpCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#signup}
 */
WebAuth.prototype.signup = function (options, cb) {
  return this.client.dbConnection.signup(options, cb);
};

/**
 * Redirects to the hosted login page (`/authorize`) in order to start a new authN/authZ transaction
 *
 * @method authorize
 * @param {Object} options
 * @param {String} [options.domain] your Auth0 domain
 * @param {String} [options.clientID] your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} options.redirectUri url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} options.responseType type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.state] value used to mitigate XSRF attacks. {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
 * @param {String} [options.nonce] value used to mitigate replay attacks when using Implicit Grant. {@link https://auth0.com/docs/api-auth/tutorials/nonce}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
 */
WebAuth.prototype.authorize = function (options) {
  var params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'responseType',
    'responseMode',
    'redirectUri',
    'scope',
    'audience',
    '_csrf',
    'state',
    '_instate',
    'nonce'
  ]).with(options);

  assert.check(params, { type: 'object', message: 'options parameter is not valid' }, {
    responseType: { type: 'string', message: 'responseType option is required' }
  });

  params = this.transactionManager.process(params);

  windowHelper.redirect(this.client.buildAuthorizeUrl(params));
};

/**
 * Signs up a new user, automatically logs the user in after the signup and returns the user token.
 * The login will be done using /oauth/token with password-realm grant type.
 *
 * @method signupAndAuthorize
 * @param {Object} options
 * @param {String} options.email user email address
 * @param {String} options.password user password
 * @param {String} options.connection name of the connection where the user will be created
 * @param {tokenCallback} cb
 * @see   {@link https://auth0.com/docs/api/authentication#signup}
 * @see   {@link https://auth0.com/docs/api-auth/grant/password}
 */
WebAuth.prototype.signupAndAuthorize = function (options, cb) {
  var _this = this;

  return this.client.dbConnection.signup(objectHelper.blacklist(options, ['popupHandler']),
    function (err) {
      if (err) {
        return cb(err);
      }
      options.realm = options.connection;
      if (!options.username) {
        options.username = options.email;
      }
      _this.client.login(options, cb);
    });
};

/**
 * Redirects to the auth0 logout endpoint
 *
 * If you want to navigate the user to a specific URL after the logout, set that URL at the returnTo parameter. The URL should be included in any the appropriate Allowed Logout URLs list:
 *
 * - If the client_id parameter is included, the returnTo URL must be listed in the Allowed Logout URLs set at the client level (see Setting Allowed Logout URLs at the App Level).
 * - If the client_id parameter is NOT included, the returnTo URL must be listed in the Allowed Logout URLs set at the account level (see Setting Allowed Logout URLs at the Account Level).
 *
 * @method logout
 * @param {Object} options
 * @param {String} [options.clientID] identifier of your client
 * @param {String} [options.returnTo] URL to be redirected after the logout
 * @param {Boolean} [options.federated] tells Auth0 if it should logout the user also from the IdP.
 * @see   {@link https://auth0.com/docs/api/authentication#logout}
 */
WebAuth.prototype.logout = function (options) {
  windowHelper.redirect(this.client.buildLogoutUrl(options));
};

/**
 * Verifies the passwordless TOTP and redirects to finish the passwordless transaction
 *
 * @method passwordlessVerify
 * @param {Object} options
 * @param {String} options.type `sms` or `email`
 * @param {String} options.phoneNumber only if type = sms
 * @param {String} options.email only if type = email
 * @param {String} options.connection the connection name
 * @param {String} options.verificationCode the TOTP code
 * @param {Function} cb
 */
WebAuth.prototype.passwordlessVerify = function (options, cb) {
  var _this = this;
  return this.client.passwordless.verify(options, function (err) {
    if (err) {
      return cb(err);
    }
    return windowHelper.redirect(_this.client.passwordless.buildVerifyUrl(options));
  });
};

module.exports = WebAuth;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);
var WinChan = __webpack_require__(22);

var urlHelper = __webpack_require__(44);
var assert = __webpack_require__(2);
var responseHandler = __webpack_require__(5);
var PopupHandler = __webpack_require__(38);
var objectHelper = __webpack_require__(0);
var Warn = __webpack_require__(6);
var TransactionManager = __webpack_require__(16);

function Popup(webAuth, options) {
  this.baseOptions = options;
  this.client = webAuth.client;
  this.webAuth = webAuth;

  this.transactionManager = new TransactionManager(this.baseOptions.transaction);
  this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}


/**
 * Returns a new instance of the popup handler
 *
 * @method buildPopupHandler
 * @private
 */
Popup.prototype.buildPopupHandler = function () {
  var pluginHandler = this.baseOptions.plugins.get('popup.getPopupHandler');

  if (pluginHandler) {
    return pluginHandler.getPopupHandler();
  }

  return new PopupHandler();
};

/**
 * Initializes the popup window and returns the instance to be used later in order to avoid being blocked by the browser.
 *
 * @method preload
 * @param {Object} options receives the window height and width and any other window feature to be sent to window.open
 */
Popup.prototype.preload = function (options) {
  options = options || {};

  var popup = this.buildPopupHandler();

  popup.preload(options);
  return popup;
};

/**
 * Internal use.
 *
 * @method getPopupHandler
 * @private
 */
Popup.prototype.getPopupHandler = function (options, preload) {
  if (options.popupHandler) {
    return options.popupHandler;
  }

  if (preload) {
    return this.preload(options);
  }

  return this.buildPopupHandler();
};

/**
 * Handles the popup logic for the callback page.
 *
 * @method callback
 * @param {Object} options
 * @param {String} options.hash the url hash. If not provided it will extract from window.location.hash
 * @param {String} [options.state] value originally sent in `state` parameter to {@link authorize} to mitigate XSRF
 * @param {String} [options.nonce] value originally sent in `nonce` parameter to {@link authorize} to prevent replay attacks
 * @param {String} [options._idTokenVerification] makes parseHash perform or skip `id_token` verification. We **strongly** recommend validating the `id_token` yourself if you disable the verification.
 * @see   {@link parseHash}
 */
Popup.prototype.callback = function (options) {
  var _this = this;
  WinChan.onOpen(function (popupOrigin, r, cb) {
    _this.webAuth.parseHash(options || {}, function (err, data) {
      return cb(err || data);
    });
  });
};

/**
 * Shows inside a new window the hosted login page (`/authorize`) in order to start a new authN/authZ transaction and post its result using `postMessage`.
 *
 * @method authorize
 * @param {Object} options
 * @param {String} [options.domain] your Auth0 domain
 * @param {String} [options.clientID] your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
 * @param {String} options.redirectUri url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} options.responseType type of the response used by OAuth 2.0 flow. It can be any space separated list of the values `code`, `token`, `id_token`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
 * @param {String} [options.responseMode] how the Auth response is encoded and redirected back to the client. Supported values are `query`, `fragment` and `form_post`. {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
 * @param {String} [options.state] value used to mitigate XSRF attacks. {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
 * @param {String} [options.nonce] value used to mitigate replay attacks when using Implicit Grant. {@link https://auth0.com/docs/api-auth/tutorials/nonce}
 * @param {String} [options.scope] scopes to be requested during Auth. e.g. `openid email`
 * @param {String} [options.audience] identifier of the resource server who will consume the access token issued after Auth
 * @param {Boolean} [options.owp] determines if Auth0 should render the relay page or not and the caller is responsible of handling the response.
 * @param {authorizeCallback} cb
 * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
 */
Popup.prototype.authorize = function (options, cb) {
  var popup;
  var url;
  var relayUrl;
  var popOpts = {};

  var pluginHandler = this.baseOptions.plugins.get('popup.authorize');

  var params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'scope',
    'domain',
    'audience',
    'responseType',
    'redirectUri',
    '_csrf',
    'state',
    '_instate',
    'nonce'
  ]).with(objectHelper.blacklist(options, ['popupHandler']));

  assert.check(params, { type: 'object', message: 'options parameter is not valid' }, {
    responseType: { type: 'string', message: 'responseType option is required' }
  });

  // the relay page should not be necesary as long it happens in the same domain
  // (a redirectUri shoul be provided). It is necesary when using OWP
  relayUrl = urljoin(this.baseOptions.rootUrl, 'relay.html');

  // if a owp is enabled, it should use the owp flag
  if (options.owp) {
    // used by server to render the relay page instead of sending the chunk in the
    // url to the callback
    params.owp = true;
  } else {
    popOpts.origin = urlHelper.extractOrigin(params.redirectUri);
    relayUrl = params.redirectUri;
  }

  if (options.popupOptions) {
    popOpts.popupOptions = objectHelper.pick(options.popupOptions, ['width', 'height']);
  }

  if (pluginHandler) {
    params = pluginHandler.processParams(params);
  }

  params = this.transactionManager.process(params);

  delete params.domain;

  url = this.client.buildAuthorizeUrl(params);

  popup = this.getPopupHandler(options);

  return popup.load(url, relayUrl, popOpts, responseHandler(cb));
};

/**
 * Performs authentication with username/email and password with a database connection inside a new window
 *
 * This method is not compatible with API Auth so if you need to fetch API tokens with audience
 * you should use {@link authorize} or {@link login}.
 *
 * @method loginWithCredentials
 * @param {Object} options
 * @param {String} [options.redirectUri] url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} [options.responseType] type of the response used. It can be any of the values `code` and `token`
 * @param {String} [options.responseMode] how the AuthN response is encoded and redirected back to the client. Supported values are `query` and `fragment`
 * @param {String} [options.scope] scopes to be requested during AuthN. e.g. `openid email`
 * @param {credentialsCallback} cb
 */
Popup.prototype.loginWithCredentials = function (options, cb) {
  var params;
  var popup;
  var url;
  var relayUrl;

  /* eslint-disable */
  assert.check(options, { type: 'object', message: 'options parameter is not valid' }, {
    clientID: { optional: true, type: 'string', message: 'clientID option is required' },
    redirectUri: { optional: true, type: 'string', message: 'redirectUri option is required' },
    responseType: { optional: true, type: 'string', message: 'responseType option is required' },
    scope: { optional: true, type: 'string', message: 'scope option is required' },
    audience: { optional: true, type: 'string', message: 'audience option is required' }
  });
  /* eslint-enable */

  popup = this.getPopupHandler(options);

  options = objectHelper.merge(this.baseOptions, [
    'clientID',
    'scope',
    'domain',
    'audience',
    '_csrf',
    'state',
    '_instate',
    'nonce'
  ]).with(objectHelper.blacklist(options, ['popupHandler']));

  params = objectHelper.pick(options, ['clientID', 'domain']);
  params.options = objectHelper.toSnakeCase(
    objectHelper.pick(options, ['password', 'connection', 'state', 'scope', '_csrf', 'device'])
  );
  params.options.username = options.username || options.email;

  url = urljoin(this.baseOptions.rootUrl, 'sso_dbconnection_popup', options.clientID);
  relayUrl = urljoin(this.baseOptions.rootUrl, 'relay.html');

  return popup.load(url, relayUrl, { params: params }, responseHandler(cb));
};

/**
 * Verifies the passwordless TOTP and redirects to finish the passwordless transaction
 *
 * @method passwordlessVerify
 * @param {Object} options
 * @param {String} options.type `sms` or `email`
 * @param {String} options.phoneNumber only if type = sms
 * @param {String} options.email only if type = email
 * @param {String} options.connection the connection name
 * @param {String} options.verificationCode the TOTP code
 * @param {Function} cb
 */
Popup.prototype.passwordlessVerify = function (options, cb) {
  var _this = this;
  return this.client.passwordless.verify(objectHelper.blacklist(options, ['popupHandler']),
    function (err) {
      if (err) {
        return cb(err);
      }

      options.username = options.phoneNumber || options.email;
      options.password = options.verificationCode;

      delete options.email;
      delete options.phoneNumber;
      delete options.verificationCode;
      delete options.type;

      _this.client.loginWithResourceOwner(options, cb);
    });
};

/**
 * Signs up a new user and automatically logs the user in after the signup.
 *
 * This method is not compatible with API Auth so if you need to fetch API tokens with audience
 * you should use {@link authorize} or {@link signupAndAuthorize}.
 *
 * @method signupAndLogin
 * @param {Object} options
 * @param {String} options.email user email address
 * @param {String} options.password user password
 * @param {String} options.connection name of the connection where the user will be created
 * @param {credentialsCallback} cb
 */
Popup.prototype.signupAndLogin = function (options, cb) {
  var _this = this;

  // Preload popup to avoid the browser to block it since the login happens later
  var popupHandler = this.getPopupHandler(options, true);
  options.popupHandler = popupHandler;

  return this.client.dbConnection.signup(objectHelper.blacklist(options, ['popupHandler']),
    function (err) {
      if (err) {
        if (popupHandler._current_popup) {
          popupHandler._current_popup.kill();
        }
        return cb(err);
      }
      _this.loginWithCredentials(options, cb);
    });
};

module.exports = Popup;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var UsernamePassword = __webpack_require__(51);
var objectHelper = __webpack_require__(0);
var Warn = __webpack_require__(6);
var assert = __webpack_require__(2);

function Redirect(client, options) {
  this.baseOptions = options;
  this.client = client;

  this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}

/**
 * @callback credentialsCallback
 * @param {Error} [err] error returned by Auth0 with the reason of the Auth failure
 * @param {Object} [result] result of the AuthN request
 * @param {String} result.accessToken token that can be used with {@link userinfo}
 * @param {String} [result.idToken] token that identifies the user
 * @param {String} [result.refreshToken] token that can be used to get new access tokens from Auth0. Note that not all clients can request them or the resource server might not allow them.
 */

/**
 * Performs authentication with username/email and password with a database connection
 *
 * This method is not compatible with API Auth so if you need to fetch API tokens with audience
 * you should use {@link authorize} or {@link login}.
 *
 * @method loginWithCredentials
 * @param {Object} options
 * @param {String} [options.redirectUri] url that the Auth0 will redirect after Auth with the Authorization Response
 * @param {String} [options.responseType] type of the response used. It can be any of the values `code` and `token`
 * @param {String} [options.responseMode] how the AuthN response is encoded and redirected back to the client. Supported values are `query` and `fragment`
 * @param {String} [options.scope] scopes to be requested during AuthN. e.g. `openid email`
 * @param {credentialsCallback} cb
 */
Redirect.prototype.loginWithCredentials = function (options, cb) {
  var usernamePassword;

  var params = objectHelper.merge(this.baseOptions, [
    'clientID',
    'redirectUri',
    'tenant',
    'responseType',
    'responseMode',
    'scope',
    'audience',
    '_csrf',
    'state',
    '_instate',
    'nonce'
  ]).with(options);

  assert.check(params, { type: 'object', message: 'options parameter is not valid' }, {
    responseType: { type: 'string', message: 'responseType option is required' }
  });

  usernamePassword = new UsernamePassword(this.baseOptions);
  return usernamePassword.login(params, function (err, data) {
    if (err) {
      return cb(err);
    }
    return usernamePassword.callback(data);
  });
};

/**
 * Signs up a new user and automatically logs the user in after the signup.
 *
 * @method signupAndLogin
 * @param {Object} options
 * @param {String} options.email user email address
 * @param {String} options.password user password
 * @param {String} options.connection name of the connection where the user will be created
 * @param {credentialsCallback} cb
 */
Redirect.prototype.signupAndLogin = function (options, cb) {
  var _this = this;
  return this.client.dbConnection.signup(options, function (err) {
    if (err) {
      return cb(err);
    }
    return _this.loginWithCredentials(options, cb);
  });
};

module.exports = Redirect;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var IframeHandler = __webpack_require__(34);

function SilentAuthenticationHandler(auth0, authenticationUrl, timeout) {
  this.auth0 = auth0;
  this.authenticationUrl = authenticationUrl;
  this.timeout = timeout || 60 * 1000;
  this.handler = null;
}

SilentAuthenticationHandler.prototype.login = function (usePostMessage, callback) {
  this.handler = new IframeHandler({
    auth0: this.auth0,
    url: this.authenticationUrl,
    callback: callback,
    timeout: this.timeout,
    timeoutCallback: function () {
      callback('#error=timeout&error_description=Timeout+during+authentication+renew.');
    },
    usePostMessage: usePostMessage || false
  });

  this.handler.init();
};

module.exports = SilentAuthenticationHandler;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);

var objectHelper = __webpack_require__(0);
var RequestBuilder = __webpack_require__(9);
var responseHandler = __webpack_require__(5);
var windowHelper = __webpack_require__(3);

function UsernamePassword(options) {
  this.baseOptions = options;
  this.request = new RequestBuilder(options);
}

UsernamePassword.prototype.login = function (options, cb) {
  var url;
  var body;

  url = urljoin(this.baseOptions.rootUrl, 'usernamepassword', 'login');

  options.username = options.username || options.email; // eslint-disable-line

  options = objectHelper.blacklist(options, ['email']); // eslint-disable-line

  body = objectHelper.merge(this.baseOptions, [
    'clientID',
    'redirectUri',
    'tenant',
    'responseType',
    'responseMode',
    'scope',
    'audience'
  ]).with(options);

  body = objectHelper.toSnakeCase(body, ['auth0Client']);

  return this.request
    .post(url)
    .send(body)
    .end(responseHandler(cb));
};

UsernamePassword.prototype.callback = function (formHtml) {
  var div;
  var form;
  var _document = windowHelper.getDocument();

  div = _document.createElement('div');
  div.innerHTML = formHtml;
  form = _document.body.appendChild(div).children[0];

  form.submit();
};

module.exports = UsernamePassword;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(54));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 56 */
/***/ (function(module, exports) {

function DummyCache() {}

DummyCache.prototype.get = function (key) {
  return null;
};

DummyCache.prototype.has = function (key) {
  return false;
};

DummyCache.prototype.set = function (key, value) {
};

module.exports = DummyCache;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

function ConfigurationError(message) {
    this.name = 'ConfigurationError';
    this.message = (message || '');
}
ConfigurationError.prototype = Error.prototype;

function TokenValidationError(message) {
    this.name = 'TokenValidationError';
    this.message = (message || '');
}
TokenValidationError.prototype = Error.prototype;

module.exports = {
  ConfigurationError: ConfigurationError,
  TokenValidationError: TokenValidationError
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var urljoin = __webpack_require__(4);
var base64 = __webpack_require__(18);
var request = __webpack_require__(21);

function process(jwks) {
  var modulus = base64.decodeToHEX(jwks.n);
  var exp = base64.decodeToHEX(jwks.e);

  return {
    modulus: modulus,
    exp: exp
  };
}

function getJWKS(options, cb) {
  var url = urljoin(options.iss, '.well-known', 'jwks.json');

  return request
    .get(url)
    .end(function (err, data) {
      if (err) {
        cb(err);
      }

      var matchingKey = null;

      for (var a = 0; a < data.body.keys.length && matchingKey === null; a ++) {
        var key = data.body.keys[a];
        if (key.kid === options.kid) {
          matchingKey = key;
        }
      }

      cb(null, process(matchingKey));
    });
}

module.exports = {
  process: process,
  getJWKS: getJWKS
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/*
Based on the work of Tom Wu
http://www-cs-students.stanford.edu/~tjw/jsbn/
http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE
*/

var BigInteger = __webpack_require__(61).BigInteger;
var SHA256 = __webpack_require__(55);

var DigestInfoHead = {
  sha1: '3021300906052b0e03021a05000414',
  sha224: '302d300d06096086480165030402040500041c',
  sha256: '3031300d060960864801650304020105000420',
  sha384: '3041300d060960864801650304020205000430',
  sha512: '3051300d060960864801650304020305000440',
  md2: '3020300c06082a864886f70d020205000410',
  md5: '3020300c06082a864886f70d020505000410',
  ripemd160: '3021300906052b2403020105000414'
};

var DigestAlgs = {
  sha256: SHA256
};

function RSAVerifier(modulus, exp) {
  this.n = null;
  this.e = 0;

  if (modulus != null && exp != null && modulus.length > 0 && exp.length > 0) {
    this.n = new BigInteger(modulus, 16);
    this.e = parseInt(exp, 16);
  } else {
    throw new Error('Invalid key data');
  }
}

function getAlgorithmFromDigest(hDigestInfo) {
  for (var algName in DigestInfoHead) {
    var head = DigestInfoHead[algName];
    var len = head.length;

    if (hDigestInfo.substring(0, len) === head) {
      return {
        alg: algName,
        hash: hDigestInfo.substring(len)
      };
    }
  }
  return [];
}


RSAVerifier.prototype.verify = function (msg, encsig) {
  encsig = encsig.replace(/[^0-9a-f]|[\s\n]]/ig, '');

  var sig = new BigInteger(encsig, 16);
  if (sig.bitLength() > this.n.bitLength()) {
    throw new Error('Signature does not match with the key modulus.');
  }

  var decryptedSig = sig.modPowInt(this.e, this.n);
  var digest = decryptedSig.toString(16).replace(/^1f+00/, '');

  var digestInfo = getAlgorithmFromDigest(digest);
  if (digestInfo.length === 0) {
    return false;
  }

  if (!DigestAlgs.hasOwnProperty(digestInfo.alg)) {
    throw new Error('Hashing algorithm is not supported.');
  }

  var msgHash = DigestAlgs[digestInfo.alg](msg).toString();
  return (digestInfo.hash === msgHash);
};

module.exports = RSAVerifier;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var RSAVerifier = __webpack_require__(59);
var base64 = __webpack_require__(18);
var jwks = __webpack_require__(58);
var error = __webpack_require__(57);
var DummyCache = __webpack_require__(56);
var supportedAlgs = ['RS256'];

function IdTokenVerifier(options) {
  options = options || {};

  this.jwksCache = options.jwksCache || new DummyCache();
  this.expectedAlg = options.expectedAlg || 'RS256';
  this.issuer = options.issuer;
  this.audience = options.audience;
  this.leeway = options.leeway || 0;
  this.__disableExpirationCheck = options.__disableExpirationCheck || false;

  if (this.leeway < 0 || this.leeway > 60) {
    throw new error.ConfigurationError('The leeway should be positive and lower than a minute.');
  }

  if (supportedAlgs.indexOf(this.expectedAlg) === -1) {
    throw new error.ConfigurationError('Algorithm ' + this.expectedAlg +
      ' is not supported. (Expected algs: [' + supportedAlgs.join(',') + '])');
  }
}

IdTokenVerifier.prototype.verify = function (token, nonce, cb) {
  var jwt = this.decode(token);

  if (jwt instanceof Error) {
    return cb(jwt, false);
  }

  var headAndPayload = jwt.encoded.header + '.' + jwt.encoded.payload;
  var signature = base64.decodeToHEX(jwt.encoded.signature);

  var alg = jwt.header.alg;
  var kid = jwt.header.kid;

  var aud = jwt.payload.aud;
  var iss = jwt.payload.iss;
  var exp = jwt.payload.exp;
  var iat = jwt.payload.iat;
  var tnonce = jwt.payload.nonce || null;

  if (this.issuer !== iss) {
    return cb(new error.TokenValidationError('Issuer ' + iss + ' is not valid.'), false);
  }

  if (this.audience !== aud) {
    return cb(new error.TokenValidationError('Audience ' + aud + ' is not valid.'), false);
  }

  if (this.expectedAlg !== alg) {
    return cb(new error.TokenValidationError('Algorithm ' + alg +
      ' is not supported. (Expected algs: [' + supportedAlgs.join(',') + '])'), false);
  }

  if (tnonce !== nonce) {
    return cb(new error.TokenValidationError('Nonce does not match.'), false);
  }

  var expirationError = this.verifyExpAndIat(exp, iat);

  if (expirationError) {
    return cb(expirationError, false);
  }

  this.getRsaVerifier(iss, kid, function (err, rsaVerifier) {
    if (err) {
      return cb(err);
    }
    if (rsaVerifier.verify(headAndPayload, signature)) {
      cb(null, jwt.payload);
    } else {
      cb(new error.TokenValidationError('Invalid signature.'));
    }
  });
};

IdTokenVerifier.prototype.verifyExpAndIat = function (exp, iat) {
  if (this.__disableExpirationCheck) {
    return null;
  }

  var now = new Date();

  var expDate = new Date(0);
  expDate.setUTCSeconds(exp + this.leeway);

  if (now > expDate) {
    return new error.TokenValidationError('Expired token.');
  }

  var iatDate = new Date(0);
  iatDate.setUTCSeconds(iat - this.leeway);

  if (now < iatDate) {
    return new error.TokenValidationError('The token was issued in the future. ' +
      'Please check your computed clock.');
  }

  return null;
};

IdTokenVerifier.prototype.getRsaVerifier = function (iss, kid, cb) {
  var _this = this;
  var cachekey = iss + kid;

  if (!this.jwksCache.has(cachekey)) {
    jwks.getJWKS({
      iss: iss,
      kid: kid
    }, function (err, keyInfo) {
      if (err) {
        cb(err);
      }
      _this.jwksCache.set(cachekey, keyInfo);
      cb(null, new RSAVerifier(keyInfo.modulus, keyInfo.exp));
    });
  } else {
    var keyInfo = this.jwksCache.get(cachekey);
    cb(null, new RSAVerifier(keyInfo.modulus, keyInfo.exp));
  }
};

IdTokenVerifier.prototype.decode = function (token) {
  var parts = token.split('.');
  var header;
  var payload;

  if (parts.length !== 3) {
    return new error.TokenValidationError('Cannot decode a malformed JWT');
  }

  try {
    header = JSON.parse(base64.decodeToString(parts[0]));
    payload = JSON.parse(base64.decodeToString(parts[1]));
  } catch (e) {
    return new error.TokenValidationError('Token header or payload is not valid JSON');
  }

  return {
    header: header,
    payload: payload,
    encoded: {
      header: parts[0],
      payload: parts[1],
      signature: parts[2]
    }
  };
};

module.exports = IdTokenVerifier;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

(function(){

    // Copyright (c) 2005  Tom Wu
    // All Rights Reserved.
    // See "LICENSE" for details.

    // Basic JavaScript BN library - subset useful for RSA encryption.

    // Bits per digit
    var dbits;

    // JavaScript engine analysis
    var canary = 0xdeadbeefcafe;
    var j_lm = ((canary&0xffffff)==0xefcafe);

    // (public) Constructor
    function BigInteger(a,b,c) {
      if(a != null)
        if("number" == typeof a) this.fromNumber(a,b,c);
        else if(b == null && "string" != typeof a) this.fromString(a,256);
        else this.fromString(a,b);
    }

    // return new, unset BigInteger
    function nbi() { return new BigInteger(null); }

    // am: Compute w_j += (x*this_i), propagate carries,
    // c is initial carry, returns final carry.
    // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
    // We need to select the fastest one that works in this environment.

    // am1: use a single mult and divide to get the high bits,
    // max digit bits should be 26 because
    // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
    function am1(i,x,w,j,c,n) {
      while(--n >= 0) {
        var v = x*this[i++]+w[j]+c;
        c = Math.floor(v/0x4000000);
        w[j++] = v&0x3ffffff;
      }
      return c;
    }
    // am2 avoids a big mult-and-extract completely.
    // Max digit bits should be <= 30 because we do bitwise ops
    // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
    function am2(i,x,w,j,c,n) {
      var xl = x&0x7fff, xh = x>>15;
      while(--n >= 0) {
        var l = this[i]&0x7fff;
        var h = this[i++]>>15;
        var m = xh*l+h*xl;
        l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
        c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
        w[j++] = l&0x3fffffff;
      }
      return c;
    }
    // Alternately, set max digit bits to 28 since some
    // browsers slow down when dealing with 32-bit numbers.
    function am3(i,x,w,j,c,n) {
      var xl = x&0x3fff, xh = x>>14;
      while(--n >= 0) {
        var l = this[i]&0x3fff;
        var h = this[i++]>>14;
        var m = xh*l+h*xl;
        l = xl*l+((m&0x3fff)<<14)+w[j]+c;
        c = (l>>28)+(m>>14)+xh*h;
        w[j++] = l&0xfffffff;
      }
      return c;
    }
    var inBrowser = typeof navigator !== "undefined";
    if(inBrowser && j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
      BigInteger.prototype.am = am2;
      dbits = 30;
    }
    else if(inBrowser && j_lm && (navigator.appName != "Netscape")) {
      BigInteger.prototype.am = am1;
      dbits = 26;
    }
    else { // Mozilla/Netscape seems to prefer am3
      BigInteger.prototype.am = am3;
      dbits = 28;
    }

    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = ((1<<dbits)-1);
    BigInteger.prototype.DV = (1<<dbits);

    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2,BI_FP);
    BigInteger.prototype.F1 = BI_FP-dbits;
    BigInteger.prototype.F2 = 2*dbits-BI_FP;

    // Digit conversions
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr,vv;
    rr = "0".charCodeAt(0);
    for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

    function int2char(n) { return BI_RM.charAt(n); }
    function intAt(s,i) {
      var c = BI_RC[s.charCodeAt(i)];
      return (c==null)?-1:c;
    }

    // (protected) copy this to r
    function bnpCopyTo(r) {
      for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
      r.t = this.t;
      r.s = this.s;
    }

    // (protected) set from integer value x, -DV <= x < DV
    function bnpFromInt(x) {
      this.t = 1;
      this.s = (x<0)?-1:0;
      if(x > 0) this[0] = x;
      else if(x < -1) this[0] = x+this.DV;
      else this.t = 0;
    }

    // return bigint initialized to value
    function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

    // (protected) set from string and radix
    function bnpFromString(s,b) {
      var k;
      if(b == 16) k = 4;
      else if(b == 8) k = 3;
      else if(b == 256) k = 8; // byte array
      else if(b == 2) k = 1;
      else if(b == 32) k = 5;
      else if(b == 4) k = 2;
      else { this.fromRadix(s,b); return; }
      this.t = 0;
      this.s = 0;
      var i = s.length, mi = false, sh = 0;
      while(--i >= 0) {
        var x = (k==8)?s[i]&0xff:intAt(s,i);
        if(x < 0) {
          if(s.charAt(i) == "-") mi = true;
          continue;
        }
        mi = false;
        if(sh == 0)
          this[this.t++] = x;
        else if(sh+k > this.DB) {
          this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
          this[this.t++] = (x>>(this.DB-sh));
        }
        else
          this[this.t-1] |= x<<sh;
        sh += k;
        if(sh >= this.DB) sh -= this.DB;
      }
      if(k == 8 && (s[0]&0x80) != 0) {
        this.s = -1;
        if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
      }
      this.clamp();
      if(mi) BigInteger.ZERO.subTo(this,this);
    }

    // (protected) clamp off excess high words
    function bnpClamp() {
      var c = this.s&this.DM;
      while(this.t > 0 && this[this.t-1] == c) --this.t;
    }

    // (public) return string representation in given radix
    function bnToString(b) {
      if(this.s < 0) return "-"+this.negate().toString(b);
      var k;
      if(b == 16) k = 4;
      else if(b == 8) k = 3;
      else if(b == 2) k = 1;
      else if(b == 32) k = 5;
      else if(b == 4) k = 2;
      else return this.toRadix(b);
      var km = (1<<k)-1, d, m = false, r = "", i = this.t;
      var p = this.DB-(i*this.DB)%k;
      if(i-- > 0) {
        if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
        while(i >= 0) {
          if(p < k) {
            d = (this[i]&((1<<p)-1))<<(k-p);
            d |= this[--i]>>(p+=this.DB-k);
          }
          else {
            d = (this[i]>>(p-=k))&km;
            if(p <= 0) { p += this.DB; --i; }
          }
          if(d > 0) m = true;
          if(m) r += int2char(d);
        }
      }
      return m?r:"0";
    }

    // (public) -this
    function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

    // (public) |this|
    function bnAbs() { return (this.s<0)?this.negate():this; }

    // (public) return + if this > a, - if this < a, 0 if equal
    function bnCompareTo(a) {
      var r = this.s-a.s;
      if(r != 0) return r;
      var i = this.t;
      r = i-a.t;
      if(r != 0) return (this.s<0)?-r:r;
      while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
      return 0;
    }

    // returns bit length of the integer x
    function nbits(x) {
      var r = 1, t;
      if((t=x>>>16) != 0) { x = t; r += 16; }
      if((t=x>>8) != 0) { x = t; r += 8; }
      if((t=x>>4) != 0) { x = t; r += 4; }
      if((t=x>>2) != 0) { x = t; r += 2; }
      if((t=x>>1) != 0) { x = t; r += 1; }
      return r;
    }

    // (public) return the number of bits in "this"
    function bnBitLength() {
      if(this.t <= 0) return 0;
      return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
    }

    // (protected) r = this << n*DB
    function bnpDLShiftTo(n,r) {
      var i;
      for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
      for(i = n-1; i >= 0; --i) r[i] = 0;
      r.t = this.t+n;
      r.s = this.s;
    }

    // (protected) r = this >> n*DB
    function bnpDRShiftTo(n,r) {
      for(var i = n; i < this.t; ++i) r[i-n] = this[i];
      r.t = Math.max(this.t-n,0);
      r.s = this.s;
    }

    // (protected) r = this << n
    function bnpLShiftTo(n,r) {
      var bs = n%this.DB;
      var cbs = this.DB-bs;
      var bm = (1<<cbs)-1;
      var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
      for(i = this.t-1; i >= 0; --i) {
        r[i+ds+1] = (this[i]>>cbs)|c;
        c = (this[i]&bm)<<bs;
      }
      for(i = ds-1; i >= 0; --i) r[i] = 0;
      r[ds] = c;
      r.t = this.t+ds+1;
      r.s = this.s;
      r.clamp();
    }

    // (protected) r = this >> n
    function bnpRShiftTo(n,r) {
      r.s = this.s;
      var ds = Math.floor(n/this.DB);
      if(ds >= this.t) { r.t = 0; return; }
      var bs = n%this.DB;
      var cbs = this.DB-bs;
      var bm = (1<<bs)-1;
      r[0] = this[ds]>>bs;
      for(var i = ds+1; i < this.t; ++i) {
        r[i-ds-1] |= (this[i]&bm)<<cbs;
        r[i-ds] = this[i]>>bs;
      }
      if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
      r.t = this.t-ds;
      r.clamp();
    }

    // (protected) r = this - a
    function bnpSubTo(a,r) {
      var i = 0, c = 0, m = Math.min(a.t,this.t);
      while(i < m) {
        c += this[i]-a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      if(a.t < this.t) {
        c -= a.s;
        while(i < this.t) {
          c += this[i];
          r[i++] = c&this.DM;
          c >>= this.DB;
        }
        c += this.s;
      }
      else {
        c += this.s;
        while(i < a.t) {
          c -= a[i];
          r[i++] = c&this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = (c<0)?-1:0;
      if(c < -1) r[i++] = this.DV+c;
      else if(c > 0) r[i++] = c;
      r.t = i;
      r.clamp();
    }

    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.
    function bnpMultiplyTo(a,r) {
      var x = this.abs(), y = a.abs();
      var i = x.t;
      r.t = i+y.t;
      while(--i >= 0) r[i] = 0;
      for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
      r.s = 0;
      r.clamp();
      if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
    }

    // (protected) r = this^2, r != this (HAC 14.16)
    function bnpSquareTo(r) {
      var x = this.abs();
      var i = r.t = 2*x.t;
      while(--i >= 0) r[i] = 0;
      for(i = 0; i < x.t-1; ++i) {
        var c = x.am(i,x[i],r,2*i,0,1);
        if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
          r[i+x.t] -= x.DV;
          r[i+x.t+1] = 1;
        }
      }
      if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
      r.s = 0;
      r.clamp();
    }

    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.
    function bnpDivRemTo(m,q,r) {
      var pm = m.abs();
      if(pm.t <= 0) return;
      var pt = this.abs();
      if(pt.t < pm.t) {
        if(q != null) q.fromInt(0);
        if(r != null) this.copyTo(r);
        return;
      }
      if(r == null) r = nbi();
      var y = nbi(), ts = this.s, ms = m.s;
      var nsh = this.DB-nbits(pm[pm.t-1]);   // normalize modulus
      if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
      else { pm.copyTo(y); pt.copyTo(r); }
      var ys = y.t;
      var y0 = y[ys-1];
      if(y0 == 0) return;
      var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
      var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
      var i = r.t, j = i-ys, t = (q==null)?nbi():q;
      y.dlShiftTo(j,t);
      if(r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t,r);
      }
      BigInteger.ONE.dlShiftTo(ys,t);
      t.subTo(y,y);  // "negative" y so we can replace sub with am later
      while(y.t < ys) y[y.t++] = 0;
      while(--j >= 0) {
        // Estimate quotient digit
        var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
        if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {   // Try it out
          y.dlShiftTo(j,t);
          r.subTo(t,r);
          while(r[i] < --qd) r.subTo(t,r);
        }
      }
      if(q != null) {
        r.drShiftTo(ys,q);
        if(ts != ms) BigInteger.ZERO.subTo(q,q);
      }
      r.t = ys;
      r.clamp();
      if(nsh > 0) r.rShiftTo(nsh,r); // Denormalize remainder
      if(ts < 0) BigInteger.ZERO.subTo(r,r);
    }

    // (public) this mod a
    function bnMod(a) {
      var r = nbi();
      this.abs().divRemTo(a,null,r);
      if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
      return r;
    }

    // Modular reduction using "classic" algorithm
    function Classic(m) { this.m = m; }
    function cConvert(x) {
      if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
      else return x;
    }
    function cRevert(x) { return x; }
    function cReduce(x) { x.divRemTo(this.m,null,x); }
    function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
    function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;

    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.
    function bnpInvDigit() {
      if(this.t < 1) return 0;
      var x = this[0];
      if((x&1) == 0) return 0;
      var y = x&3;       // y == 1/x mod 2^2
      y = (y*(2-(x&0xf)*y))&0xf; // y == 1/x mod 2^4
      y = (y*(2-(x&0xff)*y))&0xff;   // y == 1/x mod 2^8
      y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;    // y == 1/x mod 2^16
      // last step - calculate inverse mod DV directly;
      // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
      y = (y*(2-x*y%this.DV))%this.DV;       // y == 1/x mod 2^dbits
      // we really want the negative inverse, and -DV < y < DV
      return (y>0)?this.DV-y:-y;
    }

    // Montgomery reduction
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp&0x7fff;
      this.mph = this.mp>>15;
      this.um = (1<<(m.DB-15))-1;
      this.mt2 = 2*m.t;
    }

    // xR mod m
    function montConvert(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t,r);
      r.divRemTo(this.m,null,r);
      if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
      return r;
    }

    // x/R mod m
    function montRevert(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }

    // x = x/R mod m (HAC 14.32)
    function montReduce(x) {
      while(x.t <= this.mt2) // pad x so am has enough room later
        x[x.t++] = 0;
      for(var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i]&0x7fff;
        var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i+this.m.t;
        x[j] += this.m.am(0,u0,x,i,0,this.m.t);
        // propagate carry
        while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
      }
      x.clamp();
      x.drShiftTo(this.m.t,x);
      if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
    }

    // r = "x^2/R mod m"; x != r
    function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

    // r = "xy/R mod m"; x,y != r
    function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;

    // (protected) true iff this is even
    function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
    function bnpExp(e,z) {
      if(e > 0xffffffff || e < 1) return BigInteger.ONE;
      var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
      g.copyTo(r);
      while(--i >= 0) {
        z.sqrTo(r,r2);
        if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
        else { var t = r; r = r2; r2 = t; }
      }
      return z.revert(r);
    }

    // (public) this^e % m, 0 <= e < 2^32
    function bnModPowInt(e,m) {
      var z;
      if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
      return this.exp(e,z);
    }

    // protected
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;

    // public
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;

    // "constants"
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);

    // Copyright (c) 2005-2009  Tom Wu
    // All Rights Reserved.
    // See "LICENSE" for details.

    // Extended JavaScript BN functions, required for RSA private ops.

    // Version 1.1: new BigInteger("0", 10) returns "proper" zero
    // Version 1.2: square() API, isProbablePrime fix

    // (public)
    function bnClone() { var r = nbi(); this.copyTo(r); return r; }

    // (public) return value as integer
    function bnIntValue() {
      if(this.s < 0) {
        if(this.t == 1) return this[0]-this.DV;
        else if(this.t == 0) return -1;
      }
      else if(this.t == 1) return this[0];
      else if(this.t == 0) return 0;
      // assumes 16 < DB < 32
      return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
    }

    // (public) return value as byte
    function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

    // (public) return value as short (assumes DB>=16)
    function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

    // (protected) return x s.t. r^x < DV
    function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

    // (public) 0 if this == 0, 1 if this > 0
    function bnSigNum() {
      if(this.s < 0) return -1;
      else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
      else return 1;
    }

    // (protected) convert to radix string
    function bnpToRadix(b) {
      if(b == null) b = 10;
      if(this.signum() == 0 || b < 2 || b > 36) return "0";
      var cs = this.chunkSize(b);
      var a = Math.pow(b,cs);
      var d = nbv(a), y = nbi(), z = nbi(), r = "";
      this.divRemTo(d,y,z);
      while(y.signum() > 0) {
        r = (a+z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d,y,z);
      }
      return z.intValue().toString(b) + r;
    }

    // (protected) convert from radix string
    function bnpFromRadix(s,b) {
      this.fromInt(0);
      if(b == null) b = 10;
      var cs = this.chunkSize(b);
      var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
      for(var i = 0; i < s.length; ++i) {
        var x = intAt(s,i);
        if(x < 0) {
          if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
          continue;
        }
        w = b*w+x;
        if(++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w,0);
          j = 0;
          w = 0;
        }
      }
      if(j > 0) {
        this.dMultiply(Math.pow(b,j));
        this.dAddOffset(w,0);
      }
      if(mi) BigInteger.ZERO.subTo(this,this);
    }

    // (protected) alternate constructor
    function bnpFromNumber(a,b,c) {
      if("number" == typeof b) {
        // new BigInteger(int,int,RNG)
        if(a < 2) this.fromInt(1);
        else {
          this.fromNumber(a,c);
          if(!this.testBit(a-1))	// force MSB set
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
          if(this.isEven()) this.dAddOffset(1,0); // force odd
          while(!this.isProbablePrime(b)) {
            this.dAddOffset(2,0);
            if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
          }
        }
      }
      else {
        // new BigInteger(int,RNG)
        var x = new Array(), t = a&7;
        x.length = (a>>3)+1;
        b.nextBytes(x);
        if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
        this.fromString(x,256);
      }
    }

    // (public) convert to bigendian byte array
    function bnToByteArray() {
      var i = this.t, r = new Array();
      r[0] = this.s;
      var p = this.DB-(i*this.DB)%8, d, k = 0;
      if(i-- > 0) {
        if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
          r[k++] = d|(this.s<<(this.DB-p));
        while(i >= 0) {
          if(p < 8) {
            d = (this[i]&((1<<p)-1))<<(8-p);
            d |= this[--i]>>(p+=this.DB-8);
          }
          else {
            d = (this[i]>>(p-=8))&0xff;
            if(p <= 0) { p += this.DB; --i; }
          }
          if((d&0x80) != 0) d |= -256;
          if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
          if(k > 0 || d != this.s) r[k++] = d;
        }
      }
      return r;
    }

    function bnEquals(a) { return(this.compareTo(a)==0); }
    function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
    function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

    // (protected) r = this op a (bitwise)
    function bnpBitwiseTo(a,op,r) {
      var i, f, m = Math.min(a.t,this.t);
      for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
      if(a.t < this.t) {
        f = a.s&this.DM;
        for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
        r.t = this.t;
      }
      else {
        f = this.s&this.DM;
        for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
        r.t = a.t;
      }
      r.s = op(this.s,a.s);
      r.clamp();
    }

    // (public) this & a
    function op_and(x,y) { return x&y; }
    function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

    // (public) this | a
    function op_or(x,y) { return x|y; }
    function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

    // (public) this ^ a
    function op_xor(x,y) { return x^y; }
    function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

    // (public) this & ~a
    function op_andnot(x,y) { return x&~y; }
    function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

    // (public) ~this
    function bnNot() {
      var r = nbi();
      for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
      r.t = this.t;
      r.s = ~this.s;
      return r;
    }

    // (public) this << n
    function bnShiftLeft(n) {
      var r = nbi();
      if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
      return r;
    }

    // (public) this >> n
    function bnShiftRight(n) {
      var r = nbi();
      if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
      return r;
    }

    // return index of lowest 1-bit in x, x < 2^31
    function lbit(x) {
      if(x == 0) return -1;
      var r = 0;
      if((x&0xffff) == 0) { x >>= 16; r += 16; }
      if((x&0xff) == 0) { x >>= 8; r += 8; }
      if((x&0xf) == 0) { x >>= 4; r += 4; }
      if((x&3) == 0) { x >>= 2; r += 2; }
      if((x&1) == 0) ++r;
      return r;
    }

    // (public) returns index of lowest 1-bit (or -1 if none)
    function bnGetLowestSetBit() {
      for(var i = 0; i < this.t; ++i)
        if(this[i] != 0) return i*this.DB+lbit(this[i]);
      if(this.s < 0) return this.t*this.DB;
      return -1;
    }

    // return number of 1 bits in x
    function cbit(x) {
      var r = 0;
      while(x != 0) { x &= x-1; ++r; }
      return r;
    }

    // (public) return number of set bits
    function bnBitCount() {
      var r = 0, x = this.s&this.DM;
      for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
      return r;
    }

    // (public) true iff nth bit is set
    function bnTestBit(n) {
      var j = Math.floor(n/this.DB);
      if(j >= this.t) return(this.s!=0);
      return((this[j]&(1<<(n%this.DB)))!=0);
    }

    // (protected) this op (1<<n)
    function bnpChangeBit(n,op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r,op,r);
      return r;
    }

    // (public) this | (1<<n)
    function bnSetBit(n) { return this.changeBit(n,op_or); }

    // (public) this & ~(1<<n)
    function bnClearBit(n) { return this.changeBit(n,op_andnot); }

    // (public) this ^ (1<<n)
    function bnFlipBit(n) { return this.changeBit(n,op_xor); }

    // (protected) r = this + a
    function bnpAddTo(a,r) {
      var i = 0, c = 0, m = Math.min(a.t,this.t);
      while(i < m) {
        c += this[i]+a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      if(a.t < this.t) {
        c += a.s;
        while(i < this.t) {
          c += this[i];
          r[i++] = c&this.DM;
          c >>= this.DB;
        }
        c += this.s;
      }
      else {
        c += this.s;
        while(i < a.t) {
          c += a[i];
          r[i++] = c&this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = (c<0)?-1:0;
      if(c > 0) r[i++] = c;
      else if(c < -1) r[i++] = this.DV+c;
      r.t = i;
      r.clamp();
    }

    // (public) this + a
    function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

    // (public) this - a
    function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

    // (public) this * a
    function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

    // (public) this^2
    function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

    // (public) this / a
    function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

    // (public) this % a
    function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

    // (public) [this/a,this%a]
    function bnDivideAndRemainder(a) {
      var q = nbi(), r = nbi();
      this.divRemTo(a,q,r);
      return new Array(q,r);
    }

    // (protected) this *= n, this >= 0, 1 < n < DV
    function bnpDMultiply(n) {
      this[this.t] = this.am(0,n-1,this,0,0,this.t);
      ++this.t;
      this.clamp();
    }

    // (protected) this += n << w words, this >= 0
    function bnpDAddOffset(n,w) {
      if(n == 0) return;
      while(this.t <= w) this[this.t++] = 0;
      this[w] += n;
      while(this[w] >= this.DV) {
        this[w] -= this.DV;
        if(++w >= this.t) this[this.t++] = 0;
        ++this[w];
      }
    }

    // A "null" reducer
    function NullExp() {}
    function nNop(x) { return x; }
    function nMulTo(x,y,r) { x.multiplyTo(y,r); }
    function nSqrTo(x,r) { x.squareTo(r); }

    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;

    // (public) this^e
    function bnPow(e) { return this.exp(e,new NullExp()); }

    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.
    function bnpMultiplyLowerTo(a,n,r) {
      var i = Math.min(this.t+a.t,n);
      r.s = 0; // assumes a,this >= 0
      r.t = i;
      while(i > 0) r[--i] = 0;
      var j;
      for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
      for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
      r.clamp();
    }

    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.
    function bnpMultiplyUpperTo(a,n,r) {
      --n;
      var i = r.t = this.t+a.t-n;
      r.s = 0; // assumes a,this >= 0
      while(--i >= 0) r[i] = 0;
      for(i = Math.max(n-this.t,0); i < a.t; ++i)
        r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
      r.clamp();
      r.drShiftTo(1,r);
    }

    // Barrett modular reduction
    function Barrett(m) {
      // setup Barrett
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
      this.mu = this.r2.divide(m);
      this.m = m;
    }

    function barrettConvert(x) {
      if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
      else if(x.compareTo(this.m) < 0) return x;
      else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
    }

    function barrettRevert(x) { return x; }

    // x = x mod m (HAC 14.42)
    function barrettReduce(x) {
      x.drShiftTo(this.m.t-1,this.r2);
      if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
      this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
      this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
      while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
      x.subTo(this.r2,x);
      while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
    }

    // r = x^2 mod m; x != r
    function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

    // r = x*y mod m; x,y != r
    function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;

    // (public) this^e % m (HAC 14.85)
    function bnModPow(e,m) {
      var i = e.bitLength(), k, r = nbv(1), z;
      if(i <= 0) return r;
      else if(i < 18) k = 1;
      else if(i < 48) k = 3;
      else if(i < 144) k = 4;
      else if(i < 768) k = 5;
      else k = 6;
      if(i < 8)
        z = new Classic(m);
      else if(m.isEven())
        z = new Barrett(m);
      else
        z = new Montgomery(m);

      // precomputation
      var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
      g[1] = z.convert(this);
      if(k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1],g2);
        while(n <= km) {
          g[n] = nbi();
          z.mulTo(g2,g[n-2],g[n]);
          n += 2;
        }
      }

      var j = e.t-1, w, is1 = true, r2 = nbi(), t;
      i = nbits(e[j])-1;
      while(j >= 0) {
        if(i >= k1) w = (e[j]>>(i-k1))&km;
        else {
          w = (e[j]&((1<<(i+1))-1))<<(k1-i);
          if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
        }

        n = k;
        while((w&1) == 0) { w >>= 1; --n; }
        if((i -= n) < 0) { i += this.DB; --j; }
        if(is1) {	// ret == 1, don't bother squaring or multiplying it
          g[w].copyTo(r);
          is1 = false;
        }
        else {
          while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
          if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
          z.mulTo(r2,g[w],r);
        }

        while(j >= 0 && (e[j]&(1<<i)) == 0) {
          z.sqrTo(r,r2); t = r; r = r2; r2 = t;
          if(--i < 0) { i = this.DB-1; --j; }
        }
      }
      return z.revert(r);
    }

    // (public) gcd(this,a) (HAC 14.54)
    function bnGCD(a) {
      var x = (this.s<0)?this.negate():this.clone();
      var y = (a.s<0)?a.negate():a.clone();
      if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
      var i = x.getLowestSetBit(), g = y.getLowestSetBit();
      if(g < 0) return x;
      if(i < g) g = i;
      if(g > 0) {
        x.rShiftTo(g,x);
        y.rShiftTo(g,y);
      }
      while(x.signum() > 0) {
        if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
        if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
        if(x.compareTo(y) >= 0) {
          x.subTo(y,x);
          x.rShiftTo(1,x);
        }
        else {
          y.subTo(x,y);
          y.rShiftTo(1,y);
        }
      }
      if(g > 0) y.lShiftTo(g,y);
      return y;
    }

    // (protected) this % n, n < 2^26
    function bnpModInt(n) {
      if(n <= 0) return 0;
      var d = this.DV%n, r = (this.s<0)?n-1:0;
      if(this.t > 0)
        if(d == 0) r = this[0]%n;
        else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
      return r;
    }

    // (public) 1/this % m (HAC 14.61)
    function bnModInverse(m) {
      var ac = m.isEven();
      if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
      var u = m.clone(), v = this.clone();
      var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
      while(u.signum() != 0) {
        while(u.isEven()) {
          u.rShiftTo(1,u);
          if(ac) {
            if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
            a.rShiftTo(1,a);
          }
          else if(!b.isEven()) b.subTo(m,b);
          b.rShiftTo(1,b);
        }
        while(v.isEven()) {
          v.rShiftTo(1,v);
          if(ac) {
            if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
            c.rShiftTo(1,c);
          }
          else if(!d.isEven()) d.subTo(m,d);
          d.rShiftTo(1,d);
        }
        if(u.compareTo(v) >= 0) {
          u.subTo(v,u);
          if(ac) a.subTo(c,a);
          b.subTo(d,b);
        }
        else {
          v.subTo(u,v);
          if(ac) c.subTo(a,c);
          d.subTo(b,d);
        }
      }
      if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
      if(d.compareTo(m) >= 0) return d.subtract(m);
      if(d.signum() < 0) d.addTo(m,d); else return d;
      if(d.signum() < 0) return d.add(m); else return d;
    }

    var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
    var lplim = (1<<26)/lowprimes[lowprimes.length-1];

    // (public) test primality with certainty >= 1-.5^t
    function bnIsProbablePrime(t) {
      var i, x = this.abs();
      if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
        for(i = 0; i < lowprimes.length; ++i)
          if(x[0] == lowprimes[i]) return true;
        return false;
      }
      if(x.isEven()) return false;
      i = 1;
      while(i < lowprimes.length) {
        var m = lowprimes[i], j = i+1;
        while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
        m = x.modInt(m);
        while(i < j) if(m%lowprimes[i++] == 0) return false;
      }
      return x.millerRabin(t);
    }

    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
    function bnpMillerRabin(t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if(k <= 0) return false;
      var r = n1.shiftRight(k);
      t = (t+1)>>1;
      if(t > lowprimes.length) t = lowprimes.length;
      var a = nbi();
      for(var i = 0; i < t; ++i) {
        //Pick bases at random, instead of starting at 2
        a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
        var y = a.modPow(r,this);
        if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while(j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2,this);
            if(y.compareTo(BigInteger.ONE) == 0) return false;
          }
          if(y.compareTo(n1) != 0) return false;
        }
      }
      return true;
    }

    // protected
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;

    // public
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

    // JSBN-specific extension
    BigInteger.prototype.square = bnSquare;

    // Expose the Barrett function
    BigInteger.prototype.Barrett = Barrett

    // BigInteger interfaces not implemented in jsbn:

    // BigInteger(int signum, byte[] magnitude)
    // double doubleValue()
    // float floatValue()
    // int hashCode()
    // long longValue()
    // static BigInteger valueOf(long val)

	// Random number generator - requires a PRNG backend, e.g. prng4.js

	// For best results, put code like
	// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
	// in your main HTML document.

	var rng_state;
	var rng_pool;
	var rng_pptr;

	// Mix in a 32-bit integer into the pool
	function rng_seed_int(x) {
	  rng_pool[rng_pptr++] ^= x & 255;
	  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
	  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
	}

	// Mix in the current time (w/milliseconds) into the pool
	function rng_seed_time() {
	  rng_seed_int(new Date().getTime());
	}

	// Initialize the pool with junk if needed.
	if(rng_pool == null) {
	  rng_pool = new Array();
	  rng_pptr = 0;
	  var t;
	  if(typeof window !== "undefined" && window.crypto) {
		if (window.crypto.getRandomValues) {
		  // Use webcrypto if available
		  var ua = new Uint8Array(32);
		  window.crypto.getRandomValues(ua);
		  for(t = 0; t < 32; ++t)
			rng_pool[rng_pptr++] = ua[t];
		}
		else if(navigator.appName == "Netscape" && navigator.appVersion < "5") {
		  // Extract entropy (256 bits) from NS4 RNG if available
		  var z = window.crypto.random(32);
		  for(t = 0; t < z.length; ++t)
			rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
		}
	  }
	  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
		t = Math.floor(65536 * Math.random());
		rng_pool[rng_pptr++] = t >>> 8;
		rng_pool[rng_pptr++] = t & 255;
	  }
	  rng_pptr = 0;
	  rng_seed_time();
	  //rng_seed_int(window.screenX);
	  //rng_seed_int(window.screenY);
	}

	function rng_get_byte() {
	  if(rng_state == null) {
		rng_seed_time();
		rng_state = prng_newstate();
		rng_state.init(rng_pool);
		for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
		  rng_pool[rng_pptr] = 0;
		rng_pptr = 0;
		//rng_pool = null;
	  }
	  // TODO: allow reseeding after first request
	  return rng_state.next();
	}

	function rng_get_bytes(ba) {
	  var i;
	  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
	}

	function SecureRandom() {}

	SecureRandom.prototype.nextBytes = rng_get_bytes;

	// prng4.js - uses Arcfour as a PRNG

	function Arcfour() {
	  this.i = 0;
	  this.j = 0;
	  this.S = new Array();
	}

	// Initialize arcfour context from key, an array of ints, each from [0..255]
	function ARC4init(key) {
	  var i, j, t;
	  for(i = 0; i < 256; ++i)
		this.S[i] = i;
	  j = 0;
	  for(i = 0; i < 256; ++i) {
		j = (j + this.S[i] + key[i % key.length]) & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	  }
	  this.i = 0;
	  this.j = 0;
	}

	function ARC4next() {
	  var t;
	  this.i = (this.i + 1) & 255;
	  this.j = (this.j + this.S[this.i]) & 255;
	  t = this.S[this.i];
	  this.S[this.i] = this.S[this.j];
	  this.S[this.j] = t;
	  return this.S[(t + this.S[this.i]) & 255];
	}

	Arcfour.prototype.init = ARC4init;
	Arcfour.prototype.next = ARC4next;

	// Plug in your RNG constructor here
	function prng_newstate() {
	  return new Arcfour();
	}

	// Pool size must be a multiple of 4 and greater than 32.
	// An array of bytes the size of the pool will be passed to init()
	var rng_psize = 256;

  BigInteger.SecureRandom = SecureRandom;
  BigInteger.BigInteger = BigInteger;
  if (true) {
    exports = module.exports = BigInteger;
  } else {
    this.BigInteger = BigInteger;
    this.SecureRandom = SecureRandom;
  }

}).call(this);


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* unused harmony export subscribers */
/* unused harmony export getCurrentUrl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return route; });
/* unused harmony export Router */
/* unused harmony export Route */
/* unused harmony export Link */


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if ( opts === void 0 ) opts=EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
		c = url.match(reg),
		matches = {},
		ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i=0; i<p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1=0; i$1<max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0)===':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
				flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
				plus = ~flags.indexOf('+'),
				star = ~flags.indexOf('*'),
				val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?')<0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		}
		else if (route[i$1]!==url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default!==true && ret===false) { return false; }
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
		bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) { return 1; }
	if (bAttr.default) { return -1; }
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || (aAttr.path.length - bAttr.path.length);
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_!=null || typeof Symbol!=='undefined' && node[Symbol.for('preactattr')]!=null;
}

function setUrl(url, type) {
	if ( type === void 0 ) type='push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history!=='undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}


function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location!=='undefined' ? location : EMPTY;
	}
	return ("" + (url.pathname || '') + (url.search || ''));
}



function route(url, replace) {
	if ( replace === void 0 ) replace=false;

	if (typeof url!=='string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}


/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i=ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) { return true; }
	}
	return false;
}


/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i=0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)===true) {
			didRoute = true;
		}
	}
	for (var i$1=subscribers.length; i$1--; ) {
		subscribers[i$1](url);
	}
	return didRoute;
}


function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) { return; }

	var href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) { return; }

	// attempt to route, if no match simply cede control to browser
	return route(href);
}


function handleLinkClick(e) {
	if (e.button==0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}


function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		e.preventDefault();
	}
	return false;
}


function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button!==0) { return; }

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase()==='A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) { return; }
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t=t.parentNode));
}


var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized){
		return;
	}

	if (typeof addEventListener==='function') {
		if (!customHistory) {
			addEventListener('popstate', function () { return routeTo(getCurrentUrl()); });
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}


var Router = (function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if ( Component$$1 ) Router.__proto__ = Component$$1;
	Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate (props) {
		if (props.static!==true) { return true; }
		return props.url!==this.props.url || props.onChange!==this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute (url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo (url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) { return this.canRoute(url); }

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount () {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount () {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo(("" + (location.pathname || '') + (location.search || '')));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount () {
		if (typeof this.unlisten==='function') { this.unlisten(); }
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate () {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate () {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren (children, url, invoke) {
		return children.slice().sort(pathRankSort).map( function (vnode) {
			var attrs = vnode.attributes || {},
				path = attrs.path,
				matches = exec(url, path, attrs);
			if (matches) {
				if (invoke!==false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render (ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url!==previous) {
			this.previousUrl = url;
			if (typeof onChange==='function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]));

var Link = function (props) { return (
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props))
); };

var Route = function (props) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props); };

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["b"] = (Router);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(20);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(20);
var formats = __webpack_require__(19);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    return keys.join(delimiter);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = __webpack_require__(11);

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(11);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(69);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDAyNWY3N2FlOTg3ZDUxNGMxZWQ4Iiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9oLmpzIiwid2VicGFjazovLy8uLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Nsb25lLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9saW5rZWQtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXItcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy92ZG9tL2Z1bmN0aW9uYWwtY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9zcmMvdmRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2RvbS9yZWN5Y2xlci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3Zkb20vZGlmZi5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3Zkb20vY29tcG9uZW50LXJlY3ljbGVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvdmRvbS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL2Fzc2VydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvd2luZG93LmpzIiwid2VicGFjazovLy8uL34vdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9yZXNwb25zZS1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci93YXJuLmpzIiwid2VicGFjazovLy8uL34vcXMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9saWIvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcmVxdWVzdC1idWlsZGVyLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdXBlcmFnZW50L2xpYi9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vL2pzL2xpYi9hY3Rpb25zLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2F1dGhlbnRpY2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9iYXNlNjRfdXJsLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC90cmFuc2FjdGlvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL34vYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3FzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3dpbmNoYW4vd2luY2hhbi5qcyIsIndlYnBhY2s6Ly8vanMvY29tcG9uZW50cy9BcHAuanN4Iiwid2VicGFjazovLy8uL2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vanMvY29tcG9uZW50cy9Mb2dpbi5qc3giLCJ3ZWJwYWNrOi8vL2pzL2NvbXBvbmVudHMvTWFpbi5qc3giLCJ3ZWJwYWNrOi8vL2pzL2NvbXBvbmVudHMvTmF2LmpzeCIsIndlYnBhY2s6Ly8vanMvY29tcG9uZW50cy9TZWFyY2guanN4Iiwid2VicGFjazovLy9qcy9jb21wb25lbnRzL1NlYXJjaFJlc3VsdHMuanN4Iiwid2VicGFjazovLy9qcy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvYXV0aGVudGljYXRpb24vZGItY29ubmVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9hdXRoZW50aWNhdGlvbi9wYXNzd29yZGxlc3MtYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL2lmcmFtZS1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9wYXJhbWV0ZXJzLXdoaXRlbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcG9wdXAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcmFuZG9tLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci9zdG9yYWdlL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvc3RvcmFnZS9kdW1teS5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvc3RvcmFnZS9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL34vYXV0aDAtanMvc3JjL2hlbHBlci91cmwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9hdXRoMC1qcy9zcmMvbWFuYWdlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC9wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC9yZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC9zaWxlbnQtYXV0aGVudGljYXRpb24taGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC91c2VybmFtZS1wYXNzd29yZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb21wb25lbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NyeXB0by1qcy9jb3JlLmpzIiwid2VicGFjazovLy8uL34vY3J5cHRvLWpzL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly8vLi9+L2lkdG9rZW4tdmVyaWZpZXIvc3JjL2hlbHBlcnMvZHVtbXktY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pZHRva2VuLXZlcmlmaWVyL3NyYy9oZWxwZXJzL2Vycm9yLmpzIiwid2VicGFjazovLy8uL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9qd2tzLmpzIiwid2VicGFjazovLy8uL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9yc2EtdmVyaWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pZHRva2VuLXZlcmlmaWVyL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pzYm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9xcy9saWIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL34vc3VwZXJhZ2VudC9saWIvaXMtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdXBlcmFnZW50L2xpYi9yZXF1ZXN0LWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzIiwid2VicGFjazovLy8uL34vc3VwZXJhZ2VudC9saWIvc2hvdWxkLXJldHJ5LmpzIiwid2VicGFjazovLy8uL34vc3VwZXJhZ2VudC9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwMjVmNzdhZTk4N2Q1MTRjMWVkOCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2Fzc2VydCcpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJy4vb2JqZWN0LWFzc2lnbicpO1xuXG5mdW5jdGlvbiBwaWNrKG9iamVjdCwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGtleSkge1xuICAgIGlmIChvYmplY3Rba2V5XSkge1xuICAgICAgcHJldltrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICAgIHJldHVybiBwcmV2O1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldEtleXNOb3RJbihvYmosIGFsbG93ZWRLZXlzKSB7XG4gIHZhciBub3RBbGxvd2VkID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoYWxsb3dlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgbm90QWxsb3dlZC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub3RBbGxvd2VkO1xufVxuXG5mdW5jdGlvbiBvYmplY3RWYWx1ZXMob2JqKSB7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBwYXJhbXMgPSBvYmplY3RWYWx1ZXMoYXJndW1lbnRzKTtcbiAgcGFyYW1zLnVuc2hpZnQoe30pO1xuICByZXR1cm4gb2JqZWN0QXNzaWduLmdldCgpLmFwcGx5KHVuZGVmaW5lZCwgcGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0LCBrZXlzKSB7XG4gIHJldHVybiB7XG4gICAgYmFzZToga2V5cyA/IHBpY2sob2JqZWN0LCBrZXlzKSA6IG9iamVjdCxcbiAgICB3aXRoOiBmdW5jdGlvbiAob2JqZWN0Miwga2V5czIpIHtcbiAgICAgIG9iamVjdDIgPSBrZXlzMiA/IHBpY2sob2JqZWN0Miwga2V5czIpIDogb2JqZWN0MjtcbiAgICAgIHJldHVybiBleHRlbmQodGhpcy5iYXNlLCBvYmplY3QyKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJsYWNrbGlzdChvYmplY3QsIGJsYWNrbGlzdGVkS2V5cykge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGtleSkge1xuICAgIGlmIChibGFja2xpc3RlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgcFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsVG9TbmFrZShzdHIpIHtcbiAgdmFyIG5ld0tleSA9ICcnO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY29kZTtcbiAgdmFyIHdhc1ByZXZOdW1iZXIgPSB0cnVlO1xuICB2YXIgd2FzUHJldlVwcGVyY2FzZSA9IHRydWU7XG5cbiAgd2hpbGUgKGluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4gICAgaWYgKCghd2FzUHJldlVwcGVyY2FzZSAmJiBjb2RlID49IDY1ICYmIGNvZGUgPD0gOTApIHx8ICghd2FzUHJldk51bWJlciAmJiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpKSB7XG4gICAgICBuZXdLZXkgKz0gJ18nO1xuICAgICAgbmV3S2V5ICs9IHN0cltpbmRleF0udG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3S2V5ICs9IHN0cltpbmRleF0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgd2FzUHJldk51bWJlciA9IChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpO1xuICAgIHdhc1ByZXZVcHBlcmNhc2UgPSAoY29kZSA+PSA2NSAmJiBjb2RlIDw9IDkwKTtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIG5ld0tleTtcbn1cblxuZnVuY3Rpb24gc25ha2VUb0NhbWVsKHN0cikge1xuICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJ18nKTtcbiAgcmV0dXJuIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwICsgYy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGMuc2xpY2UoMSk7XG4gIH0sIHBhcnRzLnNoaWZ0KCkpO1xufVxuXG5mdW5jdGlvbiB0b1NuYWtlQ2FzZShvYmplY3QsIGV4Y2VwdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnIHx8IGFzc2VydC5pc0FycmF5KG9iamVjdCkgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBleGNlcHRpb25zID0gZXhjZXB0aW9ucyB8fCBbXTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGtleSkge1xuICAgIHZhciBuZXdLZXkgPSBleGNlcHRpb25zLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBjYW1lbFRvU25ha2Uoa2V5KSA6IGtleTtcbiAgICBwW25ld0tleV0gPSB0b1NuYWtlQ2FzZShvYmplY3Rba2V5XSk7XG4gICAgcmV0dXJuIHA7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gdG9DYW1lbENhc2Uob2JqZWN0LCBleGNlcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCBhc3NlcnQuaXNBcnJheShvYmplY3QpIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICBleGNlcHRpb25zID0gZXhjZXB0aW9ucyB8fCBbXTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGtleSkge1xuICAgIHZhciBuZXdLZXkgPSBleGNlcHRpb25zLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBzbmFrZVRvQ2FtZWwoa2V5KSA6IGtleTtcbiAgICBwW25ld0tleV0gPSB0b0NhbWVsQ2FzZShvYmplY3Rba2V5XSk7XG4gICAgcmV0dXJuIHA7XG4gIH0sIHt9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRvU25ha2VDYXNlOiB0b1NuYWtlQ2FzZSxcbiAgdG9DYW1lbENhc2U6IHRvQ2FtZWxDYXNlLFxuICBibGFja2xpc3Q6IGJsYWNrbGlzdCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBwaWNrOiBwaWNrLFxuICBnZXRLZXlzTm90SW46IGdldEtleXNOb3RJbixcbiAgZXh0ZW5kOiBleHRlbmRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgVk5vZGUgfSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cblxuY29uc3Qgc3RhY2sgPSBbXTtcblxuY29uc3QgRU1QVFlfQ0hJTERSRU4gPSBbXTtcblxuLyoqIEpTWC9oeXBlcnNjcmlwdCByZXZpdmVyXG4qXHRCZW5jaG1hcmtzOiBodHRwczovL2VzYmVuY2guY29tL2JlbmNoLzU3ZWU4ZjhlMzMwYWIwOTkwMGExYTFhMFxuICpcdEBzZWUgaHR0cDovL2phc29uZm9ybWF0LmNvbS93dGYtaXMtanN4XG4gKlx0QHB1YmxpY1xuICogIEBleGFtcGxlXG4gKiAgLyoqIEBqc3ggaCAqXFwvXG4gKiAgaW1wb3J0IHsgcmVuZGVyLCBoIH0gZnJvbSAncHJlYWN0JztcbiAqICByZW5kZXIoPHNwYW4+Zm9vPC9zcGFuPiwgZG9jdW1lbnQuYm9keSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoKG5vZGVOYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdGxldCBjaGlsZHJlbiwgbGFzdFNpbXBsZSwgY2hpbGQsIHNpbXBsZSwgaTtcblx0Zm9yIChpPWFyZ3VtZW50cy5sZW5ndGg7IGktLSA+IDI7ICkge1xuXHRcdHN0YWNrLnB1c2goYXJndW1lbnRzW2ldKTtcblx0fVxuXHRpZiAoYXR0cmlidXRlcyAmJiBhdHRyaWJ1dGVzLmNoaWxkcmVuKSB7XG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHN0YWNrLnB1c2goYXR0cmlidXRlcy5jaGlsZHJlbik7XG5cdFx0ZGVsZXRlIGF0dHJpYnV0ZXMuY2hpbGRyZW47XG5cdH1cblx0d2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuXHRcdGlmICgoY2hpbGQgPSBzdGFjay5wb3AoKSkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpPWNoaWxkLmxlbmd0aDsgaS0tOyApIHN0YWNrLnB1c2goY2hpbGRbaV0pO1xuXHRcdH1cblx0XHRlbHNlIGlmIChjaGlsZCE9bnVsbCAmJiBjaGlsZCE9PXRydWUgJiYgY2hpbGQhPT1mYWxzZSkge1xuXHRcdFx0aWYgKHR5cGVvZiBjaGlsZD09J251bWJlcicpIGNoaWxkID0gU3RyaW5nKGNoaWxkKTtcblx0XHRcdHNpbXBsZSA9IHR5cGVvZiBjaGlsZD09J3N0cmluZyc7XG5cdFx0XHRpZiAoc2ltcGxlICYmIGxhc3RTaW1wbGUpIHtcblx0XHRcdFx0Y2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoLTFdICs9IGNoaWxkO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdChjaGlsZHJlbiB8fCAoY2hpbGRyZW4gPSBbXSkpLnB1c2goY2hpbGQpO1xuXHRcdFx0XHRsYXN0U2ltcGxlID0gc2ltcGxlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxldCBwID0gbmV3IFZOb2RlKG5vZGVOYW1lLCBhdHRyaWJ1dGVzIHx8IHVuZGVmaW5lZCwgY2hpbGRyZW4gfHwgRU1QVFlfQ0hJTERSRU4pO1xuXG5cdC8vIGlmIGEgXCJ2bm9kZSBob29rXCIgaXMgZGVmaW5lZCwgcGFzcyBldmVyeSBjcmVhdGVkIFZOb2RlIHRvIGl0XG5cdGlmIChvcHRpb25zLnZub2RlKSBvcHRpb25zLnZub2RlKHApO1xuXG5cdHJldHVybiBwO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9oLmpzIiwiLyoqIENvcHkgb3duLXByb3BlcnRpZXMgZnJvbSBgcHJvcHNgIG9udG8gYG9iamAuXG4gKlx0QHJldHVybnMgb2JqXG4gKlx0QHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XG5cdGlmIChwcm9wcykge1xuXHRcdGZvciAobGV0IGkgaW4gcHJvcHMpIG9ialtpXSA9IHByb3BzW2ldO1xuXHR9XG5cdHJldHVybiBvYmo7XG59XG5cblxuLyoqIEZhc3QgY2xvbmUuIE5vdGU6IGRvZXMgbm90IGZpbHRlciBvdXQgbm9uLW93biBwcm9wZXJ0aWVzLlxuICpcdEBzZWUgaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81NmJhYTM0ZjQ1ZGY2ODk1MDAyZTAzYjZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuXHRyZXR1cm4gZXh0ZW5kKHt9LCBvYmopO1xufVxuXG5cbi8qKiBHZXQgYSBkZWVwIHByb3BlcnR5IHZhbHVlIGZyb20gdGhlIGdpdmVuIG9iamVjdCwgZXhwcmVzc2VkIGluIGRvdC1ub3RhdGlvbi5cbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsdmUob2JqLCBrZXkpIHtcblx0Zm9yIChsZXQgcD1rZXkuc3BsaXQoJy4nKSwgaT0wOyBpPHAubGVuZ3RoICYmIG9iajsgaSsrKSB7XG5cdFx0b2JqID0gb2JqW3BbaV1dO1xuXHR9XG5cdHJldHVybiBvYmo7XG59XG5cblxuLyoqIEBwcml2YXRlIGlzIHRoZSBnaXZlbiBvYmplY3QgYSBGdW5jdGlvbj8gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuXHRyZXR1cm4gJ2Z1bmN0aW9uJz09PXR5cGVvZiBvYmo7XG59XG5cblxuLyoqIEBwcml2YXRlIGlzIHRoZSBnaXZlbiBvYmplY3QgYSBTdHJpbmc/ICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG5cdHJldHVybiAnc3RyaW5nJz09PXR5cGVvZiBvYmo7XG59XG5cblxuLyoqIENvbnZlcnQgYSBoYXNobWFwIG9mIENTUyBjbGFzc2VzIHRvIGEgc3BhY2UtZGVsaW1pdGVkIGNsYXNzTmFtZSBzdHJpbmdcbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaFRvQ2xhc3NOYW1lKGMpIHtcblx0bGV0IHN0ciA9ICcnO1xuXHRmb3IgKGxldCBwcm9wIGluIGMpIHtcblx0XHRpZiAoY1twcm9wXSkge1xuXHRcdFx0aWYgKHN0cikgc3RyICs9ICcgJztcblx0XHRcdHN0ciArPSBwcm9wO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RyO1xufVxuXG5cbi8qKiBKdXN0IGEgbWVtb2l6ZWQgU3RyaW5nI3RvTG93ZXJDYXNlICovXG5sZXQgbGNDYWNoZSA9IHt9O1xuZXhwb3J0IGNvbnN0IHRvTG93ZXJDYXNlID0gcyA9PiBsY0NhY2hlW3NdIHx8IChsY0NhY2hlW3NdID0gcy50b0xvd2VyQ2FzZSgpKTtcblxuXG4vKiogQ2FsbCBhIGZ1bmN0aW9uIGFzeW5jaHJvbm91c2x5LCBhcyBzb29uIGFzIHBvc3NpYmxlLlxuICpcdEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmxldCByZXNvbHZlZCA9IHR5cGVvZiBQcm9taXNlIT09J3VuZGVmaW5lZCcgJiYgUHJvbWlzZS5yZXNvbHZlKCk7XG5leHBvcnQgY29uc3QgZGVmZXIgPSByZXNvbHZlZCA/IChmID0+IHsgcmVzb2x2ZWQudGhlbihmKTsgfSkgOiBzZXRUaW1lb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy91dGlsLmpzIiwiaW1wb3J0IHsgY2xvbmUsIGV4dGVuZCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRWxlbWVudCh2bm9kZSwgcHJvcHMpIHtcblx0cmV0dXJuIGgoXG5cdFx0dm5vZGUubm9kZU5hbWUsXG5cdFx0ZXh0ZW5kKGNsb25lKHZub2RlLmF0dHJpYnV0ZXMpLCBwcm9wcyksXG5cdFx0YXJndW1lbnRzLmxlbmd0aD4yID8gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdm5vZGUuY2hpbGRyZW5cblx0KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY2xvbmUtZWxlbWVudC5qcyIsImltcG9ydCB7IGlzU3RyaW5nLCBkZWx2ZSB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKiBDcmVhdGUgYW4gRXZlbnQgaGFuZGxlciBmdW5jdGlvbiB0aGF0IHNldHMgYSBnaXZlbiBzdGF0ZSBwcm9wZXJ0eS5cbiAqXHRAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XHRUaGUgY29tcG9uZW50IHdob3NlIHN0YXRlIHNob3VsZCBiZSB1cGRhdGVkXG4gKlx0QHBhcmFtIHtzdHJpbmd9IGtleVx0XHRcdFx0QSBkb3Qtbm90YXRlZCBrZXkgcGF0aCB0byB1cGRhdGUgaW4gdGhlIGNvbXBvbmVudCdzIHN0YXRlXG4gKlx0QHBhcmFtIHtzdHJpbmd9IGV2ZW50UGF0aFx0XHRBIGRvdC1ub3RhdGVkIGtleSBwYXRoIHRvIHRoZSB2YWx1ZSB0aGF0IHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgRXZlbnQgb3IgY29tcG9uZW50XG4gKlx0QHJldHVybnMge2Z1bmN0aW9ufSBsaW5rZWRTdGF0ZUhhbmRsZXJcbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlua2VkU3RhdGUoY29tcG9uZW50LCBrZXksIGV2ZW50UGF0aCkge1xuXHRsZXQgcGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRyZXR1cm4gZnVuY3Rpb24oZSkge1xuXHRcdGxldCB0ID0gZSAmJiBlLnRhcmdldCB8fCB0aGlzLFxuXHRcdFx0c3RhdGUgPSB7fSxcblx0XHRcdG9iaiA9IHN0YXRlLFxuXHRcdFx0diA9IGlzU3RyaW5nKGV2ZW50UGF0aCkgPyBkZWx2ZShlLCBldmVudFBhdGgpIDogdC5ub2RlTmFtZSA/ICh0LnR5cGUubWF0Y2goL15jaGV8cmFkLykgPyB0LmNoZWNrZWQgOiB0LnZhbHVlKSA6IGUsXG5cdFx0XHRpID0gMDtcblx0XHRmb3IgKCA7IGk8cGF0aC5sZW5ndGgtMTsgaSsrKSB7XG5cdFx0XHRvYmogPSBvYmpbcGF0aFtpXV0gfHwgKG9ialtwYXRoW2ldXSA9ICFpICYmIGNvbXBvbmVudC5zdGF0ZVtwYXRoW2ldXSB8fCB7fSk7XG5cdFx0fVxuXHRcdG9ialtwYXRoW2ldXSA9IHY7XG5cdFx0Y29tcG9uZW50LnNldFN0YXRlKHN0YXRlKTtcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvbGlua2VkLXN0YXRlLmpzIiwiaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IGRlZmVyIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHJlbmRlckNvbXBvbmVudCB9IGZyb20gJy4vdmRvbS9jb21wb25lbnQnO1xuXG4vKiogTWFuYWdlZCBxdWV1ZSBvZiBkaXJ0eSBjb21wb25lbnRzIHRvIGJlIHJlLXJlbmRlcmVkICovXG5cbi8vIGl0ZW1zL2l0ZW1zT2ZmbGluZSBzd2FwIG9uIGVhY2ggcmVyZW5kZXIoKSBjYWxsIChqdXN0IGEgc2ltcGxlIHBvb2wgdGVjaG5pcXVlKVxubGV0IGl0ZW1zID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCkge1xuXHRpZiAoIWNvbXBvbmVudC5fZGlydHkgJiYgKGNvbXBvbmVudC5fZGlydHkgPSB0cnVlKSAmJiBpdGVtcy5wdXNoKGNvbXBvbmVudCk9PTEpIHtcblx0XHQob3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZyB8fCBkZWZlcikocmVyZW5kZXIpO1xuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcmVuZGVyKCkge1xuXHRsZXQgcCwgbGlzdCA9IGl0ZW1zO1xuXHRpdGVtcyA9IFtdO1xuXHR3aGlsZSAoIChwID0gbGlzdC5wb3AoKSkgKSB7XG5cdFx0aWYgKHAuX2RpcnR5KSByZW5kZXJDb21wb25lbnQocCk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvcmVuZGVyLXF1ZXVlLmpzIiwiaW1wb3J0IHsgRU1QVFkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0Tm9kZVByb3BzIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbCc7XG5cblxuLyoqIENoZWNrIGlmIGEgVk5vZGUgaXMgYSByZWZlcmVuY2UgdG8gYSBzdGF0ZWxlc3MgZnVuY3Rpb25hbCBjb21wb25lbnQuXG4gKlx0QSBmdW5jdGlvbiBjb21wb25lbnQgaXMgcmVwcmVzZW50ZWQgYXMgYSBWTm9kZSB3aG9zZSBgbm9kZU5hbWVgIHByb3BlcnR5IGlzIGEgcmVmZXJlbmNlIHRvIGEgZnVuY3Rpb24uXG4gKlx0SWYgdGhhdCBmdW5jdGlvbiBpcyBub3QgYSBDb21wb25lbnQgKGllLCBoYXMgbm8gYC5yZW5kZXIoKWAgbWV0aG9kIG9uIGEgcHJvdG90eXBlKSwgaXQgaXMgY29uc2lkZXJlZCBhIHN0YXRlbGVzcyBmdW5jdGlvbmFsIGNvbXBvbmVudC5cbiAqXHRAcGFyYW0ge1ZOb2RlfSB2bm9kZVx0QSBWTm9kZVxuICpcdEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uYWxDb21wb25lbnQodm5vZGUpIHtcblx0bGV0IG5vZGVOYW1lID0gdm5vZGUgJiYgdm5vZGUubm9kZU5hbWU7XG5cdHJldHVybiBub2RlTmFtZSAmJiBpc0Z1bmN0aW9uKG5vZGVOYW1lKSAmJiAhKG5vZGVOYW1lLnByb3RvdHlwZSAmJiBub2RlTmFtZS5wcm90b3R5cGUucmVuZGVyKTtcbn1cblxuXG5cbi8qKiBDb25zdHJ1Y3QgYSByZXN1bHRhbnQgVk5vZGUgZnJvbSBhIFZOb2RlIHJlZmVyZW5jaW5nIGEgc3RhdGVsZXNzIGZ1bmN0aW9uYWwgY29tcG9uZW50LlxuICpcdEBwYXJhbSB7Vk5vZGV9IHZub2RlXHRBIFZOb2RlIHdpdGggYSBgbm9kZU5hbWVgIHByb3BlcnR5IHRoYXQgaXMgYSByZWZlcmVuY2UgdG8gYSBmdW5jdGlvbi5cbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRGdW5jdGlvbmFsQ29tcG9uZW50KHZub2RlLCBjb250ZXh0KSB7XG5cdHJldHVybiB2bm9kZS5ub2RlTmFtZShnZXROb2RlUHJvcHModm5vZGUpLCBjb250ZXh0IHx8IEVNUFRZKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvdmRvbS9mdW5jdGlvbmFsLWNvbXBvbmVudC5qcyIsImltcG9ydCB7IGNsb25lLCBpc1N0cmluZywgaXNGdW5jdGlvbiwgdG9Mb3dlckNhc2UgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IGlzRnVuY3Rpb25hbENvbXBvbmVudCB9IGZyb20gJy4vZnVuY3Rpb25hbC1jb21wb25lbnQnO1xuXG5cbi8qKiBDaGVjayBpZiB0d28gbm9kZXMgYXJlIGVxdWl2YWxlbnQuXG4gKlx0QHBhcmFtIHtFbGVtZW50fSBub2RlXG4gKlx0QHBhcmFtIHtWTm9kZX0gdm5vZGVcbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTm9kZVR5cGUobm9kZSwgdm5vZGUpIHtcblx0aWYgKGlzU3RyaW5nKHZub2RlKSkge1xuXHRcdHJldHVybiBub2RlIGluc3RhbmNlb2YgVGV4dDtcblx0fVxuXHRpZiAoaXNTdHJpbmcodm5vZGUubm9kZU5hbWUpKSB7XG5cdFx0cmV0dXJuICFub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciAmJiBpc05hbWVkTm9kZShub2RlLCB2bm9kZS5ub2RlTmFtZSk7XG5cdH1cblx0aWYgKGlzRnVuY3Rpb24odm5vZGUubm9kZU5hbWUpKSB7XG5cdFx0cmV0dXJuIChub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciA/IG5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yPT09dm5vZGUubm9kZU5hbWUgOiB0cnVlKSB8fCBpc0Z1bmN0aW9uYWxDb21wb25lbnQodm5vZGUpO1xuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmFtZWROb2RlKG5vZGUsIG5vZGVOYW1lKSB7XG5cdHJldHVybiBub2RlLm5vcm1hbGl6ZWROb2RlTmFtZT09PW5vZGVOYW1lIHx8IHRvTG93ZXJDYXNlKG5vZGUubm9kZU5hbWUpPT09dG9Mb3dlckNhc2Uobm9kZU5hbWUpO1xufVxuXG5cbi8qKlxuICogUmVjb25zdHJ1Y3QgQ29tcG9uZW50LXN0eWxlIGBwcm9wc2AgZnJvbSBhIFZOb2RlLlxuICogRW5zdXJlcyBkZWZhdWx0L2ZhbGxiYWNrIHZhbHVlcyBmcm9tIGBkZWZhdWx0UHJvcHNgOlxuICogT3duLXByb3BlcnRpZXMgb2YgYGRlZmF1bHRQcm9wc2Agbm90IHByZXNlbnQgaW4gYHZub2RlLmF0dHJpYnV0ZXNgIGFyZSBhZGRlZC5cbiAqIEBwYXJhbSB7Vk5vZGV9IHZub2RlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwcm9wc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVByb3BzKHZub2RlKSB7XG5cdGxldCBwcm9wcyA9IGNsb25lKHZub2RlLmF0dHJpYnV0ZXMpO1xuXHRwcm9wcy5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuXG5cdGxldCBkZWZhdWx0UHJvcHMgPSB2bm9kZS5ub2RlTmFtZS5kZWZhdWx0UHJvcHM7XG5cdGlmIChkZWZhdWx0UHJvcHMpIHtcblx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRQcm9wcykge1xuXHRcdFx0aWYgKHByb3BzW2ldPT09dW5kZWZpbmVkKSB7XG5cdFx0XHRcdHByb3BzW2ldID0gZGVmYXVsdFByb3BzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBwcm9wcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvdmRvbS9pbmRleC5qcyIsImltcG9ydCB7IE5PTl9ESU1FTlNJT05fUFJPUFMsIE5PTl9CVUJCTElOR19FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgeyB0b0xvd2VyQ2FzZSwgaXNTdHJpbmcsIGlzRnVuY3Rpb24sIGhhc2hUb0NsYXNzTmFtZSB9IGZyb20gJy4uL3V0aWwnO1xuXG5cblxuXG4vKiogUmVtb3ZlcyBhIGdpdmVuIERPTSBOb2RlIGZyb20gaXRzIHBhcmVudC4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcblx0bGV0IHAgPSBub2RlLnBhcmVudE5vZGU7XG5cdGlmIChwKSBwLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuXG5cbi8qKiBTZXQgYSBuYW1lZCBhdHRyaWJ1dGUgb24gdGhlIGdpdmVuIE5vZGUsIHdpdGggc3BlY2lhbCBiZWhhdmlvciBmb3Igc29tZSBuYW1lcyBhbmQgZXZlbnQgaGFuZGxlcnMuXG4gKlx0SWYgYHZhbHVlYCBpcyBgbnVsbGAsIHRoZSBhdHRyaWJ1dGUvaGFuZGxlciB3aWxsIGJlIHJlbW92ZWQuXG4gKlx0QHBhcmFtIHtFbGVtZW50fSBub2RlXHRBbiBlbGVtZW50IHRvIG11dGF0ZVxuICpcdEBwYXJhbSB7c3RyaW5nfSBuYW1lXHRUaGUgbmFtZS9rZXkgdG8gc2V0LCBzdWNoIGFzIGFuIGV2ZW50IG9yIGF0dHJpYnV0ZSBuYW1lXG4gKlx0QHBhcmFtIHthbnl9IG9sZFx0VGhlIGxhc3QgdmFsdWUgdGhhdCB3YXMgc2V0IGZvciB0aGlzIG5hbWUvbm9kZSBwYWlyXG4gKlx0QHBhcmFtIHthbnl9IHZhbHVlXHRBbiBhdHRyaWJ1dGUgdmFsdWUsIHN1Y2ggYXMgYSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGFuIGV2ZW50IGhhbmRsZXJcbiAqXHRAcGFyYW0ge0Jvb2xlYW59IGlzU3ZnXHRBcmUgd2UgY3VycmVudGx5IGRpZmZpbmcgaW5zaWRlIGFuIHN2Zz9cbiAqXHRAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QWNjZXNzb3Iobm9kZSwgbmFtZSwgb2xkLCB2YWx1ZSwgaXNTdmcpIHtcblxuXHRpZiAobmFtZT09PSdjbGFzc05hbWUnKSBuYW1lID0gJ2NsYXNzJztcblxuXHRpZiAobmFtZT09PSdjbGFzcycgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlPT09J29iamVjdCcpIHtcblx0XHR2YWx1ZSA9IGhhc2hUb0NsYXNzTmFtZSh2YWx1ZSk7XG5cdH1cblxuXHRpZiAobmFtZT09PSdrZXknKSB7XG5cdFx0Ly8gaWdub3JlXG5cdH1cblx0ZWxzZSBpZiAobmFtZT09PSdjbGFzcycgJiYgIWlzU3ZnKSB7XG5cdFx0bm9kZS5jbGFzc05hbWUgPSB2YWx1ZSB8fCAnJztcblx0fVxuXHRlbHNlIGlmIChuYW1lPT09J3N0eWxlJykge1xuXHRcdGlmICghdmFsdWUgfHwgaXNTdHJpbmcodmFsdWUpIHx8IGlzU3RyaW5nKG9sZCkpIHtcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlIHx8ICcnO1xuXHRcdH1cblx0XHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlPT09J29iamVjdCcpIHtcblx0XHRcdGlmICghaXNTdHJpbmcob2xkKSkge1xuXHRcdFx0XHRmb3IgKGxldCBpIGluIG9sZCkgaWYgKCEoaSBpbiB2YWx1ZSkpIG5vZGUuc3R5bGVbaV0gPSAnJztcblx0XHRcdH1cblx0XHRcdGZvciAobGV0IGkgaW4gdmFsdWUpIHtcblx0XHRcdFx0bm9kZS5zdHlsZVtpXSA9IHR5cGVvZiB2YWx1ZVtpXT09PSdudW1iZXInICYmICFOT05fRElNRU5TSU9OX1BST1BTW2ldID8gKHZhbHVlW2ldKydweCcpIDogdmFsdWVbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKG5hbWU9PT0nZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSB7XG5cdFx0aWYgKHZhbHVlKSBub2RlLmlubmVySFRNTCA9IHZhbHVlLl9faHRtbCB8fCAnJztcblx0fVxuXHRlbHNlIGlmIChuYW1lWzBdPT0nbycgJiYgbmFtZVsxXT09J24nKSB7XG5cdFx0bGV0IGwgPSBub2RlLl9saXN0ZW5lcnMgfHwgKG5vZGUuX2xpc3RlbmVycyA9IHt9KTtcblx0XHRuYW1lID0gdG9Mb3dlckNhc2UobmFtZS5zdWJzdHJpbmcoMikpO1xuXHRcdC8vIEBUT0RPOiB0aGlzIG1pZ2h0IGJlIHdvcnRoIGl0IGxhdGVyLCB1bi1icmVha3MgZm9jdXMvYmx1ciBidWJibGluZyBpbiBJRTk6XG5cdFx0Ly8gaWYgKG5vZGUuYXR0YWNoRXZlbnQpIG5hbWUgPSBuYW1lPT0nZm9jdXMnPydmb2N1c2luJzpuYW1lPT0nYmx1cic/J2ZvY3Vzb3V0JzpuYW1lO1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKCFsW25hbWVdKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgISFOT05fQlVCQkxJTkdfRVZFTlRTW25hbWVdKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAobFtuYW1lXSkge1xuXHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50UHJveHksICEhTk9OX0JVQkJMSU5HX0VWRU5UU1tuYW1lXSk7XG5cdFx0fVxuXHRcdGxbbmFtZV0gPSB2YWx1ZTtcblx0fVxuXHRlbHNlIGlmIChuYW1lIT09J2xpc3QnICYmIG5hbWUhPT0ndHlwZScgJiYgIWlzU3ZnICYmIG5hbWUgaW4gbm9kZSkge1xuXHRcdHNldFByb3BlcnR5KG5vZGUsIG5hbWUsIHZhbHVlPT1udWxsID8gJycgOiB2YWx1ZSk7XG5cdFx0aWYgKHZhbHVlPT1udWxsIHx8IHZhbHVlPT09ZmFsc2UpIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxldCBucyA9IGlzU3ZnICYmIG5hbWUubWF0Y2goL154bGlua1xcOj8oLispLyk7XG5cdFx0aWYgKHZhbHVlPT1udWxsIHx8IHZhbHVlPT09ZmFsc2UpIHtcblx0XHRcdGlmIChucykgbm9kZS5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIHRvTG93ZXJDYXNlKG5zWzFdKSk7XG5cdFx0XHRlbHNlIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyAmJiAhaXNGdW5jdGlvbih2YWx1ZSkpIHtcblx0XHRcdGlmIChucykgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIHRvTG93ZXJDYXNlKG5zWzFdKSwgdmFsdWUpO1xuXHRcdFx0ZWxzZSBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG5cblxuLyoqIEF0dGVtcHQgdG8gc2V0IGEgRE9NIHByb3BlcnR5IHRvIHRoZSBnaXZlbiB2YWx1ZS5cbiAqXHRJRSAmIEZGIHRocm93IGZvciBjZXJ0YWluIHByb3BlcnR5LXZhbHVlIGNvbWJpbmF0aW9ucy5cbiAqL1xuZnVuY3Rpb24gc2V0UHJvcGVydHkobm9kZSwgbmFtZSwgdmFsdWUpIHtcblx0dHJ5IHtcblx0XHRub2RlW25hbWVdID0gdmFsdWU7XG5cdH0gY2F0Y2ggKGUpIHsgfVxufVxuXG5cbi8qKiBQcm94eSBhbiBldmVudCB0byBob29rZWQgZXZlbnQgaGFuZGxlcnNcbiAqXHRAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBldmVudFByb3h5KGUpIHtcblx0cmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tlLnR5cGVdKG9wdGlvbnMuZXZlbnQgJiYgb3B0aW9ucy5ldmVudChlKSB8fCBlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvZG9tL2luZGV4LmpzIiwiaW1wb3J0IHsgdG9Mb3dlckNhc2UgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IHJlbW92ZU5vZGUgfSBmcm9tICcuL2luZGV4JztcblxuLyoqIERPTSBub2RlIHBvb2wsIGtleWVkIG9uIG5vZGVOYW1lLiAqL1xuXG5jb25zdCBub2RlcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdE5vZGUobm9kZSkge1xuXHRyZW1vdmVOb2RlKG5vZGUpO1xuXG5cdGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuXHRcdG5vZGUuX2NvbXBvbmVudCA9IG5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gbnVsbDtcblxuXHRcdGxldCBuYW1lID0gbm9kZS5ub3JtYWxpemVkTm9kZU5hbWUgfHwgdG9Mb3dlckNhc2Uobm9kZS5ub2RlTmFtZSk7XG5cdFx0KG5vZGVzW25hbWVdIHx8IChub2Rlc1tuYW1lXSA9IFtdKSkucHVzaChub2RlKTtcblx0fVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlKG5vZGVOYW1lLCBpc1N2Zykge1xuXHRsZXQgbmFtZSA9IHRvTG93ZXJDYXNlKG5vZGVOYW1lKSxcblx0XHRub2RlID0gbm9kZXNbbmFtZV0gJiYgbm9kZXNbbmFtZV0ucG9wKCkgfHwgKGlzU3ZnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5vZGVOYW1lKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpKTtcblx0bm9kZS5ub3JtYWxpemVkTm9kZU5hbWUgPSBuYW1lO1xuXHRyZXR1cm4gbm9kZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvZG9tL3JlY3ljbGVyLmpzIiwiaW1wb3J0IHsgQVRUUl9LRVkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaXNTdHJpbmcsIGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IGlzU2FtZU5vZGVUeXBlLCBpc05hbWVkTm9kZSB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbmFsQ29tcG9uZW50LCBidWlsZEZ1bmN0aW9uYWxDb21wb25lbnQgfSBmcm9tICcuL2Z1bmN0aW9uYWwtY29tcG9uZW50JztcbmltcG9ydCB7IGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgc2V0QWNjZXNzb3IsIHJlbW92ZU5vZGUgfSBmcm9tICcuLi9kb20vaW5kZXgnO1xuaW1wb3J0IHsgY3JlYXRlTm9kZSwgY29sbGVjdE5vZGUgfSBmcm9tICcuLi9kb20vcmVjeWNsZXInO1xuaW1wb3J0IHsgdW5tb3VudENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5cbi8qKiBRdWV1ZSBvZiBjb21wb25lbnRzIHRoYXQgaGF2ZSBiZWVuIG1vdW50ZWQgYW5kIGFyZSBhd2FpdGluZyBjb21wb25lbnREaWRNb3VudCAqL1xuZXhwb3J0IGNvbnN0IG1vdW50cyA9IFtdO1xuXG4vKiogRGlmZiByZWN1cnNpb24gY291bnQsIHVzZWQgdG8gdHJhY2sgdGhlIGVuZCBvZiB0aGUgZGlmZiBjeWNsZS4gKi9cbmV4cG9ydCBsZXQgZGlmZkxldmVsID0gMDtcblxuLyoqIEdsb2JhbCBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGRpZmYgaXMgY3VycmVudGx5IHdpdGhpbiBhbiBTVkcgKi9cbmxldCBpc1N2Z01vZGUgPSBmYWxzZTtcblxuLyoqIEdsb2JhbCBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGRpZmYgaXMgcGVyZm9ybWluZyBoeWRyYXRpb24gKi9cbmxldCBoeWRyYXRpbmcgPSBmYWxzZTtcblxuLyoqIEludm9rZSBxdWV1ZWQgY29tcG9uZW50RGlkTW91bnQgbGlmZWN5Y2xlIG1ldGhvZHMgKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaE1vdW50cygpIHtcblx0bGV0IGM7XG5cdHdoaWxlICgoYz1tb3VudHMucG9wKCkpKSB7XG5cdFx0aWYgKG9wdGlvbnMuYWZ0ZXJNb3VudCkgb3B0aW9ucy5hZnRlck1vdW50KGMpO1xuXHRcdGlmIChjLmNvbXBvbmVudERpZE1vdW50KSBjLmNvbXBvbmVudERpZE1vdW50KCk7XG5cdH1cbn1cblxuXG4vKiogQXBwbHkgZGlmZmVyZW5jZXMgaW4gYSBnaXZlbiB2bm9kZSAoYW5kIGl0J3MgZGVlcCBjaGlsZHJlbikgdG8gYSByZWFsIERPTSBOb2RlLlxuICpcdEBwYXJhbSB7RWxlbWVudH0gW2RvbT1udWxsXVx0XHRBIERPTSBub2RlIHRvIG11dGF0ZSBpbnRvIHRoZSBzaGFwZSBvZiB0aGUgYHZub2RlYFxuICpcdEBwYXJhbSB7Vk5vZGV9IHZub2RlXHRcdFx0QSBWTm9kZSAod2l0aCBkZXNjZW5kYW50cyBmb3JtaW5nIGEgdHJlZSkgcmVwcmVzZW50aW5nIHRoZSBkZXNpcmVkIERPTSBzdHJ1Y3R1cmVcbiAqXHRAcmV0dXJucyB7RWxlbWVudH0gZG9tXHRcdFx0VGhlIGNyZWF0ZWQvbXV0YXRlZCBlbGVtZW50XG4gKlx0QHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIHBhcmVudCwgY29tcG9uZW50Um9vdCkge1xuXHQvLyBkaWZmTGV2ZWwgaGF2aW5nIGJlZW4gMCBoZXJlIGluZGljYXRlcyBpbml0aWFsIGVudHJ5IGludG8gdGhlIGRpZmYgKG5vdCBhIHN1YmRpZmYpXG5cdGlmICghZGlmZkxldmVsKyspIHtcblx0XHQvLyB3aGVuIGZpcnN0IHN0YXJ0aW5nIHRoZSBkaWZmLCBjaGVjayBpZiB3ZSdyZSBkaWZmaW5nIGFuIFNWRyBvciB3aXRoaW4gYW4gU1ZHXG5cdFx0aXNTdmdNb2RlID0gcGFyZW50ICYmIHR5cGVvZiBwYXJlbnQub3duZXJTVkdFbGVtZW50IT09J3VuZGVmaW5lZCc7XG5cblx0XHQvLyBoeWRyYXRpb24gaXMgaW5pZGljYXRlZCBieSB0aGUgZXhpc3RpbmcgZWxlbWVudCB0byBiZSBkaWZmZWQgbm90IGhhdmluZyBhIHByb3AgY2FjaGVcblx0XHRoeWRyYXRpbmcgPSBkb20gJiYgIShBVFRSX0tFWSBpbiBkb20pO1xuXHR9XG5cblx0bGV0IHJldCA9IGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKTtcblxuXHQvLyBhcHBlbmQgdGhlIGVsZW1lbnQgaWYgaXRzIGEgbmV3IHBhcmVudFxuXHRpZiAocGFyZW50ICYmIHJldC5wYXJlbnROb2RlIT09cGFyZW50KSBwYXJlbnQuYXBwZW5kQ2hpbGQocmV0KTtcblxuXHQvLyBkaWZmTGV2ZWwgYmVpbmcgcmVkdWNlZCB0byAwIG1lYW5zIHdlJ3JlIGV4aXRpbmcgdGhlIGRpZmZcblx0aWYgKCEtLWRpZmZMZXZlbCkge1xuXHRcdGh5ZHJhdGluZyA9IGZhbHNlO1xuXHRcdC8vIGludm9rZSBxdWV1ZWQgY29tcG9uZW50RGlkTW91bnQgbGlmZWN5Y2xlIG1ldGhvZHNcblx0XHRpZiAoIWNvbXBvbmVudFJvb3QpIGZsdXNoTW91bnRzKCk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5cbmZ1bmN0aW9uIGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG5cdGxldCByZWYgPSB2bm9kZSAmJiB2bm9kZS5hdHRyaWJ1dGVzICYmIHZub2RlLmF0dHJpYnV0ZXMucmVmO1xuXG5cblx0Ly8gUmVzb2x2ZSBlcGhlbWVyYWwgUHVyZSBGdW5jdGlvbmFsIENvbXBvbmVudHNcblx0d2hpbGUgKGlzRnVuY3Rpb25hbENvbXBvbmVudCh2bm9kZSkpIHtcblx0XHR2bm9kZSA9IGJ1aWxkRnVuY3Rpb25hbENvbXBvbmVudCh2bm9kZSwgY29udGV4dCk7XG5cdH1cblxuXG5cdC8vIGVtcHR5IHZhbHVlcyAobnVsbCAmIHVuZGVmaW5lZCkgcmVuZGVyIGFzIGVtcHR5IFRleHQgbm9kZXNcblx0aWYgKHZub2RlPT1udWxsKSB2bm9kZSA9ICcnO1xuXG5cblx0Ly8gRmFzdCBjYXNlOiBTdHJpbmdzIGNyZWF0ZS91cGRhdGUgVGV4dCBub2Rlcy5cblx0aWYgKGlzU3RyaW5nKHZub2RlKSkge1xuXHRcdC8vIHVwZGF0ZSBpZiBpdCdzIGFscmVhZHkgYSBUZXh0IG5vZGVcblx0XHRpZiAoZG9tICYmIGRvbSBpbnN0YW5jZW9mIFRleHQgJiYgZG9tLnBhcmVudE5vZGUpIHtcblx0XHRcdGlmIChkb20ubm9kZVZhbHVlIT12bm9kZSkge1xuXHRcdFx0XHRkb20ubm9kZVZhbHVlID0gdm5vZGU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Ly8gaXQgd2Fzbid0IGEgVGV4dCBub2RlOiByZXBsYWNlIGl0IHdpdGggb25lIGFuZCByZWN5Y2xlIHRoZSBvbGQgRWxlbWVudFxuXHRcdFx0aWYgKGRvbSkgcmVjb2xsZWN0Tm9kZVRyZWUoZG9tKTtcblx0XHRcdGRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZub2RlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZG9tO1xuXHR9XG5cblxuXHQvLyBJZiB0aGUgVk5vZGUgcmVwcmVzZW50cyBhIENvbXBvbmVudCwgcGVyZm9ybSBhIGNvbXBvbmVudCBkaWZmLlxuXHRpZiAoaXNGdW5jdGlvbih2bm9kZS5ub2RlTmFtZSkpIHtcblx0XHRyZXR1cm4gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpO1xuXHR9XG5cblxuXHRsZXQgb3V0ID0gZG9tLFxuXHRcdG5vZGVOYW1lID0gU3RyaW5nKHZub2RlLm5vZGVOYW1lKSxcdC8vIEBUT0RPIHRoaXMgbWFza3MgdW5kZWZpbmVkIGNvbXBvbmVudCBlcnJvcnMgYXMgYDx1bmRlZmluZWQ+YFxuXHRcdHByZXZTdmdNb2RlID0gaXNTdmdNb2RlLFxuXHRcdHZjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuXG5cblx0Ly8gU1ZHcyBoYXZlIHNwZWNpYWwgbmFtZXNwYWNlIHN0dWZmLlxuXHQvLyBUaGlzIHRyYWNrcyBlbnRlcmluZyBhbmQgZXhpdGluZyB0aGF0IG5hbWVzcGFjZSB3aGVuIGRlc2NlbmRpbmcgdGhyb3VnaCB0aGUgdHJlZS5cblx0aXNTdmdNb2RlID0gbm9kZU5hbWU9PT0nc3ZnJyA/IHRydWUgOiBub2RlTmFtZT09PSdmb3JlaWduT2JqZWN0JyA/IGZhbHNlIDogaXNTdmdNb2RlO1xuXG5cblx0aWYgKCFkb20pIHtcblx0XHQvLyBjYXNlOiB3ZSBoYWQgbm8gZWxlbWVudCB0byBiZWdpbiB3aXRoXG5cdFx0Ly8gLSBjcmVhdGUgYW4gZWxlbWVudCB3aXRoIHRoZSBub2RlTmFtZSBmcm9tIFZOb2RlXG5cdFx0b3V0ID0gY3JlYXRlTm9kZShub2RlTmFtZSwgaXNTdmdNb2RlKTtcblx0fVxuXHRlbHNlIGlmICghaXNOYW1lZE5vZGUoZG9tLCBub2RlTmFtZSkpIHtcblx0XHQvLyBjYXNlOiBFbGVtZW50IGFuZCBWTm9kZSBoYWQgZGlmZmVyZW50IG5vZGVOYW1lc1xuXHRcdC8vIC0gbmVlZCB0byBjcmVhdGUgdGhlIGNvcnJlY3QgRWxlbWVudCB0byBtYXRjaCBWTm9kZVxuXHRcdC8vIC0gdGhlbiBtaWdyYXRlIGNoaWxkcmVuIGZyb20gb2xkIHRvIG5ld1xuXG5cdFx0b3V0ID0gY3JlYXRlTm9kZShub2RlTmFtZSwgaXNTdmdNb2RlKTtcblxuXHRcdC8vIG1vdmUgY2hpbGRyZW4gaW50byB0aGUgcmVwbGFjZW1lbnQgbm9kZVxuXHRcdHdoaWxlIChkb20uZmlyc3RDaGlsZCkgb3V0LmFwcGVuZENoaWxkKGRvbS5maXJzdENoaWxkKTtcblxuXHRcdC8vIGlmIHRoZSBwcmV2aW91cyBFbGVtZW50IHdhcyBtb3VudGVkIGludG8gdGhlIERPTSwgcmVwbGFjZSBpdCBpbmxpbmVcblx0XHRpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG5cblx0XHQvLyByZWN5Y2xlIHRoZSBvbGQgZWxlbWVudCAoc2tpcHMgbm9uLUVsZW1lbnQgbm9kZSB0eXBlcylcblx0XHRyZWNvbGxlY3ROb2RlVHJlZShkb20pO1xuXHR9XG5cblxuXHRsZXQgZmMgPSBvdXQuZmlyc3RDaGlsZCxcblx0XHRwcm9wcyA9IG91dFtBVFRSX0tFWV07XG5cblx0Ly8gQXR0cmlidXRlIEh5ZHJhdGlvbjogaWYgdGhlcmUgaXMgbm8gcHJvcCBjYWNoZSBvbiB0aGUgZWxlbWVudCxcblx0Ly8gLi4uY3JlYXRlIGl0IGFuZCBwb3B1bGF0ZSBpdCB3aXRoIHRoZSBlbGVtZW50J3MgYXR0cmlidXRlcy5cblx0aWYgKCFwcm9wcykge1xuXHRcdG91dFtBVFRSX0tFWV0gPSBwcm9wcyA9IHt9O1xuXHRcdGZvciAobGV0IGE9b3V0LmF0dHJpYnV0ZXMsIGk9YS5sZW5ndGg7IGktLTsgKSBwcm9wc1thW2ldLm5hbWVdID0gYVtpXS52YWx1ZTtcblx0fVxuXG5cdC8vIE9wdGltaXphdGlvbjogZmFzdC1wYXRoIGZvciBlbGVtZW50cyBjb250YWluaW5nIGEgc2luZ2xlIFRleHROb2RlOlxuXHRpZiAoIWh5ZHJhdGluZyAmJiB2Y2hpbGRyZW4gJiYgdmNoaWxkcmVuLmxlbmd0aD09PTEgJiYgdHlwZW9mIHZjaGlsZHJlblswXT09PSdzdHJpbmcnICYmIGZjICYmIGZjIGluc3RhbmNlb2YgVGV4dCAmJiAhZmMubmV4dFNpYmxpbmcpIHtcblx0XHRpZiAoZmMubm9kZVZhbHVlIT12Y2hpbGRyZW5bMF0pIHtcblx0XHRcdGZjLm5vZGVWYWx1ZSA9IHZjaGlsZHJlblswXTtcblx0XHR9XG5cdH1cblx0Ly8gb3RoZXJ3aXNlLCBpZiB0aGVyZSBhcmUgZXhpc3Rpbmcgb3IgbmV3IGNoaWxkcmVuLCBkaWZmIHRoZW06XG5cdGVsc2UgaWYgKHZjaGlsZHJlbiAmJiB2Y2hpbGRyZW4ubGVuZ3RoIHx8IGZjKSB7XG5cdFx0aW5uZXJEaWZmTm9kZShvdXQsIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsICEhcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpO1xuXHR9XG5cblxuXHQvLyBBcHBseSBhdHRyaWJ1dGVzL3Byb3BzIGZyb20gVk5vZGUgdG8gdGhlIERPTSBFbGVtZW50OlxuXHRkaWZmQXR0cmlidXRlcyhvdXQsIHZub2RlLmF0dHJpYnV0ZXMsIHByb3BzKTtcblxuXG5cdC8vIGludm9rZSBvcmlnaW5hbCByZWYgKGZyb20gYmVmb3JlIHJlc29sdmluZyBQdXJlIEZ1bmN0aW9uYWwgQ29tcG9uZW50cyk6XG5cdGlmIChyZWYpIHtcblx0XHQocHJvcHMucmVmID0gcmVmKShvdXQpO1xuXHR9XG5cblx0aXNTdmdNb2RlID0gcHJldlN2Z01vZGU7XG5cblx0cmV0dXJuIG91dDtcbn1cblxuXG4vKiogQXBwbHkgY2hpbGQgYW5kIGF0dHJpYnV0ZSBjaGFuZ2VzIGJldHdlZW4gYSBWTm9kZSBhbmQgYSBET00gTm9kZSB0byB0aGUgRE9NLlxuICpcdEBwYXJhbSB7RWxlbWVudH0gZG9tXHRcdEVsZW1lbnQgd2hvc2UgY2hpbGRyZW4gc2hvdWxkIGJlIGNvbXBhcmVkICYgbXV0YXRlZFxuICpcdEBwYXJhbSB7QXJyYXl9IHZjaGlsZHJlblx0QXJyYXkgb2YgVk5vZGVzIHRvIGNvbXBhcmUgdG8gYGRvbS5jaGlsZE5vZGVzYFxuICpcdEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XHRcdEltcGxpY2l0bHkgZGVzY2VuZGFudCBjb250ZXh0IG9iamVjdCAoZnJvbSBtb3N0IHJlY2VudCBgZ2V0Q2hpbGRDb250ZXh0KClgKVxuICpcdEBwYXJhbSB7Qm9vbGVhbn0gbW91bnRBbGxcbiAqXHRAcGFyYW0ge0Jvb2xlYW59IGFic29yYlx0XHRJZiBgdHJ1ZWAsIGNvbnN1bWVzIGV4dGVybmFsbHkgY3JlYXRlZCBlbGVtZW50cyBzaW1pbGFyIHRvIGh5ZHJhdGlvblxuICovXG5mdW5jdGlvbiBpbm5lckRpZmZOb2RlKGRvbSwgdmNoaWxkcmVuLCBjb250ZXh0LCBtb3VudEFsbCwgYWJzb3JiKSB7XG5cdGxldCBvcmlnaW5hbENoaWxkcmVuID0gZG9tLmNoaWxkTm9kZXMsXG5cdFx0Y2hpbGRyZW4gPSBbXSxcblx0XHRrZXllZCA9IHt9LFxuXHRcdGtleWVkTGVuID0gMCxcblx0XHRtaW4gPSAwLFxuXHRcdGxlbiA9IG9yaWdpbmFsQ2hpbGRyZW4ubGVuZ3RoLFxuXHRcdGNoaWxkcmVuTGVuID0gMCxcblx0XHR2bGVuID0gdmNoaWxkcmVuICYmIHZjaGlsZHJlbi5sZW5ndGgsXG5cdFx0aiwgYywgdmNoaWxkLCBjaGlsZDtcblxuXHRpZiAobGVuKSB7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG5cdFx0XHRsZXQgY2hpbGQgPSBvcmlnaW5hbENoaWxkcmVuW2ldLFxuXHRcdFx0XHRwcm9wcyA9IGNoaWxkW0FUVFJfS0VZXSxcblx0XHRcdFx0a2V5ID0gdmxlbiA/ICgoYyA9IGNoaWxkLl9jb21wb25lbnQpID8gYy5fX2tleSA6IHByb3BzID8gcHJvcHMua2V5IDogbnVsbCkgOiBudWxsO1xuXHRcdFx0aWYgKGtleSE9bnVsbCkge1xuXHRcdFx0XHRrZXllZExlbisrO1xuXHRcdFx0XHRrZXllZFtrZXldID0gY2hpbGQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChoeWRyYXRpbmcgfHwgYWJzb3JiIHx8IHByb3BzIHx8IGNoaWxkIGluc3RhbmNlb2YgVGV4dCkge1xuXHRcdFx0XHRjaGlsZHJlbltjaGlsZHJlbkxlbisrXSA9IGNoaWxkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICh2bGVuKSB7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHZsZW47IGkrKykge1xuXHRcdFx0dmNoaWxkID0gdmNoaWxkcmVuW2ldO1xuXHRcdFx0Y2hpbGQgPSBudWxsO1xuXG5cdFx0XHQvLyBpZiAoaXNGdW5jdGlvbmFsQ29tcG9uZW50KHZjaGlsZCkpIHtcblx0XHRcdC8vIFx0dmNoaWxkID0gYnVpbGRGdW5jdGlvbmFsQ29tcG9uZW50KHZjaGlsZCk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vIGF0dGVtcHQgdG8gZmluZCBhIG5vZGUgYmFzZWQgb24ga2V5IG1hdGNoaW5nXG5cdFx0XHRsZXQga2V5ID0gdmNoaWxkLmtleTtcblx0XHRcdGlmIChrZXkhPW51bGwpIHtcblx0XHRcdFx0aWYgKGtleWVkTGVuICYmIGtleSBpbiBrZXllZCkge1xuXHRcdFx0XHRcdGNoaWxkID0ga2V5ZWRba2V5XTtcblx0XHRcdFx0XHRrZXllZFtrZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGtleWVkTGVuLS07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGF0dGVtcHQgdG8gcGx1Y2sgYSBub2RlIG9mIHRoZSBzYW1lIHR5cGUgZnJvbSB0aGUgZXhpc3RpbmcgY2hpbGRyZW5cblx0XHRcdGVsc2UgaWYgKCFjaGlsZCAmJiBtaW48Y2hpbGRyZW5MZW4pIHtcblx0XHRcdFx0Zm9yIChqPW1pbjsgajxjaGlsZHJlbkxlbjsgaisrKSB7XG5cdFx0XHRcdFx0YyA9IGNoaWxkcmVuW2pdO1xuXHRcdFx0XHRcdGlmIChjICYmIGlzU2FtZU5vZGVUeXBlKGMsIHZjaGlsZCkpIHtcblx0XHRcdFx0XHRcdGNoaWxkID0gYztcblx0XHRcdFx0XHRcdGNoaWxkcmVuW2pdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0aWYgKGo9PT1jaGlsZHJlbkxlbi0xKSBjaGlsZHJlbkxlbi0tO1xuXHRcdFx0XHRcdFx0aWYgKGo9PT1taW4pIG1pbisrO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIG1vcnBoIHRoZSBtYXRjaGVkL2ZvdW5kL2NyZWF0ZWQgRE9NIGNoaWxkIHRvIG1hdGNoIHZjaGlsZCAoZGVlcClcblx0XHRcdGNoaWxkID0gaWRpZmYoY2hpbGQsIHZjaGlsZCwgY29udGV4dCwgbW91bnRBbGwpO1xuXG5cdFx0XHRpZiAoY2hpbGQgJiYgY2hpbGQhPT1kb20pIHtcblx0XHRcdFx0aWYgKGk+PWxlbikge1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoY2hpbGQhPT1vcmlnaW5hbENoaWxkcmVuW2ldKSB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkPT09b3JpZ2luYWxDaGlsZHJlbltpKzFdKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVOb2RlKG9yaWdpbmFsQ2hpbGRyZW5baV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGNoaWxkLCBvcmlnaW5hbENoaWxkcmVuW2ldIHx8IG51bGwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHRpZiAoa2V5ZWRMZW4pIHtcblx0XHRmb3IgKGxldCBpIGluIGtleWVkKSBpZiAoa2V5ZWRbaV0pIHJlY29sbGVjdE5vZGVUcmVlKGtleWVkW2ldKTtcblx0fVxuXG5cdC8vIHJlbW92ZSBvcnBoYW5lZCBjaGlsZHJlblxuXHR3aGlsZSAobWluPD1jaGlsZHJlbkxlbikge1xuXHRcdGNoaWxkID0gY2hpbGRyZW5bY2hpbGRyZW5MZW4tLV07XG5cdFx0aWYgKGNoaWxkKSByZWNvbGxlY3ROb2RlVHJlZShjaGlsZCk7XG5cdH1cbn1cblxuXG5cbi8qKiBSZWN1cnNpdmVseSByZWN5Y2xlIChvciBqdXN0IHVubW91bnQpIGEgbm9kZSBhbiBpdHMgZGVzY2VuZGFudHMuXG4gKlx0QHBhcmFtIHtOb2RlfSBub2RlXHRcdFx0XHRcdFx0RE9NIG5vZGUgdG8gc3RhcnQgdW5tb3VudC9yZW1vdmFsIGZyb21cbiAqXHRAcGFyYW0ge0Jvb2xlYW59IFt1bm1vdW50T25seT1mYWxzZV1cdElmIGB0cnVlYCwgb25seSB0cmlnZ2VycyB1bm1vdW50IGxpZmVjeWNsZSwgc2tpcHMgcmVtb3ZhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgdW5tb3VudE9ubHkpIHtcblx0bGV0IGNvbXBvbmVudCA9IG5vZGUuX2NvbXBvbmVudDtcblx0aWYgKGNvbXBvbmVudCkge1xuXHRcdC8vIGlmIG5vZGUgaXMgb3duZWQgYnkgYSBDb21wb25lbnQsIHVubW91bnQgdGhhdCBjb21wb25lbnQgKGVuZHMgdXAgcmVjdXJzaW5nIGJhY2sgaGVyZSlcblx0XHR1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCwgIXVubW91bnRPbmx5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBJZiB0aGUgbm9kZSdzIFZOb2RlIGhhZCBhIHJlZiBmdW5jdGlvbiwgaW52b2tlIGl0IHdpdGggbnVsbCBoZXJlLlxuXHRcdC8vICh0aGlzIGlzIHBhcnQgb2YgdGhlIFJlYWN0IHNwZWMsIGFuZCBzbWFydCBmb3IgdW5zZXR0aW5nIHJlZmVyZW5jZXMpXG5cdFx0aWYgKG5vZGVbQVRUUl9LRVldICYmIG5vZGVbQVRUUl9LRVldLnJlZikgbm9kZVtBVFRSX0tFWV0ucmVmKG51bGwpO1xuXG5cdFx0aWYgKCF1bm1vdW50T25seSkge1xuXHRcdFx0Y29sbGVjdE5vZGUobm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVjb2xsZWN0L3VubW91bnQgYWxsIGNoaWxkcmVuLlxuXHRcdC8vIC0gd2UgdXNlIC5sYXN0Q2hpbGQgaGVyZSBiZWNhdXNlIGl0IGNhdXNlcyBsZXNzIHJlZmxvdyB0aGFuIC5maXJzdENoaWxkXG5cdFx0Ly8gLSBpdCdzIGFsc28gY2hlYXBlciB0aGFuIGFjY2Vzc2luZyB0aGUgLmNoaWxkTm9kZXMgTGl2ZSBOb2RlTGlzdFxuXHRcdGxldCBjO1xuXHRcdHdoaWxlICgoYz1ub2RlLmxhc3RDaGlsZCkpIHJlY29sbGVjdE5vZGVUcmVlKGMsIHVubW91bnRPbmx5KTtcblx0fVxufVxuXG5cblxuLyoqIEFwcGx5IGRpZmZlcmVuY2VzIGluIGF0dHJpYnV0ZXMgZnJvbSBhIFZOb2RlIHRvIHRoZSBnaXZlbiBET00gRWxlbWVudC5cbiAqXHRAcGFyYW0ge0VsZW1lbnR9IGRvbVx0XHRFbGVtZW50IHdpdGggYXR0cmlidXRlcyB0byBkaWZmIGBhdHRyc2AgYWdhaW5zdFxuICpcdEBwYXJhbSB7T2JqZWN0fSBhdHRyc1x0XHRUaGUgZGVzaXJlZCBlbmQtc3RhdGUga2V5LXZhbHVlIGF0dHJpYnV0ZSBwYWlyc1xuICpcdEBwYXJhbSB7T2JqZWN0fSBvbGRcdFx0XHRDdXJyZW50L3ByZXZpb3VzIGF0dHJpYnV0ZXMgKGZyb20gcHJldmlvdXMgVk5vZGUgb3IgZWxlbWVudCdzIHByb3AgY2FjaGUpXG4gKi9cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIG9sZCkge1xuXHQvLyByZW1vdmUgYXR0cmlidXRlcyBubyBsb25nZXIgcHJlc2VudCBvbiB0aGUgdm5vZGUgYnkgc2V0dGluZyB0aGVtIHRvIHVuZGVmaW5lZFxuXHRsZXQgbmFtZTtcblx0Zm9yIChuYW1lIGluIG9sZCkge1xuXHRcdGlmICghKGF0dHJzICYmIG5hbWUgaW4gYXR0cnMpICYmIG9sZFtuYW1lXSE9bnVsbCkge1xuXHRcdFx0c2V0QWNjZXNzb3IoZG9tLCBuYW1lLCBvbGRbbmFtZV0sIG9sZFtuYW1lXSA9IHVuZGVmaW5lZCwgaXNTdmdNb2RlKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhZGQgbmV3ICYgdXBkYXRlIGNoYW5nZWQgYXR0cmlidXRlc1xuXHRpZiAoYXR0cnMpIHtcblx0XHRmb3IgKG5hbWUgaW4gYXR0cnMpIHtcblx0XHRcdGlmIChuYW1lIT09J2NoaWxkcmVuJyAmJiBuYW1lIT09J2lubmVySFRNTCcgJiYgKCEobmFtZSBpbiBvbGQpIHx8IGF0dHJzW25hbWVdIT09KG5hbWU9PT0ndmFsdWUnIHx8IG5hbWU9PT0nY2hlY2tlZCcgPyBkb21bbmFtZV0gOiBvbGRbbmFtZV0pKSkge1xuXHRcdFx0XHRzZXRBY2Nlc3Nvcihkb20sIG5hbWUsIG9sZFtuYW1lXSwgb2xkW25hbWVdID0gYXR0cnNbbmFtZV0sIGlzU3ZnTW9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL3Zkb20vZGlmZi5qcyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudCc7XG5cbi8qKiBSZXRhaW5zIGEgcG9vbCBvZiBDb21wb25lbnRzIGZvciByZS11c2UsIGtleWVkIG9uIGNvbXBvbmVudCBuYW1lLlxuICpcdE5vdGU6IHNpbmNlIGNvbXBvbmVudCBuYW1lcyBhcmUgbm90IHVuaXF1ZSBvciBldmVuIG5lY2Vzc2FyaWx5IGF2YWlsYWJsZSwgdGhlc2UgYXJlIHByaW1hcmlseSBhIGZvcm0gb2Ygc2hhcmRpbmcuXG4gKlx0QHByaXZhdGVcbiAqL1xuY29uc3QgY29tcG9uZW50cyA9IHt9O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0Q29tcG9uZW50KGNvbXBvbmVudCkge1xuXHRsZXQgbmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lLFxuXHRcdGxpc3QgPSBjb21wb25lbnRzW25hbWVdO1xuXHRpZiAobGlzdCkgbGlzdC5wdXNoKGNvbXBvbmVudCk7XG5cdGVsc2UgY29tcG9uZW50c1tuYW1lXSA9IFtjb21wb25lbnRdO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQoQ3RvciwgcHJvcHMsIGNvbnRleHQpIHtcblx0bGV0IGluc3QgPSBuZXcgQ3Rvcihwcm9wcywgY29udGV4dCksXG5cdFx0bGlzdCA9IGNvbXBvbmVudHNbQ3Rvci5uYW1lXTtcblx0Q29tcG9uZW50LmNhbGwoaW5zdCwgcHJvcHMsIGNvbnRleHQpO1xuXHRpZiAobGlzdCkge1xuXHRcdGZvciAobGV0IGk9bGlzdC5sZW5ndGg7IGktLTsgKSB7XG5cdFx0XHRpZiAobGlzdFtpXS5jb25zdHJ1Y3Rvcj09PUN0b3IpIHtcblx0XHRcdFx0aW5zdC5uZXh0QmFzZSA9IGxpc3RbaV0ubmV4dEJhc2U7XG5cdFx0XHRcdGxpc3Quc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGluc3Q7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL3Zkb20vY29tcG9uZW50LXJlY3ljbGVyLmpzIiwiaW1wb3J0IHsgU1lOQ19SRU5ERVIsIE5PX1JFTkRFUiwgRk9SQ0VfUkVOREVSLCBBU1lOQ19SRU5ERVIsIEFUVFJfS0VZIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgY2xvbmUsIGV4dGVuZCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgZW5xdWV1ZVJlbmRlciB9IGZyb20gJy4uL3JlbmRlci1xdWV1ZSc7XG5pbXBvcnQgeyBnZXROb2RlUHJvcHMgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGRpZmYsIG1vdW50cywgZGlmZkxldmVsLCBmbHVzaE1vdW50cywgcmVjb2xsZWN0Tm9kZVRyZWUgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbmFsQ29tcG9uZW50LCBidWlsZEZ1bmN0aW9uYWxDb21wb25lbnQgfSBmcm9tICcuL2Z1bmN0aW9uYWwtY29tcG9uZW50JztcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCwgY29sbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50LXJlY3ljbGVyJztcbmltcG9ydCB7IHJlbW92ZU5vZGUgfSBmcm9tICcuLi9kb20vaW5kZXgnO1xuXG5cblxuLyoqIFNldCBhIGNvbXBvbmVudCdzIGBwcm9wc2AgKGdlbmVyYWxseSBkZXJpdmVkIGZyb20gSlNYIGF0dHJpYnV0ZXMpLlxuICpcdEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICpcdEBwYXJhbSB7T2JqZWN0fSBbb3B0c11cbiAqXHRAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnJlbmRlclN5bmM9ZmFsc2VdXHRJZiBgdHJ1ZWAgYW5kIHtAbGluayBvcHRpb25zLnN5bmNDb21wb25lbnRVcGRhdGVzfSBpcyBgdHJ1ZWAsIHRyaWdnZXJzIHN5bmNocm9ub3VzIHJlbmRlcmluZy5cbiAqXHRAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnJlbmRlcj10cnVlXVx0XHRcdElmIGBmYWxzZWAsIG5vIHJlbmRlciB3aWxsIGJlIHRyaWdnZXJlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldENvbXBvbmVudFByb3BzKGNvbXBvbmVudCwgcHJvcHMsIG9wdHMsIGNvbnRleHQsIG1vdW50QWxsKSB7XG5cdGlmIChjb21wb25lbnQuX2Rpc2FibGUpIHJldHVybjtcblx0Y29tcG9uZW50Ll9kaXNhYmxlID0gdHJ1ZTtcblxuXHRpZiAoKGNvbXBvbmVudC5fX3JlZiA9IHByb3BzLnJlZikpIGRlbGV0ZSBwcm9wcy5yZWY7XG5cdGlmICgoY29tcG9uZW50Ll9fa2V5ID0gcHJvcHMua2V5KSkgZGVsZXRlIHByb3BzLmtleTtcblxuXHRpZiAoIWNvbXBvbmVudC5iYXNlIHx8IG1vdW50QWxsKSB7XG5cdFx0aWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0fVxuXHRlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xuXHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzLCBjb250ZXh0KTtcblx0fVxuXG5cdGlmIChjb250ZXh0ICYmIGNvbnRleHQhPT1jb21wb25lbnQuY29udGV4dCkge1xuXHRcdGlmICghY29tcG9uZW50LnByZXZDb250ZXh0KSBjb21wb25lbnQucHJldkNvbnRleHQgPSBjb21wb25lbnQuY29udGV4dDtcblx0XHRjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG5cdH1cblxuXHRpZiAoIWNvbXBvbmVudC5wcmV2UHJvcHMpIGNvbXBvbmVudC5wcmV2UHJvcHMgPSBjb21wb25lbnQucHJvcHM7XG5cdGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuXG5cdGNvbXBvbmVudC5fZGlzYWJsZSA9IGZhbHNlO1xuXG5cdGlmIChvcHRzIT09Tk9fUkVOREVSKSB7XG5cdFx0aWYgKG9wdHM9PT1TWU5DX1JFTkRFUiB8fCBvcHRpb25zLnN5bmNDb21wb25lbnRVcGRhdGVzIT09ZmFsc2UgfHwgIWNvbXBvbmVudC5iYXNlKSB7XG5cdFx0XHRyZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBTWU5DX1JFTkRFUiwgbW91bnRBbGwpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGVucXVldWVSZW5kZXIoY29tcG9uZW50KTtcblx0XHR9XG5cdH1cblxuXHRpZiAoY29tcG9uZW50Ll9fcmVmKSBjb21wb25lbnQuX19yZWYoY29tcG9uZW50KTtcbn1cblxuXG5cbi8qKiBSZW5kZXIgYSBDb21wb25lbnQsIHRyaWdnZXJpbmcgbmVjZXNzYXJ5IGxpZmVjeWNsZSBldmVudHMgYW5kIHRha2luZyBIaWdoLU9yZGVyIENvbXBvbmVudHMgaW50byBhY2NvdW50LlxuICpcdEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAqXHRAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gKlx0QHBhcmFtIHtib29sZWFufSBbb3B0cy5idWlsZD1mYWxzZV1cdFx0SWYgYHRydWVgLCBjb21wb25lbnQgd2lsbCBidWlsZCBhbmQgc3RvcmUgYSBET00gbm9kZSBpZiBub3QgYWxyZWFkeSBhc3NvY2lhdGVkIHdpdGggb25lLlxuICpcdEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBvcHRzLCBtb3VudEFsbCwgaXNDaGlsZCkge1xuXHRpZiAoY29tcG9uZW50Ll9kaXNhYmxlKSByZXR1cm47XG5cblx0bGV0IHNraXAsIHJlbmRlcmVkLFxuXHRcdHByb3BzID0gY29tcG9uZW50LnByb3BzLFxuXHRcdHN0YXRlID0gY29tcG9uZW50LnN0YXRlLFxuXHRcdGNvbnRleHQgPSBjb21wb25lbnQuY29udGV4dCxcblx0XHRwcmV2aW91c1Byb3BzID0gY29tcG9uZW50LnByZXZQcm9wcyB8fCBwcm9wcyxcblx0XHRwcmV2aW91c1N0YXRlID0gY29tcG9uZW50LnByZXZTdGF0ZSB8fCBzdGF0ZSxcblx0XHRwcmV2aW91c0NvbnRleHQgPSBjb21wb25lbnQucHJldkNvbnRleHQgfHwgY29udGV4dCxcblx0XHRpc1VwZGF0ZSA9IGNvbXBvbmVudC5iYXNlLFxuXHRcdG5leHRCYXNlID0gY29tcG9uZW50Lm5leHRCYXNlLFxuXHRcdGluaXRpYWxCYXNlID0gaXNVcGRhdGUgfHwgbmV4dEJhc2UsXG5cdFx0aW5pdGlhbENoaWxkQ29tcG9uZW50ID0gY29tcG9uZW50Ll9jb21wb25lbnQsXG5cdFx0aW5zdCwgY2Jhc2U7XG5cblx0Ly8gaWYgdXBkYXRpbmdcblx0aWYgKGlzVXBkYXRlKSB7XG5cdFx0Y29tcG9uZW50LnByb3BzID0gcHJldmlvdXNQcm9wcztcblx0XHRjb21wb25lbnQuc3RhdGUgPSBwcmV2aW91c1N0YXRlO1xuXHRcdGNvbXBvbmVudC5jb250ZXh0ID0gcHJldmlvdXNDb250ZXh0O1xuXHRcdGlmIChvcHRzIT09Rk9SQ0VfUkVOREVSXG5cdFx0XHQmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlXG5cdFx0XHQmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCkgPT09IGZhbHNlKSB7XG5cdFx0XHRza2lwID0gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUpIHtcblx0XHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG5cdFx0fVxuXHRcdGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuXHRcdGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuXHRcdGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcblx0fVxuXG5cdGNvbXBvbmVudC5wcmV2UHJvcHMgPSBjb21wb25lbnQucHJldlN0YXRlID0gY29tcG9uZW50LnByZXZDb250ZXh0ID0gY29tcG9uZW50Lm5leHRCYXNlID0gbnVsbDtcblx0Y29tcG9uZW50Ll9kaXJ0eSA9IGZhbHNlO1xuXG5cdGlmICghc2tpcCkge1xuXHRcdGlmIChjb21wb25lbnQucmVuZGVyKSByZW5kZXJlZCA9IGNvbXBvbmVudC5yZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KTtcblxuXHRcdC8vIGNvbnRleHQgdG8gcGFzcyB0byB0aGUgY2hpbGQsIGNhbiBiZSB1cGRhdGVkIHZpYSAoZ3JhbmQtKXBhcmVudCBjb21wb25lbnRcblx0XHRpZiAoY29tcG9uZW50LmdldENoaWxkQ29udGV4dCkge1xuXHRcdFx0Y29udGV4dCA9IGV4dGVuZChjbG9uZShjb250ZXh0KSwgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpKTtcblx0XHR9XG5cblx0XHR3aGlsZSAoaXNGdW5jdGlvbmFsQ29tcG9uZW50KHJlbmRlcmVkKSkge1xuXHRcdFx0cmVuZGVyZWQgPSBidWlsZEZ1bmN0aW9uYWxDb21wb25lbnQocmVuZGVyZWQsIGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdGxldCBjaGlsZENvbXBvbmVudCA9IHJlbmRlcmVkICYmIHJlbmRlcmVkLm5vZGVOYW1lLFxuXHRcdFx0dG9Vbm1vdW50LCBiYXNlO1xuXG5cdFx0aWYgKGlzRnVuY3Rpb24oY2hpbGRDb21wb25lbnQpKSB7XG5cdFx0XHQvLyBzZXQgdXAgaGlnaCBvcmRlciBjb21wb25lbnQgbGlua1xuXG5cdFx0XHRsZXQgY2hpbGRQcm9wcyA9IGdldE5vZGVQcm9wcyhyZW5kZXJlZCk7XG5cdFx0XHRpbnN0ID0gaW5pdGlhbENoaWxkQ29tcG9uZW50O1xuXG5cdFx0XHRpZiAoaW5zdCAmJiBpbnN0LmNvbnN0cnVjdG9yPT09Y2hpbGRDb21wb25lbnQgJiYgY2hpbGRQcm9wcy5rZXk9PWluc3QuX19rZXkpIHtcblx0XHRcdFx0c2V0Q29tcG9uZW50UHJvcHMoaW5zdCwgY2hpbGRQcm9wcywgU1lOQ19SRU5ERVIsIGNvbnRleHQpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRvVW5tb3VudCA9IGluc3Q7XG5cblx0XHRcdFx0aW5zdCA9IGNyZWF0ZUNvbXBvbmVudChjaGlsZENvbXBvbmVudCwgY2hpbGRQcm9wcywgY29udGV4dCk7XG5cdFx0XHRcdGluc3QubmV4dEJhc2UgPSBpbnN0Lm5leHRCYXNlIHx8IG5leHRCYXNlO1xuXHRcdFx0XHRpbnN0Ll9wYXJlbnRDb21wb25lbnQgPSBjb21wb25lbnQ7XG5cdFx0XHRcdGNvbXBvbmVudC5fY29tcG9uZW50ID0gaW5zdDtcblx0XHRcdFx0c2V0Q29tcG9uZW50UHJvcHMoaW5zdCwgY2hpbGRQcm9wcywgTk9fUkVOREVSLCBjb250ZXh0KTtcblx0XHRcdFx0cmVuZGVyQ29tcG9uZW50KGluc3QsIFNZTkNfUkVOREVSLCBtb3VudEFsbCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGJhc2UgPSBpbnN0LmJhc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y2Jhc2UgPSBpbml0aWFsQmFzZTtcblxuXHRcdFx0Ly8gZGVzdHJveSBoaWdoIG9yZGVyIGNvbXBvbmVudCBsaW5rXG5cdFx0XHR0b1VubW91bnQgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG5cdFx0XHRpZiAodG9Vbm1vdW50KSB7XG5cdFx0XHRcdGNiYXNlID0gY29tcG9uZW50Ll9jb21wb25lbnQgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5pdGlhbEJhc2UgfHwgb3B0cz09PVNZTkNfUkVOREVSKSB7XG5cdFx0XHRcdGlmIChjYmFzZSkgY2Jhc2UuX2NvbXBvbmVudCA9IG51bGw7XG5cdFx0XHRcdGJhc2UgPSBkaWZmKGNiYXNlLCByZW5kZXJlZCwgY29udGV4dCwgbW91bnRBbGwgfHwgIWlzVXBkYXRlLCBpbml0aWFsQmFzZSAmJiBpbml0aWFsQmFzZS5wYXJlbnROb2RlLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaW5pdGlhbEJhc2UgJiYgYmFzZSE9PWluaXRpYWxCYXNlICYmIGluc3QhPT1pbml0aWFsQ2hpbGRDb21wb25lbnQpIHtcblx0XHRcdGxldCBiYXNlUGFyZW50ID0gaW5pdGlhbEJhc2UucGFyZW50Tm9kZTtcblx0XHRcdGlmIChiYXNlUGFyZW50ICYmIGJhc2UhPT1iYXNlUGFyZW50KSB7XG5cdFx0XHRcdGJhc2VQYXJlbnQucmVwbGFjZUNoaWxkKGJhc2UsIGluaXRpYWxCYXNlKTtcblxuXHRcdFx0XHRpZiAoIXRvVW5tb3VudCkge1xuXHRcdFx0XHRcdGluaXRpYWxCYXNlLl9jb21wb25lbnQgPSBudWxsO1xuXHRcdFx0XHRcdHJlY29sbGVjdE5vZGVUcmVlKGluaXRpYWxCYXNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0b1VubW91bnQpIHtcblx0XHRcdHVubW91bnRDb21wb25lbnQodG9Vbm1vdW50LCBiYXNlIT09aW5pdGlhbEJhc2UpO1xuXHRcdH1cblxuXHRcdGNvbXBvbmVudC5iYXNlID0gYmFzZTtcblx0XHRpZiAoYmFzZSAmJiAhaXNDaGlsZCkge1xuXHRcdFx0bGV0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudCxcblx0XHRcdFx0dCA9IGNvbXBvbmVudDtcblx0XHRcdHdoaWxlICgodD10Ll9wYXJlbnRDb21wb25lbnQpKSB7XG5cdFx0XHRcdChjb21wb25lbnRSZWYgPSB0KS5iYXNlID0gYmFzZTtcblx0XHRcdH1cblx0XHRcdGJhc2UuX2NvbXBvbmVudCA9IGNvbXBvbmVudFJlZjtcblx0XHRcdGJhc2UuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50UmVmLmNvbnN0cnVjdG9yO1xuXHRcdH1cblx0fVxuXG5cdGlmICghaXNVcGRhdGUgfHwgbW91bnRBbGwpIHtcblx0XHRtb3VudHMudW5zaGlmdChjb21wb25lbnQpO1xuXHR9XG5cdGVsc2UgaWYgKCFza2lwKSB7XG5cdFx0aWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUpIHtcblx0XHRcdGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSwgcHJldmlvdXNDb250ZXh0KTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuYWZ0ZXJVcGRhdGUpIG9wdGlvbnMuYWZ0ZXJVcGRhdGUoY29tcG9uZW50KTtcblx0fVxuXG5cdGxldCBjYiA9IGNvbXBvbmVudC5fcmVuZGVyQ2FsbGJhY2tzLCBmbjtcblx0aWYgKGNiKSB3aGlsZSAoIChmbiA9IGNiLnBvcCgpKSApIGZuLmNhbGwoY29tcG9uZW50KTtcblxuXHRpZiAoIWRpZmZMZXZlbCAmJiAhaXNDaGlsZCkgZmx1c2hNb3VudHMoKTtcbn1cblxuXG5cbi8qKiBBcHBseSB0aGUgQ29tcG9uZW50IHJlZmVyZW5jZWQgYnkgYSBWTm9kZSB0byB0aGUgRE9NLlxuICpcdEBwYXJhbSB7RWxlbWVudH0gZG9tXHRUaGUgRE9NIG5vZGUgdG8gbXV0YXRlXG4gKlx0QHBhcmFtIHtWTm9kZX0gdm5vZGVcdEEgQ29tcG9uZW50LXJlZmVyZW5jaW5nIFZOb2RlXG4gKlx0QHJldHVybnMge0VsZW1lbnR9IGRvbVx0VGhlIGNyZWF0ZWQvbXV0YXRlZCBlbGVtZW50XG4gKlx0QHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG5cdGxldCBjID0gZG9tICYmIGRvbS5fY29tcG9uZW50LFxuXHRcdG9yaWdpbmFsQ29tcG9uZW50ID0gYyxcblx0XHRvbGREb20gPSBkb20sXG5cdFx0aXNEaXJlY3RPd25lciA9IGMgJiYgZG9tLl9jb21wb25lbnRDb25zdHJ1Y3Rvcj09PXZub2RlLm5vZGVOYW1lLFxuXHRcdGlzT3duZXIgPSBpc0RpcmVjdE93bmVyLFxuXHRcdHByb3BzID0gZ2V0Tm9kZVByb3BzKHZub2RlKTtcblx0d2hpbGUgKGMgJiYgIWlzT3duZXIgJiYgKGM9Yy5fcGFyZW50Q29tcG9uZW50KSkge1xuXHRcdGlzT3duZXIgPSBjLmNvbnN0cnVjdG9yPT09dm5vZGUubm9kZU5hbWU7XG5cdH1cblxuXHRpZiAoYyAmJiBpc093bmVyICYmICghbW91bnRBbGwgfHwgYy5fY29tcG9uZW50KSkge1xuXHRcdHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCBBU1lOQ19SRU5ERVIsIGNvbnRleHQsIG1vdW50QWxsKTtcblx0XHRkb20gPSBjLmJhc2U7XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKG9yaWdpbmFsQ29tcG9uZW50ICYmICFpc0RpcmVjdE93bmVyKSB7XG5cdFx0XHR1bm1vdW50Q29tcG9uZW50KG9yaWdpbmFsQ29tcG9uZW50LCB0cnVlKTtcblx0XHRcdGRvbSA9IG9sZERvbSA9IG51bGw7XG5cdFx0fVxuXG5cdFx0YyA9IGNyZWF0ZUNvbXBvbmVudCh2bm9kZS5ub2RlTmFtZSwgcHJvcHMsIGNvbnRleHQpO1xuXHRcdGlmIChkb20gJiYgIWMubmV4dEJhc2UpIHtcblx0XHRcdGMubmV4dEJhc2UgPSBkb207XG5cdFx0XHQvLyBwYXNzaW5nIGRvbS9vbGREb20gYXMgbmV4dEJhc2Ugd2lsbCByZWN5Y2xlIGl0IGlmIHVudXNlZCwgc28gYnlwYXNzIHJlY3ljbGluZyBvbiBMMjQxOlxuXHRcdFx0b2xkRG9tID0gbnVsbDtcblx0XHR9XG5cdFx0c2V0Q29tcG9uZW50UHJvcHMoYywgcHJvcHMsIFNZTkNfUkVOREVSLCBjb250ZXh0LCBtb3VudEFsbCk7XG5cdFx0ZG9tID0gYy5iYXNlO1xuXG5cdFx0aWYgKG9sZERvbSAmJiBkb20hPT1vbGREb20pIHtcblx0XHRcdG9sZERvbS5fY29tcG9uZW50ID0gbnVsbDtcblx0XHRcdHJlY29sbGVjdE5vZGVUcmVlKG9sZERvbSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRvbTtcbn1cblxuXG5cbi8qKiBSZW1vdmUgYSBjb21wb25lbnQgZnJvbSB0aGUgRE9NIGFuZCByZWN5Y2xlIGl0LlxuICpcdEBwYXJhbSB7RWxlbWVudH0gZG9tXHRcdFx0QSBET00gbm9kZSBmcm9tIHdoaWNoIHRvIHVubW91bnQgdGhlIGdpdmVuIENvbXBvbmVudFxuICpcdEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcdFRoZSBDb21wb25lbnQgaW5zdGFuY2UgdG8gdW5tb3VudFxuICpcdEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCwgcmVtb3ZlKSB7XG5cdGlmIChvcHRpb25zLmJlZm9yZVVubW91bnQpIG9wdGlvbnMuYmVmb3JlVW5tb3VudChjb21wb25lbnQpO1xuXG5cdC8vIGNvbnNvbGUubG9nKGAke3JlbW92ZT8nUmVtb3ZpbmcnOidVbm1vdW50aW5nJ30gY29tcG9uZW50OiAke2NvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xuXHRsZXQgYmFzZSA9IGNvbXBvbmVudC5iYXNlO1xuXG5cdGNvbXBvbmVudC5fZGlzYWJsZSA9IHRydWU7XG5cblx0aWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cblx0Y29tcG9uZW50LmJhc2UgPSBudWxsO1xuXG5cdC8vIHJlY3Vyc2l2ZWx5IHRlYXIgZG93biAmIHJlY29sbGVjdCBoaWdoLW9yZGVyIGNvbXBvbmVudCBjaGlsZHJlbjpcblx0bGV0IGlubmVyID0gY29tcG9uZW50Ll9jb21wb25lbnQ7XG5cdGlmIChpbm5lcikge1xuXHRcdHVubW91bnRDb21wb25lbnQoaW5uZXIsIHJlbW92ZSk7XG5cdH1cblx0ZWxzZSBpZiAoYmFzZSkge1xuXHRcdGlmIChiYXNlW0FUVFJfS0VZXSAmJiBiYXNlW0FUVFJfS0VZXS5yZWYpIGJhc2VbQVRUUl9LRVldLnJlZihudWxsKTtcblxuXHRcdGNvbXBvbmVudC5uZXh0QmFzZSA9IGJhc2U7XG5cblx0XHRpZiAocmVtb3ZlKSB7XG5cdFx0XHRyZW1vdmVOb2RlKGJhc2UpO1xuXHRcdFx0Y29sbGVjdENvbXBvbmVudChjb21wb25lbnQpO1xuXHRcdH1cblx0XHRsZXQgYztcblx0XHR3aGlsZSAoKGM9YmFzZS5sYXN0Q2hpbGQpKSByZWNvbGxlY3ROb2RlVHJlZShjLCAhcmVtb3ZlKTtcblx0XHQvLyByZW1vdmVPcnBoYW5lZENoaWxkcmVuKGJhc2UuY2hpbGROb2RlcywgdHJ1ZSk7XG5cdH1cblxuXHRpZiAoY29tcG9uZW50Ll9fcmVmKSBjb21wb25lbnQuX19yZWYobnVsbCk7XG5cdGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkVW5tb3VudCkgY29tcG9uZW50LmNvbXBvbmVudERpZFVubW91bnQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvdmRvbS9jb21wb25lbnQuanMiLCJpbXBvcnQgeyBGT1JDRV9SRU5ERVIgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBleHRlbmQsIGNsb25lLCBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGNyZWF0ZUxpbmtlZFN0YXRlIH0gZnJvbSAnLi9saW5rZWQtc3RhdGUnO1xuaW1wb3J0IHsgcmVuZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92ZG9tL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBlbnF1ZXVlUmVuZGVyIH0gZnJvbSAnLi9yZW5kZXItcXVldWUnO1xuXG4vKiogQmFzZSBDb21wb25lbnQgY2xhc3MsIGZvciB0aGUgRVM2IENsYXNzIG1ldGhvZCBvZiBjcmVhdGluZyBDb21wb25lbnRzXG4gKlx0QHB1YmxpY1xuICpcbiAqXHRAZXhhbXBsZVxuICpcdGNsYXNzIE15Rm9vIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAqXHRcdHJlbmRlcihwcm9wcywgc3RhdGUpIHtcbiAqXHRcdFx0cmV0dXJuIDxkaXYgLz47XG4gKlx0XHR9XG4gKlx0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KSB7XG5cdC8qKiBAcHJpdmF0ZSAqL1xuXHR0aGlzLl9kaXJ0eSA9IHRydWU7XG5cdC8vIC8qKiBAcHVibGljICovXG5cdC8vIHRoaXMuX2Rpc2FibGVSZW5kZXJpbmcgPSBmYWxzZTtcblx0Ly8gLyoqIEBwdWJsaWMgKi9cblx0Ly8gdGhpcy5wcmV2U3RhdGUgPSB0aGlzLnByZXZQcm9wcyA9IHRoaXMucHJldkNvbnRleHQgPSB0aGlzLmJhc2UgPSB0aGlzLm5leHRCYXNlID0gdGhpcy5fcGFyZW50Q29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50ID0gdGhpcy5fX3JlZiA9IHRoaXMuX19rZXkgPSB0aGlzLl9saW5rZWRTdGF0ZXMgPSB0aGlzLl9yZW5kZXJDYWxsYmFja3MgPSBudWxsO1xuXHQvKiogQHB1YmxpYyAqL1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHQvKiogQHR5cGUge29iamVjdH0gKi9cblx0dGhpcy5wcm9wcyA9IHByb3BzO1xuXHQvKiogQHR5cGUge29iamVjdH0gKi9cblx0aWYgKCF0aGlzLnN0YXRlKSB0aGlzLnN0YXRlID0ge307XG59XG5cblxuZXh0ZW5kKENvbXBvbmVudC5wcm90b3R5cGUsIHtcblxuXHQvKiogUmV0dXJucyBhIGBib29sZWFuYCB2YWx1ZSBpbmRpY2F0aW5nIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHJlLXJlbmRlciB3aGVuIHJlY2VpdmluZyB0aGUgZ2l2ZW4gYHByb3BzYCBhbmQgYHN0YXRlYC5cblx0ICpcdEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcblx0ICpcdEBwYXJhbSB7b2JqZWN0fSBuZXh0U3RhdGVcblx0ICpcdEBwYXJhbSB7b2JqZWN0fSBuZXh0Q29udGV4dFxuXHQgKlx0QHJldHVybnMge0Jvb2xlYW59IHNob3VsZCB0aGUgY29tcG9uZW50IHJlLXJlbmRlclxuXHQgKlx0QG5hbWUgc2hvdWxkQ29tcG9uZW50VXBkYXRlXG5cdCAqXHRAZnVuY3Rpb25cblx0ICovXG5cdC8vIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcblx0Ly8gXHRyZXR1cm4gdHJ1ZTtcblx0Ly8gfSxcblxuXG5cdC8qKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBzZXRzIGEgc3RhdGUgcHJvcGVydHkgd2hlbiBjYWxsZWQuXG5cdCAqXHRDYWxsaW5nIGxpbmtTdGF0ZSgpIHJlcGVhdGVkbHkgd2l0aCB0aGUgc2FtZSBhcmd1bWVudHMgcmV0dXJucyBhIGNhY2hlZCBsaW5rIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKlx0UHJvdmlkZXMgc29tZSBidWlsdC1pbiBzcGVjaWFsIGNhc2VzOlxuXHQgKlx0XHQtIENoZWNrYm94ZXMgYW5kIHJhZGlvIGJ1dHRvbnMgbGluayB0aGVpciBib29sZWFuIGBjaGVja2VkYCB2YWx1ZVxuXHQgKlx0XHQtIElucHV0cyBhdXRvbWF0aWNhbGx5IGxpbmsgdGhlaXIgYHZhbHVlYCBwcm9wZXJ0eVxuXHQgKlx0XHQtIEV2ZW50IHBhdGhzIGZhbGwgYmFjayB0byBhbnkgYXNzb2NpYXRlZCBDb21wb25lbnQgaWYgbm90IGZvdW5kIG9uIGFuIGVsZW1lbnRcblx0ICpcdFx0LSBJZiBsaW5rZWQgdmFsdWUgaXMgYSBmdW5jdGlvbiwgd2lsbCBpbnZva2UgaXQgYW5kIHVzZSB0aGUgcmVzdWx0XG5cdCAqXG5cdCAqXHRAcGFyYW0ge3N0cmluZ30ga2V5XHRcdFRoZSBwYXRoIHRvIHNldCAtIGNhbiBiZSBhIGRvdC1ub3RhdGVkIGRlZXAga2V5XG5cdCAqXHRAcGFyYW0ge3N0cmluZ30gW2V2ZW50UGF0aF1cdElmIHNldCwgYXR0ZW1wdHMgdG8gZmluZCB0aGUgbmV3IHN0YXRlIHZhbHVlIGF0IGEgZ2l2ZW4gZG90LW5vdGF0ZWQgcGF0aCB3aXRoaW4gdGhlIG9iamVjdCBwYXNzZWQgdG8gdGhlIGxpbmtlZFN0YXRlIHNldHRlci5cblx0ICpcdEByZXR1cm5zIHtmdW5jdGlvbn0gbGlua1N0YXRlU2V0dGVyKGUpXG5cdCAqXG5cdCAqXHRAZXhhbXBsZSBVcGRhdGUgYSBcInRleHRcIiBzdGF0ZSB2YWx1ZSB3aGVuIGFuIGlucHV0IGNoYW5nZXM6XG5cdCAqXHRcdDxpbnB1dCBvbkNoYW5nZT17IHRoaXMubGlua1N0YXRlKCd0ZXh0JykgfSAvPlxuXHQgKlxuXHQgKlx0QGV4YW1wbGUgU2V0IGEgZGVlcCBzdGF0ZSB2YWx1ZSBvbiBjbGlja1xuXHQgKlx0XHQ8YnV0dG9uIG9uQ2xpY2s9eyB0aGlzLmxpbmtTdGF0ZSgndG91Y2guY29vcmRzJywgJ3RvdWNoZXMuMCcpIH0+VGFwPC9idXR0b25cblx0ICovXG5cdGxpbmtTdGF0ZShrZXksIGV2ZW50UGF0aCkge1xuXHRcdGxldCBjID0gdGhpcy5fbGlua2VkU3RhdGVzIHx8ICh0aGlzLl9saW5rZWRTdGF0ZXMgPSB7fSk7XG5cdFx0cmV0dXJuIGNba2V5K2V2ZW50UGF0aF0gfHwgKGNba2V5K2V2ZW50UGF0aF0gPSBjcmVhdGVMaW5rZWRTdGF0ZSh0aGlzLCBrZXksIGV2ZW50UGF0aCkpO1xuXHR9LFxuXG5cblx0LyoqIFVwZGF0ZSBjb21wb25lbnQgc3RhdGUgYnkgY29weWluZyBwcm9wZXJ0aWVzIGZyb20gYHN0YXRlYCB0byBgdGhpcy5zdGF0ZWAuXG5cdCAqXHRAcGFyYW0ge29iamVjdH0gc3RhdGVcdFx0QSBoYXNoIG9mIHN0YXRlIHByb3BlcnRpZXMgdG8gdXBkYXRlIHdpdGggbmV3IHZhbHVlc1xuXHQgKi9cblx0c2V0U3RhdGUoc3RhdGUsIGNhbGxiYWNrKSB7XG5cdFx0bGV0IHMgPSB0aGlzLnN0YXRlO1xuXHRcdGlmICghdGhpcy5wcmV2U3RhdGUpIHRoaXMucHJldlN0YXRlID0gY2xvbmUocyk7XG5cdFx0ZXh0ZW5kKHMsIGlzRnVuY3Rpb24oc3RhdGUpID8gc3RhdGUocywgdGhpcy5wcm9wcykgOiBzdGF0ZSk7XG5cdFx0aWYgKGNhbGxiYWNrKSAodGhpcy5fcmVuZGVyQ2FsbGJhY2tzID0gKHRoaXMuX3JlbmRlckNhbGxiYWNrcyB8fCBbXSkpLnB1c2goY2FsbGJhY2spO1xuXHRcdGVucXVldWVSZW5kZXIodGhpcyk7XG5cdH0sXG5cblxuXHQvKiogSW1tZWRpYXRlbHkgcGVyZm9ybSBhIHN5bmNocm9ub3VzIHJlLXJlbmRlciBvZiB0aGUgY29tcG9uZW50LlxuXHQgKlx0QHByaXZhdGVcblx0ICovXG5cdGZvcmNlVXBkYXRlKCkge1xuXHRcdHJlbmRlckNvbXBvbmVudCh0aGlzLCBGT1JDRV9SRU5ERVIpO1xuXHR9LFxuXG5cblx0LyoqIEFjY2VwdHMgYHByb3BzYCBhbmQgYHN0YXRlYCwgYW5kIHJldHVybnMgYSBuZXcgVmlydHVhbCBET00gdHJlZSB0byBidWlsZC5cblx0ICpcdFZpcnR1YWwgRE9NIGlzIGdlbmVyYWxseSBjb25zdHJ1Y3RlZCB2aWEgW0pTWF0oaHR0cDovL2phc29uZm9ybWF0LmNvbS93dGYtaXMtanN4KS5cblx0ICpcdEBwYXJhbSB7b2JqZWN0fSBwcm9wc1x0XHRQcm9wcyAoZWc6IEpTWCBhdHRyaWJ1dGVzKSByZWNlaXZlZCBmcm9tIHBhcmVudCBlbGVtZW50L2NvbXBvbmVudFxuXHQgKlx0QHBhcmFtIHtvYmplY3R9IHN0YXRlXHRcdFRoZSBjb21wb25lbnQncyBjdXJyZW50IHN0YXRlXG5cdCAqXHRAcGFyYW0ge29iamVjdH0gY29udGV4dFx0XHRDb250ZXh0IG9iamVjdCAoaWYgYSBwYXJlbnQgY29tcG9uZW50IGhhcyBwcm92aWRlZCBjb250ZXh0KVxuXHQgKlx0QHJldHVybnMgVk5vZGVcblx0ICovXG5cdHJlbmRlcigpIHt9XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9jb21wb25lbnQuanMiLCIvLyByZW5kZXIgbW9kZXNcblxuZXhwb3J0IGNvbnN0IE5PX1JFTkRFUiA9IDA7XG5leHBvcnQgY29uc3QgU1lOQ19SRU5ERVIgPSAxO1xuZXhwb3J0IGNvbnN0IEZPUkNFX1JFTkRFUiA9IDI7XG5leHBvcnQgY29uc3QgQVNZTkNfUkVOREVSID0gMztcblxuZXhwb3J0IGNvbnN0IEVNUFRZID0ge307XG5cbmV4cG9ydCBjb25zdCBBVFRSX0tFWSA9IHR5cGVvZiBTeW1ib2whPT0ndW5kZWZpbmVkJyA/IFN5bWJvbC5mb3IoJ3ByZWFjdGF0dHInKSA6ICdfX3ByZWFjdGF0dHJfJztcblxuLy8gRE9NIHByb3BlcnRpZXMgdGhhdCBzaG91bGQgTk9UIGhhdmUgXCJweFwiIGFkZGVkIHdoZW4gbnVtZXJpY1xuZXhwb3J0IGNvbnN0IE5PTl9ESU1FTlNJT05fUFJPUFMgPSB7XG5cdGJveEZsZXg6MSwgYm94RmxleEdyb3VwOjEsIGNvbHVtbkNvdW50OjEsIGZpbGxPcGFjaXR5OjEsIGZsZXg6MSwgZmxleEdyb3c6MSxcblx0ZmxleFBvc2l0aXZlOjEsIGZsZXhTaHJpbms6MSwgZmxleE5lZ2F0aXZlOjEsIGZvbnRXZWlnaHQ6MSwgbGluZUNsYW1wOjEsIGxpbmVIZWlnaHQ6MSxcblx0b3BhY2l0eToxLCBvcmRlcjoxLCBvcnBoYW5zOjEsIHN0cm9rZU9wYWNpdHk6MSwgd2lkb3dzOjEsIHpJbmRleDoxLCB6b29tOjFcbn07XG5cbi8vIERPTSBldmVudCB0eXBlcyB0aGF0IGRvIG5vdCBidWJibGUgYW5kIHNob3VsZCBiZSBhdHRhY2hlZCB2aWEgdXNlQ2FwdHVyZVxuZXhwb3J0IGNvbnN0IE5PTl9CVUJCTElOR19FVkVOVFMgPSB7IGJsdXI6MSwgZXJyb3I6MSwgZm9jdXM6MSwgbG9hZDoxLCByZXNpemU6MSwgc2Nyb2xsOjEgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY29uc3RhbnRzLmpzIiwiaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4vdmRvbS9kaWZmJztcblxuLyoqIFJlbmRlciBKU1ggaW50byBhIGBwYXJlbnRgIEVsZW1lbnQuXG4gKlx0QHBhcmFtIHtWTm9kZX0gdm5vZGVcdFx0QSAoSlNYKSBWTm9kZSB0byByZW5kZXJcbiAqXHRAcGFyYW0ge0VsZW1lbnR9IHBhcmVudFx0XHRET00gZWxlbWVudCB0byByZW5kZXIgaW50b1xuICpcdEBwYXJhbSB7RWxlbWVudH0gW21lcmdlXVx0QXR0ZW1wdCB0byByZS11c2UgYW4gZXhpc3RpbmcgRE9NIHRyZWUgcm9vdGVkIGF0IGBtZXJnZWBcbiAqXHRAcHVibGljXG4gKlxuICpcdEBleGFtcGxlXG4gKlx0Ly8gcmVuZGVyIGEgZGl2IGludG8gPGJvZHk+OlxuICpcdHJlbmRlcig8ZGl2IGlkPVwiaGVsbG9cIj5oZWxsbyE8L2Rpdj4sIGRvY3VtZW50LmJvZHkpO1xuICpcbiAqXHRAZXhhbXBsZVxuICpcdC8vIHJlbmRlciBhIFwiVGhpbmdcIiBjb21wb25lbnQgaW50byAjZm9vOlxuICpcdGNvbnN0IFRoaW5nID0gKHsgbmFtZSB9KSA9PiA8c3Bhbj57IG5hbWUgfTwvc3Bhbj47XG4gKlx0cmVuZGVyKDxUaGluZyBuYW1lPVwib25lXCIgLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb28nKSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodm5vZGUsIHBhcmVudCwgbWVyZ2UpIHtcblx0cmV0dXJuIGRpZmYobWVyZ2UsIHZub2RlLCB7fSwgZmFsc2UsIHBhcmVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL3JlbmRlci5qcyIsInZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZShvLCBhdHRyLCB0eXBlLCB0ZXh0KSB7XG4gIHR5cGUgPSB0eXBlID09PSAnYXJyYXknID8gJ29iamVjdCcgOiB0eXBlO1xuICBpZiAobyAmJiB0eXBlb2Ygb1thdHRyXSAhPT0gdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YXJpYWJsZShvLCB0eXBlLCB0ZXh0KSB7XG4gIGlmICh0eXBlb2YgbyAhPT0gdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWx1ZShvLCB2YWx1ZXMsIHRleHQpIHtcbiAgaWYgKHZhbHVlcy5pbmRleE9mKG8pID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVjayhvLCBjb25maWcsIGF0dHJpYnV0ZXMpIHtcbiAgaWYgKCFjb25maWcub3B0aW9uYWwgfHwgbykge1xuICAgIHZhcmlhYmxlKG8sIGNvbmZpZy50eXBlLCBjb25maWcubWVzc2FnZSk7XG4gIH1cbiAgaWYgKGNvbmZpZy50eXBlID09PSAnb2JqZWN0JyAmJiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcblxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBrZXlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGEgPSBrZXlzW2luZGV4XTtcbiAgICAgIGlmICghYXR0cmlidXRlc1thXS5vcHRpb25hbCB8fCBvW2FdKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlc1thXS5jb25kaXRpb24gfHwgYXR0cmlidXRlc1thXS5jb25kaXRpb24obykpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUobywgYSwgYXR0cmlidXRlc1thXS50eXBlLCBhdHRyaWJ1dGVzW2FdLm1lc3NhZ2UpO1xuICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2FdLnZhbHVlcykge1xuICAgICAgICAgICAgdmFsdWUob1thXSwgYXR0cmlidXRlc1thXS52YWx1ZXMsIGF0dHJpYnV0ZXNbYV0udmFsdWVfbWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV3JhcCBgQXJyYXkuaXNBcnJheWAgUG9seWZpbGwgZm9yIElFOVxuICogc291cmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pc0FycmF5XG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyYXkpIHtcbiAgaWYgKHRoaXMuc3VwcG9ydHNJc0FycmF5KCkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSk7XG4gIH1cblxuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnJheSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzSXNBcnJheSgpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5ICE9IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2hlY2s6IGNoZWNrLFxuICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgdmFyaWFibGU6IHZhcmlhYmxlLFxuICB2YWx1ZTogdmFsdWUsXG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIHN1cHBvcnRzSXNBcnJheTogc3VwcG9ydHNJc0FycmF5XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvYXNzZXJ0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHJlZGlyZWN0KHVybCkge1xuICBnbG9iYWwud2luZG93LmxvY2F0aW9uID0gdXJsO1xufVxuXG5mdW5jdGlvbiBnZXREb2N1bWVudCgpIHtcbiAgcmV0dXJuIGdsb2JhbC53aW5kb3cuZG9jdW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgcmV0dXJuIGdsb2JhbC53aW5kb3c7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZWRpcmVjdDogcmVkaXJlY3QsXG4gIGdldERvY3VtZW50OiBnZXREb2N1bWVudCxcbiAgZ2V0V2luZG93OiBnZXRXaW5kb3dcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci93aW5kb3cuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ciwgb3B0aW9ucykge1xuXG4gICAgLy8gbWFrZSBzdXJlIHByb3RvY29sIGlzIGZvbGxvd2VkIGJ5IHR3byBzbGFzaGVzXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLzpcXC8vZywgJzovLycpO1xuXG4gICAgLy8gcmVtb3ZlIGNvbnNlY3V0aXZlIHNsYXNoZXNcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvKFteOlxcc10pXFwvKy9nLCAnJDEvJyk7XG5cbiAgICAvLyByZW1vdmUgdHJhaWxpbmcgc2xhc2ggYmVmb3JlIHBhcmFtZXRlcnMgb3IgaGFzaFxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXC8oXFw/fCZ8I1teIV0pL2csICckMScpO1xuXG4gICAgLy8gcmVwbGFjZSA/IGluIHBhcmFtZXRlcnMgd2l0aCAmXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyhcXD8uKylcXD8vZywgJyQxJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0ID0gYXJndW1lbnRzO1xuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIG5ldyBzeW50YXggd2l0aCBhcnJheSBhbmQgb3B0aW9uc1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBbXS5zbGljZS5jYWxsKGlucHV0LCAwKS5qb2luKCcvJyk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShqb2luZWQsIG9wdGlvbnMpO1xuICB9O1xuXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwtam9pbi9saWIvdXJsLWpvaW4uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGVycm9yID0gcmVxdWlyZSgnLi9lcnJvcicpO1xudmFyIG9iamVjdEhlbHBlciA9IHJlcXVpcmUoJy4vb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIHdyYXBDYWxsYmFjayhjYiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5pZ25vcmVDYXNpbmcgPSBvcHRpb25zLmlnbm9yZUNhc2luZyA/IG9wdGlvbnMuaWdub3JlQ2FzaW5nIDogZmFsc2U7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICB2YXIgZXJyT2JqO1xuXG4gICAgaWYgKCFlcnIgJiYgIWRhdGEpIHtcbiAgICAgIHJldHVybiBjYihlcnJvci5idWlsZFJlc3BvbnNlKCdnZW5lcmljX2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuICAgIH1cblxuICAgIGlmICghZXJyICYmIGRhdGEuZXJyKSB7XG4gICAgICBlcnIgPSBkYXRhLmVycjtcbiAgICAgIGRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghZXJyICYmIGRhdGEuZXJyb3IpIHtcbiAgICAgIGVyciA9IGRhdGE7XG4gICAgICBkYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICBlcnJPYmogPSB7XG4gICAgICAgIG9yaWdpbmFsOiBlcnJcbiAgICAgIH07XG5cbiAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLnN0YXR1c0NvZGUpIHtcbiAgICAgICAgZXJyT2JqLnN0YXR1c0NvZGUgPSBlcnIucmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2Uuc3RhdHVzVGV4dCkge1xuICAgICAgICBlcnJPYmouc3RhdHVzVGV4dCA9IGVyci5yZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5ib2R5KSB7XG4gICAgICAgIGVyciA9IGVyci5yZXNwb25zZS5ib2R5O1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyLmVycikge1xuICAgICAgICBlcnIgPSBlcnIuZXJyO1xuICAgICAgfVxuXG4gICAgICBlcnJPYmouY29kZSA9IGVyci5lcnJvciB8fCBlcnIuY29kZSB8fCBlcnIuZXJyb3JfY29kZSB8fCBlcnIuc3RhdHVzIHx8IG51bGw7XG4gICAgICBlcnJPYmouZGVzY3JpcHRpb24gPSBlcnIuZXJyb3JEZXNjcmlwdGlvbiB8fCBlcnIuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyLmRlc2NyaXB0aW9uIHx8IGVyci5lcnJvciB8fCBlcnIuZGV0YWlscyB8fCBlcnIuZXJyIHx8IG51bGw7XG5cbiAgICAgIGlmIChlcnIubmFtZSkge1xuICAgICAgICBlcnJPYmoubmFtZSA9IGVyci5uYW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyLnBvbGljeSkge1xuICAgICAgICBlcnJPYmoucG9saWN5ID0gZXJyLnBvbGljeTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNiKGVyck9iaik7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEudHlwZSAmJiAoZGF0YS50eXBlID09PSAndGV4dC9odG1sJyB8fCBkYXRhLnR5cGUgPT09ICd0ZXh0L3BsYWluJykpIHtcbiAgICAgIHJldHVybiBjYihudWxsLCBkYXRhLnRleHQpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZUNhc2luZykge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIGRhdGEuYm9keSB8fCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2IobnVsbCwgb2JqZWN0SGVscGVyLnRvQ2FtZWxDYXNlKGRhdGEuYm9keSB8fCBkYXRhKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcENhbGxiYWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcmVzcG9uc2UtaGFuZGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbmZ1bmN0aW9uIFdhcm4ob3B0aW9ucykge1xuICB0aGlzLmRpc2FibGVXYXJuaW5ncyA9IG9wdGlvbnMuZGlzYWJsZVdhcm5pbmdzO1xufVxuXG5XYXJuLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgaWYgKHRoaXMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXYXJuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvd2Fybi5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcXMvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgYXV0aDAgZnJvbSAnYXV0aDAtanMnO1xuXG5jb25zdCB3ZWJBdXRoID0gbmV3IGF1dGgwLldlYkF1dGgoe1xuICBkb21haW46IHByb2Nlc3MuZW52LkFVVEgwX0JBU0VVUkwsXG4gIGNsaWVudElEOiBwcm9jZXNzLmVudi5BVVRIMF9BUFBfSUQsXG4gIHJlZGlyZWN0VXJpOiBgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fS9sb2dpbmAsXG4gIHJlc3BvbnNlVHlwZTogJ3Rva2VuJyxcbiAgc2NvcGU6ICdvcGVuaWQgZW1haWwnXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luKCkge1xuICB3ZWJBdXRoLmF1dGhvcml6ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KCkge1xuICB3ZWJBdXRoLmxvZ291dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlcihoYXNoOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZWJBdXRoLnBhcnNlSGFzaChoYXNoLCAoZXJyLCBhdXRoUmVzdWx0KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuXG4gICAgICBmZXRjaCgnL2FwaS9wdWJsaWMvdXNlcnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgdG9rZW46IGF1dGhSZXN1bHQuaWRUb2tlblxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkVG9rZW4nLCBhdXRoUmVzdWx0LmlkVG9rZW4pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgYXV0aFJlc3VsdC5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IHVzZXIsIHdhdGNobGlzdCB9KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICB1c2VyLFxuICAgICAgICAgICAgd2F0Y2hsaXN0LFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IGF1dGhSZXN1bHQuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBpZFRva2VuOiBhdXRoUmVzdWx0LmlkVG9rZW5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckluZm8oaWRUb2tlbjogc3RyaW5nKSB7XG4gIHJldHVybiBmZXRjaCgnL2FwaS9wdWJsaWMvdXNlcnMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgdG9rZW46IGlkVG9rZW5cbiAgICB9KVxuICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQaWN0dXJlKGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlYkF1dGguY2xpZW50LnVzZXJJbmZvKGFjY2Vzc1Rva2VuLCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICByZXNvbHZlKHVzZXIucGljdHVyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvbGliL2F1dGguanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XG52YXIgYmFzZTY0VXJsID0gcmVxdWlyZSgnLi9iYXNlNjRfdXJsJyk7XG52YXIgdmVyc2lvbiA9IHJlcXVpcmUoJy4uL3ZlcnNpb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFJlcXVlc3RXcmFwcGVyXG5cbmZ1bmN0aW9uIFJlcXVlc3RXcmFwcGVyKHJlcSkge1xuICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gIHRoaXMubWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgdGhpcy51cmwgPSByZXEudXJsO1xuICB0aGlzLmJvZHkgPSByZXEuX2RhdGE7XG4gIHRoaXMuaGVhZGVycyA9IHJlcS5faGVhZGVyO1xufVxuXG5SZXF1ZXN0V3JhcHBlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVxdWVzdC5hYm9ydCgpO1xufTtcblxuUmVxdWVzdFdyYXBwZXIucHJvdG90eXBlLmdldE1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubWV0aG9kO1xufTtcblxuUmVxdWVzdFdyYXBwZXIucHJvdG90eXBlLmdldEJvZHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmJvZHk7XG59O1xuXG5SZXF1ZXN0V3JhcHBlci5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy51cmw7XG59O1xuXG5SZXF1ZXN0V3JhcHBlci5wcm90b3R5cGUuZ2V0SGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaGVhZGVycztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBSZXF1ZXN0T2JqXG5cbmZ1bmN0aW9uIFJlcXVlc3RPYmoocmVxKSB7XG4gIHRoaXMucmVxdWVzdCA9IHJlcTtcbn1cblxuUmVxdWVzdE9iai5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdGhpcy5yZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0T2JqLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGJvZHkpIHtcbiAgdGhpcy5yZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0LnNlbmQoYm9keSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdE9iai5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlcXVlc3QgPSB0aGlzLnJlcXVlc3Qud2l0aENyZWRlbnRpYWxzKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdE9iai5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGNiKSB7XG4gIHRoaXMucmVxdWVzdCA9IHRoaXMucmVxdWVzdC5lbmQoY2IpO1xuICByZXR1cm4gbmV3IFJlcXVlc3RXcmFwcGVyKHRoaXMucmVxdWVzdCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUmVxdWVzdEJ1aWxkZXJcblxuZnVuY3Rpb24gUmVxdWVzdEJ1aWxkZXIob3B0aW9ucykge1xuICB0aGlzLl9zZW5kVGVsZW1ldHJ5ID0gb3B0aW9ucy5fc2VuZFRlbGVtZXRyeSA9PT0gZmFsc2UgPyBvcHRpb25zLl9zZW5kVGVsZW1ldHJ5IDogdHJ1ZTtcbiAgdGhpcy5fdGVsZW1ldHJ5SW5mbyA9IG9wdGlvbnMuX3RlbGVtZXRyeUluZm8gfHwgbnVsbDtcbiAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xufVxuXG5SZXF1ZXN0QnVpbGRlci5wcm90b3R5cGUuc2V0Q29tbW9uQ29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIChvbmdvaW5nUmVxdWVzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAob3B0aW9ucy5ub0hlYWRlcnMpIHtcbiAgICByZXR1cm4gb25nb2luZ1JlcXVlc3Q7XG4gIH1cblxuICB2YXIgaGVhZGVycyA9IHRoaXMuaGVhZGVycztcbiAgb25nb2luZ1JlcXVlc3QgPSBvbmdvaW5nUmVxdWVzdC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpO1xuXG4gIGZvciAodmFyIGEgPSAwOyBhIDwga2V5cy5sZW5ndGg7IGErKykge1xuICAgIG9uZ29pbmdSZXF1ZXN0ID0gb25nb2luZ1JlcXVlc3Quc2V0KGtleXNbYV0sIGhlYWRlcnNba2V5c1thXV0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3NlbmRUZWxlbWV0cnkpIHtcbiAgICBvbmdvaW5nUmVxdWVzdCA9IG9uZ29pbmdSZXF1ZXN0LnNldCgnQXV0aDAtQ2xpZW50JywgdGhpcy5nZXRUZWxlbWV0cnlEYXRhKCkpO1xuICB9XG4gIHJldHVybiBvbmdvaW5nUmVxdWVzdDtcbn07XG5cblJlcXVlc3RCdWlsZGVyLnByb3RvdHlwZS5nZXRUZWxlbWV0cnlEYXRhID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2xpZW50SW5mbyA9IHRoaXMuX3RlbGVtZXRyeUluZm8gfHwgeyBuYW1lOiAnYXV0aDAuanMnLCB2ZXJzaW9uOiB2ZXJzaW9uLnJhdyB9O1xuICB2YXIganNvbkNsaWVudEluZm8gPSBKU09OLnN0cmluZ2lmeShjbGllbnRJbmZvKTtcbiAgcmV0dXJuIGJhc2U2NFVybC5lbmNvZGUoanNvbkNsaWVudEluZm8pO1xufTtcblxuUmVxdWVzdEJ1aWxkZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0T2JqKHRoaXMuc2V0Q29tbW9uQ29uZmlndXJhdGlvbihyZXF1ZXN0LmdldCh1cmwpLCBvcHRpb25zKSk7XG59O1xuXG5SZXF1ZXN0QnVpbGRlci5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0T2JqKHRoaXMuc2V0Q29tbW9uQ29uZmlndXJhdGlvbihyZXF1ZXN0LnBvc3QodXJsKSwgb3B0aW9ucykpO1xufTtcblxuUmVxdWVzdEJ1aWxkZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFJlcXVlc3RPYmoodGhpcy5zZXRDb21tb25Db25maWd1cmF0aW9uKHJlcXVlc3QucGF0Y2godXJsKSwgb3B0aW9ucykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QnVpbGRlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL3JlcXVlc3QtYnVpbGRlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgcmF3OiAnOC42LjAnIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG51bGwgIT09IG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdXBlcmFnZW50L2xpYi9pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IFNob3csIFJlc3VsdCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hTaG93cyhpZFRva2VuOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFNob3c+PiB7XG4gIHJldHVybiBmZXRjaCgnL2FwaS9zaG93cycsIHtcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2lkVG9rZW59YFxuICAgIH1cbiAgfSkudGhlbihyZXNwID0+IHtcbiAgICBpZiAocmVzcC5vaykge1xuICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwLnN0YXR1c1RleHQpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFNob3dzKHRlcm06IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdWx0Pj4ge1xuICByZXR1cm4gZmV0Y2goYC9hcGkvcHVibGljL3NlYXJjaD9xdWVyeT0ke3Rlcm19YClcbiAgICAudGhlbihyZXNwID0+IHtcbiAgICAgIGlmIChyZXNwLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwLmpzb24oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3Auc3RhdHVzVGV4dCk7XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UucmVzdWx0cztcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9saWIvYWN0aW9ucy5qcyIsInZhciB1cmxqb2luID0gcmVxdWlyZSgndXJsLWpvaW4nKTtcblxudmFyIFJlcXVlc3RCdWlsZGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL3JlcXVlc3QtYnVpbGRlcicpO1xudmFyIHFzID0gcmVxdWlyZSgncXMnKTtcbnZhciBvYmplY3RIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvb2JqZWN0Jyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vaGVscGVyL2Fzc2VydCcpO1xudmFyIHJlc3BvbnNlSGFuZGxlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9yZXNwb25zZS1oYW5kbGVyJyk7XG52YXIgcGFyYW1ldGVyc1doaXRlbGlzdCA9IHJlcXVpcmUoJy4uL2hlbHBlci9wYXJhbWV0ZXJzLXdoaXRlbGlzdCcpO1xudmFyIFdhcm4gPSByZXF1aXJlKCcuLi9oZWxwZXIvd2FybicpO1xuXG52YXIgUGFzc3dvcmRsZXNzQXV0aGVudGljYXRpb24gPSByZXF1aXJlKCcuL3Bhc3N3b3JkbGVzcy1hdXRoZW50aWNhdGlvbicpO1xudmFyIERCQ29ubmVjdGlvbiA9IHJlcXVpcmUoJy4vZGItY29ubmVjdGlvbicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgQXV0aDAgQXV0aGVudGljYXRpb24gQVBJIGNsaWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZG9tYWluIHlvdXIgQXV0aDAgZG9tYWluXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5jbGllbnRJRCB5b3VyIEF1dGgwIGNsaWVudCBpZGVudGlmaWVyIG9idGFpbmVkIHdoZW4gY3JlYXRpbmcgdGhlIGNsaWVudCBpbiB0aGUgQXV0aDAgRGFzaGJvYXJkXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVkaXJlY3RVcmldIHVybCB0aGF0IHRoZSBBdXRoMCB3aWxsIHJlZGlyZWN0IGFmdGVyIEF1dGggd2l0aCB0aGUgQXV0aG9yaXphdGlvbiBSZXNwb25zZVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlc3BvbnNlVHlwZV0gdHlwZSBvZiB0aGUgcmVzcG9uc2UgdXNlZCBieSBPQXV0aCAyLjAgZmxvdy4gSXQgY2FuIGJlIGFueSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0aGUgdmFsdWVzIGBjb2RlYCwgYHRva2VuYCwgYGlkX3Rva2VuYC4ge0BsaW5rIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vYXV0aC12Mi1tdWx0aXBsZS1yZXNwb25zZS10eXBlcy0xXzB9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVzcG9uc2VNb2RlXSBob3cgdGhlIEF1dGggcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAsIGBmcmFnbWVudGAgYW5kIGBmb3JtX3Bvc3RgLiB7QGxpbmsgaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMC5odG1sI1Jlc3BvbnNlTW9kZXN9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2NvcGVdIHNjb3BlcyB0byBiZSByZXF1ZXN0ZWQgZHVyaW5nIEF1dGguIGUuZy4gYG9wZW5pZCBlbWFpbGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5hdWRpZW5jZV0gaWRlbnRpZmllciBvZiB0aGUgcmVzb3VyY2Ugc2VydmVyIHdobyB3aWxsIGNvbnN1bWUgdGhlIGFjY2VzcyB0b2tlbiBpc3N1ZWQgYWZ0ZXIgQXV0aFxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvYXV0aGVudGljYXRpb259XG4gKi9cbmZ1bmN0aW9uIEF1dGhlbnRpY2F0aW9uKG9wdGlvbnMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgYXNzZXJ0LmNoZWNrKG9wdGlvbnMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBkb21haW46IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdkb21haW4gb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIGNsaWVudElEOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnY2xpZW50SUQgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHJlc3BvbnNlVHlwZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdyZXNwb25zZVR5cGUgaXMgbm90IHZhbGlkJyB9LFxuICAgIHJlc3BvbnNlTW9kZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdyZXNwb25zZU1vZGUgaXMgbm90IHZhbGlkJyB9LFxuICAgIHJlZGlyZWN0VXJpOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3JlZGlyZWN0VXJpIGlzIG5vdCB2YWxpZCcgfSxcbiAgICBzY29wZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdzY29wZSBpcyBub3QgdmFsaWQnIH0sXG4gICAgYXVkaWVuY2U6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnYXVkaWVuY2UgaXMgbm90IHZhbGlkJyB9LFxuICAgIF9kaXNhYmxlRGVwcmVjYXRpb25XYXJuaW5nczogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ2Jvb2xlYW4nLCBtZXNzYWdlOiAnX2Rpc2FibGVEZXByZWNhdGlvbldhcm5pbmdzIG9wdGlvbiBpcyBub3QgdmFsaWQnIH0sXG4gICAgX3NlbmRUZWxlbWV0cnk6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdib29sZWFuJywgbWVzc2FnZTogJ19zZW5kVGVsZW1ldHJ5IG9wdGlvbiBpcyBub3QgdmFsaWQnIH0sXG4gICAgX3RlbGVtZXRyeUluZm86IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnX3RlbGVtZXRyeUluZm8gb3B0aW9uIGlzIG5vdCB2YWxpZCcgfVxuICB9KTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIHRoaXMuYmFzZU9wdGlvbnMgPSBvcHRpb25zO1xuXG4gIHRoaXMuYmFzZU9wdGlvbnMuX3NlbmRUZWxlbWV0cnkgPSB0aGlzLmJhc2VPcHRpb25zLl9zZW5kVGVsZW1ldHJ5ID09PSBmYWxzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlT3B0aW9ucy5fc2VuZFRlbGVtZXRyeSA6IHRydWU7XG5cbiAgdGhpcy5iYXNlT3B0aW9ucy5yb290VXJsID0gJ2h0dHBzOi8vJyArIHRoaXMuYmFzZU9wdGlvbnMuZG9tYWluO1xuXG4gIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0QnVpbGRlcih0aGlzLmJhc2VPcHRpb25zKTtcblxuICB0aGlzLnBhc3N3b3JkbGVzcyA9IG5ldyBQYXNzd29yZGxlc3NBdXRoZW50aWNhdGlvbih0aGlzLnJlcXVlc3QsIHRoaXMuYmFzZU9wdGlvbnMpO1xuICB0aGlzLmRiQ29ubmVjdGlvbiA9IG5ldyBEQkNvbm5lY3Rpb24odGhpcy5yZXF1ZXN0LCB0aGlzLmJhc2VPcHRpb25zKTtcblxuICB0aGlzLndhcm4gPSBuZXcgV2Fybih7XG4gICAgZGlzYWJsZVdhcm5pbmdzOiAhIW9wdGlvbnMuX2Rpc2FibGVEZXByZWNhdGlvbldhcm5pbmdzXG4gIH0pO1xufVxuXG4vKipcbiAqIEJ1aWxkcyBhbmQgcmV0dXJucyB0aGUgYC9hdXRob3JpemVgIHVybCBpbiBvcmRlciB0byBpbml0aWFsaXplIGEgbmV3IGF1dGhOL2F1dGhaIHRyYW5zYWN0aW9uXG4gKlxuICogQG1ldGhvZCBidWlsZEF1dGhvcml6ZVVybFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5kb21haW5dIHlvdXIgQXV0aDAgZG9tYWluXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY2xpZW50SURdIHlvdXIgQXV0aDAgY2xpZW50IGlkZW50aWZpZXIgb2J0YWluZWQgd2hlbiBjcmVhdGluZyB0aGUgY2xpZW50IGluIHRoZSBBdXRoMCBEYXNoYm9hcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnJlZGlyZWN0VXJpIHVybCB0aGF0IHRoZSBBdXRoMCB3aWxsIHJlZGlyZWN0IGFmdGVyIEF1dGggd2l0aCB0aGUgQXV0aG9yaXphdGlvbiBSZXNwb25zZVxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucmVzcG9uc2VUeXBlIHR5cGUgb2YgdGhlIHJlc3BvbnNlIHVzZWQgYnkgT0F1dGggMi4wIGZsb3cuIEl0IGNhbiBiZSBhbnkgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgdGhlIHZhbHVlcyBgY29kZWAsIGB0b2tlbmAsIGBpZF90b2tlbmAuIHtAbGluayBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb2F1dGgtdjItbXVsdGlwbGUtcmVzcG9uc2UtdHlwZXMtMV8wfVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlc3BvbnNlTW9kZV0gaG93IHRoZSBBdXRoIHJlc3BvbnNlIGlzIGVuY29kZWQgYW5kIHJlZGlyZWN0ZWQgYmFjayB0byB0aGUgY2xpZW50LiBTdXBwb3J0ZWQgdmFsdWVzIGFyZSBgcXVlcnlgLCBgZnJhZ21lbnRgIGFuZCBgZm9ybV9wb3N0YC4ge0BsaW5rIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vYXV0aC12Mi1tdWx0aXBsZS1yZXNwb25zZS10eXBlcy0xXzAuaHRtbCNSZXNwb25zZU1vZGVzfVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnN0YXRlXSB2YWx1ZSB1c2VkIHRvIG1pdGlnYXRlIFhTUkYgYXR0YWNrcy4ge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvcHJvdG9jb2xzL29hdXRoMi9vYXV0aC1zdGF0ZX1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5ub25jZV0gdmFsdWUgdXNlZCB0byBtaXRpZ2F0ZSByZXBsYXkgYXR0YWNrcyB3aGVuIHVzaW5nIEltcGxpY2l0IEdyYW50LiB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGktYXV0aC90dXRvcmlhbHMvbm9uY2V9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2NvcGVdIHNjb3BlcyB0byBiZSByZXF1ZXN0ZWQgZHVyaW5nIEF1dGguIGUuZy4gYG9wZW5pZCBlbWFpbGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5hdWRpZW5jZV0gaWRlbnRpZmllciBvZiB0aGUgcmVzb3VyY2Ugc2VydmVyIHdobyB3aWxsIGNvbnN1bWUgdGhlIGFjY2VzcyB0b2tlbiBpc3N1ZWQgYWZ0ZXIgQXV0aFxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvYXV0aGVudGljYXRpb24jYXV0aG9yaXplLWNsaWVudH1cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpL2F1dGhlbnRpY2F0aW9uI3NvY2lhbH1cbiAqL1xuQXV0aGVudGljYXRpb24ucHJvdG90eXBlLmJ1aWxkQXV0aG9yaXplVXJsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIHBhcmFtcztcbiAgdmFyIHFTdHJpbmc7XG5cbiAgYXNzZXJ0LmNoZWNrKG9wdGlvbnMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuXG4gIHBhcmFtcyA9IG9iamVjdEhlbHBlci5tZXJnZSh0aGlzLmJhc2VPcHRpb25zLCBbXG4gICAgJ2NsaWVudElEJyxcbiAgICAncmVzcG9uc2VUeXBlJyxcbiAgICAncmVzcG9uc2VNb2RlJyxcbiAgICAncmVkaXJlY3RVcmknLFxuICAgICdzY29wZScsXG4gICAgJ2F1ZGllbmNlJ1xuICBdKS53aXRoKG9wdGlvbnMpO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGFzc2VydC5jaGVjayhwYXJhbXMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBjbGllbnRJRDogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2NsaWVudElEIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICByZWRpcmVjdFVyaTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdyZWRpcmVjdFVyaSBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgcmVzcG9uc2VUeXBlOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncmVzcG9uc2VUeXBlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBub25jZTogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ25vbmNlIG9wdGlvbiBpcyByZXF1aXJlZCcsIGNvbmRpdGlvbjogZnVuY3Rpb24obykge1xuICAgICAgcmV0dXJuIG8ucmVzcG9uc2VUeXBlLmluZGV4T2YoJ2NvZGUnKSA9PT0gLTEgJiYgby5yZXNwb25zZVR5cGUuaW5kZXhPZignaWRfdG9rZW4nKSAhPT0gLTE7XG4gICAgfSB9LFxuICAgIHNjb3BlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Njb3BlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBhdWRpZW5jZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhdWRpZW5jZSBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgaWYgKHRoaXMuYmFzZU9wdGlvbnMuX3NlbmRUZWxlbWV0cnkpIHtcbiAgICBwYXJhbXMuYXV0aDBDbGllbnQgPSB0aGlzLnJlcXVlc3QuZ2V0VGVsZW1ldHJ5RGF0YSgpO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5jb25uZWN0aW9uX3Njb3BlICYmIGFzc2VydC5pc0FycmF5KHBhcmFtcy5jb25uZWN0aW9uX3Njb3BlKSkge1xuICAgIHBhcmFtcy5jb25uZWN0aW9uX3Njb3BlID0gcGFyYW1zLmNvbm5lY3Rpb25fc2NvcGUuam9pbignLCcpO1xuICB9XG5cbiAgcGFyYW1zID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKHBhcmFtcywgWydhdXRoMENsaWVudCddKTtcbiAgcGFyYW1zID0gcGFyYW1ldGVyc1doaXRlbGlzdC5vYXV0aEF1dGhvcml6ZVBhcmFtcyh0aGlzLndhcm4sIHBhcmFtcyk7XG5cbiAgcVN0cmluZyA9IHFzLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gIHJldHVybiB1cmxqb2luKHRoaXMuYmFzZU9wdGlvbnMucm9vdFVybCwgJ2F1dGhvcml6ZScsICc/JyArIHFTdHJpbmcpO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgYW5kIHJldHVybnMgdGhlIExvZ291dCB1cmwgaW4gb3JkZXIgdG8gaW5pdGlhbGl6ZSBhIG5ldyBhdXRoTi9hdXRoWiB0cmFuc2FjdGlvblxuICpcbiAqIElmIHlvdSB3YW50IHRvIG5hdmlnYXRlIHRoZSB1c2VyIHRvIGEgc3BlY2lmaWMgVVJMIGFmdGVyIHRoZSBsb2dvdXQsIHNldCB0aGF0IFVSTCBhdCB0aGUgcmV0dXJuVG8gcGFyYW1ldGVyLiBUaGUgVVJMIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhbnkgdGhlIGFwcHJvcHJpYXRlIEFsbG93ZWQgTG9nb3V0IFVSTHMgbGlzdDpcbiAqXG4gKiAtIElmIHRoZSBjbGllbnRfaWQgcGFyYW1ldGVyIGlzIGluY2x1ZGVkLCB0aGUgcmV0dXJuVG8gVVJMIG11c3QgYmUgbGlzdGVkIGluIHRoZSBBbGxvd2VkIExvZ291dCBVUkxzIHNldCBhdCB0aGUgY2xpZW50IGxldmVsIChzZWUgU2V0dGluZyBBbGxvd2VkIExvZ291dCBVUkxzIGF0IHRoZSBBcHAgTGV2ZWwpLlxuICogLSBJZiB0aGUgY2xpZW50X2lkIHBhcmFtZXRlciBpcyBOT1QgaW5jbHVkZWQsIHRoZSByZXR1cm5UbyBVUkwgbXVzdCBiZSBsaXN0ZWQgaW4gdGhlIEFsbG93ZWQgTG9nb3V0IFVSTHMgc2V0IGF0IHRoZSBhY2NvdW50IGxldmVsIChzZWUgU2V0dGluZyBBbGxvd2VkIExvZ291dCBVUkxzIGF0IHRoZSBBY2NvdW50IExldmVsKS5cbiAqIEBtZXRob2QgYnVpbGRMb2dvdXRVcmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY2xpZW50SURdIGlkZW50aWZpZXIgb2YgeW91ciBjbGllbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXR1cm5Ub10gVVJMIHRvIGJlIHJlZGlyZWN0ZWQgYWZ0ZXIgdGhlIGxvZ291dFxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5mZWRlcmF0ZWRdIHRlbGxzIEF1dGgwIGlmIGl0IHNob3VsZCBsb2dvdXQgdGhlIHVzZXIgYWxzbyBmcm9tIHRoZSBJZFAuXG4gKiBAc2VlIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNsb2dvdXR9XG4gKi9cbkF1dGhlbnRpY2F0aW9uLnByb3RvdHlwZS5idWlsZExvZ291dFVybCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBwYXJhbXM7XG4gIHZhciBxU3RyaW5nO1xuXG4gIGFzc2VydC5jaGVjayhvcHRpb25zLCB7XG4gICAgb3B0aW9uYWw6IHRydWUsXG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCdcbiAgfSk7XG5cbiAgcGFyYW1zID0gb2JqZWN0SGVscGVyLm1lcmdlKHRoaXMuYmFzZU9wdGlvbnMsIFsnY2xpZW50SUQnXSlcbiAgICAgICAgICAgICAgICAud2l0aChvcHRpb25zIHx8IHt9KTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgaWYgKHRoaXMuYmFzZU9wdGlvbnMuX3NlbmRUZWxlbWV0cnkpIHtcbiAgICBwYXJhbXMuYXV0aDBDbGllbnQgPSB0aGlzLnJlcXVlc3QuZ2V0VGVsZW1ldHJ5RGF0YSgpO1xuICB9XG5cbiAgcGFyYW1zID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKHBhcmFtcywgWydhdXRoMENsaWVudCcsICdyZXR1cm5UbyddKTtcblxuICBxU3RyaW5nID0gcXMuc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgcmV0dXJuIHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAndjInLCAnbG9nb3V0JywgJz8nICsgcVN0cmluZyk7XG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBhdXRob3JpemVDYWxsYmFja1xuICogQHBhcmFtIHtFcnJvcn0gW2Vycl0gZXJyb3IgcmV0dXJuZWQgYnkgQXV0aDAgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBBdXRoIGZhaWx1cmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzdWx0XSByZXN1bHQgb2YgdGhlIEF1dGggcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IFtyZXN1bHQuYWNjZXNzVG9rZW5dIHRva2VuIHRoYXQgYWxsb3dzIGFjY2VzcyB0byB0aGUgc3BlY2lmaWVkIHJlc291cmNlIHNlcnZlciAoaWRlbnRpZmllZCBieSB0aGUgYXVkaWVuY2UgcGFyYW1ldGVyIG9yIGJ5IGRlZmF1bHQgQXV0aDAncyAvdXNlcmluZm8gZW5kcG9pbnQpXG4gKiBAcGFyYW0ge051bWJlcn0gW3Jlc3VsdC5leHBpcmVzSW5dIG51bWJlciBvZiBzZWNvbmRzIHVudGlsIHRoZSBhY2Nlc3MgdG9rZW4gZXhwaXJlc1xuICogQHBhcmFtIHtTdHJpbmd9IFtyZXN1bHQuaWRUb2tlbl0gdG9rZW4gdGhhdCBpZGVudGlmaWVzIHRoZSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Jlc3VsdC5yZWZyZXNoVG9rZW5dIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IG5ldyBhY2Nlc3MgdG9rZW5zIGZyb20gQXV0aDAuIE5vdGUgdGhhdCBub3QgYWxsIGNsaWVudHMgY2FuIHJlcXVlc3QgdGhlbSBvciB0aGUgcmVzb3VyY2Ugc2VydmVyIG1pZ2h0IG5vdCBhbGxvdyB0aGVtLlxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHRva2VuQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3J9IFtlcnJdIGVycm9yIHJldHVybmVkIGJ5IEF1dGgwIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgQXV0aCBmYWlsdXJlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3VsdF0gcmVzdWx0IG9mIHRoZSBBdXRoIHJlcXVlc3RcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXN1bHQuYWNjZXNzVG9rZW4gdG9rZW4gdGhhdCBhbGxvd3MgYWNjZXNzIHRvIHRoZSBzcGVjaWZpZWQgcmVzb3VyY2Ugc2VydmVyIChpZGVudGlmaWVkIGJ5IHRoZSBhdWRpZW5jZSBwYXJhbWV0ZXIgb3IgYnkgZGVmYXVsdCBBdXRoMCdzIC91c2VyaW5mbyBlbmRwb2ludClcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXN1bHQuZXhwaXJlc0luIG51bWJlciBvZiBzZWNvbmRzIHVudGlsIHRoZSBhY2Nlc3MgdG9rZW4gZXhwaXJlc1xuICogQHBhcmFtIHtTdHJpbmd9IFtyZXN1bHQuaWRUb2tlbl0gdG9rZW4gdGhhdCBpZGVudGlmaWVzIHRoZSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Jlc3VsdC5yZWZyZXNoVG9rZW5dIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IG5ldyBhY2Nlc3MgdG9rZW5zIGZyb20gQXV0aDAuIE5vdGUgdGhhdCBub3QgYWxsIGNsaWVudHMgY2FuIHJlcXVlc3QgdGhlbSBvciB0aGUgcmVzb3VyY2Ugc2VydmVyIG1pZ2h0IG5vdCBhbGxvdyB0aGVtLlxuICovXG5cbi8qKlxuICogTWFrZXMgYSBjYWxsIHRvIHRoZSBgb2F1dGgvdG9rZW5gIGVuZHBvaW50IHdpdGggYHBhc3N3b3JkYCBncmFudCB0eXBlIHRvIGxvZ2luIHRvIHRoZSBkZWZhdWx0IGRpcmVjdG9yeS5cbiAqXG4gKiBAbWV0aG9kIGxvZ2luV2l0aERlZmF1bHREaXJlY3RvcnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy51c2VybmFtZSBlbWFpbCBvciB1c2VybmFtZSBvZiB0aGUgdXNlciB0aGF0IHdpbGwgcGVyZm9ybSBBdXRoXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5wYXNzd29yZCB0aGUgcGFzc3dvcmQgb2YgdGhlIHVzZXIgdGhhdCB3aWxsIHBlcmZvcm0gQXV0aFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnNjb3BlXSBzY29wZXMgdG8gYmUgcmVxdWVzdGVkIGR1cmluZyBBdXRoLiBlLmcuIGBvcGVuaWQgZW1haWxgXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYXVkaWVuY2VdIGlkZW50aWZpZXIgb2YgdGhlIHJlc291cmNlIHNlcnZlciB3aG8gd2lsbCBjb25zdW1lIHRoZSBhY2Nlc3MgdG9rZW4gaXNzdWVkIGFmdGVyIEF1dGhcbiAqIEBwYXJhbSB7dG9rZW5DYWxsYmFja30gY2IgZnVuY3Rpb24gY2FsbGVkIHdpdGggdGhlIHJlc3VsdCBvZiB0aGUgcmVxdWVzdFxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS1hdXRoL2dyYW50L3Bhc3N3b3JkfVxuICovXG5BdXRoZW50aWNhdGlvbi5wcm90b3R5cGUubG9naW5XaXRoRGVmYXVsdERpcmVjdG9yeSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgIHVzZXJuYW1lOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAndXNlcm5hbWUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHBhc3N3b3JkOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncGFzc3dvcmQgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHNjb3BlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Njb3BlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBhdWRpZW5jZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhdWRpZW5jZSBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG5cbiAgb3B0aW9ucy5ncmFudFR5cGUgPSAncGFzc3dvcmQnO1xuXG4gIHJldHVybiB0aGlzLm9hdXRoVG9rZW4ob3B0aW9ucywgY2IpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhIGNhbGwgdG8gdGhlIGBvYXV0aC90b2tlbmAgZW5kcG9pbnQgd2l0aCBgcGFzc3dvcmQtcmVhbG1gIGdyYW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kIGxvZ2luXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudXNlcm5hbWUgZW1haWwgb3IgdXNlcm5hbWUgb2YgdGhlIHVzZXIgdGhhdCB3aWxsIHBlcmZvcm0gQXV0aFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGFzc3dvcmQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHRoYXQgd2lsbCBwZXJmb3JtIEF1dGhcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aC4gZS5nLiBgb3BlbmlkIGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF1ZGllbmNlXSBpZGVudGlmaWVyIG9mIHRoZSByZXNvdXJjZSBzZXJ2ZXIgd2hvIHdpbGwgY29uc3VtZSB0aGUgYWNjZXNzIHRva2VuIGlzc3VlZCBhZnRlciBBdXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5yZWFsbSB0aGUgSFJEIGRvbWFpbiBvciB0aGUgY29ubmVjdGlvbiBuYW1lIHdoZXJlIHRoZSB1c2VyIGJlbG9uZ3MgdG8uIGUuZy4gYFVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uYFxuICogQHBhcmFtIHt0b2tlbkNhbGxiYWNrfSBjYiBmdW5jdGlvbiBjYWxsZWQgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSByZXF1ZXN0XG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpLWF1dGgvZ3JhbnQvcGFzc3dvcmR9XG4gKi9cbkF1dGhlbnRpY2F0aW9uLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgIHVzZXJuYW1lOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAndXNlcm5hbWUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHBhc3N3b3JkOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncGFzc3dvcmQgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHJlYWxtOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncmVhbG0gb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHNjb3BlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Njb3BlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBhdWRpZW5jZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhdWRpZW5jZSBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG5cbiAgb3B0aW9ucy5ncmFudFR5cGUgPSAnaHR0cDovL2F1dGgwLmNvbS9vYXV0aC9ncmFudC10eXBlL3Bhc3N3b3JkLXJlYWxtJztcblxuICByZXR1cm4gdGhpcy5vYXV0aFRva2VuKG9wdGlvbnMsIGNiKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYSBjYWxsIHRvIHRoZSBgb2F1dGgvdG9rZW5gIGVuZHBvaW50XG4gKlxuICogQG1ldGhvZCBvYXV0aFRva2VuXG4gKiBAcHJpdmF0ZVxuICovXG5BdXRoZW50aWNhdGlvbi5wcm90b3R5cGUub2F1dGhUb2tlbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgdXJsO1xuICB2YXIgYm9keTtcblxuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdvYXV0aCcsICd0b2tlbicpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3Njb3BlJyxcbiAgICAnYXVkaWVuY2UnXG4gIF0pLndpdGgob3B0aW9ucyk7XG5cbiAgYXNzZXJ0LmNoZWNrKGJvZHksIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBjbGllbnRJRDogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2NsaWVudElEIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBncmFudFR5cGU6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdncmFudFR5cGUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHNjb3BlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Njb3BlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBhdWRpZW5jZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhdWRpZW5jZSBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG5cbiAgYm9keSA9IG9iamVjdEhlbHBlci50b1NuYWtlQ2FzZShib2R5LCBbJ2F1dGgwQ2xpZW50J10pO1xuICBib2R5ID0gcGFyYW1ldGVyc1doaXRlbGlzdC5vYXV0aFRva2VuUGFyYW1zKHRoaXMud2FybiwgYm9keSk7XG5cbiAgYm9keS5ncmFudF90eXBlID0gYm9keS5ncmFudF90eXBlO1xuXG4gIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAucG9zdCh1cmwpXG4gICAgLnNlbmQoYm9keSlcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYikpO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhdXRoZW50aWNhdGlvbiBjYWxsaW5nIGAvb2F1dGgvcm9gIGVuZHBvaW50IHdpdGggdXNlcm5hbWVcbiAqIGFuZCBwYXNzd29yZCBmb3IgYSBnaXZlbiBjb25uZWN0aW9uIG5hbWUuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBBUEkgQXV0aCBzbyBpZiB5b3UgbmVlZCB0byBmZXRjaCBBUEkgdG9rZW5zIHdpdGggYXVkaWVuY2VcbiAqIHlvdSBzaG91bGQgdXNlIHtAbGluayBsb2dpbn0gb3Ige0BsaW5rIGxvZ2luV2l0aERlZmF1bHREaXJlY3Rvcnl9LlxuICpcbiAqIEBtZXRob2QgbG9naW5XaXRoUmVzb3VyY2VPd25lclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnVzZXJuYW1lIGVtYWlsIG9yIHVzZXJuYW1lIG9mIHRoZSB1c2VyIHRoYXQgd2lsbCBwZXJmb3JtIEF1dGhcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnBhc3N3b3JkIHRoZSBwYXNzd29yZCBvZiB0aGUgdXNlciB0aGF0IHdpbGwgcGVyZm9ybSBBdXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jb25uZWN0aW9uIHRoZSBjb25uZWN0aW9uIG5hbWUgd2hlcmUgdGhlIHVzZXIgYmVsb25ncyB0by4gZS5nLiBgVXNlcm5hbWUtUGFzc3dvcmQtQXV0aGVudGljYXRpb25gXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2NvcGVdIHNjb3BlcyB0byBiZSByZXF1ZXN0ZWQgZHVyaW5nIEF1dGguIGUuZy4gYG9wZW5pZCBlbWFpbGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5kZXZpY2VdIG5hbWUgb2YgdGhlIGRldmljZS9icm93c2VyIHdoZXJlIHRoZSBBdXRoIHdhcyByZXF1ZXN0ZWRcbiAqIEBwYXJhbSB7dG9rZW5DYWxsYmFja30gY2IgZnVuY3Rpb24gY2FsbGVkIHdpdGggdGhlIHJlc3VsdCBvZiB0aGUgcmVxdWVzdFxuICovXG5BdXRoZW50aWNhdGlvbi5wcm90b3R5cGUubG9naW5XaXRoUmVzb3VyY2VPd25lciA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgdXJsO1xuICB2YXIgYm9keTtcblxuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgIHVzZXJuYW1lOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAndXNlcm5hbWUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHBhc3N3b3JkOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncGFzc3dvcmQgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIGNvbm5lY3Rpb246IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdjb25uZWN0aW9uIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBzY29wZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdzY29wZSBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdvYXV0aCcsICdybycpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3Njb3BlJ1xuICBdKS53aXRoKG9wdGlvbnMsIFsndXNlcm5hbWUnLCAncGFzc3dvcmQnLCAnc2NvcGUnLCAnY29ubmVjdGlvbicsICdkZXZpY2UnXSk7XG5cbiAgYm9keSA9IG9iamVjdEhlbHBlci50b1NuYWtlQ2FzZShib2R5LCBbJ2F1dGgwQ2xpZW50J10pO1xuXG4gIGJvZHkuZ3JhbnRfdHlwZSA9IGJvZHkuZ3JhbnRfdHlwZSB8fCAncGFzc3dvcmQnO1xuXG4gIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAucG9zdCh1cmwpXG4gICAgLnNlbmQoYm9keSlcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYikpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhIGNhbGwgdG8gdGhlIGAvc3NvZGF0YWAgZW5kcG9pbnQuXG4gKiBXZSByZWNvbW1lbmQgdG8gYXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgYW5kIHJlbHkgb24geW91ciB0ZW5hbnQgaG9zdGVkIGxvZ2luIHBhZ2UgYW5kIHVzaW5nIHByb21wdD1ub25lIHZpYSB7QGxpbmsgcmVuZXdBdXRofSBtZXRob2QuXG4gKlxuICogQG1ldGhvZCBnZXRTU09EYXRhXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhBY3RpdmVEaXJlY3RvcmllcyB0ZWxscyBBdXRoMCB0byByZXR1cm4gQUQgZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAqL1xuQXV0aGVudGljYXRpb24ucHJvdG90eXBlLmdldFNTT0RhdGEgPSBmdW5jdGlvbiAod2l0aEFjdGl2ZURpcmVjdG9yaWVzLCBjYikge1xuICB2YXIgdXJsO1xuICB2YXIgcGFyYW1zID0gJyc7XG5cbiAgaWYgKHR5cGVvZiB3aXRoQWN0aXZlRGlyZWN0b3JpZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IHdpdGhBY3RpdmVEaXJlY3RvcmllcztcbiAgICB3aXRoQWN0aXZlRGlyZWN0b3JpZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGFzc2VydC5jaGVjayh3aXRoQWN0aXZlRGlyZWN0b3JpZXMsIHsgdHlwZTogJ2Jvb2xlYW4nLCBtZXNzYWdlOiAnd2l0aEFjdGl2ZURpcmVjdG9yaWVzIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuICBhc3NlcnQuY2hlY2soY2IsIHsgdHlwZTogJ2Z1bmN0aW9uJywgbWVzc2FnZTogJ2NiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuXG4gIGlmICh3aXRoQWN0aXZlRGlyZWN0b3JpZXMpIHtcbiAgICBwYXJhbXMgPSAnPycgKyBxcy5zdHJpbmdpZnkoe1xuICAgICAgbGRhcHM6IDEsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuYmFzZU9wdGlvbnMuY2xpZW50SURcbiAgICB9KTtcbiAgfVxuXG4gIHVybCA9IHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAndXNlcicsICdzc29kYXRhJywgcGFyYW1zKTtcblxuICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgLmdldCh1cmwsIHsgbm9IZWFkZXJzOiB0cnVlIH0pXG4gICAgLndpdGhDcmVkZW50aWFscygpXG4gICAgLmVuZChyZXNwb25zZUhhbmRsZXIoY2IpKTtcbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIHVzZXJJbmZvQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3J9IFtlcnJdIGVycm9yIHJldHVybmVkIGJ5IEF1dGgwXG4gKiBAcGFyYW0ge09iamVjdH0gW3VzZXJJbmZvXSB1c2VyIGluZm9ybWF0aW9uXG4gKi9cblxuLyoqXG4gKiBNYWtlcyBhIGNhbGwgdG8gdGhlIGAvdXNlcmluZm9gIGVuZHBvaW50IGFuZCByZXR1cm5zIHRoZSB1c2VyIHByb2ZpbGVcbiAqXG4gKiBAbWV0aG9kIHVzZXJJbmZvXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXNzVG9rZW4gdG9rZW4gaXNzdWVkIHRvIGEgdXNlciBhZnRlciBBdXRoXG4gKiBAcGFyYW0ge3VzZXJJbmZvQ2FsbGJhY2t9IGNiXG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpL2F1dGhlbnRpY2F0aW9uI2dldC11c2VyLWluZm99XG4gKi9cbkF1dGhlbnRpY2F0aW9uLnByb3RvdHlwZS51c2VySW5mbyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbiwgY2IpIHtcbiAgdmFyIHVybDtcblxuICBhc3NlcnQuY2hlY2soYWNjZXNzVG9rZW4sIHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhY2Nlc3NUb2tlbiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcbiAgYXNzZXJ0LmNoZWNrKGNiLCB7IHR5cGU6ICdmdW5jdGlvbicsIG1lc3NhZ2U6ICdjYiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcblxuICB1cmwgPSB1cmxqb2luKHRoaXMuYmFzZU9wdGlvbnMucm9vdFVybCwgJ3VzZXJpbmZvJyk7XG5cbiAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgIC5nZXQodXJsKVxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyBhY2Nlc3NUb2tlbilcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYiwgeyBpZ25vcmVDYXNpbmc6IHRydWUgfSkpO1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgZGVsZWdhdGlvbkNhbGxiYWNrXG4gKiBAcGFyYW0ge0Vycm9yfSBbZXJyXSBlcnJvciByZXR1cm5lZCBieSBBdXRoMCB3aXRoIHRoZSByZWFzb24gd2h5IHRoZSBkZWxlZ2F0aW9uIGZhaWxlZFxuICogQHBhcmFtIHtPYmplY3R9IFtyZXN1bHRdIHJlc3VsdCBvZiB0aGUgZGVsZWdhdGlvbiByZXF1ZXN0LiBUaGUgcGF5bG9hZCBkZXBlbmRzIG9uIHdoYXQgYWkgdHlwZSB3YXMgdXNlZFxuICovXG5cbi8qKlxuICogTWFrZXMgYSBjYWxsIHRvIHRoZSBgL2RlbGVnYXRpb25gIGVuZHBvaW50IHdpdGggZWl0aGVyIGFuIGBpZF90b2tlbmAgb3IgYHJlZnJlc2hfdG9rZW5gXG4gKlxuICogQG1ldGhvZCBkZWxlZ2F0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNsaWVudElEXSBjbGllbnQgaWRlbnRpZmllclxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZ3JhbnRUeXBlICBncmFudCB0eXBlIHVzZWQgZm9yIGRlbGVnYXRpb24uIFRoZSBvbmx5IHZhbGlkIHZhbHVlIGlzIGB1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTpqd3QtYmVhcmVyYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmlkVG9rZW5dIHZhbGlkIHRva2VuIG9mIHRoZSB1c2VyIGlzc3VlZCBhZnRlciBBdXRoLiBJZiBubyBgcmVmcmVzaF90b2tlbmAgaXMgcHJvdmlkZWQgdGhpcyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZWZyZXNoVG9rZW5dIHZhbGlkIHJlZnJlc2ggdG9rZW4gb2YgdGhlIHVzZXIgaXNzdWVkIGFmdGVyIEF1dGguIElmIG5vIGBpZF90b2tlbmAgaXMgcHJvdmlkZWQgdGhpcyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy50YXJnZXRdIHRoZSB0YXJnZXQgY2xpZW50IGlkIG9mIHRoZSBkZWxlZ2F0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2NvcGVdIGVpdGhlciBgb3BlbmlkYCBvciBgb3BlbmlkIHByb2ZpbGUgZW1haWxgXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYXBpVHlwZV0gdGhlIGFwaSB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7ZGVsZWdhdGlvbkNhbGxiYWNrfSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNkZWxlZ2F0aW9ufVxuICovXG5BdXRoZW50aWNhdGlvbi5wcm90b3R5cGUuZGVsZWdhdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgdXJsO1xuICB2YXIgYm9keTtcblxuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgIGdyYW50X3R5cGU6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdncmFudF90eXBlIG9wdGlvbiBpcyByZXF1aXJlZCcgfVxuICB9KTtcbiAgYXNzZXJ0LmNoZWNrKGNiLCB7IHR5cGU6ICdmdW5jdGlvbicsIG1lc3NhZ2U6ICdjYiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcblxuICB1cmwgPSB1cmxqb2luKHRoaXMuYmFzZU9wdGlvbnMucm9vdFVybCwgJ2RlbGVnYXRpb24nKTtcblxuICBib2R5ID0gb2JqZWN0SGVscGVyLm1lcmdlKHRoaXMuYmFzZU9wdGlvbnMsIFsnY2xpZW50SUQnXSlcbiAgICAgICAgICAgICAgICAud2l0aChvcHRpb25zKTtcblxuICBib2R5ID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKGJvZHksIFsnYXV0aDBDbGllbnQnXSk7XG5cbiAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgIC5wb3N0KHVybClcbiAgICAuc2VuZChib2R5KVxuICAgIC5lbmQocmVzcG9uc2VIYW5kbGVyKGNiKSk7XG59O1xuXG4vKipcbiAqIEZldGNoZXMgdGhlIHVzZXIgY291bnRyeSBiYXNlZCBvbiB0aGUgaXAuXG4gKlxuICogQG1ldGhvZCBnZXRVc2VyQ291bnRyeVxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKi9cbkF1dGhlbnRpY2F0aW9uLnByb3RvdHlwZS5nZXRVc2VyQ291bnRyeSA9IGZ1bmN0aW9uIChjYikge1xuICB2YXIgdXJsO1xuXG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICd1c2VyJywgJ2dlb2xvYycsICdjb3VudHJ5Jyk7XG5cbiAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgIC5nZXQodXJsKVxuICAgIC5lbmQocmVzcG9uc2VIYW5kbGVyKGNiKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dGhlbnRpY2F0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9hdXRoZW50aWNhdGlvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpO1xuXG5mdW5jdGlvbiBwYWRkaW5nKHN0cikge1xuICB2YXIgbW9kID0gKHN0ci5sZW5ndGggJSA0KTtcbiAgdmFyIHBhZCA9IDQgLSBtb2Q7XG5cbiAgaWYgKG1vZCA9PT0gMCkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gc3RyICsgKG5ldyBBcnJheSgxICsgcGFkKSkuam9pbignPScpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVBcnJheShzdHIpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShzdHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgYSA9IDA7IGEgPCBzdHIubGVuZ3RoOyBhKyspIHtcbiAgICBhcnJbYV0gPSBzdHIuY2hhckNvZGVBdChhKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBieXRlQXJyYXlUb1N0cmluZyhhcnJheSkge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheVtpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoc3RyaW5nVG9CeXRlQXJyYXkoc3RyKSlcbiAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKSAvLyBDb252ZXJ0ICcrJyB0byAnLSdcbiAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKTsgLy8gQ29udmVydCAnLycgdG8gJ18nXG59XG5cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgc3RyID0gcGFkZGluZyhzdHIpXG4gICAgLnJlcGxhY2UoLy0vZywgJysnKSAvLyBDb252ZXJ0ICctJyB0byAnKydcbiAgICAucmVwbGFjZSgvXy9nLCAnLycpOyAvLyBDb252ZXJ0ICdfJyB0byAnLydcblxuICByZXR1cm4gYnl0ZUFycmF5VG9TdHJpbmcoYmFzZTY0LnRvQnl0ZUFycmF5KHN0cikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW5jb2RlOiBlbmNvZGUsXG4gIGRlY29kZTogZGVjb2RlXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvYmFzZTY0X3VybC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gYnVpbGRSZXNwb25zZShlcnJvciwgZGVzY3JpcHRpb24pIHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvcjogZXJyb3IsXG4gICAgZXJyb3JEZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YWxpZEp3dChkZXNjcmlwdGlvbikge1xuICByZXR1cm4gYnVpbGRSZXNwb25zZSgnaW52YWxpZF90b2tlbicsIGRlc2NyaXB0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJ1aWxkUmVzcG9uc2U6IGJ1aWxkUmVzcG9uc2UsXG4gIGludmFsaWRKd3Q6IGludmFsaWRKd3Rcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9lcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4uL2hlbHBlci9yYW5kb20nKTtcbnZhciBzdG9yYWdlID0gcmVxdWlyZSgnLi4vaGVscGVyL3N0b3JhZ2UnKTtcblxudmFyIERFRkFVTFRfTkFNRVNQQUNFID0gJ2NvbS5hdXRoMC5hdXRoLic7XG5cbmZ1bmN0aW9uIFRyYW5zYWN0aW9uTWFuYWdlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLm5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlIHx8IERFRkFVTFRfTkFNRVNQQUNFO1xuICB0aGlzLmtleUxlbmd0aCA9IG9wdGlvbnMua2V5TGVuZ3RoIHx8IDMyO1xufVxuXG5UcmFuc2FjdGlvbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgdHJhbnNhY3Rpb247XG5cbiAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlLmluZGV4T2YoJ2NvZGUnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZS5pbmRleE9mKCdpZF90b2tlbicpICE9PSAtMSAmJiAhIW9wdGlvbnMubm9uY2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHRyYW5zYWN0aW9uID0gdGhpcy5nZW5lcmF0ZVRyYW5zYWN0aW9uKG9wdGlvbnMuYXBwU3RhdGUsIG9wdGlvbnMuc3RhdGUsIG9wdGlvbnMubm9uY2UpO1xuXG4gIG9wdGlvbnMuc3RhdGUgPSB0cmFuc2FjdGlvbi5zdGF0ZTtcblxuICBpZiAob3B0aW9ucy5yZXNwb25zZVR5cGUuaW5kZXhPZignaWRfdG9rZW4nKSAhPT0gLTEpIHtcbiAgICBvcHRpb25zLm5vbmNlID0gdHJhbnNhY3Rpb24ubm9uY2U7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn07XG5cblRyYW5zYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChhcHBTdGF0ZSwgc3RhdGUsIG5vbmNlKSB7XG4gIHZhciB0cmFuc2FjdGlvbiA9IHN0YXRlIHx8IHJhbmRvbS5yYW5kb21TdHJpbmcodGhpcy5rZXlMZW5ndGgpO1xuICBub25jZSA9IG5vbmNlIHx8IHJhbmRvbS5yYW5kb21TdHJpbmcodGhpcy5rZXlMZW5ndGgpO1xuXG4gIHN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm5hbWVzcGFjZSArIHRyYW5zYWN0aW9uLCB7XG4gICAgbm9uY2U6IG5vbmNlLFxuICAgIGFwcFN0YXRlOiBhcHBTdGF0ZVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHN0YXRlOiB0cmFuc2FjdGlvbixcbiAgICBub25jZTogbm9uY2VcbiAgfTtcbn07XG5cblRyYW5zYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuZ2V0U3RvcmVkVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24pIHtcbiAgdmFyIHRyYW5zYWN0aW9uRGF0YTtcblxuICB0cmFuc2FjdGlvbkRhdGEgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5uYW1lc3BhY2UgKyB0cmFuc2FjdGlvbik7XG4gIHN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLm5hbWVzcGFjZSArIHRyYW5zYWN0aW9uKTtcbiAgcmV0dXJuIHRyYW5zYWN0aW9uRGF0YTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNhY3Rpb25NYW5hZ2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC90cmFuc2FjdGlvbi1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiBiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIobGVuICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICBsID0gcGxhY2VIb2xkZXJzID4gMCA/IGxlbiAtIDQgOiBsZW5cblxuICB2YXIgTCA9IDBcblxuICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBvdXRwdXQgPSAnJ1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPT0nXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArICh1aW50OFtsZW4gLSAxXSlcbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAxMF1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9J1xuICB9XG5cbiAgcGFydHMucHVzaChvdXRwdXQpXG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJyk7XG5cbmZ1bmN0aW9uIHBhZGRpbmcoc3RyKSB7XG4gIHZhciBtb2QgPSAoc3RyLmxlbmd0aCAlIDQpO1xuICB2YXIgcGFkID0gNCAtIG1vZDtcblxuICBpZiAobW9kID09PSAwKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBzdHIgKyAobmV3IEFycmF5KDEgKyBwYWQpKS5qb2luKCc9Jyk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVBcnJheVRvU3RyaW5nKGFycmF5KSB7XG4gIHZhciByZXN1bHQgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYXJyYXlbaV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZUFycmF5KHN0cikge1xuICB2YXIgYXJyID0gbmV3IEFycmF5KHN0ci5sZW5ndGgpO1xuICBmb3IgKHZhciBhID0gMDsgYSA8IHN0ci5sZW5ndGg7IGErKykge1xuICAgIGFyclthXSA9IHN0ci5jaGFyQ29kZUF0KGEpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGJ5dGVBcnJheVRvSGV4KHJhdykge1xuICB2YXIgSEVYID0gJyc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXcubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2hleCA9IHJhd1tpXS50b1N0cmluZygxNik7XG4gICAgSEVYICs9IChfaGV4Lmxlbmd0aCA9PT0gMiA/IF9oZXggOiAnMCcgKyBfaGV4KTtcbiAgfVxuXG4gIHJldHVybiBIRVg7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVN0cmluZyhzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KHN0cmluZ1RvQnl0ZUFycmF5KHN0cikpXG4gICAgICAucmVwbGFjZSgvXFwrL2csICctJykgLy8gQ29udmVydCAnKycgdG8gJy0nXG4gICAgICAucmVwbGFjZSgvXFwvL2csICdfJyk7IC8vIENvbnZlcnQgJy8nIHRvICdfJ1xufVxuXG5cbmZ1bmN0aW9uIGRlY29kZVRvU3RyaW5nKHN0cikge1xuICBzdHIgPSBwYWRkaW5nKHN0cilcbiAgICAucmVwbGFjZSgvXFwtL2csICcrJykgLy8gQ29udmVydCAnLScgdG8gJysnXG4gICAgLnJlcGxhY2UoL18vZywgJy8nKTsgLy8gQ29udmVydCAnXycgdG8gJy8nXG5cbiAgcmV0dXJuIGJ5dGVBcnJheVRvU3RyaW5nKGJhc2U2NC50b0J5dGVBcnJheShzdHIpKTtcbn1cblxuXG5mdW5jdGlvbiBkZWNvZGVUb0hFWChzdHIpIHtcbiAgcmV0dXJuIGJ5dGVBcnJheVRvSGV4KGJhc2U2NC50b0J5dGVBcnJheShwYWRkaW5nKHN0cikpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVuY29kZVN0cmluZzogZW5jb2RlU3RyaW5nLFxuICBkZWNvZGVUb1N0cmluZzogZGVjb2RlVG9TdHJpbmcsXG4gIGJ5dGVBcnJheVRvU3RyaW5nOiBieXRlQXJyYXlUb1N0cmluZyxcbiAgc3RyaW5nVG9CeXRlQXJyYXk6IHN0cmluZ1RvQnl0ZUFycmF5LFxuICBwYWRkaW5nOiBwYWRkaW5nLFxuICBieXRlQXJyYXlUb0hleDogYnl0ZUFycmF5VG9IZXgsXG4gIGRlY29kZVRvSEVYOiBkZWNvZGVUb0hFWFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pZHRva2VuLXZlcmlmaWVyL3NyYy9oZWxwZXJzL2Jhc2U2NC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogJ1JGQzM5ODYnLFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3FzL2xpYi9mb3JtYXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG5leHBvcnRzLmFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiAoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcyB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmICFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBleHBvcnRzLmFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2ldICYmIHR5cGVvZiB0YXJnZXRbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGV4cG9ydHMubWVyZ2UodGFyZ2V0W2ldLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gZXhwb3J0cy5tZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHN0ciA6IFN0cmluZyhzdHIpO1xuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCB8fCAvLyAtXG4gICAgICAgICAgICBjID09PSAweDJFIHx8IC8vIC5cbiAgICAgICAgICAgIGMgPT09IDB4NUYgfHwgLy8gX1xuICAgICAgICAgICAgYyA9PT0gMHg3RSB8fCAvLyB+XG4gICAgICAgICAgICAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgfHwgLy8gMC05XG4gICAgICAgICAgICAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgfHwgLy8gYS16XG4gICAgICAgICAgICAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmNvbXBhY3QgPSBmdW5jdGlvbiAob2JqLCByZWZlcmVuY2VzKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHZhciByZWZzID0gcmVmZXJlbmNlcyB8fCBbXTtcbiAgICB2YXIgbG9va3VwID0gcmVmcy5pbmRleE9mKG9iaik7XG4gICAgaWYgKGxvb2t1cCAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHJlZnNbbG9va3VwXTtcbiAgICB9XG5cbiAgICByZWZzLnB1c2gob2JqKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAob2JqW2ldICYmIHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2goZXhwb3J0cy5jb21wYWN0KG9ialtpXSwgcmVmcykpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcGFjdGVkO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBvYmpba2V5XSA9IGV4cG9ydHMuY29tcGFjdChvYmpba2V5XSwgcmVmcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5pc1JlZ0V4cCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3FzL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXMtZnVuY3Rpb24nKTtcbnZhciBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbnZhciBzaG91bGRSZXRyeSA9IHJlcXVpcmUoJy4vc2hvdWxkLXJldHJ5Jyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbnZhciByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcmlzb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIik7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsKSB7XG4gIGlmICh2YWwgIT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIGZvcih2YXIgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5ICsgJ1snICsgc3Via2V5ICsgJ10nLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhaXI7XG4gIHZhciBwb3M7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZih0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbmV3X2VyciA9IGU7IC8vICM5ODUgdG91Y2hpbmcgcmVzIG1heSBjYXVzZSBJTlZBTElEX1NUQVRFX0VSUiBvbiBvbGQgQW5kcm9pZFxuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIHN1YnN0aXR1dGUgZm9yIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlciArICc6JyArIHBhc3MpKTtcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICBicmVhaztcbiAgICAgIFxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgIGJyZWFrOyAgXG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgb3B0aW9uc2AgKG9yIGZpbGVuYW1lKS5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgb3B0aW9ucyl7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvcHRpb25zIHx8IGZpbGUubmFtZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIC8vIGNvbnNvbGUubG9nKHRoaXMuX3JldHJpZXMsIHRoaXMuX21heFJldHJpZXMpXG4gIGlmICh0aGlzLl9tYXhSZXRyaWVzICYmIHRoaXMuX3JldHJpZXMrKyA8IHRoaXMuX21heFJldHJpZXMgJiYgc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vLyBUaGlzIG9ubHkgd2FybnMsIGJlY2F1c2UgdGhlIHJlcXVlc3QgaXMgc3RpbGwgbGlrZWx5IHRvIHdvcmtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhID0gUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLndhcm4oXCJUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gVGhpcyB0aHJvd3MsIGJlY2F1c2UgaXQgY2FuJ3Qgc2VuZC9yZWNlaXZlIGRhdGEgYXMgZXhwZWN0ZWRcblJlcXVlc3QucHJvdG90eXBlLnBpcGUgPSBSZXF1ZXN0LnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRocm93IEVycm9yKFwiU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5fc29ydCkpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gX2lzSG9zdChvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmogJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudFwiKTtcbiAgfVxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9hcHBlbmRRdWVyeVN0cmluZygpO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlYWR5U3RhdGUgPSB4aHIucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cbiAgICBpZiAoNCAhPSByZWFkeVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB2YXIgaGFuZGxlUHJvZ3Jlc3MgPSBmdW5jdGlvbihkaXJlY3Rpb24sIGUpIHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9XG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHRyeSB7XG4gICAgICB4aHIub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ2Rvd25sb2FkJyk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gICAgfVxuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB0cnkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSwgdGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBzZWUgIzExNDlcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhlcnIpO1xuICB9XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICghdGhpcy5fZm9ybURhdGEgJiYgJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIHZhciBzZXJpYWxpemUgPSB0aGlzLl9zZXJpYWxpemVyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N1cGVyYWdlbnQvbGliL2NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFdpbkNoYW4gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBSRUxBWV9GUkFNRV9OQU1FID0gXCJfX3dpbmNoYW5fcmVsYXlfZnJhbWVcIjtcbiAgdmFyIENMT1NFX0NNRCA9IFwiZGllXCI7XG5cbiAgLy8gYSBwb3J0YWJsZSBhZGRMaXN0ZW5lciBpbXBsZW1lbnRhdGlvblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcih3LCBldmVudCwgY2IpIHtcbiAgICBpZih3LmF0dGFjaEV2ZW50KSB3LmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgY2IpO1xuICAgIGVsc2UgaWYgKHcuYWRkRXZlbnRMaXN0ZW5lcikgdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYiwgZmFsc2UpO1xuICB9XG5cbiAgLy8gYSBwb3J0YWJsZSByZW1vdmVMaXN0ZW5lciBpbXBsZW1lbnRhdGlvblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih3LCBldmVudCwgY2IpIHtcbiAgICBpZih3LmRldGFjaEV2ZW50KSB3LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgY2IpO1xuICAgIGVsc2UgaWYgKHcucmVtb3ZlRXZlbnRMaXN0ZW5lcikgdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYiwgZmFsc2UpO1xuICB9XG5cblxuICAvLyBjaGVja2luZyBmb3IgSUU4IG9yIGFib3ZlXG4gIGZ1bmN0aW9uIGlzSW50ZXJuZXRFeHBsb3JlcigpIHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcnYgPSAtMTsgLy8gUmV0dXJuIHZhbHVlIGFzc3VtZXMgZmFpbHVyZS5cbiAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcbiAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCJNU0lFIChbMC05XXsxLH1bXFwuMC05XXswLH0pXCIpO1xuICAgICAgaWYgKHJlLmV4ZWModWEpICE9IG51bGwpXG4gICAgICAgIHJ2ID0gcGFyc2VGbG9hdChSZWdFeHAuJDEpO1xuICAgIH1cbiAgICAvLyBJRSA+IDExXG4gICAgZWxzZSBpZiAodWEuaW5kZXhPZihcIlRyaWRlbnRcIikgPiAtMSkge1xuICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcInJ2OihbMC05XXsyLDJ9W1xcLjAtOV17MCx9KVwiKTtcbiAgICAgIGlmIChyZS5leGVjKHVhKSAhPT0gbnVsbCkge1xuICAgICAgICBydiA9IHBhcnNlRmxvYXQoUmVnRXhwLiQxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnYgPj0gODtcbiAgfVxuXG4gIC8vIGNoZWNraW5nIE1vYmlsZSBGaXJlZm94IChGZW5uZWMpXG4gIGZ1bmN0aW9uIGlzRmVubmVjKCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXZSBtdXN0IGNoZWNrIGZvciBib3RoIFhVTCBhbmQgSmF2YSB2ZXJzaW9ucyBvZiBGZW5uZWMuICBCb3RoIGhhdmVcbiAgICAgIC8vIGRpc3RpbmN0IFVBIHN0cmluZ3MuXG4gICAgICB2YXIgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgIHJldHVybiAodXNlckFnZW50LmluZGV4T2YoJ0Zlbm5lYy8nKSAhPSAtMSkgfHwgIC8vIFhVTFxuICAgICAgICAgICAgICh1c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveC8nKSAhPSAtMSAmJiB1c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpICE9IC0xKTsgICAvLyBKYXZhXG4gICAgfSBjYXRjaChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGZlYXR1cmUgY2hlY2tpbmcgdG8gc2VlIGlmIHRoaXMgcGxhdGZvcm0gaXMgc3VwcG9ydGVkIGF0IGFsbFxuICBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5KU09OICYmIHdpbmRvdy5KU09OLnN0cmluZ2lmeSAmJlxuICAgICAgICAgICAgd2luZG93LkpTT04ucGFyc2UgJiYgd2luZG93LnBvc3RNZXNzYWdlKTtcbiAgfVxuXG4gIC8vIGdpdmVuIGEgVVJMLCBleHRyYWN0IHRoZSBvcmlnaW4uIFRha2VuIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYmFzZS9maXJlYmFzZS1zaW1wbGUtbG9naW4vYmxvYi9kMmNiOTViOWY4MTJkODQ4OGJkYmZiYTUxYzNhN2MxNTNiYTFhMDc0L2pzL3NyYy9zaW1wbGUtbG9naW4vdHJhbnNwb3J0cy9XaW5DaGFuLmpzI0wyNS1MMzBcbiAgZnVuY3Rpb24gZXh0cmFjdE9yaWdpbih1cmwpIHtcbiAgICBpZiAoIS9eaHR0cHM/OlxcL1xcLy8udGVzdCh1cmwpKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB2YXIgbSA9IC9eKGh0dHBzPzpcXC9cXC9bXFwtX2EtekEtWlxcLjAtOTpdKykvLmV4ZWModXJsKTtcbiAgICBpZiAobSkgcmV0dXJuIG1bMV07XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIHJlbGF5IGlmcmFtZSBpbiB0aGUgb3BlbmVyXG4gIGZ1bmN0aW9uIGZpbmRSZWxheSgpIHtcbiAgICB2YXIgbG9jID0gd2luZG93LmxvY2F0aW9uO1xuICAgIHZhciBmcmFtZXMgPSB3aW5kb3cub3BlbmVyLmZyYW1lcztcbiAgICBmb3IgKHZhciBpID0gZnJhbWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZnJhbWVzW2ldLmxvY2F0aW9uLnByb3RvY29sID09PSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIGZyYW1lc1tpXS5sb2NhdGlvbi5ob3N0ID09PSB3aW5kb3cubG9jYXRpb24uaG9zdCAmJlxuICAgICAgICAgICAgZnJhbWVzW2ldLm5hbWUgPT09IFJFTEFZX0ZSQU1FX05BTUUpXG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gZnJhbWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoKGUpIHsgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaXNJRSA9IGlzSW50ZXJuZXRFeHBsb3JlcigpO1xuXG4gIGlmIChpc1N1cHBvcnRlZCgpKSB7XG4gICAgLyogIEdlbmVyYWwgZmxvdzpcbiAgICAgKiAgICAgICAgICAgICAgICAgIDAuIHVzZXIgY2xpY2tzXG4gICAgICogIChJRSBTUEVDSUZJQykgICAxLiBjYWxsZXIgYWRkcyByZWxheSBpZnJhbWUgKHNlcnZlZCBmcm9tIHRydXN0ZWQgZG9tYWluKSB0byBET01cbiAgICAgKiAgICAgICAgICAgICAgICAgIDIuIGNhbGxlciBvcGVucyB3aW5kb3cgKHdpdGggY29udGVudCBmcm9tIHRydXN0ZWQgZG9tYWluKVxuICAgICAqICAgICAgICAgICAgICAgICAgMy4gd2luZG93IG9uIG9wZW5pbmcgYWRkcyBhIGxpc3RlbmVyIHRvICdtZXNzYWdlJ1xuICAgICAqICAoSUUgU1BFQ0lGSUMpICAgNC4gd2luZG93IG9uIG9wZW5pbmcgZmluZHMgaWZyYW1lXG4gICAgICogICAgICAgICAgICAgICAgICA1LiB3aW5kb3cgY2hlY2tzIGlmIGlmcmFtZSBpcyBcImxvYWRlZFwiIC0gaGFzIGEgJ2RvUG9zdCcgZnVuY3Rpb24geWV0XG4gICAgICogIChJRSBTUEVDSUZJQzUpICA1YS4gaWYgaWZyYW1lLmRvUG9zdCBleGlzdHMsIHdpbmRvdyB1c2VzIGl0IHRvIHNlbmQgcmVhZHkgZXZlbnQgdG8gY2FsbGVyXG4gICAgICogIChJRSBTUEVDSUZJQzUpICA1Yi4gaWYgaWZyYW1lLmRvUG9zdCBkb2Vzbid0IGV4aXN0LCB3aW5kb3cgd2FpdHMgZm9yIGZyYW1lIHJlYWR5XG4gICAgICogIChJRSBTUEVDSUZJQzUpICA1YmkuIG9uY2UgcmVhZHksIHdpbmRvdyBjYWxscyBpZnJhbWUuZG9Qb3N0IHRvIHNlbmQgcmVhZHkgZXZlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgIDYuIGNhbGxlciB1cG9uIHJlY2llcHQgb2YgJ3JlYWR5Jywgc2VuZHMgYXJnc1xuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbihvcHRzLCBjYikge1xuICAgICAgICBpZiAoIWNiKSB0aHJvdyBcIm1pc3NpbmcgcmVxdWlyZWQgY2FsbGJhY2sgYXJndW1lbnRcIjtcblxuICAgICAgICAvLyB0ZXN0IHJlcXVpcmVkIG9wdGlvbnNcbiAgICAgICAgdmFyIGVycjtcbiAgICAgICAgaWYgKCFvcHRzLnVybCkgZXJyID0gXCJtaXNzaW5nIHJlcXVpcmVkICd1cmwnIHBhcmFtZXRlclwiO1xuICAgICAgICBpZiAoIW9wdHMucmVsYXlfdXJsKSBlcnIgPSBcIm1pc3NpbmcgcmVxdWlyZWQgJ3JlbGF5X3VybCcgcGFyYW1ldGVyXCI7XG4gICAgICAgIGlmIChlcnIpIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNiKGVycik7IH0sIDApO1xuXG4gICAgICAgIC8vIHN1cHBseSBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgaWYgKCFvcHRzLndpbmRvd19uYW1lKSBvcHRzLndpbmRvd19uYW1lID0gbnVsbDtcbiAgICAgICAgaWYgKCFvcHRzLndpbmRvd19mZWF0dXJlcyB8fCBpc0Zlbm5lYygpKSBvcHRzLndpbmRvd19mZWF0dXJlcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBvcHRzLnBhcmFtcyBtYXkgYmUgdW5kZWZpbmVkXG5cbiAgICAgICAgdmFyIGlmcmFtZTtcblxuICAgICAgICAvLyBzYW5pdHkgY2hlY2ssIGFyZSB1cmwgYW5kIHJlbGF5X3VybCB0aGUgc2FtZSBvcmlnaW4/XG4gICAgICAgIHZhciBvcmlnaW4gPSBvcHRzLm9yaWdpbiB8fCBleHRyYWN0T3JpZ2luKG9wdHMudXJsKTtcbiAgICAgICAgaWYgKG9yaWdpbiAhPT0gZXh0cmFjdE9yaWdpbihvcHRzLnJlbGF5X3VybCkpIHtcbiAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNiKCdpbnZhbGlkIGFyZ3VtZW50czogb3JpZ2luIG9mIHVybCBhbmQgcmVsYXlfdXJsIG11c3QgbWF0Y2gnKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtZXNzYWdlVGFyZ2V0O1xuXG4gICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgLy8gZmlyc3Qgd2UgbmVlZCB0byBhZGQgYSBcInJlbGF5XCIgaWZyYW1lIHRvIHRoZSBkb2N1bWVudCB0aGF0J3Mgc2VydmVkXG4gICAgICAgICAgLy8gZnJvbSB0aGUgdGFyZ2V0IGRvbWFpbi4gIFdlIGNhbiBwb3N0bWVzc2FnZSBpbnRvIGEgaWZyYW1lLCBidXQgbm90IGFcbiAgICAgICAgICAvLyB3aW5kb3dcbiAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgICAgICAgIC8vIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBmcmFtZW5hbWUpO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIG9wdHMucmVsYXlfdXJsKTtcbiAgICAgICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBSRUxBWV9GUkFNRV9OQU1FKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgbWVzc2FnZVRhcmdldCA9IGlmcmFtZS5jb250ZW50V2luZG93O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHcgPSBvcHRzLnBvcHVwIHx8IHdpbmRvdy5vcGVuKG9wdHMudXJsLCBvcHRzLndpbmRvd19uYW1lLCBvcHRzLndpbmRvd19mZWF0dXJlcyk7XG4gICAgICAgIGlmIChvcHRzLnBvcHVwKSB7XG4gICAgICAgICAgdy5sb2NhdGlvbi5ocmVmID0gb3B0cy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1lc3NhZ2VUYXJnZXQpIG1lc3NhZ2VUYXJnZXQgPSB3O1xuXG4gICAgICAgIC8vIGxldHMgbGlzdGVuIGluIGNhc2UgdGhlIHdpbmRvdyBibG93cyB1cCBiZWZvcmUgdGVsbGluZyB1c1xuICAgICAgICB2YXIgY2xvc2VJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh3ICYmIHcuY2xvc2VkKSB7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgY2IoJ1VzZXIgY2xvc2VkIHRoZSBwb3B1cCB3aW5kb3cnKTtcbiAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICB2YXIgcmVxID0gSlNPTi5zdHJpbmdpZnkoe2E6ICdyZXF1ZXN0JywgZDogb3B0cy5wYXJhbXN9KTtcblxuICAgICAgICAvLyBjbGVhbnVwIG9uIHVubG9hZFxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICAgIGlmIChpZnJhbWUpIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgICBpZnJhbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKGNsb3NlSW50ZXJ2YWwpIGNsb3NlSW50ZXJ2YWwgPSBjbGVhckludGVydmFsKGNsb3NlSW50ZXJ2YWwpO1xuICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKHdpbmRvdywgJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKHdpbmRvdywgJ3VubG9hZCcsIGNsZWFudXApO1xuICAgICAgICAgIGlmICh3KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB3LmNsb3NlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChzZWN1cml0eVZpb2xhdGlvbikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGhhcHBlbnMgaW4gT3BlcmEgMTIgc29tZXRpbWVzXG4gICAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9icm93c2VyaWQvaXNzdWVzLzE4NDRcbiAgICAgICAgICAgICAgbWVzc2FnZVRhcmdldC5wb3N0TWVzc2FnZShDTE9TRV9DTUQsIG9yaWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHcgPSBtZXNzYWdlVGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTGlzdGVuZXIod2luZG93LCAndW5sb2FkJywgY2xlYW51cCk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25NZXNzYWdlKGUpIHtcbiAgICAgICAgICBpZiAoZS5vcmlnaW4gIT09IG9yaWdpbikgeyByZXR1cm47IH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGQgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkLmEgPT09ICdyZWFkeScpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VUYXJnZXQucG9zdE1lc3NhZ2UocmVxLCBvcmlnaW4pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZC5hID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgY2IoZC5kKTtcbiAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZC5hID09PSAncmVzcG9uc2UnKSB7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgY2IobnVsbCwgZC5kKTtcbiAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVyKHdpbmRvdywgJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2xvc2U6IGNsZWFudXAsXG4gICAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHcpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB3LmZvY3VzKCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBJRTcgYmxvd3MgdXAgaGVyZSwgZG8gbm90aGluZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIG9uT3BlbjogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgdmFyIG8gPSBcIipcIjtcbiAgICAgICAgdmFyIG1zZ1RhcmdldCA9IGlzSUUgPyBmaW5kUmVsYXkoKSA6IHdpbmRvdy5vcGVuZXI7XG4gICAgICAgIGlmICghbXNnVGFyZ2V0KSB0aHJvdyBcImNhbid0IGZpbmQgcmVsYXkgZnJhbWVcIjtcbiAgICAgICAgZnVuY3Rpb24gZG9Qb3N0KG1zZykge1xuICAgICAgICAgIG1zZyA9IEpTT04uc3RyaW5naWZ5KG1zZyk7XG4gICAgICAgICAgaWYgKGlzSUUpIG1zZ1RhcmdldC5kb1Bvc3QobXNnLCBvKTtcbiAgICAgICAgICBlbHNlIG1zZ1RhcmdldC5wb3N0TWVzc2FnZShtc2csIG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25NZXNzYWdlKGUpIHtcbiAgICAgICAgICAvLyBvbmx5IG9uZSBtZXNzYWdlIGdldHMgdGhyb3VnaCwgYnV0IGxldCdzIG1ha2Ugc3VyZSBpdCdzIGFjdHVhbGx5XG4gICAgICAgICAgLy8gdGhlIG1lc3NhZ2Ugd2UncmUgbG9va2luZyBmb3IgKG90aGVyIGNvZGUgbWF5IGJlIHVzaW5nXG4gICAgICAgICAgLy8gcG9zdG1lc3NhZ2UpIC0gd2UgZG8gdGhpcyBieSBlbnN1cmluZyB0aGUgcGF5bG9hZCBjYW5cbiAgICAgICAgICAvLyBiZSBwYXJzZWQsIGFuZCBpdCdzIGdvdCBhbiAnYScgKGFjdGlvbikgdmFsdWUgb2YgJ3JlcXVlc3QnLlxuICAgICAgICAgIHZhciBkO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgICAgICAgIH0gY2F0Y2goZXJyKSB7IH1cbiAgICAgICAgICBpZiAoIWQgfHwgZC5hICE9PSAncmVxdWVzdCcpIHJldHVybjtcbiAgICAgICAgICByZW1vdmVMaXN0ZW5lcih3aW5kb3csICdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICAgICAgICBvID0gZS5vcmlnaW47XG4gICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAvLyB0aGlzIHNldFRpbWVvdXQgaXMgY3JpdGljYWxseSBpbXBvcnRhbnQgZm9yIElFOCAtXG4gICAgICAgICAgICAvLyBpbiBpZTggc29tZXRpbWVzIGFkZExpc3RlbmVyIGZvciAnbWVzc2FnZScgY2FuIHN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgIC8vIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG8gYmUgaW52b2tlZC4gIGF3ZXNvbWUuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjYihvLCBkLmQsIGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICBjYiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBkb1Bvc3Qoe2E6ICdyZXNwb25zZScsIGQ6IHJ9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkRpZShlKSB7XG4gICAgICAgICAgaWYgKGUuZGF0YSA9PT0gQ0xPU0VfQ01EKSB7XG4gICAgICAgICAgICB0cnkgeyB3aW5kb3cuY2xvc2UoKTsgfSBjYXRjaCAob19PKSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRMaXN0ZW5lcihpc0lFID8gbXNnVGFyZ2V0IDogd2luZG93LCAnbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICAgIGFkZExpc3RlbmVyKGlzSUUgPyBtc2dUYXJnZXQgOiB3aW5kb3csICdtZXNzYWdlJywgb25EaWUpO1xuXG4gICAgICAgIC8vIHdlIGNhbm5vdCBwb3N0IHRvIG91ciBwYXJlbnQgdGhhdCB3ZSdyZSByZWFkeSBiZWZvcmUgdGhlIGlmcmFtZVxuICAgICAgICAvLyBpcyBsb2FkZWQuIChJRSBzcGVjaWZpYyBwb3NzaWJsZSBmYWlsdXJlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvUG9zdCh7YTogXCJyZWFkeVwifSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIC8vIHRoaXMgY29kZSBzaG91bGQgbmV2ZXIgYmUgZXhlY3R1ZWQgb3V0c2lkZSBJRVxuICAgICAgICAgIGFkZExpc3RlbmVyKG1zZ1RhcmdldCwgJ2xvYWQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBkb1Bvc3Qoe2E6IFwicmVhZHlcIn0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2luZG93IGlzIHVubG9hZGVkIGFuZCB0aGUgY2xpZW50IGhhc24ndCBjYWxsZWQgY2IsIGl0J3MgYW4gZXJyb3JcbiAgICAgICAgdmFyIG9uVW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElFOCBkb2Vzbid0IGxpa2UgdGhpcy4uLlxuICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoaXNJRSA/IG1zZ1RhcmdldCA6IHdpbmRvdywgJ21lc3NhZ2UnLCBvbkRpZSk7XG4gICAgICAgICAgfSBjYXRjaCAob2hXZWxsKSB7IH1cbiAgICAgICAgICBpZiAoY2IpIGRvUG9zdCh7IGE6ICdlcnJvcicsIGQ6ICdjbGllbnQgY2xvc2VkIHdpbmRvdycgfSk7XG4gICAgICAgICAgY2IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgLy8gZXhwbGljaXRseSBjbG9zZSB0aGUgd2luZG93LCBpbiBjYXNlIHRoZSBjbGllbnQgaXMgdHJ5aW5nIHRvIHJlbG9hZCBvciBuYXZcbiAgICAgICAgICB0cnkgeyB3aW5kb3cuY2xvc2UoKTsgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH07XG4gICAgICAgIGFkZExpc3RlbmVyKHdpbmRvdywgJ3VubG9hZCcsIG9uVW5sb2FkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIod2luZG93LCAndW5sb2FkJywgb25VbmxvYWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbih1cmwsIHdpbm9wdHMsIGFyZywgY2IpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2IoXCJ1bnN1cHBvcnRlZCBicm93c2VyXCIpOyB9LCAwKTtcbiAgICAgIH0sXG4gICAgICBvbk9wZW46IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNiKFwidW5zdXBwb3J0ZWQgYnJvd3NlclwiKTsgfSwgMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gV2luQ2hhbjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93aW5jaGFuL3dpbmNoYW4uanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgcHJlYWN0IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgUm91dGVyLCB7IHJvdXRlIH0gZnJvbSAncHJlYWN0LXJvdXRlcic7XG5cbmltcG9ydCBNYWluIGZyb20gJy4vTWFpbic7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi9Mb2dpbic7XG5pbXBvcnQgTmF2IGZyb20gJy4vTmF2JztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9TZWFyY2gnO1xuXG5pbXBvcnQgeyBnZXRVc2VySW5mbyB9IGZyb20gJy4uL2xpYi9hdXRoJztcblxuaW1wb3J0IHR5cGUgeyBXYXRjaGxpc3QsIFVzZXIgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFByb3BzID0ge1xuICBhY2Nlc3NUb2tlbjogP3N0cmluZyxcbiAgaWRUb2tlbjogP3N0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiB7XG4gICAgdXNlcjogP1VzZXIsXG4gICAgd2F0Y2hsaXN0OiA/V2F0Y2hsaXN0LFxuICAgIGFjY2Vzc1Rva2VuOiA/c3RyaW5nLFxuICAgIGlkVG9rZW46ID9zdHJpbmdcbiAgfTtcbiAgcHJvcHM6IFByb3BzO1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXI6IG51bGwsXG4gICAgICBhY2Nlc3NUb2tlbjogcHJvcHMuYWNjZXNzVG9rZW4sXG4gICAgICBpZFRva2VuOiBwcm9wcy5pZFRva2VuLFxuICAgICAgd2F0Y2hsaXN0OiBudWxsXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICE9IG51bGwpIHtcbiAgICAgIGdldFVzZXJJbmZvKHRoaXMuc3RhdGUuaWRUb2tlbikudGhlbigoeyB1c2VyLCB3YXRjaGxpc3QgfSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlciwgd2F0Y2hsaXN0IH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNldFVzZXJJbmZvKFxuICAgIHtcbiAgICAgIHVzZXIsXG4gICAgICB3YXRjaGxpc3QsXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGlkVG9rZW5cbiAgICB9OiB7XG4gICAgICB1c2VyOiBVc2VyLFxuICAgICAgd2F0Y2hsaXN0OiBXYXRjaGxpc3QsXG4gICAgICBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICAgICAgaWRUb2tlbjogc3RyaW5nXG4gICAgfVxuICApIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdXNlciwgd2F0Y2hsaXN0LCBhY2Nlc3NUb2tlbiwgaWRUb2tlbiB9LCAoKSA9PiByb3V0ZSgnLycpKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB1c2VyLCBhY2Nlc3NUb2tlbiwgaWRUb2tlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc0xvZ2dlZEluID0gdGhpcy5zdGF0ZS51c2VyICE9PSBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2IGFjY2Vzc1Rva2VuPXthY2Nlc3NUb2tlbn0gaXNMb2dnZWRJbj17aXNMb2dnZWRJbn0gLz5cbiAgICAgICAgPFNlYXJjaCAvPlxuICAgICAgICA8Um91dGVyPlxuICAgICAgICAgIDxNYWluIHBhdGg9XCIvXCIgaXNMb2dnZWRJbj17aXNMb2dnZWRJbn0gaWRUb2tlbj17aWRUb2tlbn0gLz5cbiAgICAgICAgICA8TG9naW5cbiAgICAgICAgICAgIHBhdGg9XCIvbG9naW5cIlxuICAgICAgICAgICAgc2V0VXNlckluZm89eyguLi5hcmdzKSA9PiB0aGlzLnNldFVzZXJJbmZvKC4uLmFyZ3MpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUm91dGVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL2NvbXBvbmVudHMvQXBwLmpzeCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwcmVhY3QgZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGFkZFVzZXIgfSBmcm9tICcuLi9saWIvYXV0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGFkZFVzZXIod2luZG93LmxvY2F0aW9uLmhhc2gpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMucHJvcHMuc2V0VXNlckluZm8ocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxkaXY+TG9nZ2luZyB5b3UgaW4uLi48L2Rpdj47XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIi8vIEBmbG93XG5pbXBvcnQgcHJlYWN0IGZyb20gJ3ByZWFjdCc7XG5cbmltcG9ydCB7IGZldGNoU2hvd3MgfSBmcm9tICcuLi9saWIvYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFNob3cgfSBmcm9tICcuLi9saWIvdHlwZXMnO1xuXG50eXBlIFByb3BzID0ge1xuICBpc0xvZ2dlZEluOiBib29sZWFuLFxuICBpZFRva2VuOiA/c3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dzOiBbXVxuICAgIH07XG4gIH1cbiAgc3RhdGU6IHtcbiAgICBzaG93czogQXJyYXk8U2hvdz5cbiAgfTtcbiAgcHJvcHM6IFByb3BzO1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0xvZ2dlZEluICYmIHRoaXMucHJvcHMuaWRUb2tlbikge1xuICAgICAgZmV0Y2hTaG93cyh0aGlzLnByb3BzLmlkVG9rZW4pLnRoZW4oc2hvd3MgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd3MgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7IGlzTG9nZ2VkSW4sIGlkVG9rZW4gfTogUHJvcHMpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaXNMb2dnZWRJbiAmJiBpc0xvZ2dlZEluICYmIGlkVG9rZW4pIHtcbiAgICAgIGZldGNoU2hvd3MoaWRUb2tlbikudGhlbihzaG93cyA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93cyB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dzLm1hcChzaG93ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC1oZWFkZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICB7c2hvdy5uYW1lfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvY29tcG9uZW50cy9NYWluLmpzeCIsIi8vIEBmbG93XG5pbXBvcnQgcHJlYWN0IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBsb2dpbiwgbG9nb3V0LCBnZXRQaWN0dXJlIH0gZnJvbSAnLi4vbGliL2F1dGgnO1xuXG50eXBlIFByb3BzID0ge1xuICBhY2Nlc3NUb2tlbjogP3N0cmluZyxcbiAgaXNMb2dnZWRJbjogYm9vbGVhblxufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgcGljdHVyZTogP3N0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2IGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgcGljdHVyZTogbnVsbCB9O1xuICB9XG4gIHByb3BzOiBQcm9wcztcbiAgc3RhdGU6IFN0YXRlO1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNMb2dnZWRJbiAmJiB0aGlzLnByb3BzLmFjY2Vzc1Rva2VuICE9IG51bGwpIHtcbiAgICAgIGdldFBpY3R1cmUodGhpcy5wcm9wcy5hY2Nlc3NUb2tlbikudGhlbihwaWN0dXJlID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBpY3R1cmUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wczogUHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5pc0xvZ2dlZEluICYmXG4gICAgICAhdGhpcy5wcm9wcy5pc0xvZ2dlZEluICYmXG4gICAgICB0aGlzLnByb3BzLmFjY2Vzc1Rva2VuICE9IG51bGxcbiAgICApIHtcbiAgICAgIGdldFBpY3R1cmUodGhpcy5wcm9wcy5hY2Nlc3NUb2tlbikudGhlbihwaWN0dXJlID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBpY3R1cmUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlzTG9nZ2VkSW4gPSB0aGlzLnByb3BzLmlzTG9nZ2VkSW47XG4gICAgY29uc3QgcGljdHVyZSA9IHRoaXMuc3RhdGUucGljdHVyZTtcbiAgICByZXR1cm4gKFxuICAgICAgPG5hdiBjbGFzcz1cIm5hdiBoYXMtc2hhZG93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxlZnRcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvaWNvbl8xNDQucG5nXCIgYWx0PVwiVFYgc2V0IGxvZ29cIiAvPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtaXRlbSBpcy10YWJcIj5cbiAgICAgICAgICAgICAgQWN0aXZlXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1pdGVtIGlzLXRhYlwiPlxuICAgICAgICAgICAgICBTbm9vemVkXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXYtdG9nZ2xlXCI+XG4gICAgICAgICAgICA8c3BhbiAvPlxuICAgICAgICAgICAgPHNwYW4gLz5cbiAgICAgICAgICAgIDxzcGFuIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtcmlnaHQgbmF2LW1lbnVcIj5cbiAgICAgICAgICAgIHshaXNMb2dnZWRJbiAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGlzLWxpbmsgbmF2LWl0ZW1cIiBvbkNsaWNrPXtsb2dpbn0+XG4gICAgICAgICAgICAgICAgU2lnbiBpblxuICAgICAgICAgICAgICA8L2J1dHRvbj59XG4gICAgICAgICAgICB7aXNMb2dnZWRJbiAmJlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAge3BpY3R1cmUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInByb2ZpbGVfX2ltZ1wiIHNyYz17cGljdHVyZX0gYWx0PVwiUHJvZmlsZVwiIC8+fVxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gaXMtbGluayBuYXZfX2F1dGgtbGlua1wiIG9uQ2xpY2s9e2xvZ291dH0+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3NwYW4+fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuICAgICk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9jb21wb25lbnRzL05hdi5qc3giLCIvLyBAZmxvd1xuaW1wb3J0IHByZWFjdCBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBzZWFyY2hTaG93cyB9IGZyb20gJy4uL2xpYi9hY3Rpb25zJztcbmltcG9ydCBTZWFyY2hSZXN1bHRzIGZyb20gJy4vU2VhcmNoUmVzdWx0cyc7XG5pbXBvcnQgdHlwZSB7IFJlc3VsdCB9IGZyb20gJy4uL2xpYi90eXBlcyc7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIHRlcm06IHN0cmluZyxcbiAgbGlzdDogQXJyYXk8UmVzdWx0PixcbiAgbG9hZGluZzogYm9vbGVhblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGVybTogJycsXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfVxuICBzZWFyY2goKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgc2VhcmNoU2hvd3ModGhpcy5zdGF0ZS50ZXJtKS50aGVuKGxpc3QgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxpc3QsIGxvYWRpbmc6IGZhbHNlIH0pO1xuICAgIH0pO1xuICB9XG4gIHVwZGF0ZVRlcm0odGVybTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRlcm0gfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGJ1dHRvbkNsYXNzZXMgPSBjbGFzc05hbWVzKCdidXR0b24nLCAnaXMtaW5mbycsICdpcy1tZWRpdW0nLCB7XG4gICAgICAnaXMtbG9hZGluZyc6IHRoaXMuc3RhdGUubG9hZGluZ1xuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNlYXJjaF9fY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2hfX2ZpZWxkLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2hfX2ZpZWxkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGQgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbnRyb2wgaXMtZXhwYW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQgaXMtbWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmluZCBhIHNob3dcIlxuICAgICAgICAgICAgICAgICAgb25LZXlVcD17KHsga2V5IH0pID0+IGtleSA9PT0gJ0VudGVyJyA/IHRoaXMuc2VhcmNoKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy51cGRhdGVUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9e2J1dHRvbkNsYXNzZXN9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2VhcmNoKCl9PlxuICAgICAgICAgICAgICAgICAgU2VhcmNoXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlYXJjaFJlc3VsdHMgcmVzdWx0cz17dGhpcy5zdGF0ZS5saXN0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL2NvbXBvbmVudHMvU2VhcmNoLmpzeCIsIi8vIEBmbG93XG5pbXBvcnQgcHJlYWN0IGZyb20gJ3ByZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgUmVzdWx0IH0gZnJvbSAnLi4vbGliL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2VhcmNoUmVzdWx0cyh7IHJlc3VsdHMgfTogeyByZXN1bHRzOiBBcnJheTxSZXN1bHQ+IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8dWwgY2xhc3M9XCJjb2x1bW5zIGlzLW11bHRpbGluZVwiPlxuICAgICAge3Jlc3VsdHMubWFwKHJlc3VsdCA9PiAoXG4gICAgICAgIDxsaSBrZXk9e3Jlc3VsdC5pZH0gY2xhc3M9XCJjb2x1bW4gaXMtb25lLXRoaXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XG4gICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJpbWFnZSBpcy0xNmJ5OVwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtyZXN1bHQuYXJ0d29ya18yMDh4MTE3fSBhbHQ9XCJQcm9tb3Rpb25hbCBhcnRcIiAvPlxuICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPntyZXN1bHQudGl0bGV9PC9oMj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPlxuICAgICAgKSl9XG4gICAgPC91bD5cbiAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9jb21wb25lbnRzL1NlYXJjaFJlc3VsdHMuanN4IiwiLy8gQGZsb3dcbmltcG9ydCBwcmVhY3QgZnJvbSAncHJlYWN0JztcbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCc7XG5pbXBvcnQgJy4uL2Nzcy9hcHAuc2Nzcyc7XG5cbnByZWFjdC5yZW5kZXIoXG4gIDxBcHBcbiAgICBhY2Nlc3NUb2tlbj17bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyl9XG4gICAgaWRUb2tlbj17bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkVG9rZW4nKX1cbiAgLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBSb290Jylcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvaW5kZXguanN4IiwidmFyIHVybGpvaW4gPSByZXF1aXJlKCd1cmwtam9pbicpO1xuXG52YXIgb2JqZWN0SGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL29iamVjdCcpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4uL2hlbHBlci9hc3NlcnQnKTtcbnZhciByZXNwb25zZUhhbmRsZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvcmVzcG9uc2UtaGFuZGxlcicpO1xuXG5mdW5jdGlvbiBEQkNvbm5lY3Rpb24ocmVxdWVzdCwgb3B0aW9ucykge1xuICB0aGlzLmJhc2VPcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgc2lnblVwQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3J9IFtlcnJdIGVycm9yIHJldHVybmVkIGJ5IEF1dGgwIHdpdGggdGhlIHJlYXNvbiB3aHkgdGhlIHNpZ251cCBmYWlsZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzdWx0XSByZXN1bHQgb2YgdGhlIHNpZ251cCByZXF1ZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0LmVtYWlsIHVzZXIncyBlbWFpbFxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdC5lbWFpbFZlcmlmaWVkIGlmIHRoZSB1c2VyJ3MgZW1haWwgd2FzIHZlcmlmaWVkXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHVzZXIgaW4gYSBBdXRoMCBEYXRhYmFzZSBjb25uZWN0aW9uXG4gKlxuICogQG1ldGhvZCBzaWdudXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbWFpbCB1c2VyIGVtYWlsIGFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnBhc3N3b3JkIHVzZXIgcGFzc3dvcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNvbm5lY3Rpb24gbmFtZSBvZiB0aGUgY29ubmVjdGlvbiB3aGVyZSB0aGUgdXNlciB3aWxsIGJlIGNyZWF0ZWRcbiAqIEBwYXJhbSB7c2lnblVwQ2FsbGJhY2t9IGNiXG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpL2F1dGhlbnRpY2F0aW9uI3NpZ251cH1cbiAqL1xuREJDb25uZWN0aW9uLnByb3RvdHlwZS5zaWdudXAgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIHVybDtcbiAgdmFyIGJvZHk7XG5cbiAgYXNzZXJ0LmNoZWNrKG9wdGlvbnMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBjb25uZWN0aW9uOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnY29ubmVjdGlvbiBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgZW1haWw6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdlbWFpbCBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgcGFzc3dvcmQ6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdwYXNzd29yZCBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdkYmNvbm5lY3Rpb25zJywgJ3NpZ251cCcpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgWydjbGllbnRJRCddKVxuICAgICAgICAgICAgICAgIC53aXRoKG9wdGlvbnMpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIuYmxhY2tsaXN0KGJvZHksIFsnc2NvcGUnXSk7XG5cbiAgYm9keSA9IG9iamVjdEhlbHBlci50b1NuYWtlQ2FzZShib2R5LCBbJ2F1dGgwQ2xpZW50J10pO1xuXG4gIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAucG9zdCh1cmwpXG4gICAgLnNlbmQoYm9keSlcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYikpO1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgY2hhbmdlUGFzc3dvcmRDYWxsYmFja1xuICogQHBhcmFtIHtFcnJvcn0gW2Vycl0gZXJyb3IgcmV0dXJuZWQgYnkgQXV0aDAgd2l0aCB0aGUgcmVhc29uIHdoeSB0aGUgcmVxdWVzdCBmYWlsZWRcbiAqL1xuXG4vKipcbiAqIFJlcXVlc3QgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbiB0byBjaGFuZ2UgYSB1c2VyJ3MgcGFzc3dvcmRcbiAqXG4gKiBAbWV0aG9kIGNoYW5nZVBhc3N3b3JkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW1haWwgYWRkcmVzcyB3aGVyZSB0aGUgdXNlciB3aWxsIHJlY2lldmUgdGhlIGNoYW5nZSBwYXNzd29yZCBlbWFpbC4gSXQgc2hvdWxkIG1hdGNoIHRoZSB1c2VyJ3MgZW1haWwgaW4gQXV0aDBcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNvbm5lY3Rpb24gbmFtZSBvZiB0aGUgY29ubmVjdGlvbiB3aGVyZSB0aGUgdXNlciB3YXMgY3JlYXRlZFxuICogQHBhcmFtIHtjaGFuZ2VQYXNzd29yZENhbGxiYWNrfSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNjaGFuZ2UtcGFzc3dvcmR9XG4gKi9cbkRCQ29ubmVjdGlvbi5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIHVybDtcbiAgdmFyIGJvZHk7XG5cbiAgYXNzZXJ0LmNoZWNrKG9wdGlvbnMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBjb25uZWN0aW9uOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnY29ubmVjdGlvbiBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgZW1haWw6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdlbWFpbCBvcHRpb24gaXMgcmVxdWlyZWQnIH1cbiAgfSk7XG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdkYmNvbm5lY3Rpb25zJywgJ2NoYW5nZV9wYXNzd29yZCcpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgWydjbGllbnRJRCddKVxuICAgICAgICAgICAgICAgIC53aXRoKG9wdGlvbnMsIFsnZW1haWwnLCAnY29ubmVjdGlvbiddKTtcblxuICBib2R5ID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKGJvZHksIFsnYXV0aDBDbGllbnQnXSk7XG5cbiAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgIC5wb3N0KHVybClcbiAgICAuc2VuZChib2R5KVxuICAgIC5lbmQocmVzcG9uc2VIYW5kbGVyKGNiKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERCQ29ubmVjdGlvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvYXV0aGVudGljYXRpb24vZGItY29ubmVjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHVybGpvaW4gPSByZXF1aXJlKCd1cmwtam9pbicpO1xuXG52YXIgb2JqZWN0SGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL29iamVjdCcpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4uL2hlbHBlci9hc3NlcnQnKTtcbnZhciBxcyA9IHJlcXVpcmUoJ3FzJyk7XG52YXIgcmVzcG9uc2VIYW5kbGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL3Jlc3BvbnNlLWhhbmRsZXInKTtcblxuZnVuY3Rpb24gUGFzc3dvcmRsZXNzQXV0aGVudGljYXRpb24ocmVxdWVzdCwgb3B0aW9ucykge1xuICB0aGlzLmJhc2VPcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbn1cblxuUGFzc3dvcmRsZXNzQXV0aGVudGljYXRpb24ucHJvdG90eXBlLmJ1aWxkVmVyaWZ5VXJsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIHBhcmFtcztcbiAgdmFyIHFTdHJpbmc7XG5cbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgYXNzZXJ0LmNoZWNrKG9wdGlvbnMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICBjb25uZWN0aW9uOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnY29ubmVjdGlvbiBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgdmVyaWZpY2F0aW9uQ29kZTogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3ZlcmlmaWNhdGlvbkNvZGUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHBob25lTnVtYmVyOiB7IG9wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdwaG9uZU51bWJlciBvcHRpb24gaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgY29uZGl0aW9uOiBmdW5jdGlvbiAobykgeyByZXR1cm4gIW8uZW1haWw7IH0gfSxcbiAgICBlbWFpbDogeyBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnZW1haWwgb3B0aW9uIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIGNvbmRpdGlvbjogZnVuY3Rpb24gKG8pIHsgcmV0dXJuICFvLnBob25lTnVtYmVyOyB9IH1cbiAgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICBwYXJhbXMgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3Jlc3BvbnNlVHlwZScsXG4gICAgJ3Jlc3BvbnNlTW9kZScsXG4gICAgJ3JlZGlyZWN0VXJpJyxcbiAgICAnc2NvcGUnLFxuICAgICdhdWRpZW5jZSdcbiAgXSkud2l0aChvcHRpb25zKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgaWYgKHRoaXMuYmFzZU9wdGlvbnMuX3NlbmRUZWxlbWV0cnkpIHtcbiAgICBwYXJhbXMuYXV0aDBDbGllbnQgPSB0aGlzLnJlcXVlc3QuZ2V0VGVsZW1ldHJ5RGF0YSgpO1xuICB9XG5cbiAgcGFyYW1zID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKHBhcmFtcywgWydhdXRoMENsaWVudCddKTtcblxuICBxU3RyaW5nID0gcXMuc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgcmV0dXJuIHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAncGFzc3dvcmRsZXNzJywgJ3ZlcmlmeV9yZWRpcmVjdCcsICc/JyArIHFTdHJpbmcpO1xufTtcblxuUGFzc3dvcmRsZXNzQXV0aGVudGljYXRpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciB1cmw7XG4gIHZhciBib2R5O1xuXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGFzc2VydC5jaGVjayhvcHRpb25zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9LCB7XG4gICAgY29ubmVjdGlvbjogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2Nvbm5lY3Rpb24gb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHNlbmQ6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdzZW5kIG9wdGlvbiBpcyByZXF1aXJlZCcsIHZhbHVlczogWydsaW5rJywgJ2NvZGUnXSxcbiAgICAgICAgICAgIHZhbHVlX21lc3NhZ2U6ICdzZW5kIGlzIG5vdCB2YWxpZCAoW2xpbmssIGNvZGVdKScgfSxcbiAgICBwaG9uZU51bWJlcjogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdwaG9uZU51bWJlciBvcHRpb24gaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgY29uZGl0aW9uOiBmdW5jdGlvbiAobykgeyByZXR1cm4gby5zZW5kID09PSAnY29kZScgfHwgIW8uZW1haWw7IH0gfSxcbiAgICBlbWFpbDogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdlbWFpbCBvcHRpb24gaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgY29uZGl0aW9uOiBmdW5jdGlvbiAobykgeyByZXR1cm4gby5zZW5kID09PSAnbGluaycgfHwgIW8ucGhvbmVOdW1iZXI7IH0gfSxcbiAgICBhdXRoUGFyYW1zOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ2F1dGhQYXJhbXMgb3B0aW9uIGlzIHJlcXVpcmVkJyB9XG4gIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgYXNzZXJ0LmNoZWNrKGNiLCB7IHR5cGU6ICdmdW5jdGlvbicsIG1lc3NhZ2U6ICdjYiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcblxuICB1cmwgPSB1cmxqb2luKHRoaXMuYmFzZU9wdGlvbnMucm9vdFVybCwgJ3Bhc3N3b3JkbGVzcycsICdzdGFydCcpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3Jlc3BvbnNlVHlwZScsXG4gICAgJ3JlZGlyZWN0VXJpJyxcbiAgICAnc2NvcGUnXG4gIF0pLndpdGgob3B0aW9ucyk7XG5cbiAgaWYgKGJvZHkuc2NvcGUpIHtcbiAgICBib2R5LmF1dGhQYXJhbXMgPSBib2R5LmF1dGhQYXJhbXMgfHwge307XG4gICAgYm9keS5hdXRoUGFyYW1zLnNjb3BlID0gYm9keS5zY29wZTtcbiAgfVxuXG4gIGlmIChib2R5LnJlZGlyZWN0VXJpKSB7XG4gICAgYm9keS5hdXRoUGFyYW1zID0gYm9keS5hdXRoUGFyYW1zIHx8IHt9O1xuICAgIGJvZHkuYXV0aFBhcmFtcy5yZWRpcmVjdF91cmkgPSBib2R5LnJlZGlyZWN0VXJpO1xuICB9XG5cbiAgaWYgKGJvZHkucmVzcG9uc2VUeXBlKSB7XG4gICAgYm9keS5hdXRoUGFyYW1zID0gYm9keS5hdXRoUGFyYW1zIHx8IHt9O1xuICAgIGJvZHkuYXV0aFBhcmFtcy5yZXNwb25zZV90eXBlID0gYm9keS5yZXNwb25zZVR5cGU7XG4gIH1cblxuICBkZWxldGUgYm9keS5yZWRpcmVjdFVyaTtcbiAgZGVsZXRlIGJvZHkucmVzcG9uc2VUeXBlO1xuICBkZWxldGUgYm9keS5zY29wZTtcblxuICBib2R5ID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKGJvZHksIFsnYXV0aDBDbGllbnQnLCAnYXV0aFBhcmFtcyddKTtcblxuICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgLnBvc3QodXJsKVxuICAgIC5zZW5kKGJvZHkpXG4gICAgLmVuZChyZXNwb25zZUhhbmRsZXIoY2IpKTtcbn07XG5cblBhc3N3b3JkbGVzc0F1dGhlbnRpY2F0aW9uLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIHVybDtcbiAgdmFyIGNsZWFuT3B0aW9uO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGFzc2VydC5jaGVjayhvcHRpb25zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9LCB7XG4gICAgY29ubmVjdGlvbjogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2Nvbm5lY3Rpb24gb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHZlcmlmaWNhdGlvbkNvZGU6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICd2ZXJpZmljYXRpb25Db2RlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBwaG9uZU51bWJlcjogeyBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncGhvbmVOdW1iZXIgb3B0aW9uIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIGNvbmRpdGlvbjogZnVuY3Rpb24gKG8pIHsgcmV0dXJuICFvLmVtYWlsOyB9IH0sXG4gICAgZW1haWw6IHsgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2VtYWlsIG9wdGlvbiBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICBjb25kaXRpb246IGZ1bmN0aW9uIChvKSB7IHJldHVybiAhby5waG9uZU51bWJlcjsgfSB9XG4gIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgYXNzZXJ0LmNoZWNrKGNiLCB7IHR5cGU6ICdmdW5jdGlvbicsIG1lc3NhZ2U6ICdjYiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcblxuICBjbGVhbk9wdGlvbiA9IG9iamVjdEhlbHBlci50b1NuYWtlQ2FzZShvcHRpb25zLCBbJ2F1dGgwQ2xpZW50J10pO1xuXG4gIHVybCA9IHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAncGFzc3dvcmRsZXNzJywgJ3ZlcmlmeScpO1xuXG4gIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAucG9zdCh1cmwpXG4gICAgLnNlbmQoY2xlYW5PcHRpb24pXG4gICAgLmVuZChyZXNwb25zZUhhbmRsZXIoY2IpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRsZXNzQXV0aGVudGljYXRpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2F1dGhlbnRpY2F0aW9uL3Bhc3N3b3JkbGVzcy1hdXRoZW50aWNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHdpbmRvd0hhbmRsZXIgPSByZXF1aXJlKCcuL3dpbmRvdycpO1xudmFyIGJhc2U2NFVybCA9IHJlcXVpcmUoJy4vYmFzZTY0X3VybCcpO1xuXG5mdW5jdGlvbiBjcmVhdGUobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgdmFyIGRhdGU7XG4gIHZhciBleHBpcmVzO1xuXG4gIGlmICh3aW5kb3dIYW5kbGVyLmdldERvY3VtZW50KCkuY29va2llID09PSB1bmRlZmluZWRcbiAgICAgIHx8IHdpbmRvd0hhbmRsZXIuZ2V0RG9jdW1lbnQoKS5jb29raWUgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nvb2tpZSBzdG9yYWdlIG5vdCBhdmFpbGFibGUnKTtcbiAgfVxuXG4gIGlmIChkYXlzKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9HTVRTdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBleHBpcmVzID0gJyc7XG4gIH1cblxuICB3aW5kb3dIYW5kbGVyLmdldERvY3VtZW50KCkuY29va2llID0gbmFtZSArICc9JyArIGJhc2U2NFVybC5lbmNvZGUodmFsdWUpICsgZXhwaXJlcyArICc7IHBhdGg9Lyc7XG59XG5cbmZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICB2YXIgaTtcbiAgdmFyIGNvb2tpZTtcbiAgdmFyIGNvb2tpZXM7XG4gIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nO1xuXG4gIGlmICh3aW5kb3dIYW5kbGVyLmdldERvY3VtZW50KCkuY29va2llID09PSB1bmRlZmluZWRcbiAgICAgIHx8IHdpbmRvd0hhbmRsZXIuZ2V0RG9jdW1lbnQoKS5jb29raWUgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nvb2tpZSBzdG9yYWdlIG5vdCBhdmFpbGFibGUnKTtcbiAgfVxuXG4gIGNvb2tpZXMgPSB3aW5kb3dIYW5kbGVyLmdldERvY3VtZW50KCkuY29va2llLnNwbGl0KCc7Jyk7XG5cbiAgZm9yIChpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb29raWUgPSBjb29raWVzW2ldO1xuICAgIHdoaWxlIChjb29raWUuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgIGNvb2tpZSA9IGNvb2tpZS5zdWJzdHJpbmcoMSwgY29va2llLmxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChjb29raWUuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICByZXR1cm4gYmFzZTY0VXJsLmRlY29kZShjb29raWUuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZXJhc2UobmFtZSkge1xuICBjcmVhdGUobmFtZSwgJycsIC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogY3JlYXRlLFxuICByZWFkOiByZWFkLFxuICBlcmFzZTogZXJhc2Vcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgd2luZG93SGVscGVyID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcblxuZnVuY3Rpb24gSWZyYW1lSGFuZGxlcihvcHRpb25zKSB7XG4gIHRoaXMuYXV0aDAgPSBvcHRpb25zLmF1dGgwO1xuICB0aGlzLnVybCA9IG9wdGlvbnMudXJsO1xuICB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcbiAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDYwICogMTAwMDtcbiAgdGhpcy50aW1lb3V0Q2FsbGJhY2sgPSBvcHRpb25zLnRpbWVvdXRDYWxsYmFjayB8fCBudWxsO1xuICB0aGlzLnVzZVBvc3RNZXNzYWdlID0gb3B0aW9ucy51c2VQb3N0TWVzc2FnZSB8fCBmYWxzZTtcbiAgdGhpcy5pZnJhbWUgPSBudWxsO1xuICB0aGlzLnRpbWVvdXRIYW5kbGUgPSBudWxsO1xuICB0aGlzLl9kZXN0cm95VGltZW91dCA9IG51bGw7XG4gIHRoaXMudHJhbnNpZW50TWVzc2FnZUV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICB0aGlzLnRyYW5zaWVudEV2ZW50TGlzdGVuZXIgPSBudWxsO1xufVxuXG5JZnJhbWVIYW5kbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvd0hlbHBlci5nZXRXaW5kb3coKTtcblxuICB0aGlzLmlmcmFtZSA9IF93aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHRoaXMuaWZyYW1lLnNyYyA9IHRoaXMudXJsO1xuXG4gIGlmICh0aGlzLnVzZVBvc3RNZXNzYWdlKSB7XG4gICAgLy8gV29ya2Fyb3VuZCB0byBhdm9pZCB1c2luZyBiaW5kIHRoYXQgZG9lcyBub3Qgd29yayBpbiBJRThcbiAgICB0aGlzLnRyYW5zaWVudE1lc3NhZ2VFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIF90aGlzLm1lc3NhZ2VFdmVudExpc3RlbmVyKGUpO1xuICAgIH07XG5cbiAgICBfd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLnRyYW5zaWVudE1lc3NhZ2VFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gV29ya2Fyb3VuZCB0byBhdm9pZCB1c2luZyBiaW5kIHRoYXQgZG9lcyBub3Qgd29yayBpbiBJRThcbiAgICB0aGlzLnRyYW5zaWVudEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5sb2FkRXZlbnRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICB0aGlzLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy50cmFuc2llbnRFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gIH1cblxuICBfd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuXG4gIHRoaXMudGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIF90aGlzLnRpbWVvdXRIYW5kbGVyKCk7XG4gIH0sIHRoaXMudGltZW91dCk7XG59O1xuXG5JZnJhbWVIYW5kbGVyLnByb3RvdHlwZS5tZXNzYWdlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChlKSB7XG4gIHRoaXMuZGVzdHJveSgpO1xuICB0aGlzLmNhbGxiYWNrSGFuZGxlcihlLmRhdGEpO1xufTtcblxuSWZyYW1lSGFuZGxlci5wcm90b3R5cGUubG9hZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIF90aGlzLmNhbGxiYWNrKHRoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3cubG9jYXRpb24uaGFzaCk7XG59O1xuXG5JZnJhbWVIYW5kbGVyLnByb3RvdHlwZS5jYWxsYmFja0hhbmRsZXIgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gIHZhciBlcnJvciA9IG51bGw7XG5cbiAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZXJyb3IpIHtcbiAgICBlcnJvciA9IHJlc3VsdDtcbiAgICByZXN1bHQgPSBudWxsO1xuICB9XG5cbiAgdGhpcy5jYWxsYmFjayhlcnJvciwgcmVzdWx0KTtcbn07XG5cbklmcmFtZUhhbmRsZXIucHJvdG90eXBlLnRpbWVvdXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgaWYgKHRoaXMudGltZW91dENhbGxiYWNrKSB7XG4gICAgdGhpcy50aW1lb3V0Q2FsbGJhY2soKTtcbiAgfVxufTtcblxuSWZyYW1lSGFuZGxlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdmFyIF93aW5kb3cgPSB3aW5kb3dIZWxwZXIuZ2V0V2luZG93KCk7XG5cbiAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XG5cbiAgdGhpcy5fZGVzdHJveVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoX3RoaXMudXNlUG9zdE1lc3NhZ2UpIHtcbiAgICAgIF93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF90aGlzLnRyYW5zaWVudE1lc3NhZ2VFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF90aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgX3RoaXMudHJhbnNpZW50RXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgIH1cblxuICAgIF93aW5kb3cuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpcy5pZnJhbWUpO1xuICB9LCAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSWZyYW1lSGFuZGxlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL2lmcmFtZS1oYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuXG5mdW5jdGlvbiBnZXQoKSB7XG4gIGlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIHJldHVybiBvYmplY3RBc3NpZ25Qb2x5ZmlsbDtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduO1xufVxuXG5mdW5jdGlvbiBvYmplY3RBc3NpZ25Qb2x5ZmlsbCh0YXJnZXQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PT0gdW5kZWZpbmVkIHx8IG5leHRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldDogZ2V0LFxuICBvYmplY3RBc3NpZ25Qb2x5ZmlsbDogb2JqZWN0QXNzaWduUG9seWZpbGxcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgb2JqZWN0SGVscGVyID0gcmVxdWlyZSgnLi9vYmplY3QnKTtcblxudmFyIHRva2VuUGFyYW1zID0gW1xuLy8gYXV0aDBcbiAgJ3JlYWxtJyxcbiAgJ2F1ZGllbmNlJyxcbi8vIG9hdXRoMlxuICAnY2xpZW50X2lkJyxcbiAgJ2NsaWVudF9zZWNyZXQnLFxuICAncmVkaXJlY3RfdXJpJyxcbiAgJ3Njb3BlJyxcbiAgJ2NvZGUnLFxuICAnZ3JhbnRfdHlwZScsXG4gICd1c2VybmFtZScsXG4gICdwYXNzd29yZCcsXG4gICdyZWZyZXNoX3Rva2VuJyxcbiAgJ2Fzc2VydGlvbicsXG4gICdjbGllbnRfYXNzZXJ0aW9uJyxcbiAgJ2NsaWVudF9hc3NlcnRpb25fdHlwZScsXG4gICdjb2RlX3ZlcmlmaWVyJ1xuXTtcblxudmFyIGF1dGhvcml6ZVBhcmFtcyA9IFtcbi8vIGF1dGgwXG4gICdjb25uZWN0aW9uJyxcbiAgJ2Nvbm5lY3Rpb25fc2NvcGUnLFxuICAnYXV0aDBDbGllbnQnLFxuICAnb3dwJyxcbiAgJ2RldmljZScsXG5cbiAgJ3Byb3RvY29sJyxcbiAgJ19jc3JmJyxcbiAgJ19pbnRzdGF0ZScsXG5cbi8vIG9hdXRoMlxuICAnY2xpZW50X2lkJyxcbiAgJ3Jlc3BvbnNlX3R5cGUnLFxuICAncmVzcG9uc2VfbW9kZScsXG4gICdyZWRpcmVjdF91cmknLFxuICAnYXVkaWVuY2UnLFxuICAnc2NvcGUnLFxuICAnc3RhdGUnLFxuICAnbm9uY2UnLFxuICAnZGlzcGxheScsXG4gICdwcm9tcHQnLFxuICAnbWF4X2FnZScsXG4gICd1aV9sb2NhbGVzJyxcbiAgJ2NsYWltc19sb2NhbGVzJyxcbiAgJ2lkX3Rva2VuX2hpbnQnLFxuICAnbG9naW5faGludCcsXG4gICdhY3JfdmFsdWVzJyxcbiAgJ2NsYWltcycsXG4gICdyZWdpc3RyYXRpb24nLFxuICAncmVxdWVzdCcsXG4gICdyZXF1ZXN0X3VyaScsXG4gICdjb2RlX2NoYWxsZW5nZScsXG4gICdjb2RlX2NoYWxsZW5nZV9tZXRob2QnXG5dO1xuXG5mdW5jdGlvbiBvYXV0aEF1dGhvcml6ZVBhcmFtcyh3YXJuLCBwYXJhbXMpIHtcbiAgdmFyIG5vdEFsbG93ZWQgPSBvYmplY3RIZWxwZXIuZ2V0S2V5c05vdEluKHBhcmFtcywgYXV0aG9yaXplUGFyYW1zKTtcblxuICBpZiAobm90QWxsb3dlZC5sZW5ndGggPiAwKSB7XG4gICAgd2Fybi53YXJuaW5nKCdGb2xsb3dpbmcgcGFyYW1ldGVycyBhcmUgbm90IGFsbG93ZWQgb24gdGhlIGAvYXV0aG9yaXplYCBlbmRwb2luZzogWycgKyBub3RBbGxvd2VkLmpvaW4oJywnKSArICddJyk7XG4gIH1cblxuICByZXR1cm4gcGFyYW1zO1xufVxuXG5mdW5jdGlvbiBvYXV0aFRva2VuUGFyYW1zKHdhcm4sIHBhcmFtcykge1xuICByZXR1cm4gb2JqZWN0SGVscGVyLnBpY2socGFyYW1zLCB0b2tlblBhcmFtcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvYXV0aFRva2VuUGFyYW1zOiBvYXV0aFRva2VuUGFyYW1zLFxuICBvYXV0aEF1dGhvcml6ZVBhcmFtczogb2F1dGhBdXRob3JpemVQYXJhbXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9wYXJhbWV0ZXJzLXdoaXRlbGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKCcuLi92ZXJzaW9uJyk7XG5cbmZ1bmN0aW9uIFBsdWdpbkhhbmRsZXIod2ViQXV0aCwgcGx1Z2lucykge1xuICB0aGlzLnBsdWdpbnMgPSBwbHVnaW5zO1xuXG4gIGZvciAodmFyIGEgPSAwOyBhIDwgdGhpcy5wbHVnaW5zLmxlbmd0aDsgYSsrKSB7XG4gICAgaWYgKHRoaXMucGx1Z2luc1thXS52ZXJzaW9uICE9PSB2ZXJzaW9uLnJhdykge1xuICAgICAgdmFyIHBsdWdpbk5hbWUgPSAnJztcblxuICAgICAgaWYgKHRoaXMucGx1Z2luc1thXS5jb25zdHJ1Y3RvciAmJiB0aGlzLnBsdWdpbnNbYV0uY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgICBwbHVnaW5OYW1lID0gdGhpcy5wbHVnaW5zW2FdLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignUGx1Z2luICcgKyBwbHVnaW5OYW1lICsgJyB2ZXJzaW9uICgnICsgdGhpcy5wbHVnaW5zW2FdLnZlcnNpb24gKyAnKSAnICtcbiAgICAgICAgJ2lzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFNESyB2ZXJzaW9uICgnICsgdmVyc2lvbi5yYXcgKyAnKScpO1xuICAgIH1cblxuICAgIHRoaXMucGx1Z2luc1thXS5zZXRXZWJBdXRoKHdlYkF1dGgpO1xuICB9XG59XG5cblBsdWdpbkhhbmRsZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChleHRlbnNpYmlsaXR5UG9pbnQpIHtcbiAgZm9yICh2YXIgYSA9IDA7IGEgPCB0aGlzLnBsdWdpbnMubGVuZ3RoOyBhKyspIHtcbiAgICBpZiAodGhpcy5wbHVnaW5zW2FdLnN1cHBvcnRzKGV4dGVuc2liaWxpdHlQb2ludCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBsdWdpbnNbYV0uaW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbHVnaW5IYW5kbGVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcGx1Z2lucy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xudmFyIFdpbkNoYW4gPSByZXF1aXJlKCd3aW5jaGFuJyk7XG5cbnZhciB3aW5kb3dIYW5kbGVyID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbnZhciBvYmplY3RIZWxwZXIgPSByZXF1aXJlKCcuL29iamVjdCcpO1xudmFyIHFzID0gcmVxdWlyZSgncXMnKTtcblxuZnVuY3Rpb24gUG9wdXBIYW5kbGVyKCkge1xuICB0aGlzLl9jdXJyZW50X3BvcHVwID0gbnVsbDtcbn1cblxuUG9wdXBIYW5kbGVyLnByb3RvdHlwZS5jYWxjdWxhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNjAwO1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvd0hhbmRsZXIuZ2V0V2luZG93KCk7XG5cbiAgdmFyIHNjcmVlblggPSB0eXBlb2YgX3dpbmRvdy5zY3JlZW5YICE9PSAndW5kZWZpbmVkJyA/IF93aW5kb3cuc2NyZWVuWCA6IF93aW5kb3cuc2NyZWVuTGVmdDtcbiAgdmFyIHNjcmVlblkgPSB0eXBlb2YgX3dpbmRvdy5zY3JlZW5ZICE9PSAndW5kZWZpbmVkJyA/IF93aW5kb3cuc2NyZWVuWSA6IF93aW5kb3cuc2NyZWVuVG9wO1xuXG4gIHZhciBvdXRlcldpZHRoID0gdHlwZW9mIF93aW5kb3cub3V0ZXJXaWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IF93aW5kb3cub3V0ZXJXaWR0aFxuICAgIDogX3dpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4gIHZhciBvdXRlckhlaWdodCA9IHR5cGVvZiBfd2luZG93Lm91dGVySGVpZ2h0ICE9PSAndW5kZWZpbmVkJ1xuICAgID8gX3dpbmRvdy5vdXRlckhlaWdodFxuICAgIDogX3dpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcblxuICB2YXIgbGVmdCA9IHNjcmVlblggKyAoKG91dGVyV2lkdGggLSB3aWR0aCkgLyAyKTtcbiAgdmFyIHRvcCA9IHNjcmVlblkgKyAoKG91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIpO1xuXG4gIHJldHVybiB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIGxlZnQ6IGxlZnQsIHRvcDogdG9wIH07XG59O1xuXG5Qb3B1cEhhbmRsZXIucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvd0hhbmRsZXIuZ2V0V2luZG93KCk7XG4gIHZhciBwb3B1cFBvc2l0aW9uID0gdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihvcHRpb25zLnBvcHVwT3B0aW9ucyB8fCB7fSk7XG4gIHZhciBwb3B1cE9wdGlvbnMgPSBvYmplY3RIZWxwZXIubWVyZ2UocG9wdXBQb3NpdGlvbikud2l0aChvcHRpb25zLnBvcHVwT3B0aW9ucyk7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybCB8fCAnYWJvdXQ6YmxhbmsnO1xuICB2YXIgd2luZG93RmVhdHVyZXMgPSBxcy5zdHJpbmdpZnkocG9wdXBPcHRpb25zLCB7XG4gICAgZW5jb2RlOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6ICcsJ1xuICB9KTtcblxuICBpZiAodGhpcy5fY3VycmVudF9wb3B1cCAmJiAhdGhpcy5fY3VycmVudF9wb3B1cC5jbG9zZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudF9wb3B1cDtcbiAgfVxuXG4gIHRoaXMuX2N1cnJlbnRfcG9wdXAgPSBfd2luZG93Lm9wZW4odXJsLCAnYXV0aDBfc2lnbnVwX3BvcHVwJywgd2luZG93RmVhdHVyZXMpO1xuXG4gIHRoaXMuX2N1cnJlbnRfcG9wdXAua2lsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgX3RoaXMuX2N1cnJlbnRfcG9wdXAgPSBudWxsO1xuICB9O1xuXG4gIHJldHVybiB0aGlzLl9jdXJyZW50X3BvcHVwO1xufTtcblxuUG9wdXBIYW5kbGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgcmVsYXlVcmwsIG9wdGlvbnMsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHZhciBwb3B1cFBvc2l0aW9uID0gdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihvcHRpb25zLnBvcHVwT3B0aW9ucyB8fCB7fSk7XG4gIHZhciBwb3B1cE9wdGlvbnMgPSBvYmplY3RIZWxwZXIubWVyZ2UocG9wdXBQb3NpdGlvbikud2l0aChvcHRpb25zLnBvcHVwT3B0aW9ucyk7XG5cbiAgdmFyIHdpbmNoYW5PcHRpb25zID0gb2JqZWN0SGVscGVyLm1lcmdlKHtcbiAgICB1cmw6IHVybCxcbiAgICByZWxheV91cmw6IHJlbGF5VXJsLFxuICAgIHdpbmRvd19mZWF0dXJlczogcXMuc3RyaW5naWZ5KHBvcHVwT3B0aW9ucywge1xuICAgICAgZGVsaW1pdGVyOiAnLCcsXG4gICAgICBlbmNvZGU6IGZhbHNlXG4gICAgfSksXG4gICAgcG9wdXA6IHRoaXMuX2N1cnJlbnRfcG9wdXBcbiAgfSkud2l0aChvcHRpb25zKTtcblxuICB2YXIgcG9wdXAgPSBXaW5DaGFuLm9wZW4od2luY2hhbk9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICBfdGhpcy5fY3VycmVudF9wb3B1cCA9IG51bGw7XG4gICAgcmV0dXJuIGNiKGVyciwgZGF0YSk7XG4gIH0pO1xuXG4gIHBvcHVwLmZvY3VzKCk7XG5cbiAgcmV0dXJuIHBvcHVwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3B1cEhhbmRsZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9wb3B1cC1oYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgd2luZG93SGVscGVyID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcblxuZnVuY3Rpb24gcmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgY2hhcnNldCA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVlhZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6LS5ffic7XG5cbiAgdmFyIGNyeXB0b09iaiA9IHdpbmRvd0hlbHBlci5nZXRXaW5kb3coKS5jcnlwdG8gfHwgd2luZG93SGVscGVyLmdldFdpbmRvdygpLm1zQ3J5cHRvO1xuICBpZiAoIWNyeXB0b09iaikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHJhbmRvbSA9IGNyeXB0b09iai5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuXG4gIGZvciAodmFyIGEgPSAwOyBhIDwgcmFuZG9tLmxlbmd0aDsgYSsrKSB7XG4gICAgcmVzdWx0LnB1c2goY2hhcnNldFtyYW5kb21bYV0gJSBjaGFyc2V0Lmxlbmd0aF0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbVN0cmluZzogcmFuZG9tU3RyaW5nXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvcmFuZG9tLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3RvcmFnZUhhbmRsZXIgPSByZXF1aXJlKCcuL3N0b3JhZ2UvaGFuZGxlcicpO1xudmFyIHN0b3JhZ2U7XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2UoZm9yY2UpIHtcbiAgaWYgKCFzdG9yYWdlIHx8IGZvcmNlKSB7XG4gICAgc3RvcmFnZSA9IG5ldyBTdG9yYWdlSGFuZGxlcigpO1xuICB9XG4gIHJldHVybiBzdG9yYWdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SXRlbTogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciB2YWx1ZSA9IGdldFN0b3JhZ2UoKS5nZXRJdGVtKGtleSk7XG4gICAgcmV0dXJuIHZhbHVlID8gSlNPTi5wYXJzZSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfSxcbiAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBnZXRTdG9yYWdlKCkucmVtb3ZlSXRlbShrZXkpO1xuICB9LFxuICBzZXRJdGVtOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIHJldHVybiBnZXRTdG9yYWdlKCkuc2V0SXRlbShrZXksIGpzb24pO1xuICB9LFxuICByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBnZXRTdG9yYWdlKHRydWUpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvc3RvcmFnZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLi9jb29raWVzJyk7XG5cbmZ1bmN0aW9uIENvb2tpZVN0b3JhZ2UoKSB7fVxuXG5Db29raWVTdG9yYWdlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gY29va2llcy5yZWFkKGtleSk7XG59O1xuXG5Db29raWVTdG9yYWdlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICBjb29raWVzLmVyYXNlKGtleSk7XG59O1xuXG5Db29raWVTdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgY29va2llcy5jcmVhdGUoa2V5LCB2YWx1ZSwgMSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvb2tpZVN0b3JhZ2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2hlbHBlci9zdG9yYWdlL2Nvb2tpZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gRHVtbXlTdG9yYWdlKCkge31cblxuRHVtbXlTdG9yYWdlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcblxuRHVtbXlTdG9yYWdlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKCkge307XG5cbkR1bW15U3RvcmFnZS5wcm90b3R5cGUuc2V0SXRlbSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IER1bW15U3RvcmFnZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL3N0b3JhZ2UvZHVtbXkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB3aW5kb3dIYW5kbGVyID0gcmVxdWlyZSgnLi4vd2luZG93Jyk7XG52YXIgRHVtbXlTdG9yYWdlID0gcmVxdWlyZSgnLi9kdW1teScpO1xudmFyIENvb2tpZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2Nvb2tpZScpO1xudmFyIFdhcm4gPSByZXF1aXJlKCcuLi93YXJuJyk7XG5cbmZ1bmN0aW9uIFN0b3JhZ2VIYW5kbGVyKCkge1xuICB0aGlzLndhcm4gPSBuZXcgV2Fybih7fSk7XG4gIHRoaXMuc3RvcmFnZSA9IHdpbmRvd0hhbmRsZXIuZ2V0V2luZG93KCkubG9jYWxTdG9yYWdlIHx8IG5ldyBDb29raWVTdG9yYWdlKCk7XG59XG5cblN0b3JhZ2VIYW5kbGVyLnByb3RvdHlwZS5mYWlsb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3RvcmFnZSBpbnN0YW5jZW9mIER1bW15U3RvcmFnZSkge1xuICAgIHRoaXMud2Fybi53YXJuaW5nKCdEdW1teVN0b3JhZ2U6IGlnbm9yZSBmYWlsb3ZlcicpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICh0aGlzLnN0b3JhZ2UgaW5zdGFuY2VvZiBDb29raWVTdG9yYWdlKSB7XG4gICAgdGhpcy53YXJuLndhcm5pbmcoJ0Nvb2tpZVN0b3JhZ2U6IGZhaWxpbmcgb3ZlciBEdW1teVN0b3JhZ2UnKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgRHVtbXlTdG9yYWdlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YXJuLndhcm5pbmcoJ0xvY2FsU3RvcmFnZTogZmFpbGluZyBvdmVyIENvb2tpZVN0b3JhZ2UnKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgQ29va2llU3RvcmFnZSgpO1xuICB9XG59O1xuXG5TdG9yYWdlSGFuZGxlci5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMud2Fybi53YXJuaW5nKGUpO1xuICAgIHRoaXMuZmFpbG92ZXIoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGtleSk7XG4gIH1cbn07XG5cblN0b3JhZ2VIYW5kbGVyLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy53YXJuLndhcm5pbmcoZSk7XG4gICAgdGhpcy5mYWlsb3ZlcigpO1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxufTtcblxuU3RvcmFnZUhhbmRsZXIucHJvdG90eXBlLnNldEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMud2Fybi53YXJuaW5nKGUpO1xuICAgIHRoaXMuZmFpbG92ZXIoKTtcbiAgICByZXR1cm4gdGhpcy5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JhZ2VIYW5kbGVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9oZWxwZXIvc3RvcmFnZS9oYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBnaXZlbiBhIFVSTCwgZXh0cmFjdCB0aGUgb3JpZ2luLiBUYWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJhc2UvZmlyZWJhc2Utc2ltcGxlLWxvZ2luL2Jsb2IvZDJjYjk1YjlmODEyZDg0ODhiZGJmYmE1MWMzYTdjMTUzYmExYTA3NC9qcy9zcmMvc2ltcGxlLWxvZ2luL3RyYW5zcG9ydHMvV2luQ2hhbi5qcyNMMjUtTDMwXG5mdW5jdGlvbiBleHRyYWN0T3JpZ2luKHVybCkge1xuICBpZiAoIS9eaHR0cHM/OlxcL1xcLy8udGVzdCh1cmwpKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIG0gPSAvXihodHRwcz86XFwvXFwvWy1fYS16QS1aLjAtOTpdKykvLmV4ZWModXJsKTtcbiAgaWYgKG0pIHJldHVybiBtWzFdO1xuICByZXR1cm4gdXJsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0cmFjdE9yaWdpbjogZXh0cmFjdE9yaWdpblxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvaGVscGVyL3VybC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEF1dGhlbnRpY2F0aW9uID0gcmVxdWlyZSgnLi9hdXRoZW50aWNhdGlvbicpO1xudmFyIE1hbmFnZW1lbnQgPSByZXF1aXJlKCcuL21hbmFnZW1lbnQnKTtcbnZhciBXZWJBdXRoID0gcmVxdWlyZSgnLi93ZWItYXV0aCcpO1xudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvbixcbiAgTWFuYWdlbWVudDogTWFuYWdlbWVudCxcbiAgV2ViQXV0aDogV2ViQXV0aCxcbiAgdmVyc2lvbjogdmVyc2lvbi5yYXdcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdXJsam9pbiA9IHJlcXVpcmUoJ3VybC1qb2luJyk7XG5cbnZhciBSZXF1ZXN0QnVpbGRlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9yZXF1ZXN0LWJ1aWxkZXInKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuLi9oZWxwZXIvYXNzZXJ0Jyk7XG52YXIgcmVzcG9uc2VIYW5kbGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL3Jlc3BvbnNlLWhhbmRsZXInKTtcblxuLyoqXG4gKiBBdXRoMCBNYW5hZ2VtZW50IEFQSSBDbGllbnQgKG1ldGhvZHMgYWxsb3dlZCB0byBiZSBjYWxsZWQgZnJvbSB0aGUgYnJvd3NlciBvbmx5KVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuZG9tYWluIHlvdXIgQXV0aDAgYWNvdW50IGRvbWFpblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMudG9rZW4gYSB2YWxpZCBBUEkgdG9rZW5cbiAqL1xuZnVuY3Rpb24gTWFuYWdlbWVudChvcHRpb25zKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGFzc2VydC5jaGVjayhvcHRpb25zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9LCB7XG4gICAgZG9tYWluOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnZG9tYWluIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICB0b2tlbjogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Rva2VuIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBfc2VuZFRlbGVtZXRyeTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ2Jvb2xlYW4nLCBtZXNzYWdlOiAnX3NlbmRUZWxlbWV0cnkgb3B0aW9uIGlzIG5vdCB2YWxpZCcgfSxcbiAgICBfdGVsZW1ldHJ5SW5mbzogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdfdGVsZW1ldHJ5SW5mbyBvcHRpb24gaXMgbm90IHZhbGlkJyB9XG4gIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgdGhpcy5iYXNlT3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgdGhpcy5iYXNlT3B0aW9ucy5oZWFkZXJzID0geyBBdXRob3JpemF0aW9uOiAnQmVhcmVyICcgKyB0aGlzLmJhc2VPcHRpb25zLnRva2VuIH07XG5cbiAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3RCdWlsZGVyKHRoaXMuYmFzZU9wdGlvbnMpO1xuICB0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwgPSB1cmxqb2luKCdodHRwczovLycgKyB0aGlzLmJhc2VPcHRpb25zLmRvbWFpbiwgJ2FwaScsICd2MicpO1xufVxuXG4vKipcbiAqIEBjYWxsYmFjayB1c2VyQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RXJyb3J9IFtlcnJdIGZhaWx1cmUgcmVhc29uIGZvciB0aGUgZmFpbGVkIHJlcXVlc3QgdG8gTWFuYWdlbWVudCBBUElcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzdWx0XSB1c2VyIHByb2ZpbGVcbiAqL1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHVzZXIgcHJvZmlsZVxuICpcbiAqIEBtZXRob2QgZ2V0VXNlclxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJJZCBpZGVudGlmaWVyIG9mIHRoZSB1c2VyIHRvIHJldHJpZXZlXG4gKiBAcGFyYW0ge3VzZXJDYWxsYmFja30gY2JcbiAqIEBzZWUgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvbWFuYWdlbWVudC92MiMhL1VzZXJzL2dldF91c2Vyc19ieV9pZFxuICovXG5NYW5hZ2VtZW50LnByb3RvdHlwZS5nZXRVc2VyID0gZnVuY3Rpb24gKHVzZXJJZCwgY2IpIHtcbiAgdmFyIHVybDtcblxuICBhc3NlcnQuY2hlY2sodXNlcklkLCB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAndXNlcklkIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuICBhc3NlcnQuY2hlY2soY2IsIHsgdHlwZTogJ2Z1bmN0aW9uJywgbWVzc2FnZTogJ2NiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuXG4gIHVybCA9IHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAndXNlcnMnLCB1c2VySWQpO1xuXG4gIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAuZ2V0KHVybClcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYiwgeyBpZ25vcmVDYXNpbmc6IHRydWUgfSkpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSB1c2VyIG1ldGRhdGEuIEl0IHdpbGwgcGF0Y2ggdGhlIHVzZXIgbWV0ZGF0YSB3aXRoIHRoZSBhdHRyaWJ1dGVzIHNlbnQuXG4gKlxuICpcbiAqIEBtZXRob2QgcGF0Y2hVc2VyTWV0YWRhdGFcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VySWRcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyTWV0YWRhdGFcbiAqIEBwYXJhbSB7dXNlckNhbGxiYWNrfSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9tYW5hZ2VtZW50L3YyIyEvVXNlcnMvcGF0Y2hfdXNlcnNfYnlfaWR9XG4gKi9cbk1hbmFnZW1lbnQucHJvdG90eXBlLnBhdGNoVXNlck1ldGFkYXRhID0gZnVuY3Rpb24gKHVzZXJJZCwgdXNlck1ldGFkYXRhLCBjYikge1xuICB2YXIgdXJsO1xuXG4gIGFzc2VydC5jaGVjayh1c2VySWQsIHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICd1c2VySWQgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG4gIGFzc2VydC5jaGVjayh1c2VyTWV0YWRhdGEsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICd1c2VyTWV0YWRhdGEgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG4gIGFzc2VydC5jaGVjayhjYiwgeyB0eXBlOiAnZnVuY3Rpb24nLCBtZXNzYWdlOiAnY2IgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSk7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICd1c2VycycsIHVzZXJJZCk7XG5cbiAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgIC5wYXRjaCh1cmwpXG4gICAgLnNlbmQoeyB1c2VyX21ldGFkYXRhOiB1c2VyTWV0YWRhdGEgfSlcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYiwgeyBpZ25vcmVDYXNpbmc6IHRydWUgfSkpO1xufTtcblxuLyoqXG4gKiBMaW5rIHR3byB1c2Vyc1xuICpcbiAqIEBtZXRob2QgbGlua1VzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VySWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWNvbmRhcnlVc2VyVG9rZW5cbiAqIEBwYXJhbSB7dXNlckNhbGxiYWNrfSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9tYW5hZ2VtZW50L3YyIyEvVXNlcnMvcG9zdF9pZGVudGl0aWVzfVxuICovXG5NYW5hZ2VtZW50LnByb3RvdHlwZS5saW5rVXNlciA9IGZ1bmN0aW9uICh1c2VySWQsIHNlY29uZGFyeVVzZXJUb2tlbiwgY2IpIHtcbiAgdmFyIHVybDtcbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgYXNzZXJ0LmNoZWNrKHVzZXJJZCwgeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3VzZXJJZCBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcbiAgYXNzZXJ0LmNoZWNrKHNlY29uZGFyeVVzZXJUb2tlbiwgeyB0eXBlOiAnc3RyaW5nJyxcbiAgICBtZXNzYWdlOiAnc2Vjb25kYXJ5VXNlclRva2VuIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuICBhc3NlcnQuY2hlY2soY2IsIHsgdHlwZTogJ2Z1bmN0aW9uJywgbWVzc2FnZTogJ2NiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICd1c2VycycsIHVzZXJJZCwgJ2lkZW50aXRpZXMnKTtcblxuICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgLnBvc3QodXJsKVxuICAgIC5zZW5kKHsgbGlua193aXRoOiBzZWNvbmRhcnlVc2VyVG9rZW4gfSlcbiAgICAuZW5kKHJlc3BvbnNlSGFuZGxlcihjYiwgeyBpZ25vcmVDYXNpbmc6IHRydWUgfSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYW5hZ2VtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy9tYW5hZ2VtZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSWRUb2tlblZlcmlmaWVyID0gcmVxdWlyZSgnaWR0b2tlbi12ZXJpZmllcicpO1xuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vaGVscGVyL2Fzc2VydCcpO1xudmFyIGVycm9yID0gcmVxdWlyZSgnLi4vaGVscGVyL2Vycm9yJyk7XG52YXIgcXMgPSByZXF1aXJlKCdxcycpO1xudmFyIFBsdWdpbkhhbmRsZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvcGx1Z2lucycpO1xudmFyIHdpbmRvd0hlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci93aW5kb3cnKTtcbnZhciBvYmplY3RIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvb2JqZWN0Jyk7XG52YXIgVHJhbnNhY3Rpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi90cmFuc2FjdGlvbi1tYW5hZ2VyJyk7XG52YXIgQXV0aGVudGljYXRpb24gPSByZXF1aXJlKCcuLi9hdXRoZW50aWNhdGlvbicpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZSgnLi9yZWRpcmVjdCcpO1xudmFyIFBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cCcpO1xudmFyIFNpbGVudEF1dGhlbnRpY2F0aW9uSGFuZGxlciA9IHJlcXVpcmUoJy4vc2lsZW50LWF1dGhlbnRpY2F0aW9uLWhhbmRsZXInKTtcblxuLyoqXG4gKiBIYW5kbGVzIGFsbCB0aGUgYnJvd3NlcidzIEF1dGhOL0F1dGhaIGZsb3dzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5kb21haW4geW91ciBBdXRoMCBkb21haW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNsaWVudElEIHlvdXIgQXV0aDAgY2xpZW50IGlkZW50aWZpZXIgb2J0YWluZWQgd2hlbiBjcmVhdGluZyB0aGUgY2xpZW50IGluIHRoZSBBdXRoMCBEYXNoYm9hcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZWRpcmVjdFVyaV0gdXJsIHRoYXQgdGhlIEF1dGgwIHdpbGwgcmVkaXJlY3QgYWZ0ZXIgQXV0aCB3aXRoIHRoZSBBdXRob3JpemF0aW9uIFJlc3BvbnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVzcG9uc2VUeXBlXSB0eXBlIG9mIHRoZSByZXNwb25zZSB1c2VkIGJ5IE9BdXRoIDIuMCBmbG93LiBJdCBjYW4gYmUgYW55IHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIHRoZSB2YWx1ZXMgYGNvZGVgLCBgdG9rZW5gLCBgaWRfdG9rZW5gLiB7QGxpbmsgaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMH1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXNwb25zZU1vZGVdIGhvdyB0aGUgQXV0aCByZXNwb25zZSBpcyBlbmNvZGVkIGFuZCByZWRpcmVjdGVkIGJhY2sgdG8gdGhlIGNsaWVudC4gU3VwcG9ydGVkIHZhbHVlcyBhcmUgYHF1ZXJ5YCwgYGZyYWdtZW50YCBhbmQgYGZvcm1fcG9zdGAuIHtAbGluayBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb2F1dGgtdjItbXVsdGlwbGUtcmVzcG9uc2UtdHlwZXMtMV8wLmh0bWwjUmVzcG9uc2VNb2Rlc31cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aC4gZS5nLiBgb3BlbmlkIGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF1ZGllbmNlXSBpZGVudGlmaWVyIG9mIHRoZSByZXNvdXJjZSBzZXJ2ZXIgd2hvIHdpbGwgY29uc3VtZSB0aGUgYWNjZXNzIHRva2VuIGlzc3VlZCBhZnRlciBBdXRoXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5wbHVnaW5zXVxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvYXV0aGVudGljYXRpb259XG4gKi9cbmZ1bmN0aW9uIFdlYkF1dGgob3B0aW9ucykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICBhc3NlcnQuY2hlY2sob3B0aW9ucywgeyB0eXBlOiAnb2JqZWN0JywgbWVzc2FnZTogJ29wdGlvbnMgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgIGRvbWFpbjogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ2RvbWFpbiBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgY2xpZW50SUQ6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdjbGllbnRJRCBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgcmVzcG9uc2VUeXBlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Jlc3BvbnNlVHlwZSBpcyBub3QgdmFsaWQnIH0sXG4gICAgcmVzcG9uc2VNb2RlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Jlc3BvbnNlTW9kZSBpcyBub3QgdmFsaWQnIH0sXG4gICAgcmVkaXJlY3RVcmk6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncmVkaXJlY3RVcmkgaXMgbm90IHZhbGlkJyB9LFxuICAgIHNjb3BlOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3Njb3BlIGlzIG5vdCB2YWxpZCcgfSxcbiAgICBhdWRpZW5jZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdhdWRpZW5jZSBpcyBub3QgdmFsaWQnIH0sXG4gICAgbGVld2F5OiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnbnVtYmVyJywgbWVzc2FnZTogJ2xlZXdheSBpcyBub3QgdmFsaWQnIH0sXG4gICAgcGx1Z2luczogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ2FycmF5JywgbWVzc2FnZTogJ3BsdWdpbnMgaXMgbm90IHZhbGlkJyB9LFxuICAgIF9kaXNhYmxlRGVwcmVjYXRpb25XYXJuaW5nczogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ2Jvb2xlYW4nLCBtZXNzYWdlOiAnX2Rpc2FibGVEZXByZWNhdGlvbldhcm5pbmdzIG9wdGlvbiBpcyBub3QgdmFsaWQnIH0sXG4gICAgX3NlbmRUZWxlbWV0cnk6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdib29sZWFuJywgbWVzc2FnZTogJ19zZW5kVGVsZW1ldHJ5IG9wdGlvbiBpcyBub3QgdmFsaWQnIH0sXG4gICAgX3RlbGVtZXRyeUluZm86IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnX3RlbGVtZXRyeUluZm8gb3B0aW9uIGlzIG5vdCB2YWxpZCcgfVxuICB9KTtcblxuICBpZiAob3B0aW9ucy5vdmVycmlkZXMpIHtcbiAgICBhc3NlcnQuY2hlY2sob3B0aW9ucy5vdmVycmlkZXMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvdmVycmlkZXMgb3B0aW9uIGlzIG5vdCB2YWxpZCcgfSwge1xuICAgICAgX190ZW5hbnQ6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdfX3RlbmFudCBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgICBfX3Rva2VuX2lzc3VlcjogeyB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ19fdG9rZW5faXNzdWVyIG9wdGlvbiBpcyByZXF1aXJlZCcgfVxuICAgIH0pO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICB0aGlzLmJhc2VPcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5iYXNlT3B0aW9ucy5wbHVnaW5zID0gbmV3IFBsdWdpbkhhbmRsZXIodGhpcywgdGhpcy5iYXNlT3B0aW9ucy5wbHVnaW5zIHx8IFtdKTtcblxuICB0aGlzLmJhc2VPcHRpb25zLl9zZW5kVGVsZW1ldHJ5ID0gdGhpcy5iYXNlT3B0aW9ucy5fc2VuZFRlbGVtZXRyeSA9PT0gZmFsc2UgP1xuICAgIHRoaXMuYmFzZU9wdGlvbnMuX3NlbmRUZWxlbWV0cnkgOiB0cnVlO1xuXG4gIHRoaXMuYmFzZU9wdGlvbnMudGVuYW50ID0gKHRoaXMub3ZlcnJpZGVzICYmIHRoaXMub3ZlcnJpZGVzLl9fdGVuYW50KVxuICAgIHx8IHRoaXMuYmFzZU9wdGlvbnMuZG9tYWluLnNwbGl0KCcuJylbMF07XG5cbiAgdGhpcy5iYXNlT3B0aW9ucy50b2tlbl9pc3N1ZXIgPSAodGhpcy5vdmVycmlkZXMgJiYgdGhpcy5vdmVycmlkZXMuX190b2tlbl9pc3N1ZXIpXG4gICAgfHwgJ2h0dHBzOi8vJyArIHRoaXMuYmFzZU9wdGlvbnMuZG9tYWluICsgJy8nO1xuXG4gIHRoaXMudHJhbnNhY3Rpb25NYW5hZ2VyID0gbmV3IFRyYW5zYWN0aW9uTWFuYWdlcih0aGlzLmJhc2VPcHRpb25zLnRyYW5zYWN0aW9uKTtcblxuICB0aGlzLmNsaWVudCA9IG5ldyBBdXRoZW50aWNhdGlvbih0aGlzLmJhc2VPcHRpb25zKTtcbiAgdGhpcy5yZWRpcmVjdCA9IG5ldyBSZWRpcmVjdCh0aGlzLmNsaWVudCwgdGhpcy5iYXNlT3B0aW9ucyk7XG4gIHRoaXMucG9wdXAgPSBuZXcgUG9wdXAodGhpcywgdGhpcy5iYXNlT3B0aW9ucyk7XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIHVybCBoYXNoIGFuZCBleHRyYWN0IHRoZSBBdXRoIHJlc3BvbnNlIGZyb20gYSBBdXRoIGZsb3cgc3RhcnRlZCB3aXRoIHtAbGluayBhdXRob3JpemV9XG4gKlxuICogT25seSB2YWxpZGF0ZXMgaWRfdG9rZW5zIHNpZ25lZCBieSBBdXRoMCB1c2luZyB0aGUgUlMyNTYgYWxnb3JpdGhtIHVzaW5nIHRoZSBwdWJsaWMga2V5IGV4cG9zZWRcbiAqIGJ5IHRoZSBgLy53ZWxsLWtub3duL2p3a3MuanNvbmAgZW5kcG9pbnQgb2YgeW91ciBhY2NvdW50LlxuICogVG9rZW5zIHNpZ25lZCB3aXRoIG90aGVyIGFsZ29yaXRobXMsIGUuZy4gSFMyNTYgd2lsbCBub3QgYmUgYWNjZXB0ZWQuXG4gKlxuICogQG1ldGhvZCBwYXJzZUhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5oYXNoIHRoZSB1cmwgaGFzaC4gSWYgbm90IHByb3ZpZGVkIGl0IHdpbGwgZXh0cmFjdCBmcm9tIHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGVdIHZhbHVlIG9yaWdpbmFsbHkgc2VudCBpbiBgc3RhdGVgIHBhcmFtZXRlciB0byB7QGxpbmsgYXV0aG9yaXplfSB0byBtaXRpZ2F0ZSBYU1JGXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubm9uY2VdIHZhbHVlIG9yaWdpbmFsbHkgc2VudCBpbiBgbm9uY2VgIHBhcmFtZXRlciB0byB7QGxpbmsgYXV0aG9yaXplfSB0byBwcmV2ZW50IHJlcGxheSBhdHRhY2tzXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuX2lkVG9rZW5WZXJpZmljYXRpb25dIG1ha2VzIHBhcnNlSGFzaCBwZXJmb3JtIG9yIHNraXAgYGlkX3Rva2VuYCB2ZXJpZmljYXRpb24uIFdlICoqc3Ryb25nbHkqKiByZWNvbW1lbmQgdmFsaWRhdGluZyB0aGUgYGlkX3Rva2VuYCB5b3Vyc2VsZiBpZiB5b3UgZGlzYWJsZSB0aGUgdmVyaWZpY2F0aW9uLlxuICogQHBhcmFtIHthdXRob3JpemVDYWxsYmFja30gY2JcbiAqL1xuV2ViQXV0aC5wcm90b3R5cGUucGFyc2VIYXNoID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciBwYXJzZWRRcztcbiAgdmFyIGVycjtcbiAgdmFyIHN0YXRlO1xuICB2YXIgdHJhbnNhY3Rpb247XG4gIHZhciB0cmFuc2FjdGlvbk5vbmNlO1xuXG4gIGlmICghY2IgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB9XG5cbiAgb3B0aW9ucy5faWRUb2tlblZlcmlmaWNhdGlvbiA9ICEob3B0aW9ucy5faWRUb2tlblZlcmlmaWNhdGlvbiA9PT0gZmFsc2UpO1xuXG4gIHZhciBfd2luZG93ID0gd2luZG93SGVscGVyLmdldFdpbmRvdygpO1xuXG4gIHZhciBoYXNoU3RyID0gb3B0aW9ucy5oYXNoID09PSB1bmRlZmluZWQgPyBfd2luZG93LmxvY2F0aW9uLmhhc2ggOiBvcHRpb25zLmhhc2g7XG4gIGhhc2hTdHIgPSBoYXNoU3RyLnJlcGxhY2UoL14jP1xcLz8vLCAnJyk7XG5cbiAgcGFyc2VkUXMgPSBxcy5wYXJzZShoYXNoU3RyKTtcblxuICBpZiAocGFyc2VkUXMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykpIHtcbiAgICBlcnIgPSBlcnJvci5idWlsZFJlc3BvbnNlKHBhcnNlZFFzLmVycm9yLCBwYXJzZWRRcy5lcnJvcl9kZXNjcmlwdGlvbik7XG5cbiAgICBpZiAocGFyc2VkUXMuc3RhdGUpIHtcbiAgICAgIGVyci5zdGF0ZSA9IHBhcnNlZFFzLnN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiBjYihlcnIpO1xuICB9XG5cbiAgaWYgKCFwYXJzZWRRcy5oYXNPd25Qcm9wZXJ0eSgnYWNjZXNzX3Rva2VuJylcbiAgICAmJiAhcGFyc2VkUXMuaGFzT3duUHJvcGVydHkoJ2lkX3Rva2VuJylcbiAgICAmJiAhcGFyc2VkUXMuaGFzT3duUHJvcGVydHkoJ3JlZnJlc2hfdG9rZW4nKSkge1xuICAgIHJldHVybiBjYihudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRlID0gcGFyc2VkUXMuc3RhdGUgfHwgb3B0aW9ucy5zdGF0ZTtcblxuICB0cmFuc2FjdGlvbiA9IHRoaXMudHJhbnNhY3Rpb25NYW5hZ2VyLmdldFN0b3JlZFRyYW5zYWN0aW9uKHN0YXRlKTtcbiAgdHJhbnNhY3Rpb25Ob25jZSA9IG9wdGlvbnMubm9uY2UgfHwgKHRyYW5zYWN0aW9uICYmIHRyYW5zYWN0aW9uLm5vbmNlKSB8fCBudWxsO1xuXG4gIHZhciBhcHBsaWNhdGlvblN0YXR1cyA9ICh0cmFuc2FjdGlvbiAmJiB0cmFuc2FjdGlvbi5hcHBTdGF0dXMpIHx8IG51bGw7XG4gIGlmIChwYXJzZWRRcy5pZF90b2tlbiAmJiBvcHRpb25zLl9pZFRva2VuVmVyaWZpY2F0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVUb2tlbihcbiAgICAgIHBhcnNlZFFzLmlkX3Rva2VuLFxuICAgICAgdHJhbnNhY3Rpb25Ob25jZSxcbiAgICAgIGZ1bmN0aW9uICh2YWxpZGF0aW9uRXJyb3IsIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiBjYih2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCBidWlsZFBhcnNlSGFzaFJlc3BvbnNlKHBhcnNlZFFzLCBhcHBsaWNhdGlvblN0YXR1cywgcGF5bG9hZCkpO1xuICAgICAgfSk7XG4gIH1cblxuICBpZiAocGFyc2VkUXMuaWRfdG9rZW4pIHtcbiAgICB2YXIgdmVyaWZpZXIgPSBuZXcgSWRUb2tlblZlcmlmaWVyKHtcbiAgICAgIGlzc3VlcjogdGhpcy5iYXNlT3B0aW9ucy50b2tlbl9pc3N1ZXIsXG4gICAgICBhdWRpZW5jZTogdGhpcy5iYXNlT3B0aW9ucy5jbGllbnRJRCxcbiAgICAgIGxlZXdheTogdGhpcy5iYXNlT3B0aW9ucy5sZWV3YXkgfHwgMCxcbiAgICAgIF9fZGlzYWJsZUV4cGlyYXRpb25DaGVjazogdGhpcy5iYXNlT3B0aW9ucy5fX2Rpc2FibGVFeHBpcmF0aW9uQ2hlY2tcbiAgICB9KTtcblxuICAgIHZhciBkZWNvZGVkVG9rZW4gPSB2ZXJpZmllci5kZWNvZGUocGFyc2VkUXMuaWRfdG9rZW4pO1xuICAgIGNiKG51bGwsIGJ1aWxkUGFyc2VIYXNoUmVzcG9uc2UocGFyc2VkUXMsIGFwcGxpY2F0aW9uU3RhdHVzLCBkZWNvZGVkVG9rZW4ucGF5bG9hZCkpO1xuICB9IGVsc2Uge1xuICAgIGNiKG51bGwsIGJ1aWxkUGFyc2VIYXNoUmVzcG9uc2UocGFyc2VkUXMsIGFwcGxpY2F0aW9uU3RhdHVzLCBudWxsKSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyc2VIYXNoUmVzcG9uc2UocXNQYXJhbXMsIGFwcFN0YXR1cywgdG9rZW4pIHtcbiAgcmV0dXJuIHtcbiAgICBhY2Nlc3NUb2tlbjogcXNQYXJhbXMuYWNjZXNzX3Rva2VuIHx8IG51bGwsXG4gICAgaWRUb2tlbjogcXNQYXJhbXMuaWRfdG9rZW4gfHwgbnVsbCxcbiAgICBpZFRva2VuUGF5bG9hZDogdG9rZW4gfHwgbnVsbCxcbiAgICBhcHBTdGF0dXM6IGFwcFN0YXR1cyB8fCBudWxsLFxuICAgIHJlZnJlc2hUb2tlbjogcXNQYXJhbXMucmVmcmVzaF90b2tlbiB8fCBudWxsLFxuICAgIHN0YXRlOiBxc1BhcmFtcy5zdGF0ZSB8fCBudWxsLFxuICAgIGV4cGlyZXNJbjogcXNQYXJhbXMuZXhwaXJlc19pbiA/IHBhcnNlSW50KHFzUGFyYW1zLmV4cGlyZXNfaW4sIDEwKSA6IG51bGwsXG4gICAgdG9rZW5UeXBlOiBxc1BhcmFtcy50b2tlbl90eXBlIHx8IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgdmFsaWRhdGVUb2tlbkNhbGxiYWNrXG4gKiBAcGFyYW0ge0Vycm9yfSBbZXJyXSBlcnJvciByZXR1cm5lZCBieSB3aGlsZSB2YWxpZGF0aW5nIHRoZSB0b2tlblxuICogQHBhcmFtIHtPYmplY3R9IFtwYXlsb2FkXSBjbGFpbXMgc3RvcmVkIGluIHRoZSB0b2tlblxuICovXG5cbi8qKlxuICogRGVjb2RlcyB0aGUgYSBKV1QgYW5kIHZlcmlmaWVzIGl0cyBub25jZSB2YWx1ZVxuICpcbiAqIEBtZXRob2QgdmFsaWRhdGVUb2tlblxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlblxuICogQHBhcmFtIHtTdHJpbmd9IG5vbmNlXG4gKiBAcGFyYW0ge3ZhbGlkYXRlVG9rZW5DYWxsYmFja30gY2JcbiAqL1xuV2ViQXV0aC5wcm90b3R5cGUudmFsaWRhdGVUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbiwgbm9uY2UsIGNiKSB7XG4gIHZhciB2ZXJpZmllciA9IG5ldyBJZFRva2VuVmVyaWZpZXIoe1xuICAgIGlzc3VlcjogdGhpcy5iYXNlT3B0aW9ucy50b2tlbl9pc3N1ZXIsXG4gICAgYXVkaWVuY2U6IHRoaXMuYmFzZU9wdGlvbnMuY2xpZW50SUQsXG4gICAgbGVld2F5OiB0aGlzLmJhc2VPcHRpb25zLmxlZXdheSB8fCAwLFxuICAgIF9fZGlzYWJsZUV4cGlyYXRpb25DaGVjazogdGhpcy5iYXNlT3B0aW9ucy5fX2Rpc2FibGVFeHBpcmF0aW9uQ2hlY2tcbiAgfSk7XG5cbiAgdmVyaWZpZXIudmVyaWZ5KHRva2VuLCBub25jZSwgZnVuY3Rpb24gKGVyciwgcGF5bG9hZCkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjYihlcnJvci5pbnZhbGlkSnd0KGVyci5tZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2IobnVsbCwgcGF5bG9hZCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBhIHNpbGVudCBhdXRoZW50aWNhdGlvbiB0cmFuc2FjdGlvbiB1bmRlciB0aGUgaG9vZCBpbiBvcmRlciB0byBmZXRjaCBhIG5ldyB0b2tlbnMgZm9yIHRoZSBjdXJyZW50IHNlc3Npb24uXG4gKiBUaGlzIG1ldGhvZCByZXF1aXJlcyB0aGF0IGFsbCBBdXRoIGlzIHBlcmZvcm1lZCB3aXRoIHtAbGluayBhdXRob3JpemV9XG4gKlxuICogQG1ldGhvZCByZW5ld0F1dGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZG9tYWluXSB5b3VyIEF1dGgwIGRvbWFpblxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNsaWVudElEXSB5b3VyIEF1dGgwIGNsaWVudCBpZGVudGlmaWVyIG9idGFpbmVkIHdoZW4gY3JlYXRpbmcgdGhlIGNsaWVudCBpbiB0aGUgQXV0aDAgRGFzaGJvYXJkXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVkaXJlY3RVcmldIHVybCB0aGF0IHRoZSBBdXRoMCB3aWxsIHJlZGlyZWN0IGFmdGVyIEF1dGggd2l0aCB0aGUgQXV0aG9yaXphdGlvbiBSZXNwb25zZVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlc3BvbnNlVHlwZV0gdHlwZSBvZiB0aGUgcmVzcG9uc2UgdXNlZCBieSBPQXV0aCAyLjAgZmxvdy4gSXQgY2FuIGJlIGFueSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0aGUgdmFsdWVzIGBjb2RlYCwgYHRva2VuYCwgYGlkX3Rva2VuYC4ge0BsaW5rIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vYXV0aC12Mi1tdWx0aXBsZS1yZXNwb25zZS10eXBlcy0xXzB9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVzcG9uc2VNb2RlXSBob3cgdGhlIEF1dGggcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAsIGBmcmFnbWVudGAgYW5kIGBmb3JtX3Bvc3RgLiB7QGxpbmsgaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMC5odG1sI1Jlc3BvbnNlTW9kZXN9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGVdIHZhbHVlIHVzZWQgdG8gbWl0aWdhdGUgWFNSRiBhdHRhY2tzLiB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9wcm90b2NvbHMvb2F1dGgyL29hdXRoLXN0YXRlfVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vbmNlXSB2YWx1ZSB1c2VkIHRvIG1pdGlnYXRlIHJlcGxheSBhdHRhY2tzIHdoZW4gdXNpbmcgSW1wbGljaXQgR3JhbnQuIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS1hdXRoL3R1dG9yaWFscy9ub25jZX1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aC4gZS5nLiBgb3BlbmlkIGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF1ZGllbmNlXSBpZGVudGlmaWVyIG9mIHRoZSByZXNvdXJjZSBzZXJ2ZXIgd2hvIHdpbGwgY29uc3VtZSB0aGUgYWNjZXNzIHRva2VuIGlzc3VlZCBhZnRlciBBdXRoXG4gKiBAc2VlIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNhdXRob3JpemUtY2xpZW50fVxuICovXG5XZWJBdXRoLnByb3RvdHlwZS5yZW5ld0F1dGggPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIGhhbmRsZXI7XG4gIHZhciB1c2VQb3N0TWVzc2FnZSA9ICEhb3B0aW9ucy51c2VQb3N0TWVzc2FnZTtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgcGFyYW1zID0gb2JqZWN0SGVscGVyLm1lcmdlKHRoaXMuYmFzZU9wdGlvbnMsIFtcbiAgICAnY2xpZW50SUQnLFxuICAgICdyZWRpcmVjdFVyaScsXG4gICAgJ3Jlc3BvbnNlVHlwZScsXG4gICAgJ3Njb3BlJyxcbiAgICAnYXVkaWVuY2UnLFxuICAgICdfY3NyZicsXG4gICAgJ3N0YXRlJyxcbiAgICAnX2luc3RhdGUnLFxuICAgICdub25jZSdcbiAgXSkud2l0aChvcHRpb25zKTtcblxuICBwYXJhbXMucmVzcG9uc2VUeXBlID0gcGFyYW1zLnJlc3BvbnNlVHlwZSB8fCAndG9rZW4nO1xuICBwYXJhbXMucmVzcG9uc2VNb2RlID0gcGFyYW1zLnJlc3BvbnNlTW9kZSB8fCAnZnJhZ21lbnQnO1xuICBpZiAoIW9wdGlvbnMubm9uY2UpIHtcbiAgICBwYXJhbXMgPSB0aGlzLnRyYW5zYWN0aW9uTWFuYWdlci5wcm9jZXNzKHBhcmFtcyk7XG4gIH1cblxuICBhc3NlcnQuY2hlY2socGFyYW1zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcbiAgYXNzZXJ0LmNoZWNrKGNiLCB7IHR5cGU6ICdmdW5jdGlvbicsIG1lc3NhZ2U6ICdjYiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9KTtcblxuICBwYXJhbXMucHJvbXB0ID0gJ25vbmUnO1xuXG4gIHBhcmFtcyA9IG9iamVjdEhlbHBlci5ibGFja2xpc3QocGFyYW1zLCBbJ3VzZVBvc3RNZXNzYWdlJywgJ3RlbmFudCddKTtcblxuICBoYW5kbGVyID0gbmV3IFNpbGVudEF1dGhlbnRpY2F0aW9uSGFuZGxlcih0aGlzLCB0aGlzLmNsaWVudC5idWlsZEF1dGhvcml6ZVVybChwYXJhbXMpKTtcblxuICBoYW5kbGVyLmxvZ2luKHVzZVBvc3RNZXNzYWdlLCBmdW5jdGlvbiAoaGFzaCkge1xuICAgIHZhciB0cmFuc2FjdGlvbiA9IF90aGlzLnRyYW5zYWN0aW9uTWFuYWdlci5nZXRTdG9yZWRUcmFuc2FjdGlvbihwYXJhbXMuc3RhdGUpO1xuICAgIHZhciB0cmFuc2FjdGlvbk5vbmNlID0gb3B0aW9ucy5ub25jZSB8fCAodHJhbnNhY3Rpb24gJiYgdHJhbnNhY3Rpb24ubm9uY2UpIHx8IG51bGw7XG4gICAgdmFyIHRyYW5zYWN0aW9uU3RhdGUgPSBvcHRpb25zLnN0YXRlIHx8ICh0cmFuc2FjdGlvbiAmJiB0cmFuc2FjdGlvbi5zdGF0ZSkgfHwgbnVsbDtcbiAgICBfdGhpcy5wYXJzZUhhc2goeyBoYXNoOiBoYXNoLCBub25jZTogdHJhbnNhY3Rpb25Ob25jZSwgc3RhdGU6IHRyYW5zYWN0aW9uU3RhdGUgfSwgY2IpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVxdWVzdCBhbiBlbWFpbCB3aXRoIGluc3RydWN0aW9uIHRvIGNoYW5nZSBhIHVzZXIncyBwYXNzd29yZFxuICpcbiAqIEBtZXRob2QgY2hhbmdlUGFzc3dvcmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbWFpbCBhZGRyZXNzIHdoZXJlIHRoZSB1c2VyIHdpbGwgcmVjaWV2ZSB0aGUgY2hhbmdlIHBhc3N3b3JkIGVtYWlsLiBJdCBzaG91bGQgbWF0Y2ggdGhlIHVzZXIncyBlbWFpbCBpbiBBdXRoMFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29ubmVjdGlvbiBuYW1lIG9mIHRoZSBjb25uZWN0aW9uIHdoZXJlIHRoZSB1c2VyIHdhcyBjcmVhdGVkXG4gKiBAcGFyYW0ge2NoYW5nZVBhc3N3b3JkQ2FsbGJhY2t9IGNiXG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpL2F1dGhlbnRpY2F0aW9uI2NoYW5nZS1wYXNzd29yZH1cbiAqL1xuV2ViQXV0aC5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgcmV0dXJuIHRoaXMuY2xpZW50LmRiQ29ubmVjdGlvbi5jaGFuZ2VQYXNzd29yZChvcHRpb25zLCBjYik7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBhc3N3b3JkbGVzcyBhdXRoZW50aWNhdGlvbiB0cmFuc2FjdGlvbi5cbiAqXG4gKiBAbWV0aG9kIHBhc3N3b3JkbGVzc1N0YXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuc2VuZCB3aGF0IHdpbGwgYmUgc2VudCB2aWEgZW1haWwgd2hpY2ggY291bGQgYmUgYGxpbmtgIG9yIGBjb2RlYC4gRm9yIFNNUyBgY29kZWAgaXMgdGhlIG9ubHkgb25lIHZhbHVkXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucGhvbmVOdW1iZXJdIHBob25lIG51bWJlciB3aGVyZSB0byBzZW5kIHRoZSBgY29kZWAuIFRoaXMgcGFyYW1ldGVyIGlzIG11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIGBlbWFpbGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lbWFpbF0gZW1haWwgd2hlcmUgdG8gc2VuZCB0aGUgYGNvZGVgIG9yIGBsaW5rYC4gVGhpcyBwYXJhbWV0ZXIgaXMgbXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYHBob25lTnVtYmVyYFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29ubmVjdGlvbiBuYW1lIG9mIHRoZSBwYXNzd29yZGxlc3MgY29ubmVjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmF1dGhQYXJhbXNdIGFkZGl0aW9uYWwgQXV0aCBwYXJhbWV0ZXJzIHdoZW4gdXNpbmcgYGxpbmtgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNwYXNzd29yZGxlc3N9XG4gKi9cbldlYkF1dGgucHJvdG90eXBlLnBhc3N3b3JkbGVzc1N0YXJ0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHJldHVybiB0aGlzLmNsaWVudC5wYXNzd29yZGxlc3Muc3RhcnQob3B0aW9ucywgY2IpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHVzZXIgaW4gYSBBdXRoMCBEYXRhYmFzZSBjb25uZWN0aW9uXG4gKlxuICogQG1ldGhvZCBzaWdudXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbWFpbCB1c2VyIGVtYWlsIGFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnBhc3N3b3JkIHVzZXIgcGFzc3dvcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNvbm5lY3Rpb24gbmFtZSBvZiB0aGUgY29ubmVjdGlvbiB3aGVyZSB0aGUgdXNlciB3aWxsIGJlIGNyZWF0ZWRcbiAqIEBwYXJhbSB7c2lnblVwQ2FsbGJhY2t9IGNiXG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpL2F1dGhlbnRpY2F0aW9uI3NpZ251cH1cbiAqL1xuV2ViQXV0aC5wcm90b3R5cGUuc2lnbnVwID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHJldHVybiB0aGlzLmNsaWVudC5kYkNvbm5lY3Rpb24uc2lnbnVwKG9wdGlvbnMsIGNiKTtcbn07XG5cbi8qKlxuICogUmVkaXJlY3RzIHRvIHRoZSBob3N0ZWQgbG9naW4gcGFnZSAoYC9hdXRob3JpemVgKSBpbiBvcmRlciB0byBzdGFydCBhIG5ldyBhdXRoTi9hdXRoWiB0cmFuc2FjdGlvblxuICpcbiAqIEBtZXRob2QgYXV0aG9yaXplXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmRvbWFpbl0geW91ciBBdXRoMCBkb21haW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jbGllbnRJRF0geW91ciBBdXRoMCBjbGllbnQgaWRlbnRpZmllciBvYnRhaW5lZCB3aGVuIGNyZWF0aW5nIHRoZSBjbGllbnQgaW4gdGhlIEF1dGgwIERhc2hib2FyZFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucmVkaXJlY3RVcmkgdXJsIHRoYXQgdGhlIEF1dGgwIHdpbGwgcmVkaXJlY3QgYWZ0ZXIgQXV0aCB3aXRoIHRoZSBBdXRob3JpemF0aW9uIFJlc3BvbnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5yZXNwb25zZVR5cGUgdHlwZSBvZiB0aGUgcmVzcG9uc2UgdXNlZCBieSBPQXV0aCAyLjAgZmxvdy4gSXQgY2FuIGJlIGFueSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0aGUgdmFsdWVzIGBjb2RlYCwgYHRva2VuYCwgYGlkX3Rva2VuYC4ge0BsaW5rIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vYXV0aC12Mi1tdWx0aXBsZS1yZXNwb25zZS10eXBlcy0xXzB9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVzcG9uc2VNb2RlXSBob3cgdGhlIEF1dGggcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAsIGBmcmFnbWVudGAgYW5kIGBmb3JtX3Bvc3RgLiB7QGxpbmsgaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMC5odG1sI1Jlc3BvbnNlTW9kZXN9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGVdIHZhbHVlIHVzZWQgdG8gbWl0aWdhdGUgWFNSRiBhdHRhY2tzLiB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9wcm90b2NvbHMvb2F1dGgyL29hdXRoLXN0YXRlfVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vbmNlXSB2YWx1ZSB1c2VkIHRvIG1pdGlnYXRlIHJlcGxheSBhdHRhY2tzIHdoZW4gdXNpbmcgSW1wbGljaXQgR3JhbnQuIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS1hdXRoL3R1dG9yaWFscy9ub25jZX1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aC4gZS5nLiBgb3BlbmlkIGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF1ZGllbmNlXSBpZGVudGlmaWVyIG9mIHRoZSByZXNvdXJjZSBzZXJ2ZXIgd2hvIHdpbGwgY29uc3VtZSB0aGUgYWNjZXNzIHRva2VuIGlzc3VlZCBhZnRlciBBdXRoXG4gKiBAc2VlIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNhdXRob3JpemUtY2xpZW50fVxuICovXG5XZWJBdXRoLnByb3RvdHlwZS5hdXRob3JpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgcGFyYW1zID0gb2JqZWN0SGVscGVyLm1lcmdlKHRoaXMuYmFzZU9wdGlvbnMsIFtcbiAgICAnY2xpZW50SUQnLFxuICAgICdyZXNwb25zZVR5cGUnLFxuICAgICdyZXNwb25zZU1vZGUnLFxuICAgICdyZWRpcmVjdFVyaScsXG4gICAgJ3Njb3BlJyxcbiAgICAnYXVkaWVuY2UnLFxuICAgICdfY3NyZicsXG4gICAgJ3N0YXRlJyxcbiAgICAnX2luc3RhdGUnLFxuICAgICdub25jZSdcbiAgXSkud2l0aChvcHRpb25zKTtcblxuICBhc3NlcnQuY2hlY2socGFyYW1zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9LCB7XG4gICAgcmVzcG9uc2VUeXBlOiB7IHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncmVzcG9uc2VUeXBlIG9wdGlvbiBpcyByZXF1aXJlZCcgfVxuICB9KTtcblxuICBwYXJhbXMgPSB0aGlzLnRyYW5zYWN0aW9uTWFuYWdlci5wcm9jZXNzKHBhcmFtcyk7XG5cbiAgd2luZG93SGVscGVyLnJlZGlyZWN0KHRoaXMuY2xpZW50LmJ1aWxkQXV0aG9yaXplVXJsKHBhcmFtcykpO1xufTtcblxuLyoqXG4gKiBTaWducyB1cCBhIG5ldyB1c2VyLCBhdXRvbWF0aWNhbGx5IGxvZ3MgdGhlIHVzZXIgaW4gYWZ0ZXIgdGhlIHNpZ251cCBhbmQgcmV0dXJucyB0aGUgdXNlciB0b2tlbi5cbiAqIFRoZSBsb2dpbiB3aWxsIGJlIGRvbmUgdXNpbmcgL29hdXRoL3Rva2VuIHdpdGggcGFzc3dvcmQtcmVhbG0gZ3JhbnQgdHlwZS5cbiAqXG4gKiBAbWV0aG9kIHNpZ251cEFuZEF1dGhvcml6ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmVtYWlsIHVzZXIgZW1haWwgYWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGFzc3dvcmQgdXNlciBwYXNzd29yZFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29ubmVjdGlvbiBuYW1lIG9mIHRoZSBjb25uZWN0aW9uIHdoZXJlIHRoZSB1c2VyIHdpbGwgYmUgY3JlYXRlZFxuICogQHBhcmFtIHt0b2tlbkNhbGxiYWNrfSBjYlxuICogQHNlZSAgIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiNzaWdudXB9XG4gKiBAc2VlICAge0BsaW5rIGh0dHBzOi8vYXV0aDAuY29tL2RvY3MvYXBpLWF1dGgvZ3JhbnQvcGFzc3dvcmR9XG4gKi9cbldlYkF1dGgucHJvdG90eXBlLnNpZ251cEFuZEF1dGhvcml6ZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHJldHVybiB0aGlzLmNsaWVudC5kYkNvbm5lY3Rpb24uc2lnbnVwKG9iamVjdEhlbHBlci5ibGFja2xpc3Qob3B0aW9ucywgWydwb3B1cEhhbmRsZXInXSksXG4gICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMucmVhbG0gPSBvcHRpb25zLmNvbm5lY3Rpb247XG4gICAgICBpZiAoIW9wdGlvbnMudXNlcm5hbWUpIHtcbiAgICAgICAgb3B0aW9ucy51c2VybmFtZSA9IG9wdGlvbnMuZW1haWw7XG4gICAgICB9XG4gICAgICBfdGhpcy5jbGllbnQubG9naW4ob3B0aW9ucywgY2IpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBSZWRpcmVjdHMgdG8gdGhlIGF1dGgwIGxvZ291dCBlbmRwb2ludFxuICpcbiAqIElmIHlvdSB3YW50IHRvIG5hdmlnYXRlIHRoZSB1c2VyIHRvIGEgc3BlY2lmaWMgVVJMIGFmdGVyIHRoZSBsb2dvdXQsIHNldCB0aGF0IFVSTCBhdCB0aGUgcmV0dXJuVG8gcGFyYW1ldGVyLiBUaGUgVVJMIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhbnkgdGhlIGFwcHJvcHJpYXRlIEFsbG93ZWQgTG9nb3V0IFVSTHMgbGlzdDpcbiAqXG4gKiAtIElmIHRoZSBjbGllbnRfaWQgcGFyYW1ldGVyIGlzIGluY2x1ZGVkLCB0aGUgcmV0dXJuVG8gVVJMIG11c3QgYmUgbGlzdGVkIGluIHRoZSBBbGxvd2VkIExvZ291dCBVUkxzIHNldCBhdCB0aGUgY2xpZW50IGxldmVsIChzZWUgU2V0dGluZyBBbGxvd2VkIExvZ291dCBVUkxzIGF0IHRoZSBBcHAgTGV2ZWwpLlxuICogLSBJZiB0aGUgY2xpZW50X2lkIHBhcmFtZXRlciBpcyBOT1QgaW5jbHVkZWQsIHRoZSByZXR1cm5UbyBVUkwgbXVzdCBiZSBsaXN0ZWQgaW4gdGhlIEFsbG93ZWQgTG9nb3V0IFVSTHMgc2V0IGF0IHRoZSBhY2NvdW50IGxldmVsIChzZWUgU2V0dGluZyBBbGxvd2VkIExvZ291dCBVUkxzIGF0IHRoZSBBY2NvdW50IExldmVsKS5cbiAqXG4gKiBAbWV0aG9kIGxvZ291dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jbGllbnRJRF0gaWRlbnRpZmllciBvZiB5b3VyIGNsaWVudFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJldHVyblRvXSBVUkwgdG8gYmUgcmVkaXJlY3RlZCBhZnRlciB0aGUgbG9nb3V0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZlZGVyYXRlZF0gdGVsbHMgQXV0aDAgaWYgaXQgc2hvdWxkIGxvZ291dCB0aGUgdXNlciBhbHNvIGZyb20gdGhlIElkUC5cbiAqIEBzZWUgICB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvYXV0aGVudGljYXRpb24jbG9nb3V0fVxuICovXG5XZWJBdXRoLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB3aW5kb3dIZWxwZXIucmVkaXJlY3QodGhpcy5jbGllbnQuYnVpbGRMb2dvdXRVcmwob3B0aW9ucykpO1xufTtcblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgcGFzc3dvcmRsZXNzIFRPVFAgYW5kIHJlZGlyZWN0cyB0byBmaW5pc2ggdGhlIHBhc3N3b3JkbGVzcyB0cmFuc2FjdGlvblxuICpcbiAqIEBtZXRob2QgcGFzc3dvcmRsZXNzVmVyaWZ5XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudHlwZSBgc21zYCBvciBgZW1haWxgXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5waG9uZU51bWJlciBvbmx5IGlmIHR5cGUgPSBzbXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmVtYWlsIG9ubHkgaWYgdHlwZSA9IGVtYWlsXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5jb25uZWN0aW9uIHRoZSBjb25uZWN0aW9uIG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZlcmlmaWNhdGlvbkNvZGUgdGhlIFRPVFAgY29kZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAqL1xuV2ViQXV0aC5wcm90b3R5cGUucGFzc3dvcmRsZXNzVmVyaWZ5ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHJldHVybiB0aGlzLmNsaWVudC5wYXNzd29yZGxlc3MudmVyaWZ5KG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvd0hlbHBlci5yZWRpcmVjdChfdGhpcy5jbGllbnQucGFzc3dvcmRsZXNzLmJ1aWxkVmVyaWZ5VXJsKG9wdGlvbnMpKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYkF1dGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL3dlYi1hdXRoL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdXJsam9pbiA9IHJlcXVpcmUoJ3VybC1qb2luJyk7XG52YXIgV2luQ2hhbiA9IHJlcXVpcmUoJ3dpbmNoYW4nKTtcblxudmFyIHVybEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci91cmwnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuLi9oZWxwZXIvYXNzZXJ0Jyk7XG52YXIgcmVzcG9uc2VIYW5kbGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL3Jlc3BvbnNlLWhhbmRsZXInKTtcbnZhciBQb3B1cEhhbmRsZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvcG9wdXAtaGFuZGxlcicpO1xudmFyIG9iamVjdEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9vYmplY3QnKTtcbnZhciBXYXJuID0gcmVxdWlyZSgnLi4vaGVscGVyL3dhcm4nKTtcbnZhciBUcmFuc2FjdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuL3RyYW5zYWN0aW9uLW1hbmFnZXInKTtcblxuZnVuY3Rpb24gUG9wdXAod2ViQXV0aCwgb3B0aW9ucykge1xuICB0aGlzLmJhc2VPcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5jbGllbnQgPSB3ZWJBdXRoLmNsaWVudDtcbiAgdGhpcy53ZWJBdXRoID0gd2ViQXV0aDtcblxuICB0aGlzLnRyYW5zYWN0aW9uTWFuYWdlciA9IG5ldyBUcmFuc2FjdGlvbk1hbmFnZXIodGhpcy5iYXNlT3B0aW9ucy50cmFuc2FjdGlvbik7XG4gIHRoaXMud2FybiA9IG5ldyBXYXJuKHtcbiAgICBkaXNhYmxlV2FybmluZ3M6ICEhb3B0aW9ucy5fZGlzYWJsZURlcHJlY2F0aW9uV2FybmluZ3NcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBwb3B1cCBoYW5kbGVyXG4gKlxuICogQG1ldGhvZCBidWlsZFBvcHVwSGFuZGxlclxuICogQHByaXZhdGVcbiAqL1xuUG9wdXAucHJvdG90eXBlLmJ1aWxkUG9wdXBIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcGx1Z2luSGFuZGxlciA9IHRoaXMuYmFzZU9wdGlvbnMucGx1Z2lucy5nZXQoJ3BvcHVwLmdldFBvcHVwSGFuZGxlcicpO1xuXG4gIGlmIChwbHVnaW5IYW5kbGVyKSB7XG4gICAgcmV0dXJuIHBsdWdpbkhhbmRsZXIuZ2V0UG9wdXBIYW5kbGVyKCk7XG4gIH1cblxuICByZXR1cm4gbmV3IFBvcHVwSGFuZGxlcigpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgcG9wdXAgd2luZG93IGFuZCByZXR1cm5zIHRoZSBpbnN0YW5jZSB0byBiZSB1c2VkIGxhdGVyIGluIG9yZGVyIHRvIGF2b2lkIGJlaW5nIGJsb2NrZWQgYnkgdGhlIGJyb3dzZXIuXG4gKlxuICogQG1ldGhvZCBwcmVsb2FkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyByZWNlaXZlcyB0aGUgd2luZG93IGhlaWdodCBhbmQgd2lkdGggYW5kIGFueSBvdGhlciB3aW5kb3cgZmVhdHVyZSB0byBiZSBzZW50IHRvIHdpbmRvdy5vcGVuXG4gKi9cblBvcHVwLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHBvcHVwID0gdGhpcy5idWlsZFBvcHVwSGFuZGxlcigpO1xuXG4gIHBvcHVwLnByZWxvYWQob3B0aW9ucyk7XG4gIHJldHVybiBwb3B1cDtcbn07XG5cbi8qKlxuICogSW50ZXJuYWwgdXNlLlxuICpcbiAqIEBtZXRob2QgZ2V0UG9wdXBIYW5kbGVyXG4gKiBAcHJpdmF0ZVxuICovXG5Qb3B1cC5wcm90b3R5cGUuZ2V0UG9wdXBIYW5kbGVyID0gZnVuY3Rpb24gKG9wdGlvbnMsIHByZWxvYWQpIHtcbiAgaWYgKG9wdGlvbnMucG9wdXBIYW5kbGVyKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucG9wdXBIYW5kbGVyO1xuICB9XG5cbiAgaWYgKHByZWxvYWQpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVsb2FkKG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuYnVpbGRQb3B1cEhhbmRsZXIoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgcG9wdXAgbG9naWMgZm9yIHRoZSBjYWxsYmFjayBwYWdlLlxuICpcbiAqIEBtZXRob2QgY2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5oYXNoIHRoZSB1cmwgaGFzaC4gSWYgbm90IHByb3ZpZGVkIGl0IHdpbGwgZXh0cmFjdCBmcm9tIHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGVdIHZhbHVlIG9yaWdpbmFsbHkgc2VudCBpbiBgc3RhdGVgIHBhcmFtZXRlciB0byB7QGxpbmsgYXV0aG9yaXplfSB0byBtaXRpZ2F0ZSBYU1JGXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubm9uY2VdIHZhbHVlIG9yaWdpbmFsbHkgc2VudCBpbiBgbm9uY2VgIHBhcmFtZXRlciB0byB7QGxpbmsgYXV0aG9yaXplfSB0byBwcmV2ZW50IHJlcGxheSBhdHRhY2tzXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuX2lkVG9rZW5WZXJpZmljYXRpb25dIG1ha2VzIHBhcnNlSGFzaCBwZXJmb3JtIG9yIHNraXAgYGlkX3Rva2VuYCB2ZXJpZmljYXRpb24uIFdlICoqc3Ryb25nbHkqKiByZWNvbW1lbmQgdmFsaWRhdGluZyB0aGUgYGlkX3Rva2VuYCB5b3Vyc2VsZiBpZiB5b3UgZGlzYWJsZSB0aGUgdmVyaWZpY2F0aW9uLlxuICogQHNlZSAgIHtAbGluayBwYXJzZUhhc2h9XG4gKi9cblBvcHVwLnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIFdpbkNoYW4ub25PcGVuKGZ1bmN0aW9uIChwb3B1cE9yaWdpbiwgciwgY2IpIHtcbiAgICBfdGhpcy53ZWJBdXRoLnBhcnNlSGFzaChvcHRpb25zIHx8IHt9LCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICByZXR1cm4gY2IoZXJyIHx8IGRhdGEpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogU2hvd3MgaW5zaWRlIGEgbmV3IHdpbmRvdyB0aGUgaG9zdGVkIGxvZ2luIHBhZ2UgKGAvYXV0aG9yaXplYCkgaW4gb3JkZXIgdG8gc3RhcnQgYSBuZXcgYXV0aE4vYXV0aFogdHJhbnNhY3Rpb24gYW5kIHBvc3QgaXRzIHJlc3VsdCB1c2luZyBgcG9zdE1lc3NhZ2VgLlxuICpcbiAqIEBtZXRob2QgYXV0aG9yaXplXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmRvbWFpbl0geW91ciBBdXRoMCBkb21haW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jbGllbnRJRF0geW91ciBBdXRoMCBjbGllbnQgaWRlbnRpZmllciBvYnRhaW5lZCB3aGVuIGNyZWF0aW5nIHRoZSBjbGllbnQgaW4gdGhlIEF1dGgwIERhc2hib2FyZFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucmVkaXJlY3RVcmkgdXJsIHRoYXQgdGhlIEF1dGgwIHdpbGwgcmVkaXJlY3QgYWZ0ZXIgQXV0aCB3aXRoIHRoZSBBdXRob3JpemF0aW9uIFJlc3BvbnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5yZXNwb25zZVR5cGUgdHlwZSBvZiB0aGUgcmVzcG9uc2UgdXNlZCBieSBPQXV0aCAyLjAgZmxvdy4gSXQgY2FuIGJlIGFueSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0aGUgdmFsdWVzIGBjb2RlYCwgYHRva2VuYCwgYGlkX3Rva2VuYC4ge0BsaW5rIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vYXV0aC12Mi1tdWx0aXBsZS1yZXNwb25zZS10eXBlcy0xXzB9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVzcG9uc2VNb2RlXSBob3cgdGhlIEF1dGggcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAsIGBmcmFnbWVudGAgYW5kIGBmb3JtX3Bvc3RgLiB7QGxpbmsgaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMC5odG1sI1Jlc3BvbnNlTW9kZXN9XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGVdIHZhbHVlIHVzZWQgdG8gbWl0aWdhdGUgWFNSRiBhdHRhY2tzLiB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9wcm90b2NvbHMvb2F1dGgyL29hdXRoLXN0YXRlfVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vbmNlXSB2YWx1ZSB1c2VkIHRvIG1pdGlnYXRlIHJlcGxheSBhdHRhY2tzIHdoZW4gdXNpbmcgSW1wbGljaXQgR3JhbnQuIHtAbGluayBodHRwczovL2F1dGgwLmNvbS9kb2NzL2FwaS1hdXRoL3R1dG9yaWFscy9ub25jZX1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aC4gZS5nLiBgb3BlbmlkIGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmF1ZGllbmNlXSBpZGVudGlmaWVyIG9mIHRoZSByZXNvdXJjZSBzZXJ2ZXIgd2hvIHdpbGwgY29uc3VtZSB0aGUgYWNjZXNzIHRva2VuIGlzc3VlZCBhZnRlciBBdXRoXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm93cF0gZGV0ZXJtaW5lcyBpZiBBdXRoMCBzaG91bGQgcmVuZGVyIHRoZSByZWxheSBwYWdlIG9yIG5vdCBhbmQgdGhlIGNhbGxlciBpcyByZXNwb25zaWJsZSBvZiBoYW5kbGluZyB0aGUgcmVzcG9uc2UuXG4gKiBAcGFyYW0ge2F1dGhvcml6ZUNhbGxiYWNrfSBjYlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hdXRoMC5jb20vZG9jcy9hcGkvYXV0aGVudGljYXRpb24jYXV0aG9yaXplLWNsaWVudH1cbiAqL1xuUG9wdXAucHJvdG90eXBlLmF1dGhvcml6ZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgcG9wdXA7XG4gIHZhciB1cmw7XG4gIHZhciByZWxheVVybDtcbiAgdmFyIHBvcE9wdHMgPSB7fTtcblxuICB2YXIgcGx1Z2luSGFuZGxlciA9IHRoaXMuYmFzZU9wdGlvbnMucGx1Z2lucy5nZXQoJ3BvcHVwLmF1dGhvcml6ZScpO1xuXG4gIHZhciBwYXJhbXMgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3Njb3BlJyxcbiAgICAnZG9tYWluJyxcbiAgICAnYXVkaWVuY2UnLFxuICAgICdyZXNwb25zZVR5cGUnLFxuICAgICdyZWRpcmVjdFVyaScsXG4gICAgJ19jc3JmJyxcbiAgICAnc3RhdGUnLFxuICAgICdfaW5zdGF0ZScsXG4gICAgJ25vbmNlJ1xuICBdKS53aXRoKG9iamVjdEhlbHBlci5ibGFja2xpc3Qob3B0aW9ucywgWydwb3B1cEhhbmRsZXInXSkpO1xuXG4gIGFzc2VydC5jaGVjayhwYXJhbXMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICByZXNwb25zZVR5cGU6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdyZXNwb25zZVR5cGUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9XG4gIH0pO1xuXG4gIC8vIHRoZSByZWxheSBwYWdlIHNob3VsZCBub3QgYmUgbmVjZXNhcnkgYXMgbG9uZyBpdCBoYXBwZW5zIGluIHRoZSBzYW1lIGRvbWFpblxuICAvLyAoYSByZWRpcmVjdFVyaSBzaG91bCBiZSBwcm92aWRlZCkuIEl0IGlzIG5lY2VzYXJ5IHdoZW4gdXNpbmcgT1dQXG4gIHJlbGF5VXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdyZWxheS5odG1sJyk7XG5cbiAgLy8gaWYgYSBvd3AgaXMgZW5hYmxlZCwgaXQgc2hvdWxkIHVzZSB0aGUgb3dwIGZsYWdcbiAgaWYgKG9wdGlvbnMub3dwKSB7XG4gICAgLy8gdXNlZCBieSBzZXJ2ZXIgdG8gcmVuZGVyIHRoZSByZWxheSBwYWdlIGluc3RlYWQgb2Ygc2VuZGluZyB0aGUgY2h1bmsgaW4gdGhlXG4gICAgLy8gdXJsIHRvIHRoZSBjYWxsYmFja1xuICAgIHBhcmFtcy5vd3AgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHBvcE9wdHMub3JpZ2luID0gdXJsSGVscGVyLmV4dHJhY3RPcmlnaW4ocGFyYW1zLnJlZGlyZWN0VXJpKTtcbiAgICByZWxheVVybCA9IHBhcmFtcy5yZWRpcmVjdFVyaTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnBvcHVwT3B0aW9ucykge1xuICAgIHBvcE9wdHMucG9wdXBPcHRpb25zID0gb2JqZWN0SGVscGVyLnBpY2sob3B0aW9ucy5wb3B1cE9wdGlvbnMsIFsnd2lkdGgnLCAnaGVpZ2h0J10pO1xuICB9XG5cbiAgaWYgKHBsdWdpbkhhbmRsZXIpIHtcbiAgICBwYXJhbXMgPSBwbHVnaW5IYW5kbGVyLnByb2Nlc3NQYXJhbXMocGFyYW1zKTtcbiAgfVxuXG4gIHBhcmFtcyA9IHRoaXMudHJhbnNhY3Rpb25NYW5hZ2VyLnByb2Nlc3MocGFyYW1zKTtcblxuICBkZWxldGUgcGFyYW1zLmRvbWFpbjtcblxuICB1cmwgPSB0aGlzLmNsaWVudC5idWlsZEF1dGhvcml6ZVVybChwYXJhbXMpO1xuXG4gIHBvcHVwID0gdGhpcy5nZXRQb3B1cEhhbmRsZXIob3B0aW9ucyk7XG5cbiAgcmV0dXJuIHBvcHVwLmxvYWQodXJsLCByZWxheVVybCwgcG9wT3B0cywgcmVzcG9uc2VIYW5kbGVyKGNiKSk7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGF1dGhlbnRpY2F0aW9uIHdpdGggdXNlcm5hbWUvZW1haWwgYW5kIHBhc3N3b3JkIHdpdGggYSBkYXRhYmFzZSBjb25uZWN0aW9uIGluc2lkZSBhIG5ldyB3aW5kb3dcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEFQSSBBdXRoIHNvIGlmIHlvdSBuZWVkIHRvIGZldGNoIEFQSSB0b2tlbnMgd2l0aCBhdWRpZW5jZVxuICogeW91IHNob3VsZCB1c2Uge0BsaW5rIGF1dGhvcml6ZX0gb3Ige0BsaW5rIGxvZ2lufS5cbiAqXG4gKiBAbWV0aG9kIGxvZ2luV2l0aENyZWRlbnRpYWxzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlZGlyZWN0VXJpXSB1cmwgdGhhdCB0aGUgQXV0aDAgd2lsbCByZWRpcmVjdCBhZnRlciBBdXRoIHdpdGggdGhlIEF1dGhvcml6YXRpb24gUmVzcG9uc2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXNwb25zZVR5cGVdIHR5cGUgb2YgdGhlIHJlc3BvbnNlIHVzZWQuIEl0IGNhbiBiZSBhbnkgb2YgdGhlIHZhbHVlcyBgY29kZWAgYW5kIGB0b2tlbmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXNwb25zZU1vZGVdIGhvdyB0aGUgQXV0aE4gcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAgYW5kIGBmcmFnbWVudGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aE4uIGUuZy4gYG9wZW5pZCBlbWFpbGBcbiAqIEBwYXJhbSB7Y3JlZGVudGlhbHNDYWxsYmFja30gY2JcbiAqL1xuUG9wdXAucHJvdG90eXBlLmxvZ2luV2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciBwYXJhbXM7XG4gIHZhciBwb3B1cDtcbiAgdmFyIHVybDtcbiAgdmFyIHJlbGF5VXJsO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGFzc2VydC5jaGVjayhvcHRpb25zLCB7IHR5cGU6ICdvYmplY3QnLCBtZXNzYWdlOiAnb3B0aW9ucyBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyB9LCB7XG4gICAgY2xpZW50SUQ6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnY2xpZW50SUQgb3B0aW9uIGlzIHJlcXVpcmVkJyB9LFxuICAgIHJlZGlyZWN0VXJpOiB7IG9wdGlvbmFsOiB0cnVlLCB0eXBlOiAnc3RyaW5nJywgbWVzc2FnZTogJ3JlZGlyZWN0VXJpIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICByZXNwb25zZVR5cGU6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAncmVzcG9uc2VUeXBlIG9wdGlvbiBpcyByZXF1aXJlZCcgfSxcbiAgICBzY29wZTogeyBvcHRpb25hbDogdHJ1ZSwgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdzY29wZSBvcHRpb24gaXMgcmVxdWlyZWQnIH0sXG4gICAgYXVkaWVuY2U6IHsgb3B0aW9uYWw6IHRydWUsIHR5cGU6ICdzdHJpbmcnLCBtZXNzYWdlOiAnYXVkaWVuY2Ugb3B0aW9uIGlzIHJlcXVpcmVkJyB9XG4gIH0pO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgcG9wdXAgPSB0aGlzLmdldFBvcHVwSGFuZGxlcihvcHRpb25zKTtcblxuICBvcHRpb25zID0gb2JqZWN0SGVscGVyLm1lcmdlKHRoaXMuYmFzZU9wdGlvbnMsIFtcbiAgICAnY2xpZW50SUQnLFxuICAgICdzY29wZScsXG4gICAgJ2RvbWFpbicsXG4gICAgJ2F1ZGllbmNlJyxcbiAgICAnX2NzcmYnLFxuICAgICdzdGF0ZScsXG4gICAgJ19pbnN0YXRlJyxcbiAgICAnbm9uY2UnXG4gIF0pLndpdGgob2JqZWN0SGVscGVyLmJsYWNrbGlzdChvcHRpb25zLCBbJ3BvcHVwSGFuZGxlciddKSk7XG5cbiAgcGFyYW1zID0gb2JqZWN0SGVscGVyLnBpY2sob3B0aW9ucywgWydjbGllbnRJRCcsICdkb21haW4nXSk7XG4gIHBhcmFtcy5vcHRpb25zID0gb2JqZWN0SGVscGVyLnRvU25ha2VDYXNlKFxuICAgIG9iamVjdEhlbHBlci5waWNrKG9wdGlvbnMsIFsncGFzc3dvcmQnLCAnY29ubmVjdGlvbicsICdzdGF0ZScsICdzY29wZScsICdfY3NyZicsICdkZXZpY2UnXSlcbiAgKTtcbiAgcGFyYW1zLm9wdGlvbnMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lIHx8IG9wdGlvbnMuZW1haWw7XG5cbiAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdzc29fZGJjb25uZWN0aW9uX3BvcHVwJywgb3B0aW9ucy5jbGllbnRJRCk7XG4gIHJlbGF5VXJsID0gdXJsam9pbih0aGlzLmJhc2VPcHRpb25zLnJvb3RVcmwsICdyZWxheS5odG1sJyk7XG5cbiAgcmV0dXJuIHBvcHVwLmxvYWQodXJsLCByZWxheVVybCwgeyBwYXJhbXM6IHBhcmFtcyB9LCByZXNwb25zZUhhbmRsZXIoY2IpKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIHBhc3N3b3JkbGVzcyBUT1RQIGFuZCByZWRpcmVjdHMgdG8gZmluaXNoIHRoZSBwYXNzd29yZGxlc3MgdHJhbnNhY3Rpb25cbiAqXG4gKiBAbWV0aG9kIHBhc3N3b3JkbGVzc1ZlcmlmeVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnR5cGUgYHNtc2Agb3IgYGVtYWlsYFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGhvbmVOdW1iZXIgb25seSBpZiB0eXBlID0gc21zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbWFpbCBvbmx5IGlmIHR5cGUgPSBlbWFpbFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29ubmVjdGlvbiB0aGUgY29ubmVjdGlvbiBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy52ZXJpZmljYXRpb25Db2RlIHRoZSBUT1RQIGNvZGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKi9cblBvcHVwLnByb3RvdHlwZS5wYXNzd29yZGxlc3NWZXJpZnkgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgcmV0dXJuIHRoaXMuY2xpZW50LnBhc3N3b3JkbGVzcy52ZXJpZnkob2JqZWN0SGVscGVyLmJsYWNrbGlzdChvcHRpb25zLCBbJ3BvcHVwSGFuZGxlciddKSxcbiAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLnVzZXJuYW1lID0gb3B0aW9ucy5waG9uZU51bWJlciB8fCBvcHRpb25zLmVtYWlsO1xuICAgICAgb3B0aW9ucy5wYXNzd29yZCA9IG9wdGlvbnMudmVyaWZpY2F0aW9uQ29kZTtcblxuICAgICAgZGVsZXRlIG9wdGlvbnMuZW1haWw7XG4gICAgICBkZWxldGUgb3B0aW9ucy5waG9uZU51bWJlcjtcbiAgICAgIGRlbGV0ZSBvcHRpb25zLnZlcmlmaWNhdGlvbkNvZGU7XG4gICAgICBkZWxldGUgb3B0aW9ucy50eXBlO1xuXG4gICAgICBfdGhpcy5jbGllbnQubG9naW5XaXRoUmVzb3VyY2VPd25lcihvcHRpb25zLCBjYik7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFNpZ25zIHVwIGEgbmV3IHVzZXIgYW5kIGF1dG9tYXRpY2FsbHkgbG9ncyB0aGUgdXNlciBpbiBhZnRlciB0aGUgc2lnbnVwLlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggQVBJIEF1dGggc28gaWYgeW91IG5lZWQgdG8gZmV0Y2ggQVBJIHRva2VucyB3aXRoIGF1ZGllbmNlXG4gKiB5b3Ugc2hvdWxkIHVzZSB7QGxpbmsgYXV0aG9yaXplfSBvciB7QGxpbmsgc2lnbnVwQW5kQXV0aG9yaXplfS5cbiAqXG4gKiBAbWV0aG9kIHNpZ251cEFuZExvZ2luXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW1haWwgdXNlciBlbWFpbCBhZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5wYXNzd29yZCB1c2VyIHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5jb25uZWN0aW9uIG5hbWUgb2YgdGhlIGNvbm5lY3Rpb24gd2hlcmUgdGhlIHVzZXIgd2lsbCBiZSBjcmVhdGVkXG4gKiBAcGFyYW0ge2NyZWRlbnRpYWxzQ2FsbGJhY2t9IGNiXG4gKi9cblBvcHVwLnByb3RvdHlwZS5zaWdudXBBbmRMb2dpbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIC8vIFByZWxvYWQgcG9wdXAgdG8gYXZvaWQgdGhlIGJyb3dzZXIgdG8gYmxvY2sgaXQgc2luY2UgdGhlIGxvZ2luIGhhcHBlbnMgbGF0ZXJcbiAgdmFyIHBvcHVwSGFuZGxlciA9IHRoaXMuZ2V0UG9wdXBIYW5kbGVyKG9wdGlvbnMsIHRydWUpO1xuICBvcHRpb25zLnBvcHVwSGFuZGxlciA9IHBvcHVwSGFuZGxlcjtcblxuICByZXR1cm4gdGhpcy5jbGllbnQuZGJDb25uZWN0aW9uLnNpZ251cChvYmplY3RIZWxwZXIuYmxhY2tsaXN0KG9wdGlvbnMsIFsncG9wdXBIYW5kbGVyJ10pLFxuICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKHBvcHVwSGFuZGxlci5fY3VycmVudF9wb3B1cCkge1xuICAgICAgICAgIHBvcHVwSGFuZGxlci5fY3VycmVudF9wb3B1cC5raWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICB9XG4gICAgICBfdGhpcy5sb2dpbldpdGhDcmVkZW50aWFscyhvcHRpb25zLCBjYik7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvcHVwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F1dGgwLWpzL3NyYy93ZWItYXV0aC9wb3B1cC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFVzZXJuYW1lUGFzc3dvcmQgPSByZXF1aXJlKCcuL3VzZXJuYW1lLXBhc3N3b3JkJyk7XG52YXIgb2JqZWN0SGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyL29iamVjdCcpO1xudmFyIFdhcm4gPSByZXF1aXJlKCcuLi9oZWxwZXIvd2FybicpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4uL2hlbHBlci9hc3NlcnQnKTtcblxuZnVuY3Rpb24gUmVkaXJlY3QoY2xpZW50LCBvcHRpb25zKSB7XG4gIHRoaXMuYmFzZU9wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLmNsaWVudCA9IGNsaWVudDtcblxuICB0aGlzLndhcm4gPSBuZXcgV2Fybih7XG4gICAgZGlzYWJsZVdhcm5pbmdzOiAhIW9wdGlvbnMuX2Rpc2FibGVEZXByZWNhdGlvbldhcm5pbmdzXG4gIH0pO1xufVxuXG4vKipcbiAqIEBjYWxsYmFjayBjcmVkZW50aWFsc0NhbGxiYWNrXG4gKiBAcGFyYW0ge0Vycm9yfSBbZXJyXSBlcnJvciByZXR1cm5lZCBieSBBdXRoMCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIEF1dGggZmFpbHVyZVxuICogQHBhcmFtIHtPYmplY3R9IFtyZXN1bHRdIHJlc3VsdCBvZiB0aGUgQXV0aE4gcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IHJlc3VsdC5hY2Nlc3NUb2tlbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGgge0BsaW5rIHVzZXJpbmZvfVxuICogQHBhcmFtIHtTdHJpbmd9IFtyZXN1bHQuaWRUb2tlbl0gdG9rZW4gdGhhdCBpZGVudGlmaWVzIHRoZSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Jlc3VsdC5yZWZyZXNoVG9rZW5dIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IG5ldyBhY2Nlc3MgdG9rZW5zIGZyb20gQXV0aDAuIE5vdGUgdGhhdCBub3QgYWxsIGNsaWVudHMgY2FuIHJlcXVlc3QgdGhlbSBvciB0aGUgcmVzb3VyY2Ugc2VydmVyIG1pZ2h0IG5vdCBhbGxvdyB0aGVtLlxuICovXG5cbi8qKlxuICogUGVyZm9ybXMgYXV0aGVudGljYXRpb24gd2l0aCB1c2VybmFtZS9lbWFpbCBhbmQgcGFzc3dvcmQgd2l0aCBhIGRhdGFiYXNlIGNvbm5lY3Rpb25cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEFQSSBBdXRoIHNvIGlmIHlvdSBuZWVkIHRvIGZldGNoIEFQSSB0b2tlbnMgd2l0aCBhdWRpZW5jZVxuICogeW91IHNob3VsZCB1c2Uge0BsaW5rIGF1dGhvcml6ZX0gb3Ige0BsaW5rIGxvZ2lufS5cbiAqXG4gKiBAbWV0aG9kIGxvZ2luV2l0aENyZWRlbnRpYWxzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlZGlyZWN0VXJpXSB1cmwgdGhhdCB0aGUgQXV0aDAgd2lsbCByZWRpcmVjdCBhZnRlciBBdXRoIHdpdGggdGhlIEF1dGhvcml6YXRpb24gUmVzcG9uc2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXNwb25zZVR5cGVdIHR5cGUgb2YgdGhlIHJlc3BvbnNlIHVzZWQuIEl0IGNhbiBiZSBhbnkgb2YgdGhlIHZhbHVlcyBgY29kZWAgYW5kIGB0b2tlbmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5yZXNwb25zZU1vZGVdIGhvdyB0aGUgQXV0aE4gcmVzcG9uc2UgaXMgZW5jb2RlZCBhbmQgcmVkaXJlY3RlZCBiYWNrIHRvIHRoZSBjbGllbnQuIFN1cHBvcnRlZCB2YWx1ZXMgYXJlIGBxdWVyeWAgYW5kIGBmcmFnbWVudGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zY29wZV0gc2NvcGVzIHRvIGJlIHJlcXVlc3RlZCBkdXJpbmcgQXV0aE4uIGUuZy4gYG9wZW5pZCBlbWFpbGBcbiAqIEBwYXJhbSB7Y3JlZGVudGlhbHNDYWxsYmFja30gY2JcbiAqL1xuUmVkaXJlY3QucHJvdG90eXBlLmxvZ2luV2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciB1c2VybmFtZVBhc3N3b3JkO1xuXG4gIHZhciBwYXJhbXMgPSBvYmplY3RIZWxwZXIubWVyZ2UodGhpcy5iYXNlT3B0aW9ucywgW1xuICAgICdjbGllbnRJRCcsXG4gICAgJ3JlZGlyZWN0VXJpJyxcbiAgICAndGVuYW50JyxcbiAgICAncmVzcG9uc2VUeXBlJyxcbiAgICAncmVzcG9uc2VNb2RlJyxcbiAgICAnc2NvcGUnLFxuICAgICdhdWRpZW5jZScsXG4gICAgJ19jc3JmJyxcbiAgICAnc3RhdGUnLFxuICAgICdfaW5zdGF0ZScsXG4gICAgJ25vbmNlJ1xuICBdKS53aXRoKG9wdGlvbnMpO1xuXG4gIGFzc2VydC5jaGVjayhwYXJhbXMsIHsgdHlwZTogJ29iamVjdCcsIG1lc3NhZ2U6ICdvcHRpb25zIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnIH0sIHtcbiAgICByZXNwb25zZVR5cGU6IHsgdHlwZTogJ3N0cmluZycsIG1lc3NhZ2U6ICdyZXNwb25zZVR5cGUgb3B0aW9uIGlzIHJlcXVpcmVkJyB9XG4gIH0pO1xuXG4gIHVzZXJuYW1lUGFzc3dvcmQgPSBuZXcgVXNlcm5hbWVQYXNzd29yZCh0aGlzLmJhc2VPcHRpb25zKTtcbiAgcmV0dXJuIHVzZXJuYW1lUGFzc3dvcmQubG9naW4ocGFyYW1zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgfVxuICAgIHJldHVybiB1c2VybmFtZVBhc3N3b3JkLmNhbGxiYWNrKGRhdGEpO1xuICB9KTtcbn07XG5cbi8qKlxuICogU2lnbnMgdXAgYSBuZXcgdXNlciBhbmQgYXV0b21hdGljYWxseSBsb2dzIHRoZSB1c2VyIGluIGFmdGVyIHRoZSBzaWdudXAuXG4gKlxuICogQG1ldGhvZCBzaWdudXBBbmRMb2dpblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmVtYWlsIHVzZXIgZW1haWwgYWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGFzc3dvcmQgdXNlciBwYXNzd29yZFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29ubmVjdGlvbiBuYW1lIG9mIHRoZSBjb25uZWN0aW9uIHdoZXJlIHRoZSB1c2VyIHdpbGwgYmUgY3JlYXRlZFxuICogQHBhcmFtIHtjcmVkZW50aWFsc0NhbGxiYWNrfSBjYlxuICovXG5SZWRpcmVjdC5wcm90b3R5cGUuc2lnbnVwQW5kTG9naW4gPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgcmV0dXJuIHRoaXMuY2xpZW50LmRiQ29ubmVjdGlvbi5zaWdudXAob3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjYihlcnIpO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXMubG9naW5XaXRoQ3JlZGVudGlhbHMob3B0aW9ucywgY2IpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVkaXJlY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL3dlYi1hdXRoL3JlZGlyZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSWZyYW1lSGFuZGxlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9pZnJhbWUtaGFuZGxlcicpO1xuXG5mdW5jdGlvbiBTaWxlbnRBdXRoZW50aWNhdGlvbkhhbmRsZXIoYXV0aDAsIGF1dGhlbnRpY2F0aW9uVXJsLCB0aW1lb3V0KSB7XG4gIHRoaXMuYXV0aDAgPSBhdXRoMDtcbiAgdGhpcy5hdXRoZW50aWNhdGlvblVybCA9IGF1dGhlbnRpY2F0aW9uVXJsO1xuICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDYwICogMTAwMDtcbiAgdGhpcy5oYW5kbGVyID0gbnVsbDtcbn1cblxuU2lsZW50QXV0aGVudGljYXRpb25IYW5kbGVyLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VQb3N0TWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgdGhpcy5oYW5kbGVyID0gbmV3IElmcmFtZUhhbmRsZXIoe1xuICAgIGF1dGgwOiB0aGlzLmF1dGgwLFxuICAgIHVybDogdGhpcy5hdXRoZW50aWNhdGlvblVybCxcbiAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgIHRpbWVvdXRDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2soJyNlcnJvcj10aW1lb3V0JmVycm9yX2Rlc2NyaXB0aW9uPVRpbWVvdXQrZHVyaW5nK2F1dGhlbnRpY2F0aW9uK3JlbmV3LicpO1xuICAgIH0sXG4gICAgdXNlUG9zdE1lc3NhZ2U6IHVzZVBvc3RNZXNzYWdlIHx8IGZhbHNlXG4gIH0pO1xuXG4gIHRoaXMuaGFuZGxlci5pbml0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbGVudEF1dGhlbnRpY2F0aW9uSGFuZGxlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXRoMC1qcy9zcmMvd2ViLWF1dGgvc2lsZW50LWF1dGhlbnRpY2F0aW9uLWhhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB1cmxqb2luID0gcmVxdWlyZSgndXJsLWpvaW4nKTtcblxudmFyIG9iamVjdEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9vYmplY3QnKTtcbnZhciBSZXF1ZXN0QnVpbGRlciA9IHJlcXVpcmUoJy4uL2hlbHBlci9yZXF1ZXN0LWJ1aWxkZXInKTtcbnZhciByZXNwb25zZUhhbmRsZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIvcmVzcG9uc2UtaGFuZGxlcicpO1xudmFyIHdpbmRvd0hlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci93aW5kb3cnKTtcblxuZnVuY3Rpb24gVXNlcm5hbWVQYXNzd29yZChvcHRpb25zKSB7XG4gIHRoaXMuYmFzZU9wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdEJ1aWxkZXIob3B0aW9ucyk7XG59XG5cblVzZXJuYW1lUGFzc3dvcmQucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gIHZhciB1cmw7XG4gIHZhciBib2R5O1xuXG4gIHVybCA9IHVybGpvaW4odGhpcy5iYXNlT3B0aW9ucy5yb290VXJsLCAndXNlcm5hbWVwYXNzd29yZCcsICdsb2dpbicpO1xuXG4gIG9wdGlvbnMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lIHx8IG9wdGlvbnMuZW1haWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBvcHRpb25zID0gb2JqZWN0SGVscGVyLmJsYWNrbGlzdChvcHRpb25zLCBbJ2VtYWlsJ10pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgYm9keSA9IG9iamVjdEhlbHBlci5tZXJnZSh0aGlzLmJhc2VPcHRpb25zLCBbXG4gICAgJ2NsaWVudElEJyxcbiAgICAncmVkaXJlY3RVcmknLFxuICAgICd0ZW5hbnQnLFxuICAgICdyZXNwb25zZVR5cGUnLFxuICAgICdyZXNwb25zZU1vZGUnLFxuICAgICdzY29wZScsXG4gICAgJ2F1ZGllbmNlJ1xuICBdKS53aXRoKG9wdGlvbnMpO1xuXG4gIGJvZHkgPSBvYmplY3RIZWxwZXIudG9TbmFrZUNhc2UoYm9keSwgWydhdXRoMENsaWVudCddKTtcblxuICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgLnBvc3QodXJsKVxuICAgIC5zZW5kKGJvZHkpXG4gICAgLmVuZChyZXNwb25zZUhhbmRsZXIoY2IpKTtcbn07XG5cblVzZXJuYW1lUGFzc3dvcmQucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24gKGZvcm1IdG1sKSB7XG4gIHZhciBkaXY7XG4gIHZhciBmb3JtO1xuICB2YXIgX2RvY3VtZW50ID0gd2luZG93SGVscGVyLmdldERvY3VtZW50KCk7XG5cbiAgZGl2ID0gX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gZm9ybUh0bWw7XG4gIGZvcm0gPSBfZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpLmNoaWxkcmVuWzBdO1xuXG4gIGZvcm0uc3VibWl0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJuYW1lUGFzc3dvcmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXV0aDAtanMvc3JjL3dlYi1hdXRoL3VzZXJuYW1lLXBhc3N3b3JkLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsIG9mIE9iamVjdC5jcmVhdGVcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge307XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSlcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3J5cHRvLWpzL2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3J5cHRvLWpzL3NoYTI1Ni5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gRHVtbXlDYWNoZSgpIHt9XG5cbkR1bW15Q2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5EdW1teUNhY2hlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbkR1bW15Q2FjaGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IER1bW15Q2FjaGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9kdW1teS1jYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gQ29uZmlndXJhdGlvbkVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnQ29uZmlndXJhdGlvbkVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSAobWVzc2FnZSB8fCAnJyk7XG59XG5Db25maWd1cmF0aW9uRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBUb2tlblZhbGlkYXRpb25FcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5uYW1lID0gJ1Rva2VuVmFsaWRhdGlvbkVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSAobWVzc2FnZSB8fCAnJyk7XG59XG5Ub2tlblZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDb25maWd1cmF0aW9uRXJyb3I6IENvbmZpZ3VyYXRpb25FcnJvcixcbiAgVG9rZW5WYWxpZGF0aW9uRXJyb3I6IFRva2VuVmFsaWRhdGlvbkVycm9yXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lkdG9rZW4tdmVyaWZpZXIvc3JjL2hlbHBlcnMvZXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB1cmxqb2luID0gcmVxdWlyZSgndXJsLWpvaW4nKTtcbnZhciBiYXNlNjQgPSByZXF1aXJlKCcuL2Jhc2U2NCcpO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XG5cbmZ1bmN0aW9uIHByb2Nlc3Moandrcykge1xuICB2YXIgbW9kdWx1cyA9IGJhc2U2NC5kZWNvZGVUb0hFWChqd2tzLm4pO1xuICB2YXIgZXhwID0gYmFzZTY0LmRlY29kZVRvSEVYKGp3a3MuZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb2R1bHVzOiBtb2R1bHVzLFxuICAgIGV4cDogZXhwXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEpXS1Mob3B0aW9ucywgY2IpIHtcbiAgdmFyIHVybCA9IHVybGpvaW4ob3B0aW9ucy5pc3MsICcud2VsbC1rbm93bicsICdqd2tzLmpzb24nKTtcblxuICByZXR1cm4gcmVxdWVzdFxuICAgIC5nZXQodXJsKVxuICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2hpbmdLZXkgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGRhdGEuYm9keS5rZXlzLmxlbmd0aCAmJiBtYXRjaGluZ0tleSA9PT0gbnVsbDsgYSArKykge1xuICAgICAgICB2YXIga2V5ID0gZGF0YS5ib2R5LmtleXNbYV07XG4gICAgICAgIGlmIChrZXkua2lkID09PSBvcHRpb25zLmtpZCkge1xuICAgICAgICAgIG1hdGNoaW5nS2V5ID0ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiKG51bGwsIHByb2Nlc3MobWF0Y2hpbmdLZXkpKTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByb2Nlc3M6IHByb2Nlc3MsXG4gIGdldEpXS1M6IGdldEpXS1Ncbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9qd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuQmFzZWQgb24gdGhlIHdvcmsgb2YgVG9tIFd1XG5odHRwOi8vd3d3LWNzLXN0dWRlbnRzLnN0YW5mb3JkLmVkdS9+dGp3L2pzYm4vXG5odHRwOi8vd3d3LWNzLXN0dWRlbnRzLnN0YW5mb3JkLmVkdS9+dGp3L2pzYm4vTElDRU5TRVxuKi9cblxudmFyIEJpZ0ludGVnZXIgPSByZXF1aXJlKCdqc2JuJykuQmlnSW50ZWdlcjtcbnZhciBTSEEyNTYgPSByZXF1aXJlKCdjcnlwdG8tanMvc2hhMjU2Jyk7XG5cbnZhciBEaWdlc3RJbmZvSGVhZCA9IHtcbiAgc2hhMTogJzMwMjEzMDA5MDYwNTJiMGUwMzAyMWEwNTAwMDQxNCcsXG4gIHNoYTIyNDogJzMwMmQzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwNDA1MDAwNDFjJyxcbiAgc2hhMjU2OiAnMzAzMTMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjAxMDUwMDA0MjAnLFxuICBzaGEzODQ6ICczMDQxMzAwZDA2MDk2MDg2NDgwMTY1MDMwNDAyMDIwNTAwMDQzMCcsXG4gIHNoYTUxMjogJzMwNTEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMzA1MDAwNDQwJyxcbiAgbWQyOiAnMzAyMDMwMGMwNjA4MmE4NjQ4ODZmNzBkMDIwMjA1MDAwNDEwJyxcbiAgbWQ1OiAnMzAyMDMwMGMwNjA4MmE4NjQ4ODZmNzBkMDIwNTA1MDAwNDEwJyxcbiAgcmlwZW1kMTYwOiAnMzAyMTMwMDkwNjA1MmIyNDAzMDIwMTA1MDAwNDE0J1xufTtcblxudmFyIERpZ2VzdEFsZ3MgPSB7XG4gIHNoYTI1NjogU0hBMjU2XG59O1xuXG5mdW5jdGlvbiBSU0FWZXJpZmllcihtb2R1bHVzLCBleHApIHtcbiAgdGhpcy5uID0gbnVsbDtcbiAgdGhpcy5lID0gMDtcblxuICBpZiAobW9kdWx1cyAhPSBudWxsICYmIGV4cCAhPSBudWxsICYmIG1vZHVsdXMubGVuZ3RoID4gMCAmJiBleHAubGVuZ3RoID4gMCkge1xuICAgIHRoaXMubiA9IG5ldyBCaWdJbnRlZ2VyKG1vZHVsdXMsIDE2KTtcbiAgICB0aGlzLmUgPSBwYXJzZUludChleHAsIDE2KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQga2V5IGRhdGEnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbGdvcml0aG1Gcm9tRGlnZXN0KGhEaWdlc3RJbmZvKSB7XG4gIGZvciAodmFyIGFsZ05hbWUgaW4gRGlnZXN0SW5mb0hlYWQpIHtcbiAgICB2YXIgaGVhZCA9IERpZ2VzdEluZm9IZWFkW2FsZ05hbWVdO1xuICAgIHZhciBsZW4gPSBoZWFkLmxlbmd0aDtcblxuICAgIGlmIChoRGlnZXN0SW5mby5zdWJzdHJpbmcoMCwgbGVuKSA9PT0gaGVhZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWxnOiBhbGdOYW1lLFxuICAgICAgICBoYXNoOiBoRGlnZXN0SW5mby5zdWJzdHJpbmcobGVuKVxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5cblJTQVZlcmlmaWVyLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAobXNnLCBlbmNzaWcpIHtcbiAgZW5jc2lnID0gZW5jc2lnLnJlcGxhY2UoL1teMC05YS1mXXxbXFxzXFxuXV0vaWcsICcnKTtcblxuICB2YXIgc2lnID0gbmV3IEJpZ0ludGVnZXIoZW5jc2lnLCAxNik7XG4gIGlmIChzaWcuYml0TGVuZ3RoKCkgPiB0aGlzLm4uYml0TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZ25hdHVyZSBkb2VzIG5vdCBtYXRjaCB3aXRoIHRoZSBrZXkgbW9kdWx1cy4nKTtcbiAgfVxuXG4gIHZhciBkZWNyeXB0ZWRTaWcgPSBzaWcubW9kUG93SW50KHRoaXMuZSwgdGhpcy5uKTtcbiAgdmFyIGRpZ2VzdCA9IGRlY3J5cHRlZFNpZy50b1N0cmluZygxNikucmVwbGFjZSgvXjFmKzAwLywgJycpO1xuXG4gIHZhciBkaWdlc3RJbmZvID0gZ2V0QWxnb3JpdGhtRnJvbURpZ2VzdChkaWdlc3QpO1xuICBpZiAoZGlnZXN0SW5mby5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIURpZ2VzdEFsZ3MuaGFzT3duUHJvcGVydHkoZGlnZXN0SW5mby5hbGcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIYXNoaW5nIGFsZ29yaXRobSBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICB9XG5cbiAgdmFyIG1zZ0hhc2ggPSBEaWdlc3RBbGdzW2RpZ2VzdEluZm8uYWxnXShtc2cpLnRvU3RyaW5nKCk7XG4gIHJldHVybiAoZGlnZXN0SW5mby5oYXNoID09PSBtc2dIYXNoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUlNBVmVyaWZpZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaGVscGVycy9yc2EtdmVyaWZpZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSU0FWZXJpZmllciA9IHJlcXVpcmUoJy4vaGVscGVycy9yc2EtdmVyaWZpZXInKTtcbnZhciBiYXNlNjQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmFzZTY0Jyk7XG52YXIgandrcyA9IHJlcXVpcmUoJy4vaGVscGVycy9qd2tzJyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvZXJyb3InKTtcbnZhciBEdW1teUNhY2hlID0gcmVxdWlyZSgnLi9oZWxwZXJzL2R1bW15LWNhY2hlJyk7XG52YXIgc3VwcG9ydGVkQWxncyA9IFsnUlMyNTYnXTtcblxuZnVuY3Rpb24gSWRUb2tlblZlcmlmaWVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5qd2tzQ2FjaGUgPSBvcHRpb25zLmp3a3NDYWNoZSB8fCBuZXcgRHVtbXlDYWNoZSgpO1xuICB0aGlzLmV4cGVjdGVkQWxnID0gb3B0aW9ucy5leHBlY3RlZEFsZyB8fCAnUlMyNTYnO1xuICB0aGlzLmlzc3VlciA9IG9wdGlvbnMuaXNzdWVyO1xuICB0aGlzLmF1ZGllbmNlID0gb3B0aW9ucy5hdWRpZW5jZTtcbiAgdGhpcy5sZWV3YXkgPSBvcHRpb25zLmxlZXdheSB8fCAwO1xuICB0aGlzLl9fZGlzYWJsZUV4cGlyYXRpb25DaGVjayA9IG9wdGlvbnMuX19kaXNhYmxlRXhwaXJhdGlvbkNoZWNrIHx8IGZhbHNlO1xuXG4gIGlmICh0aGlzLmxlZXdheSA8IDAgfHwgdGhpcy5sZWV3YXkgPiA2MCkge1xuICAgIHRocm93IG5ldyBlcnJvci5Db25maWd1cmF0aW9uRXJyb3IoJ1RoZSBsZWV3YXkgc2hvdWxkIGJlIHBvc2l0aXZlIGFuZCBsb3dlciB0aGFuIGEgbWludXRlLicpO1xuICB9XG5cbiAgaWYgKHN1cHBvcnRlZEFsZ3MuaW5kZXhPZih0aGlzLmV4cGVjdGVkQWxnKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3IuQ29uZmlndXJhdGlvbkVycm9yKCdBbGdvcml0aG0gJyArIHRoaXMuZXhwZWN0ZWRBbGcgK1xuICAgICAgJyBpcyBub3Qgc3VwcG9ydGVkLiAoRXhwZWN0ZWQgYWxnczogWycgKyBzdXBwb3J0ZWRBbGdzLmpvaW4oJywnKSArICddKScpO1xuICB9XG59XG5cbklkVG9rZW5WZXJpZmllci5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gKHRva2VuLCBub25jZSwgY2IpIHtcbiAgdmFyIGp3dCA9IHRoaXMuZGVjb2RlKHRva2VuKTtcblxuICBpZiAoand0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gY2Ioand0LCBmYWxzZSk7XG4gIH1cblxuICB2YXIgaGVhZEFuZFBheWxvYWQgPSBqd3QuZW5jb2RlZC5oZWFkZXIgKyAnLicgKyBqd3QuZW5jb2RlZC5wYXlsb2FkO1xuICB2YXIgc2lnbmF0dXJlID0gYmFzZTY0LmRlY29kZVRvSEVYKGp3dC5lbmNvZGVkLnNpZ25hdHVyZSk7XG5cbiAgdmFyIGFsZyA9IGp3dC5oZWFkZXIuYWxnO1xuICB2YXIga2lkID0gand0LmhlYWRlci5raWQ7XG5cbiAgdmFyIGF1ZCA9IGp3dC5wYXlsb2FkLmF1ZDtcbiAgdmFyIGlzcyA9IGp3dC5wYXlsb2FkLmlzcztcbiAgdmFyIGV4cCA9IGp3dC5wYXlsb2FkLmV4cDtcbiAgdmFyIGlhdCA9IGp3dC5wYXlsb2FkLmlhdDtcbiAgdmFyIHRub25jZSA9IGp3dC5wYXlsb2FkLm5vbmNlIHx8IG51bGw7XG5cbiAgaWYgKHRoaXMuaXNzdWVyICE9PSBpc3MpIHtcbiAgICByZXR1cm4gY2IobmV3IGVycm9yLlRva2VuVmFsaWRhdGlvbkVycm9yKCdJc3N1ZXIgJyArIGlzcyArICcgaXMgbm90IHZhbGlkLicpLCBmYWxzZSk7XG4gIH1cblxuICBpZiAodGhpcy5hdWRpZW5jZSAhPT0gYXVkKSB7XG4gICAgcmV0dXJuIGNiKG5ldyBlcnJvci5Ub2tlblZhbGlkYXRpb25FcnJvcignQXVkaWVuY2UgJyArIGF1ZCArICcgaXMgbm90IHZhbGlkLicpLCBmYWxzZSk7XG4gIH1cblxuICBpZiAodGhpcy5leHBlY3RlZEFsZyAhPT0gYWxnKSB7XG4gICAgcmV0dXJuIGNiKG5ldyBlcnJvci5Ub2tlblZhbGlkYXRpb25FcnJvcignQWxnb3JpdGhtICcgKyBhbGcgK1xuICAgICAgJyBpcyBub3Qgc3VwcG9ydGVkLiAoRXhwZWN0ZWQgYWxnczogWycgKyBzdXBwb3J0ZWRBbGdzLmpvaW4oJywnKSArICddKScpLCBmYWxzZSk7XG4gIH1cblxuICBpZiAodG5vbmNlICE9PSBub25jZSkge1xuICAgIHJldHVybiBjYihuZXcgZXJyb3IuVG9rZW5WYWxpZGF0aW9uRXJyb3IoJ05vbmNlIGRvZXMgbm90IG1hdGNoLicpLCBmYWxzZSk7XG4gIH1cblxuICB2YXIgZXhwaXJhdGlvbkVycm9yID0gdGhpcy52ZXJpZnlFeHBBbmRJYXQoZXhwLCBpYXQpO1xuXG4gIGlmIChleHBpcmF0aW9uRXJyb3IpIHtcbiAgICByZXR1cm4gY2IoZXhwaXJhdGlvbkVycm9yLCBmYWxzZSk7XG4gIH1cblxuICB0aGlzLmdldFJzYVZlcmlmaWVyKGlzcywga2lkLCBmdW5jdGlvbiAoZXJyLCByc2FWZXJpZmllcikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjYihlcnIpO1xuICAgIH1cbiAgICBpZiAocnNhVmVyaWZpZXIudmVyaWZ5KGhlYWRBbmRQYXlsb2FkLCBzaWduYXR1cmUpKSB7XG4gICAgICBjYihudWxsLCBqd3QucGF5bG9hZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKG5ldyBlcnJvci5Ub2tlblZhbGlkYXRpb25FcnJvcignSW52YWxpZCBzaWduYXR1cmUuJykpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5JZFRva2VuVmVyaWZpZXIucHJvdG90eXBlLnZlcmlmeUV4cEFuZElhdCA9IGZ1bmN0aW9uIChleHAsIGlhdCkge1xuICBpZiAodGhpcy5fX2Rpc2FibGVFeHBpcmF0aW9uQ2hlY2spIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gIHZhciBleHBEYXRlID0gbmV3IERhdGUoMCk7XG4gIGV4cERhdGUuc2V0VVRDU2Vjb25kcyhleHAgKyB0aGlzLmxlZXdheSk7XG5cbiAgaWYgKG5vdyA+IGV4cERhdGUpIHtcbiAgICByZXR1cm4gbmV3IGVycm9yLlRva2VuVmFsaWRhdGlvbkVycm9yKCdFeHBpcmVkIHRva2VuLicpO1xuICB9XG5cbiAgdmFyIGlhdERhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgaWF0RGF0ZS5zZXRVVENTZWNvbmRzKGlhdCAtIHRoaXMubGVld2F5KTtcblxuICBpZiAobm93IDwgaWF0RGF0ZSkge1xuICAgIHJldHVybiBuZXcgZXJyb3IuVG9rZW5WYWxpZGF0aW9uRXJyb3IoJ1RoZSB0b2tlbiB3YXMgaXNzdWVkIGluIHRoZSBmdXR1cmUuICcgK1xuICAgICAgJ1BsZWFzZSBjaGVjayB5b3VyIGNvbXB1dGVkIGNsb2NrLicpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5JZFRva2VuVmVyaWZpZXIucHJvdG90eXBlLmdldFJzYVZlcmlmaWVyID0gZnVuY3Rpb24gKGlzcywga2lkLCBjYikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgY2FjaGVrZXkgPSBpc3MgKyBraWQ7XG5cbiAgaWYgKCF0aGlzLmp3a3NDYWNoZS5oYXMoY2FjaGVrZXkpKSB7XG4gICAgandrcy5nZXRKV0tTKHtcbiAgICAgIGlzczogaXNzLFxuICAgICAga2lkOiBraWRcbiAgICB9LCBmdW5jdGlvbiAoZXJyLCBrZXlJbmZvKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNiKGVycik7XG4gICAgICB9XG4gICAgICBfdGhpcy5qd2tzQ2FjaGUuc2V0KGNhY2hla2V5LCBrZXlJbmZvKTtcbiAgICAgIGNiKG51bGwsIG5ldyBSU0FWZXJpZmllcihrZXlJbmZvLm1vZHVsdXMsIGtleUluZm8uZXhwKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleUluZm8gPSB0aGlzLmp3a3NDYWNoZS5nZXQoY2FjaGVrZXkpO1xuICAgIGNiKG51bGwsIG5ldyBSU0FWZXJpZmllcihrZXlJbmZvLm1vZHVsdXMsIGtleUluZm8uZXhwKSk7XG4gIH1cbn07XG5cbklkVG9rZW5WZXJpZmllci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHZhciBwYXJ0cyA9IHRva2VuLnNwbGl0KCcuJyk7XG4gIHZhciBoZWFkZXI7XG4gIHZhciBwYXlsb2FkO1xuXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICByZXR1cm4gbmV3IGVycm9yLlRva2VuVmFsaWRhdGlvbkVycm9yKCdDYW5ub3QgZGVjb2RlIGEgbWFsZm9ybWVkIEpXVCcpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBoZWFkZXIgPSBKU09OLnBhcnNlKGJhc2U2NC5kZWNvZGVUb1N0cmluZyhwYXJ0c1swXSkpO1xuICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKGJhc2U2NC5kZWNvZGVUb1N0cmluZyhwYXJ0c1sxXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG5ldyBlcnJvci5Ub2tlblZhbGlkYXRpb25FcnJvcignVG9rZW4gaGVhZGVyIG9yIHBheWxvYWQgaXMgbm90IHZhbGlkIEpTT04nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICBlbmNvZGVkOiB7XG4gICAgICBoZWFkZXI6IHBhcnRzWzBdLFxuICAgICAgcGF5bG9hZDogcGFydHNbMV0sXG4gICAgICBzaWduYXR1cmU6IHBhcnRzWzJdXG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJZFRva2VuVmVyaWZpZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaWR0b2tlbi12ZXJpZmllci9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbigpe1xuXG4gICAgLy8gQ29weXJpZ2h0IChjKSAyMDA1ICBUb20gV3VcbiAgICAvLyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgIC8vIFNlZSBcIkxJQ0VOU0VcIiBmb3IgZGV0YWlscy5cblxuICAgIC8vIEJhc2ljIEphdmFTY3JpcHQgQk4gbGlicmFyeSAtIHN1YnNldCB1c2VmdWwgZm9yIFJTQSBlbmNyeXB0aW9uLlxuXG4gICAgLy8gQml0cyBwZXIgZGlnaXRcbiAgICB2YXIgZGJpdHM7XG5cbiAgICAvLyBKYXZhU2NyaXB0IGVuZ2luZSBhbmFseXNpc1xuICAgIHZhciBjYW5hcnkgPSAweGRlYWRiZWVmY2FmZTtcbiAgICB2YXIgal9sbSA9ICgoY2FuYXJ5JjB4ZmZmZmZmKT09MHhlZmNhZmUpO1xuXG4gICAgLy8gKHB1YmxpYykgQ29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBCaWdJbnRlZ2VyKGEsYixjKSB7XG4gICAgICBpZihhICE9IG51bGwpXG4gICAgICAgIGlmKFwibnVtYmVyXCIgPT0gdHlwZW9mIGEpIHRoaXMuZnJvbU51bWJlcihhLGIsYyk7XG4gICAgICAgIGVsc2UgaWYoYiA9PSBudWxsICYmIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEpIHRoaXMuZnJvbVN0cmluZyhhLDI1Nik7XG4gICAgICAgIGVsc2UgdGhpcy5mcm9tU3RyaW5nKGEsYik7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIG5ldywgdW5zZXQgQmlnSW50ZWdlclxuICAgIGZ1bmN0aW9uIG5iaSgpIHsgcmV0dXJuIG5ldyBCaWdJbnRlZ2VyKG51bGwpOyB9XG5cbiAgICAvLyBhbTogQ29tcHV0ZSB3X2ogKz0gKHgqdGhpc19pKSwgcHJvcGFnYXRlIGNhcnJpZXMsXG4gICAgLy8gYyBpcyBpbml0aWFsIGNhcnJ5LCByZXR1cm5zIGZpbmFsIGNhcnJ5LlxuICAgIC8vIGMgPCAzKmR2YWx1ZSwgeCA8IDIqZHZhbHVlLCB0aGlzX2kgPCBkdmFsdWVcbiAgICAvLyBXZSBuZWVkIHRvIHNlbGVjdCB0aGUgZmFzdGVzdCBvbmUgdGhhdCB3b3JrcyBpbiB0aGlzIGVudmlyb25tZW50LlxuXG4gICAgLy8gYW0xOiB1c2UgYSBzaW5nbGUgbXVsdCBhbmQgZGl2aWRlIHRvIGdldCB0aGUgaGlnaCBiaXRzLFxuICAgIC8vIG1heCBkaWdpdCBiaXRzIHNob3VsZCBiZSAyNiBiZWNhdXNlXG4gICAgLy8gbWF4IGludGVybmFsIHZhbHVlID0gMipkdmFsdWVeMi0yKmR2YWx1ZSAoPCAyXjUzKVxuICAgIGZ1bmN0aW9uIGFtMShpLHgsdyxqLGMsbikge1xuICAgICAgd2hpbGUoLS1uID49IDApIHtcbiAgICAgICAgdmFyIHYgPSB4KnRoaXNbaSsrXSt3W2pdK2M7XG4gICAgICAgIGMgPSBNYXRoLmZsb29yKHYvMHg0MDAwMDAwKTtcbiAgICAgICAgd1tqKytdID0gdiYweDNmZmZmZmY7XG4gICAgICB9XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgLy8gYW0yIGF2b2lkcyBhIGJpZyBtdWx0LWFuZC1leHRyYWN0IGNvbXBsZXRlbHkuXG4gICAgLy8gTWF4IGRpZ2l0IGJpdHMgc2hvdWxkIGJlIDw9IDMwIGJlY2F1c2Ugd2UgZG8gYml0d2lzZSBvcHNcbiAgICAvLyBvbiB2YWx1ZXMgdXAgdG8gMipoZHZhbHVlXjItaGR2YWx1ZS0xICg8IDJeMzEpXG4gICAgZnVuY3Rpb24gYW0yKGkseCx3LGosYyxuKSB7XG4gICAgICB2YXIgeGwgPSB4JjB4N2ZmZiwgeGggPSB4Pj4xNTtcbiAgICAgIHdoaWxlKC0tbiA+PSAwKSB7XG4gICAgICAgIHZhciBsID0gdGhpc1tpXSYweDdmZmY7XG4gICAgICAgIHZhciBoID0gdGhpc1tpKytdPj4xNTtcbiAgICAgICAgdmFyIG0gPSB4aCpsK2gqeGw7XG4gICAgICAgIGwgPSB4bCpsKygobSYweDdmZmYpPDwxNSkrd1tqXSsoYyYweDNmZmZmZmZmKTtcbiAgICAgICAgYyA9IChsPj4+MzApKyhtPj4+MTUpK3hoKmgrKGM+Pj4zMCk7XG4gICAgICAgIHdbaisrXSA9IGwmMHgzZmZmZmZmZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICAvLyBBbHRlcm5hdGVseSwgc2V0IG1heCBkaWdpdCBiaXRzIHRvIDI4IHNpbmNlIHNvbWVcbiAgICAvLyBicm93c2VycyBzbG93IGRvd24gd2hlbiBkZWFsaW5nIHdpdGggMzItYml0IG51bWJlcnMuXG4gICAgZnVuY3Rpb24gYW0zKGkseCx3LGosYyxuKSB7XG4gICAgICB2YXIgeGwgPSB4JjB4M2ZmZiwgeGggPSB4Pj4xNDtcbiAgICAgIHdoaWxlKC0tbiA+PSAwKSB7XG4gICAgICAgIHZhciBsID0gdGhpc1tpXSYweDNmZmY7XG4gICAgICAgIHZhciBoID0gdGhpc1tpKytdPj4xNDtcbiAgICAgICAgdmFyIG0gPSB4aCpsK2gqeGw7XG4gICAgICAgIGwgPSB4bCpsKygobSYweDNmZmYpPDwxNCkrd1tqXStjO1xuICAgICAgICBjID0gKGw+PjI4KSsobT4+MTQpK3hoKmg7XG4gICAgICAgIHdbaisrXSA9IGwmMHhmZmZmZmZmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIHZhciBpbkJyb3dzZXIgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGlmKGluQnJvd3NlciAmJiBqX2xtICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiKSkge1xuICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW0gPSBhbTI7XG4gICAgICBkYml0cyA9IDMwO1xuICAgIH1cbiAgICBlbHNlIGlmKGluQnJvd3NlciAmJiBqX2xtICYmIChuYXZpZ2F0b3IuYXBwTmFtZSAhPSBcIk5ldHNjYXBlXCIpKSB7XG4gICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbSA9IGFtMTtcbiAgICAgIGRiaXRzID0gMjY7XG4gICAgfVxuICAgIGVsc2UgeyAvLyBNb3ppbGxhL05ldHNjYXBlIHNlZW1zIHRvIHByZWZlciBhbTNcbiAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmFtID0gYW0zO1xuICAgICAgZGJpdHMgPSAyODtcbiAgICB9XG5cbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5EQiA9IGRiaXRzO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkRNID0gKCgxPDxkYml0cyktMSk7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuRFYgPSAoMTw8ZGJpdHMpO1xuXG4gICAgdmFyIEJJX0ZQID0gNTI7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuRlYgPSBNYXRoLnBvdygyLEJJX0ZQKTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5GMSA9IEJJX0ZQLWRiaXRzO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkYyID0gMipkYml0cy1CSV9GUDtcblxuICAgIC8vIERpZ2l0IGNvbnZlcnNpb25zXG4gICAgdmFyIEJJX1JNID0gXCIwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcbiAgICB2YXIgQklfUkMgPSBuZXcgQXJyYXkoKTtcbiAgICB2YXIgcnIsdnY7XG4gICAgcnIgPSBcIjBcIi5jaGFyQ29kZUF0KDApO1xuICAgIGZvcih2diA9IDA7IHZ2IDw9IDk7ICsrdnYpIEJJX1JDW3JyKytdID0gdnY7XG4gICAgcnIgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuICAgIGZvcih2diA9IDEwOyB2diA8IDM2OyArK3Z2KSBCSV9SQ1tycisrXSA9IHZ2O1xuICAgIHJyID0gXCJBXCIuY2hhckNvZGVBdCgwKTtcbiAgICBmb3IodnYgPSAxMDsgdnYgPCAzNjsgKyt2dikgQklfUkNbcnIrK10gPSB2djtcblxuICAgIGZ1bmN0aW9uIGludDJjaGFyKG4pIHsgcmV0dXJuIEJJX1JNLmNoYXJBdChuKTsgfVxuICAgIGZ1bmN0aW9uIGludEF0KHMsaSkge1xuICAgICAgdmFyIGMgPSBCSV9SQ1tzLmNoYXJDb2RlQXQoaSldO1xuICAgICAgcmV0dXJuIChjPT1udWxsKT8tMTpjO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIGNvcHkgdGhpcyB0byByXG4gICAgZnVuY3Rpb24gYm5wQ29weVRvKHIpIHtcbiAgICAgIGZvcih2YXIgaSA9IHRoaXMudC0xOyBpID49IDA7IC0taSkgcltpXSA9IHRoaXNbaV07XG4gICAgICByLnQgPSB0aGlzLnQ7XG4gICAgICByLnMgPSB0aGlzLnM7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgc2V0IGZyb20gaW50ZWdlciB2YWx1ZSB4LCAtRFYgPD0geCA8IERWXG4gICAgZnVuY3Rpb24gYm5wRnJvbUludCh4KSB7XG4gICAgICB0aGlzLnQgPSAxO1xuICAgICAgdGhpcy5zID0gKHg8MCk/LTE6MDtcbiAgICAgIGlmKHggPiAwKSB0aGlzWzBdID0geDtcbiAgICAgIGVsc2UgaWYoeCA8IC0xKSB0aGlzWzBdID0geCt0aGlzLkRWO1xuICAgICAgZWxzZSB0aGlzLnQgPSAwO1xuICAgIH1cblxuICAgIC8vIHJldHVybiBiaWdpbnQgaW5pdGlhbGl6ZWQgdG8gdmFsdWVcbiAgICBmdW5jdGlvbiBuYnYoaSkgeyB2YXIgciA9IG5iaSgpOyByLmZyb21JbnQoaSk7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSBzZXQgZnJvbSBzdHJpbmcgYW5kIHJhZGl4XG4gICAgZnVuY3Rpb24gYm5wRnJvbVN0cmluZyhzLGIpIHtcbiAgICAgIHZhciBrO1xuICAgICAgaWYoYiA9PSAxNikgayA9IDQ7XG4gICAgICBlbHNlIGlmKGIgPT0gOCkgayA9IDM7XG4gICAgICBlbHNlIGlmKGIgPT0gMjU2KSBrID0gODsgLy8gYnl0ZSBhcnJheVxuICAgICAgZWxzZSBpZihiID09IDIpIGsgPSAxO1xuICAgICAgZWxzZSBpZihiID09IDMyKSBrID0gNTtcbiAgICAgIGVsc2UgaWYoYiA9PSA0KSBrID0gMjtcbiAgICAgIGVsc2UgeyB0aGlzLmZyb21SYWRpeChzLGIpOyByZXR1cm47IH1cbiAgICAgIHRoaXMudCA9IDA7XG4gICAgICB0aGlzLnMgPSAwO1xuICAgICAgdmFyIGkgPSBzLmxlbmd0aCwgbWkgPSBmYWxzZSwgc2ggPSAwO1xuICAgICAgd2hpbGUoLS1pID49IDApIHtcbiAgICAgICAgdmFyIHggPSAoaz09OCk/c1tpXSYweGZmOmludEF0KHMsaSk7XG4gICAgICAgIGlmKHggPCAwKSB7XG4gICAgICAgICAgaWYocy5jaGFyQXQoaSkgPT0gXCItXCIpIG1pID0gdHJ1ZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBtaSA9IGZhbHNlO1xuICAgICAgICBpZihzaCA9PSAwKVxuICAgICAgICAgIHRoaXNbdGhpcy50KytdID0geDtcbiAgICAgICAgZWxzZSBpZihzaCtrID4gdGhpcy5EQikge1xuICAgICAgICAgIHRoaXNbdGhpcy50LTFdIHw9ICh4JigoMTw8KHRoaXMuREItc2gpKS0xKSk8PHNoO1xuICAgICAgICAgIHRoaXNbdGhpcy50KytdID0gKHg+Pih0aGlzLkRCLXNoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXNbdGhpcy50LTFdIHw9IHg8PHNoO1xuICAgICAgICBzaCArPSBrO1xuICAgICAgICBpZihzaCA+PSB0aGlzLkRCKSBzaCAtPSB0aGlzLkRCO1xuICAgICAgfVxuICAgICAgaWYoayA9PSA4ICYmIChzWzBdJjB4ODApICE9IDApIHtcbiAgICAgICAgdGhpcy5zID0gLTE7XG4gICAgICAgIGlmKHNoID4gMCkgdGhpc1t0aGlzLnQtMV0gfD0gKCgxPDwodGhpcy5EQi1zaCkpLTEpPDxzaDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xhbXAoKTtcbiAgICAgIGlmKG1pKSBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcyx0aGlzKTtcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSBjbGFtcCBvZmYgZXhjZXNzIGhpZ2ggd29yZHNcbiAgICBmdW5jdGlvbiBibnBDbGFtcCgpIHtcbiAgICAgIHZhciBjID0gdGhpcy5zJnRoaXMuRE07XG4gICAgICB3aGlsZSh0aGlzLnQgPiAwICYmIHRoaXNbdGhpcy50LTFdID09IGMpIC0tdGhpcy50O1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIHJldHVybiBzdHJpbmcgcmVwcmVzZW50YXRpb24gaW4gZ2l2ZW4gcmFkaXhcbiAgICBmdW5jdGlvbiBiblRvU3RyaW5nKGIpIHtcbiAgICAgIGlmKHRoaXMucyA8IDApIHJldHVybiBcIi1cIit0aGlzLm5lZ2F0ZSgpLnRvU3RyaW5nKGIpO1xuICAgICAgdmFyIGs7XG4gICAgICBpZihiID09IDE2KSBrID0gNDtcbiAgICAgIGVsc2UgaWYoYiA9PSA4KSBrID0gMztcbiAgICAgIGVsc2UgaWYoYiA9PSAyKSBrID0gMTtcbiAgICAgIGVsc2UgaWYoYiA9PSAzMikgayA9IDU7XG4gICAgICBlbHNlIGlmKGIgPT0gNCkgayA9IDI7XG4gICAgICBlbHNlIHJldHVybiB0aGlzLnRvUmFkaXgoYik7XG4gICAgICB2YXIga20gPSAoMTw8ayktMSwgZCwgbSA9IGZhbHNlLCByID0gXCJcIiwgaSA9IHRoaXMudDtcbiAgICAgIHZhciBwID0gdGhpcy5EQi0oaSp0aGlzLkRCKSVrO1xuICAgICAgaWYoaS0tID4gMCkge1xuICAgICAgICBpZihwIDwgdGhpcy5EQiAmJiAoZCA9IHRoaXNbaV0+PnApID4gMCkgeyBtID0gdHJ1ZTsgciA9IGludDJjaGFyKGQpOyB9XG4gICAgICAgIHdoaWxlKGkgPj0gMCkge1xuICAgICAgICAgIGlmKHAgPCBrKSB7XG4gICAgICAgICAgICBkID0gKHRoaXNbaV0mKCgxPDxwKS0xKSk8PChrLXApO1xuICAgICAgICAgICAgZCB8PSB0aGlzWy0taV0+PihwKz10aGlzLkRCLWspO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGQgPSAodGhpc1tpXT4+KHAtPWspKSZrbTtcbiAgICAgICAgICAgIGlmKHAgPD0gMCkgeyBwICs9IHRoaXMuREI7IC0taTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihkID4gMCkgbSA9IHRydWU7XG4gICAgICAgICAgaWYobSkgciArPSBpbnQyY2hhcihkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG0/cjpcIjBcIjtcbiAgICB9XG5cbiAgICAvLyAocHVibGljKSAtdGhpc1xuICAgIGZ1bmN0aW9uIGJuTmVnYXRlKCkgeyB2YXIgciA9IG5iaSgpOyBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcyxyKTsgcmV0dXJuIHI7IH1cblxuICAgIC8vIChwdWJsaWMpIHx0aGlzfFxuICAgIGZ1bmN0aW9uIGJuQWJzKCkgeyByZXR1cm4gKHRoaXMuczwwKT90aGlzLm5lZ2F0ZSgpOnRoaXM7IH1cblxuICAgIC8vIChwdWJsaWMpIHJldHVybiArIGlmIHRoaXMgPiBhLCAtIGlmIHRoaXMgPCBhLCAwIGlmIGVxdWFsXG4gICAgZnVuY3Rpb24gYm5Db21wYXJlVG8oYSkge1xuICAgICAgdmFyIHIgPSB0aGlzLnMtYS5zO1xuICAgICAgaWYociAhPSAwKSByZXR1cm4gcjtcbiAgICAgIHZhciBpID0gdGhpcy50O1xuICAgICAgciA9IGktYS50O1xuICAgICAgaWYociAhPSAwKSByZXR1cm4gKHRoaXMuczwwKT8tcjpyO1xuICAgICAgd2hpbGUoLS1pID49IDApIGlmKChyPXRoaXNbaV0tYVtpXSkgIT0gMCkgcmV0dXJuIHI7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGJpdCBsZW5ndGggb2YgdGhlIGludGVnZXIgeFxuICAgIGZ1bmN0aW9uIG5iaXRzKHgpIHtcbiAgICAgIHZhciByID0gMSwgdDtcbiAgICAgIGlmKCh0PXg+Pj4xNikgIT0gMCkgeyB4ID0gdDsgciArPSAxNjsgfVxuICAgICAgaWYoKHQ9eD4+OCkgIT0gMCkgeyB4ID0gdDsgciArPSA4OyB9XG4gICAgICBpZigodD14Pj40KSAhPSAwKSB7IHggPSB0OyByICs9IDQ7IH1cbiAgICAgIGlmKCh0PXg+PjIpICE9IDApIHsgeCA9IHQ7IHIgKz0gMjsgfVxuICAgICAgaWYoKHQ9eD4+MSkgIT0gMCkgeyB4ID0gdDsgciArPSAxOyB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvLyAocHVibGljKSByZXR1cm4gdGhlIG51bWJlciBvZiBiaXRzIGluIFwidGhpc1wiXG4gICAgZnVuY3Rpb24gYm5CaXRMZW5ndGgoKSB7XG4gICAgICBpZih0aGlzLnQgPD0gMCkgcmV0dXJuIDA7XG4gICAgICByZXR1cm4gdGhpcy5EQioodGhpcy50LTEpK25iaXRzKHRoaXNbdGhpcy50LTFdXih0aGlzLnMmdGhpcy5ETSkpO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG4qREJcbiAgICBmdW5jdGlvbiBibnBETFNoaWZ0VG8obixyKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGZvcihpID0gdGhpcy50LTE7IGkgPj0gMDsgLS1pKSByW2krbl0gPSB0aGlzW2ldO1xuICAgICAgZm9yKGkgPSBuLTE7IGkgPj0gMDsgLS1pKSByW2ldID0gMDtcbiAgICAgIHIudCA9IHRoaXMudCtuO1xuICAgICAgci5zID0gdGhpcy5zO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzID4+IG4qREJcbiAgICBmdW5jdGlvbiBibnBEUlNoaWZ0VG8obixyKSB7XG4gICAgICBmb3IodmFyIGkgPSBuOyBpIDwgdGhpcy50OyArK2kpIHJbaS1uXSA9IHRoaXNbaV07XG4gICAgICByLnQgPSBNYXRoLm1heCh0aGlzLnQtbiwwKTtcbiAgICAgIHIucyA9IHRoaXMucztcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA8PCBuXG4gICAgZnVuY3Rpb24gYm5wTFNoaWZ0VG8obixyKSB7XG4gICAgICB2YXIgYnMgPSBuJXRoaXMuREI7XG4gICAgICB2YXIgY2JzID0gdGhpcy5EQi1icztcbiAgICAgIHZhciBibSA9ICgxPDxjYnMpLTE7XG4gICAgICB2YXIgZHMgPSBNYXRoLmZsb29yKG4vdGhpcy5EQiksIGMgPSAodGhpcy5zPDxicykmdGhpcy5ETSwgaTtcbiAgICAgIGZvcihpID0gdGhpcy50LTE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHJbaStkcysxXSA9ICh0aGlzW2ldPj5jYnMpfGM7XG4gICAgICAgIGMgPSAodGhpc1tpXSZibSk8PGJzO1xuICAgICAgfVxuICAgICAgZm9yKGkgPSBkcy0xOyBpID49IDA7IC0taSkgcltpXSA9IDA7XG4gICAgICByW2RzXSA9IGM7XG4gICAgICByLnQgPSB0aGlzLnQrZHMrMTtcbiAgICAgIHIucyA9IHRoaXMucztcbiAgICAgIHIuY2xhbXAoKTtcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA+PiBuXG4gICAgZnVuY3Rpb24gYm5wUlNoaWZ0VG8obixyKSB7XG4gICAgICByLnMgPSB0aGlzLnM7XG4gICAgICB2YXIgZHMgPSBNYXRoLmZsb29yKG4vdGhpcy5EQik7XG4gICAgICBpZihkcyA+PSB0aGlzLnQpIHsgci50ID0gMDsgcmV0dXJuOyB9XG4gICAgICB2YXIgYnMgPSBuJXRoaXMuREI7XG4gICAgICB2YXIgY2JzID0gdGhpcy5EQi1icztcbiAgICAgIHZhciBibSA9ICgxPDxicyktMTtcbiAgICAgIHJbMF0gPSB0aGlzW2RzXT4+YnM7XG4gICAgICBmb3IodmFyIGkgPSBkcysxOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgICAgcltpLWRzLTFdIHw9ICh0aGlzW2ldJmJtKTw8Y2JzO1xuICAgICAgICByW2ktZHNdID0gdGhpc1tpXT4+YnM7XG4gICAgICB9XG4gICAgICBpZihicyA+IDApIHJbdGhpcy50LWRzLTFdIHw9ICh0aGlzLnMmYm0pPDxjYnM7XG4gICAgICByLnQgPSB0aGlzLnQtZHM7XG4gICAgICByLmNsYW1wKCk7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgLSBhXG4gICAgZnVuY3Rpb24gYm5wU3ViVG8oYSxyKSB7XG4gICAgICB2YXIgaSA9IDAsIGMgPSAwLCBtID0gTWF0aC5taW4oYS50LHRoaXMudCk7XG4gICAgICB3aGlsZShpIDwgbSkge1xuICAgICAgICBjICs9IHRoaXNbaV0tYVtpXTtcbiAgICAgICAgcltpKytdID0gYyZ0aGlzLkRNO1xuICAgICAgICBjID4+PSB0aGlzLkRCO1xuICAgICAgfVxuICAgICAgaWYoYS50IDwgdGhpcy50KSB7XG4gICAgICAgIGMgLT0gYS5zO1xuICAgICAgICB3aGlsZShpIDwgdGhpcy50KSB7XG4gICAgICAgICAgYyArPSB0aGlzW2ldO1xuICAgICAgICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICAgICAgICBjID4+PSB0aGlzLkRCO1xuICAgICAgICB9XG4gICAgICAgIGMgKz0gdGhpcy5zO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGMgKz0gdGhpcy5zO1xuICAgICAgICB3aGlsZShpIDwgYS50KSB7XG4gICAgICAgICAgYyAtPSBhW2ldO1xuICAgICAgICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICAgICAgICBjID4+PSB0aGlzLkRCO1xuICAgICAgICB9XG4gICAgICAgIGMgLT0gYS5zO1xuICAgICAgfVxuICAgICAgci5zID0gKGM8MCk/LTE6MDtcbiAgICAgIGlmKGMgPCAtMSkgcltpKytdID0gdGhpcy5EVitjO1xuICAgICAgZWxzZSBpZihjID4gMCkgcltpKytdID0gYztcbiAgICAgIHIudCA9IGk7XG4gICAgICByLmNsYW1wKCk7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgKiBhLCByICE9IHRoaXMsYSAoSEFDIDE0LjEyKVxuICAgIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cbiAgICBmdW5jdGlvbiBibnBNdWx0aXBseVRvKGEscikge1xuICAgICAgdmFyIHggPSB0aGlzLmFicygpLCB5ID0gYS5hYnMoKTtcbiAgICAgIHZhciBpID0geC50O1xuICAgICAgci50ID0gaSt5LnQ7XG4gICAgICB3aGlsZSgtLWkgPj0gMCkgcltpXSA9IDA7XG4gICAgICBmb3IoaSA9IDA7IGkgPCB5LnQ7ICsraSkgcltpK3gudF0gPSB4LmFtKDAseVtpXSxyLGksMCx4LnQpO1xuICAgICAgci5zID0gMDtcbiAgICAgIHIuY2xhbXAoKTtcbiAgICAgIGlmKHRoaXMucyAhPSBhLnMpIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyhyLHIpO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzXjIsIHIgIT0gdGhpcyAoSEFDIDE0LjE2KVxuICAgIGZ1bmN0aW9uIGJucFNxdWFyZVRvKHIpIHtcbiAgICAgIHZhciB4ID0gdGhpcy5hYnMoKTtcbiAgICAgIHZhciBpID0gci50ID0gMip4LnQ7XG4gICAgICB3aGlsZSgtLWkgPj0gMCkgcltpXSA9IDA7XG4gICAgICBmb3IoaSA9IDA7IGkgPCB4LnQtMTsgKytpKSB7XG4gICAgICAgIHZhciBjID0geC5hbShpLHhbaV0sciwyKmksMCwxKTtcbiAgICAgICAgaWYoKHJbaSt4LnRdKz14LmFtKGkrMSwyKnhbaV0sciwyKmkrMSxjLHgudC1pLTEpKSA+PSB4LkRWKSB7XG4gICAgICAgICAgcltpK3gudF0gLT0geC5EVjtcbiAgICAgICAgICByW2kreC50KzFdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoci50ID4gMCkgcltyLnQtMV0gKz0geC5hbShpLHhbaV0sciwyKmksMCwxKTtcbiAgICAgIHIucyA9IDA7XG4gICAgICByLmNsYW1wKCk7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgZGl2aWRlIHRoaXMgYnkgbSwgcXVvdGllbnQgYW5kIHJlbWFpbmRlciB0byBxLCByIChIQUMgMTQuMjApXG4gICAgLy8gciAhPSBxLCB0aGlzICE9IG0uICBxIG9yIHIgbWF5IGJlIG51bGwuXG4gICAgZnVuY3Rpb24gYm5wRGl2UmVtVG8obSxxLHIpIHtcbiAgICAgIHZhciBwbSA9IG0uYWJzKCk7XG4gICAgICBpZihwbS50IDw9IDApIHJldHVybjtcbiAgICAgIHZhciBwdCA9IHRoaXMuYWJzKCk7XG4gICAgICBpZihwdC50IDwgcG0udCkge1xuICAgICAgICBpZihxICE9IG51bGwpIHEuZnJvbUludCgwKTtcbiAgICAgICAgaWYociAhPSBudWxsKSB0aGlzLmNvcHlUbyhyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYociA9PSBudWxsKSByID0gbmJpKCk7XG4gICAgICB2YXIgeSA9IG5iaSgpLCB0cyA9IHRoaXMucywgbXMgPSBtLnM7XG4gICAgICB2YXIgbnNoID0gdGhpcy5EQi1uYml0cyhwbVtwbS50LTFdKTsgICAvLyBub3JtYWxpemUgbW9kdWx1c1xuICAgICAgaWYobnNoID4gMCkgeyBwbS5sU2hpZnRUbyhuc2gseSk7IHB0LmxTaGlmdFRvKG5zaCxyKTsgfVxuICAgICAgZWxzZSB7IHBtLmNvcHlUbyh5KTsgcHQuY29weVRvKHIpOyB9XG4gICAgICB2YXIgeXMgPSB5LnQ7XG4gICAgICB2YXIgeTAgPSB5W3lzLTFdO1xuICAgICAgaWYoeTAgPT0gMCkgcmV0dXJuO1xuICAgICAgdmFyIHl0ID0geTAqKDE8PHRoaXMuRjEpKygoeXM+MSk/eVt5cy0yXT4+dGhpcy5GMjowKTtcbiAgICAgIHZhciBkMSA9IHRoaXMuRlYveXQsIGQyID0gKDE8PHRoaXMuRjEpL3l0LCBlID0gMTw8dGhpcy5GMjtcbiAgICAgIHZhciBpID0gci50LCBqID0gaS15cywgdCA9IChxPT1udWxsKT9uYmkoKTpxO1xuICAgICAgeS5kbFNoaWZ0VG8oaix0KTtcbiAgICAgIGlmKHIuY29tcGFyZVRvKHQpID49IDApIHtcbiAgICAgICAgcltyLnQrK10gPSAxO1xuICAgICAgICByLnN1YlRvKHQscik7XG4gICAgICB9XG4gICAgICBCaWdJbnRlZ2VyLk9ORS5kbFNoaWZ0VG8oeXMsdCk7XG4gICAgICB0LnN1YlRvKHkseSk7ICAvLyBcIm5lZ2F0aXZlXCIgeSBzbyB3ZSBjYW4gcmVwbGFjZSBzdWIgd2l0aCBhbSBsYXRlclxuICAgICAgd2hpbGUoeS50IDwgeXMpIHlbeS50KytdID0gMDtcbiAgICAgIHdoaWxlKC0taiA+PSAwKSB7XG4gICAgICAgIC8vIEVzdGltYXRlIHF1b3RpZW50IGRpZ2l0XG4gICAgICAgIHZhciBxZCA9IChyWy0taV09PXkwKT90aGlzLkRNOk1hdGguZmxvb3IocltpXSpkMSsocltpLTFdK2UpKmQyKTtcbiAgICAgICAgaWYoKHJbaV0rPXkuYW0oMCxxZCxyLGosMCx5cykpIDwgcWQpIHsgICAvLyBUcnkgaXQgb3V0XG4gICAgICAgICAgeS5kbFNoaWZ0VG8oaix0KTtcbiAgICAgICAgICByLnN1YlRvKHQscik7XG4gICAgICAgICAgd2hpbGUocltpXSA8IC0tcWQpIHIuc3ViVG8odCxyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYocSAhPSBudWxsKSB7XG4gICAgICAgIHIuZHJTaGlmdFRvKHlzLHEpO1xuICAgICAgICBpZih0cyAhPSBtcykgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHEscSk7XG4gICAgICB9XG4gICAgICByLnQgPSB5cztcbiAgICAgIHIuY2xhbXAoKTtcbiAgICAgIGlmKG5zaCA+IDApIHIuclNoaWZ0VG8obnNoLHIpOyAvLyBEZW5vcm1hbGl6ZSByZW1haW5kZXJcbiAgICAgIGlmKHRzIDwgMCkgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHIscik7XG4gICAgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyBtb2QgYVxuICAgIGZ1bmN0aW9uIGJuTW9kKGEpIHtcbiAgICAgIHZhciByID0gbmJpKCk7XG4gICAgICB0aGlzLmFicygpLmRpdlJlbVRvKGEsbnVsbCxyKTtcbiAgICAgIGlmKHRoaXMucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIGEuc3ViVG8ocixyKTtcbiAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIE1vZHVsYXIgcmVkdWN0aW9uIHVzaW5nIFwiY2xhc3NpY1wiIGFsZ29yaXRobVxuICAgIGZ1bmN0aW9uIENsYXNzaWMobSkgeyB0aGlzLm0gPSBtOyB9XG4gICAgZnVuY3Rpb24gY0NvbnZlcnQoeCkge1xuICAgICAgaWYoeC5zIDwgMCB8fCB4LmNvbXBhcmVUbyh0aGlzLm0pID49IDApIHJldHVybiB4Lm1vZCh0aGlzLm0pO1xuICAgICAgZWxzZSByZXR1cm4geDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY1JldmVydCh4KSB7IHJldHVybiB4OyB9XG4gICAgZnVuY3Rpb24gY1JlZHVjZSh4KSB7IHguZGl2UmVtVG8odGhpcy5tLG51bGwseCk7IH1cbiAgICBmdW5jdGlvbiBjTXVsVG8oeCx5LHIpIHsgeC5tdWx0aXBseVRvKHkscik7IHRoaXMucmVkdWNlKHIpOyB9XG4gICAgZnVuY3Rpb24gY1NxclRvKHgscikgeyB4LnNxdWFyZVRvKHIpOyB0aGlzLnJlZHVjZShyKTsgfVxuXG4gICAgQ2xhc3NpYy5wcm90b3R5cGUuY29udmVydCA9IGNDb252ZXJ0O1xuICAgIENsYXNzaWMucHJvdG90eXBlLnJldmVydCA9IGNSZXZlcnQ7XG4gICAgQ2xhc3NpYy5wcm90b3R5cGUucmVkdWNlID0gY1JlZHVjZTtcbiAgICBDbGFzc2ljLnByb3RvdHlwZS5tdWxUbyA9IGNNdWxUbztcbiAgICBDbGFzc2ljLnByb3RvdHlwZS5zcXJUbyA9IGNTcXJUbztcblxuICAgIC8vIChwcm90ZWN0ZWQpIHJldHVybiBcIi0xL3RoaXMgJSAyXkRCXCI7IHVzZWZ1bCBmb3IgTW9udC4gcmVkdWN0aW9uXG4gICAgLy8ganVzdGlmaWNhdGlvbjpcbiAgICAvLyAgICAgICAgIHh5ID09IDEgKG1vZCBtKVxuICAgIC8vICAgICAgICAgeHkgPSAgMStrbVxuICAgIC8vICAgeHkoMi14eSkgPSAoMStrbSkoMS1rbSlcbiAgICAvLyB4W3koMi14eSldID0gMS1rXjJtXjJcbiAgICAvLyB4W3koMi14eSldID09IDEgKG1vZCBtXjIpXG4gICAgLy8gaWYgeSBpcyAxL3ggbW9kIG0sIHRoZW4geSgyLXh5KSBpcyAxL3ggbW9kIG1eMlxuICAgIC8vIHNob3VsZCByZWR1Y2UgeCBhbmQgeSgyLXh5KSBieSBtXjIgYXQgZWFjaCBzdGVwIHRvIGtlZXAgc2l6ZSBib3VuZGVkLlxuICAgIC8vIEpTIG11bHRpcGx5IFwib3ZlcmZsb3dzXCIgZGlmZmVyZW50bHkgZnJvbSBDL0MrKywgc28gY2FyZSBpcyBuZWVkZWQgaGVyZS5cbiAgICBmdW5jdGlvbiBibnBJbnZEaWdpdCgpIHtcbiAgICAgIGlmKHRoaXMudCA8IDEpIHJldHVybiAwO1xuICAgICAgdmFyIHggPSB0aGlzWzBdO1xuICAgICAgaWYoKHgmMSkgPT0gMCkgcmV0dXJuIDA7XG4gICAgICB2YXIgeSA9IHgmMzsgICAgICAgLy8geSA9PSAxL3ggbW9kIDJeMlxuICAgICAgeSA9ICh5KigyLSh4JjB4ZikqeSkpJjB4ZjsgLy8geSA9PSAxL3ggbW9kIDJeNFxuICAgICAgeSA9ICh5KigyLSh4JjB4ZmYpKnkpKSYweGZmOyAgIC8vIHkgPT0gMS94IG1vZCAyXjhcbiAgICAgIHkgPSAoeSooMi0oKCh4JjB4ZmZmZikqeSkmMHhmZmZmKSkpJjB4ZmZmZjsgICAgLy8geSA9PSAxL3ggbW9kIDJeMTZcbiAgICAgIC8vIGxhc3Qgc3RlcCAtIGNhbGN1bGF0ZSBpbnZlcnNlIG1vZCBEViBkaXJlY3RseTtcbiAgICAgIC8vIGFzc3VtZXMgMTYgPCBEQiA8PSAzMiBhbmQgYXNzdW1lcyBhYmlsaXR5IHRvIGhhbmRsZSA0OC1iaXQgaW50c1xuICAgICAgeSA9ICh5KigyLXgqeSV0aGlzLkRWKSkldGhpcy5EVjsgICAgICAgLy8geSA9PSAxL3ggbW9kIDJeZGJpdHNcbiAgICAgIC8vIHdlIHJlYWxseSB3YW50IHRoZSBuZWdhdGl2ZSBpbnZlcnNlLCBhbmQgLURWIDwgeSA8IERWXG4gICAgICByZXR1cm4gKHk+MCk/dGhpcy5EVi15Oi15O1xuICAgIH1cblxuICAgIC8vIE1vbnRnb21lcnkgcmVkdWN0aW9uXG4gICAgZnVuY3Rpb24gTW9udGdvbWVyeShtKSB7XG4gICAgICB0aGlzLm0gPSBtO1xuICAgICAgdGhpcy5tcCA9IG0uaW52RGlnaXQoKTtcbiAgICAgIHRoaXMubXBsID0gdGhpcy5tcCYweDdmZmY7XG4gICAgICB0aGlzLm1waCA9IHRoaXMubXA+PjE1O1xuICAgICAgdGhpcy51bSA9ICgxPDwobS5EQi0xNSkpLTE7XG4gICAgICB0aGlzLm10MiA9IDIqbS50O1xuICAgIH1cblxuICAgIC8vIHhSIG1vZCBtXG4gICAgZnVuY3Rpb24gbW9udENvbnZlcnQoeCkge1xuICAgICAgdmFyIHIgPSBuYmkoKTtcbiAgICAgIHguYWJzKCkuZGxTaGlmdFRvKHRoaXMubS50LHIpO1xuICAgICAgci5kaXZSZW1Ubyh0aGlzLm0sbnVsbCxyKTtcbiAgICAgIGlmKHgucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIHRoaXMubS5zdWJUbyhyLHIpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLy8geC9SIG1vZCBtXG4gICAgZnVuY3Rpb24gbW9udFJldmVydCh4KSB7XG4gICAgICB2YXIgciA9IG5iaSgpO1xuICAgICAgeC5jb3B5VG8ocik7XG4gICAgICB0aGlzLnJlZHVjZShyKTtcbiAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIHggPSB4L1IgbW9kIG0gKEhBQyAxNC4zMilcbiAgICBmdW5jdGlvbiBtb250UmVkdWNlKHgpIHtcbiAgICAgIHdoaWxlKHgudCA8PSB0aGlzLm10MikgLy8gcGFkIHggc28gYW0gaGFzIGVub3VnaCByb29tIGxhdGVyXG4gICAgICAgIHhbeC50KytdID0gMDtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm0udDsgKytpKSB7XG4gICAgICAgIC8vIGZhc3RlciB3YXkgb2YgY2FsY3VsYXRpbmcgdTAgPSB4W2ldKm1wIG1vZCBEVlxuICAgICAgICB2YXIgaiA9IHhbaV0mMHg3ZmZmO1xuICAgICAgICB2YXIgdTAgPSAoaip0aGlzLm1wbCsoKChqKnRoaXMubXBoKyh4W2ldPj4xNSkqdGhpcy5tcGwpJnRoaXMudW0pPDwxNSkpJnguRE07XG4gICAgICAgIC8vIHVzZSBhbSB0byBjb21iaW5lIHRoZSBtdWx0aXBseS1zaGlmdC1hZGQgaW50byBvbmUgY2FsbFxuICAgICAgICBqID0gaSt0aGlzLm0udDtcbiAgICAgICAgeFtqXSArPSB0aGlzLm0uYW0oMCx1MCx4LGksMCx0aGlzLm0udCk7XG4gICAgICAgIC8vIHByb3BhZ2F0ZSBjYXJyeVxuICAgICAgICB3aGlsZSh4W2pdID49IHguRFYpIHsgeFtqXSAtPSB4LkRWOyB4Wysral0rKzsgfVxuICAgICAgfVxuICAgICAgeC5jbGFtcCgpO1xuICAgICAgeC5kclNoaWZ0VG8odGhpcy5tLnQseCk7XG4gICAgICBpZih4LmNvbXBhcmVUbyh0aGlzLm0pID49IDApIHguc3ViVG8odGhpcy5tLHgpO1xuICAgIH1cblxuICAgIC8vIHIgPSBcInheMi9SIG1vZCBtXCI7IHggIT0gclxuICAgIGZ1bmN0aW9uIG1vbnRTcXJUbyh4LHIpIHsgeC5zcXVhcmVUbyhyKTsgdGhpcy5yZWR1Y2Uocik7IH1cblxuICAgIC8vIHIgPSBcInh5L1IgbW9kIG1cIjsgeCx5ICE9IHJcbiAgICBmdW5jdGlvbiBtb250TXVsVG8oeCx5LHIpIHsgeC5tdWx0aXBseVRvKHkscik7IHRoaXMucmVkdWNlKHIpOyB9XG5cbiAgICBNb250Z29tZXJ5LnByb3RvdHlwZS5jb252ZXJ0ID0gbW9udENvbnZlcnQ7XG4gICAgTW9udGdvbWVyeS5wcm90b3R5cGUucmV2ZXJ0ID0gbW9udFJldmVydDtcbiAgICBNb250Z29tZXJ5LnByb3RvdHlwZS5yZWR1Y2UgPSBtb250UmVkdWNlO1xuICAgIE1vbnRnb21lcnkucHJvdG90eXBlLm11bFRvID0gbW9udE11bFRvO1xuICAgIE1vbnRnb21lcnkucHJvdG90eXBlLnNxclRvID0gbW9udFNxclRvO1xuXG4gICAgLy8gKHByb3RlY3RlZCkgdHJ1ZSBpZmYgdGhpcyBpcyBldmVuXG4gICAgZnVuY3Rpb24gYm5wSXNFdmVuKCkgeyByZXR1cm4gKCh0aGlzLnQ+MCk/KHRoaXNbMF0mMSk6dGhpcy5zKSA9PSAwOyB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSB0aGlzXmUsIGUgPCAyXjMyLCBkb2luZyBzcXIgYW5kIG11bCB3aXRoIFwiclwiIChIQUMgMTQuNzkpXG4gICAgZnVuY3Rpb24gYm5wRXhwKGUseikge1xuICAgICAgaWYoZSA+IDB4ZmZmZmZmZmYgfHwgZSA8IDEpIHJldHVybiBCaWdJbnRlZ2VyLk9ORTtcbiAgICAgIHZhciByID0gbmJpKCksIHIyID0gbmJpKCksIGcgPSB6LmNvbnZlcnQodGhpcyksIGkgPSBuYml0cyhlKS0xO1xuICAgICAgZy5jb3B5VG8ocik7XG4gICAgICB3aGlsZSgtLWkgPj0gMCkge1xuICAgICAgICB6LnNxclRvKHIscjIpO1xuICAgICAgICBpZigoZSYoMTw8aSkpID4gMCkgei5tdWxUbyhyMixnLHIpO1xuICAgICAgICBlbHNlIHsgdmFyIHQgPSByOyByID0gcjI7IHIyID0gdDsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHoucmV2ZXJ0KHIpO1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIHRoaXNeZSAlIG0sIDAgPD0gZSA8IDJeMzJcbiAgICBmdW5jdGlvbiBibk1vZFBvd0ludChlLG0pIHtcbiAgICAgIHZhciB6O1xuICAgICAgaWYoZSA8IDI1NiB8fCBtLmlzRXZlbigpKSB6ID0gbmV3IENsYXNzaWMobSk7IGVsc2UgeiA9IG5ldyBNb250Z29tZXJ5KG0pO1xuICAgICAgcmV0dXJuIHRoaXMuZXhwKGUseik7XG4gICAgfVxuXG4gICAgLy8gcHJvdGVjdGVkXG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuY29weVRvID0gYm5wQ29weVRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21JbnQgPSBibnBGcm9tSW50O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21TdHJpbmcgPSBibnBGcm9tU3RyaW5nO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsYW1wID0gYm5wQ2xhbXA7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZGxTaGlmdFRvID0gYm5wRExTaGlmdFRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmRyU2hpZnRUbyA9IGJucERSU2hpZnRUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5sU2hpZnRUbyA9IGJucExTaGlmdFRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnJTaGlmdFRvID0gYm5wUlNoaWZ0VG87XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc3ViVG8gPSBibnBTdWJUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseVRvID0gYm5wTXVsdGlwbHlUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmVUbyA9IGJucFNxdWFyZVRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdlJlbVRvID0gYm5wRGl2UmVtVG87XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuaW52RGlnaXQgPSBibnBJbnZEaWdpdDtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc0V2ZW4gPSBibnBJc0V2ZW47XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZXhwID0gYm5wRXhwO1xuXG4gICAgLy8gcHVibGljXG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUudG9TdHJpbmcgPSBiblRvU3RyaW5nO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm5lZ2F0ZSA9IGJuTmVnYXRlO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmFicyA9IGJuQWJzO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmVUbyA9IGJuQ29tcGFyZVRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aCA9IGJuQml0TGVuZ3RoO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZCA9IGJuTW9kO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvd0ludCA9IGJuTW9kUG93SW50O1xuXG4gICAgLy8gXCJjb25zdGFudHNcIlxuICAgIEJpZ0ludGVnZXIuWkVSTyA9IG5idigwKTtcbiAgICBCaWdJbnRlZ2VyLk9ORSA9IG5idigxKTtcblxuICAgIC8vIENvcHlyaWdodCAoYykgMjAwNS0yMDA5ICBUb20gV3VcbiAgICAvLyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgIC8vIFNlZSBcIkxJQ0VOU0VcIiBmb3IgZGV0YWlscy5cblxuICAgIC8vIEV4dGVuZGVkIEphdmFTY3JpcHQgQk4gZnVuY3Rpb25zLCByZXF1aXJlZCBmb3IgUlNBIHByaXZhdGUgb3BzLlxuXG4gICAgLy8gVmVyc2lvbiAxLjE6IG5ldyBCaWdJbnRlZ2VyKFwiMFwiLCAxMCkgcmV0dXJucyBcInByb3BlclwiIHplcm9cbiAgICAvLyBWZXJzaW9uIDEuMjogc3F1YXJlKCkgQVBJLCBpc1Byb2JhYmxlUHJpbWUgZml4XG5cbiAgICAvLyAocHVibGljKVxuICAgIGZ1bmN0aW9uIGJuQ2xvbmUoKSB7IHZhciByID0gbmJpKCk7IHRoaXMuY29weVRvKHIpOyByZXR1cm4gcjsgfVxuXG4gICAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIGludGVnZXJcbiAgICBmdW5jdGlvbiBibkludFZhbHVlKCkge1xuICAgICAgaWYodGhpcy5zIDwgMCkge1xuICAgICAgICBpZih0aGlzLnQgPT0gMSkgcmV0dXJuIHRoaXNbMF0tdGhpcy5EVjtcbiAgICAgICAgZWxzZSBpZih0aGlzLnQgPT0gMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih0aGlzLnQgPT0gMSkgcmV0dXJuIHRoaXNbMF07XG4gICAgICBlbHNlIGlmKHRoaXMudCA9PSAwKSByZXR1cm4gMDtcbiAgICAgIC8vIGFzc3VtZXMgMTYgPCBEQiA8IDMyXG4gICAgICByZXR1cm4gKCh0aGlzWzFdJigoMTw8KDMyLXRoaXMuREIpKS0xKSk8PHRoaXMuREIpfHRoaXNbMF07XG4gICAgfVxuXG4gICAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIGJ5dGVcbiAgICBmdW5jdGlvbiBibkJ5dGVWYWx1ZSgpIHsgcmV0dXJuICh0aGlzLnQ9PTApP3RoaXMuczoodGhpc1swXTw8MjQpPj4yNDsgfVxuXG4gICAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIHNob3J0IChhc3N1bWVzIERCPj0xNilcbiAgICBmdW5jdGlvbiBiblNob3J0VmFsdWUoKSB7IHJldHVybiAodGhpcy50PT0wKT90aGlzLnM6KHRoaXNbMF08PDE2KT4+MTY7IH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHJldHVybiB4IHMudC4gcl54IDwgRFZcbiAgICBmdW5jdGlvbiBibnBDaHVua1NpemUocikgeyByZXR1cm4gTWF0aC5mbG9vcihNYXRoLkxOMip0aGlzLkRCL01hdGgubG9nKHIpKTsgfVxuXG4gICAgLy8gKHB1YmxpYykgMCBpZiB0aGlzID09IDAsIDEgaWYgdGhpcyA+IDBcbiAgICBmdW5jdGlvbiBiblNpZ051bSgpIHtcbiAgICAgIGlmKHRoaXMucyA8IDApIHJldHVybiAtMTtcbiAgICAgIGVsc2UgaWYodGhpcy50IDw9IDAgfHwgKHRoaXMudCA9PSAxICYmIHRoaXNbMF0gPD0gMCkpIHJldHVybiAwO1xuICAgICAgZWxzZSByZXR1cm4gMTtcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSBjb252ZXJ0IHRvIHJhZGl4IHN0cmluZ1xuICAgIGZ1bmN0aW9uIGJucFRvUmFkaXgoYikge1xuICAgICAgaWYoYiA9PSBudWxsKSBiID0gMTA7XG4gICAgICBpZih0aGlzLnNpZ251bSgpID09IDAgfHwgYiA8IDIgfHwgYiA+IDM2KSByZXR1cm4gXCIwXCI7XG4gICAgICB2YXIgY3MgPSB0aGlzLmNodW5rU2l6ZShiKTtcbiAgICAgIHZhciBhID0gTWF0aC5wb3coYixjcyk7XG4gICAgICB2YXIgZCA9IG5idihhKSwgeSA9IG5iaSgpLCB6ID0gbmJpKCksIHIgPSBcIlwiO1xuICAgICAgdGhpcy5kaXZSZW1UbyhkLHkseik7XG4gICAgICB3aGlsZSh5LnNpZ251bSgpID4gMCkge1xuICAgICAgICByID0gKGErei5pbnRWYWx1ZSgpKS50b1N0cmluZyhiKS5zdWJzdHIoMSkgKyByO1xuICAgICAgICB5LmRpdlJlbVRvKGQseSx6KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB6LmludFZhbHVlKCkudG9TdHJpbmcoYikgKyByO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIGNvbnZlcnQgZnJvbSByYWRpeCBzdHJpbmdcbiAgICBmdW5jdGlvbiBibnBGcm9tUmFkaXgocyxiKSB7XG4gICAgICB0aGlzLmZyb21JbnQoMCk7XG4gICAgICBpZihiID09IG51bGwpIGIgPSAxMDtcbiAgICAgIHZhciBjcyA9IHRoaXMuY2h1bmtTaXplKGIpO1xuICAgICAgdmFyIGQgPSBNYXRoLnBvdyhiLGNzKSwgbWkgPSBmYWxzZSwgaiA9IDAsIHcgPSAwO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHggPSBpbnRBdChzLGkpO1xuICAgICAgICBpZih4IDwgMCkge1xuICAgICAgICAgIGlmKHMuY2hhckF0KGkpID09IFwiLVwiICYmIHRoaXMuc2lnbnVtKCkgPT0gMCkgbWkgPSB0cnVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHcgPSBiKncreDtcbiAgICAgICAgaWYoKytqID49IGNzKSB7XG4gICAgICAgICAgdGhpcy5kTXVsdGlwbHkoZCk7XG4gICAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KHcsMCk7XG4gICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgdyA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGogPiAwKSB7XG4gICAgICAgIHRoaXMuZE11bHRpcGx5KE1hdGgucG93KGIsaikpO1xuICAgICAgICB0aGlzLmRBZGRPZmZzZXQodywwKTtcbiAgICAgIH1cbiAgICAgIGlmKG1pKSBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcyx0aGlzKTtcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSBhbHRlcm5hdGUgY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBibnBGcm9tTnVtYmVyKGEsYixjKSB7XG4gICAgICBpZihcIm51bWJlclwiID09IHR5cGVvZiBiKSB7XG4gICAgICAgIC8vIG5ldyBCaWdJbnRlZ2VyKGludCxpbnQsUk5HKVxuICAgICAgICBpZihhIDwgMikgdGhpcy5mcm9tSW50KDEpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZyb21OdW1iZXIoYSxjKTtcbiAgICAgICAgICBpZighdGhpcy50ZXN0Qml0KGEtMSkpXHQvLyBmb3JjZSBNU0Igc2V0XG4gICAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYS0xKSxvcF9vcix0aGlzKTtcbiAgICAgICAgICBpZih0aGlzLmlzRXZlbigpKSB0aGlzLmRBZGRPZmZzZXQoMSwwKTsgLy8gZm9yY2Ugb2RkXG4gICAgICAgICAgd2hpbGUoIXRoaXMuaXNQcm9iYWJsZVByaW1lKGIpKSB7XG4gICAgICAgICAgICB0aGlzLmRBZGRPZmZzZXQoMiwwKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYml0TGVuZ3RoKCkgPiBhKSB0aGlzLnN1YlRvKEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChhLTEpLHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIG5ldyBCaWdJbnRlZ2VyKGludCxSTkcpXG4gICAgICAgIHZhciB4ID0gbmV3IEFycmF5KCksIHQgPSBhJjc7XG4gICAgICAgIHgubGVuZ3RoID0gKGE+PjMpKzE7XG4gICAgICAgIGIubmV4dEJ5dGVzKHgpO1xuICAgICAgICBpZih0ID4gMCkgeFswXSAmPSAoKDE8PHQpLTEpOyBlbHNlIHhbMF0gPSAwO1xuICAgICAgICB0aGlzLmZyb21TdHJpbmcoeCwyNTYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIGNvbnZlcnQgdG8gYmlnZW5kaWFuIGJ5dGUgYXJyYXlcbiAgICBmdW5jdGlvbiBiblRvQnl0ZUFycmF5KCkge1xuICAgICAgdmFyIGkgPSB0aGlzLnQsIHIgPSBuZXcgQXJyYXkoKTtcbiAgICAgIHJbMF0gPSB0aGlzLnM7XG4gICAgICB2YXIgcCA9IHRoaXMuREItKGkqdGhpcy5EQiklOCwgZCwgayA9IDA7XG4gICAgICBpZihpLS0gPiAwKSB7XG4gICAgICAgIGlmKHAgPCB0aGlzLkRCICYmIChkID0gdGhpc1tpXT4+cCkgIT0gKHRoaXMucyZ0aGlzLkRNKT4+cClcbiAgICAgICAgICByW2srK10gPSBkfCh0aGlzLnM8PCh0aGlzLkRCLXApKTtcbiAgICAgICAgd2hpbGUoaSA+PSAwKSB7XG4gICAgICAgICAgaWYocCA8IDgpIHtcbiAgICAgICAgICAgIGQgPSAodGhpc1tpXSYoKDE8PHApLTEpKTw8KDgtcCk7XG4gICAgICAgICAgICBkIHw9IHRoaXNbLS1pXT4+KHArPXRoaXMuREItOCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZCA9ICh0aGlzW2ldPj4ocC09OCkpJjB4ZmY7XG4gICAgICAgICAgICBpZihwIDw9IDApIHsgcCArPSB0aGlzLkRCOyAtLWk7IH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoKGQmMHg4MCkgIT0gMCkgZCB8PSAtMjU2O1xuICAgICAgICAgIGlmKGsgPT0gMCAmJiAodGhpcy5zJjB4ODApICE9IChkJjB4ODApKSArK2s7XG4gICAgICAgICAgaWYoayA+IDAgfHwgZCAhPSB0aGlzLnMpIHJbaysrXSA9IGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJuRXF1YWxzKGEpIHsgcmV0dXJuKHRoaXMuY29tcGFyZVRvKGEpPT0wKTsgfVxuICAgIGZ1bmN0aW9uIGJuTWluKGEpIHsgcmV0dXJuKHRoaXMuY29tcGFyZVRvKGEpPDApP3RoaXM6YTsgfVxuICAgIGZ1bmN0aW9uIGJuTWF4KGEpIHsgcmV0dXJuKHRoaXMuY29tcGFyZVRvKGEpPjApP3RoaXM6YTsgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgb3AgYSAoYml0d2lzZSlcbiAgICBmdW5jdGlvbiBibnBCaXR3aXNlVG8oYSxvcCxyKSB7XG4gICAgICB2YXIgaSwgZiwgbSA9IE1hdGgubWluKGEudCx0aGlzLnQpO1xuICAgICAgZm9yKGkgPSAwOyBpIDwgbTsgKytpKSByW2ldID0gb3AodGhpc1tpXSxhW2ldKTtcbiAgICAgIGlmKGEudCA8IHRoaXMudCkge1xuICAgICAgICBmID0gYS5zJnRoaXMuRE07XG4gICAgICAgIGZvcihpID0gbTsgaSA8IHRoaXMudDsgKytpKSByW2ldID0gb3AodGhpc1tpXSxmKTtcbiAgICAgICAgci50ID0gdGhpcy50O1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGYgPSB0aGlzLnMmdGhpcy5ETTtcbiAgICAgICAgZm9yKGkgPSBtOyBpIDwgYS50OyArK2kpIHJbaV0gPSBvcChmLGFbaV0pO1xuICAgICAgICByLnQgPSBhLnQ7XG4gICAgICB9XG4gICAgICByLnMgPSBvcCh0aGlzLnMsYS5zKTtcbiAgICAgIHIuY2xhbXAoKTtcbiAgICB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzICYgYVxuICAgIGZ1bmN0aW9uIG9wX2FuZCh4LHkpIHsgcmV0dXJuIHgmeTsgfVxuICAgIGZ1bmN0aW9uIGJuQW5kKGEpIHsgdmFyIHIgPSBuYmkoKTsgdGhpcy5iaXR3aXNlVG8oYSxvcF9hbmQscik7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzIHwgYVxuICAgIGZ1bmN0aW9uIG9wX29yKHgseSkgeyByZXR1cm4geHx5OyB9XG4gICAgZnVuY3Rpb24gYm5PcihhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuYml0d2lzZVRvKGEsb3Bfb3Iscik7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzIF4gYVxuICAgIGZ1bmN0aW9uIG9wX3hvcih4LHkpIHsgcmV0dXJuIHheeTsgfVxuICAgIGZ1bmN0aW9uIGJuWG9yKGEpIHsgdmFyIHIgPSBuYmkoKTsgdGhpcy5iaXR3aXNlVG8oYSxvcF94b3Iscik7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzICYgfmFcbiAgICBmdW5jdGlvbiBvcF9hbmRub3QoeCx5KSB7IHJldHVybiB4Jn55OyB9XG4gICAgZnVuY3Rpb24gYm5BbmROb3QoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLmJpdHdpc2VUbyhhLG9wX2FuZG5vdCxyKTsgcmV0dXJuIHI7IH1cblxuICAgIC8vIChwdWJsaWMpIH50aGlzXG4gICAgZnVuY3Rpb24gYm5Ob3QoKSB7XG4gICAgICB2YXIgciA9IG5iaSgpO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMudDsgKytpKSByW2ldID0gdGhpcy5ETSZ+dGhpc1tpXTtcbiAgICAgIHIudCA9IHRoaXMudDtcbiAgICAgIHIucyA9IH50aGlzLnM7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzIDw8IG5cbiAgICBmdW5jdGlvbiBiblNoaWZ0TGVmdChuKSB7XG4gICAgICB2YXIgciA9IG5iaSgpO1xuICAgICAgaWYobiA8IDApIHRoaXMuclNoaWZ0VG8oLW4scik7IGVsc2UgdGhpcy5sU2hpZnRUbyhuLHIpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyA+PiBuXG4gICAgZnVuY3Rpb24gYm5TaGlmdFJpZ2h0KG4pIHtcbiAgICAgIHZhciByID0gbmJpKCk7XG4gICAgICBpZihuIDwgMCkgdGhpcy5sU2hpZnRUbygtbixyKTsgZWxzZSB0aGlzLnJTaGlmdFRvKG4scik7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gaW5kZXggb2YgbG93ZXN0IDEtYml0IGluIHgsIHggPCAyXjMxXG4gICAgZnVuY3Rpb24gbGJpdCh4KSB7XG4gICAgICBpZih4ID09IDApIHJldHVybiAtMTtcbiAgICAgIHZhciByID0gMDtcbiAgICAgIGlmKCh4JjB4ZmZmZikgPT0gMCkgeyB4ID4+PSAxNjsgciArPSAxNjsgfVxuICAgICAgaWYoKHgmMHhmZikgPT0gMCkgeyB4ID4+PSA4OyByICs9IDg7IH1cbiAgICAgIGlmKCh4JjB4ZikgPT0gMCkgeyB4ID4+PSA0OyByICs9IDQ7IH1cbiAgICAgIGlmKCh4JjMpID09IDApIHsgeCA+Pj0gMjsgciArPSAyOyB9XG4gICAgICBpZigoeCYxKSA9PSAwKSArK3I7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvLyAocHVibGljKSByZXR1cm5zIGluZGV4IG9mIGxvd2VzdCAxLWJpdCAob3IgLTEgaWYgbm9uZSlcbiAgICBmdW5jdGlvbiBibkdldExvd2VzdFNldEJpdCgpIHtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSlcbiAgICAgICAgaWYodGhpc1tpXSAhPSAwKSByZXR1cm4gaSp0aGlzLkRCK2xiaXQodGhpc1tpXSk7XG4gICAgICBpZih0aGlzLnMgPCAwKSByZXR1cm4gdGhpcy50KnRoaXMuREI7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIG51bWJlciBvZiAxIGJpdHMgaW4geFxuICAgIGZ1bmN0aW9uIGNiaXQoeCkge1xuICAgICAgdmFyIHIgPSAwO1xuICAgICAgd2hpbGUoeCAhPSAwKSB7IHggJj0geC0xOyArK3I7IH1cbiAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIHJldHVybiBudW1iZXIgb2Ygc2V0IGJpdHNcbiAgICBmdW5jdGlvbiBibkJpdENvdW50KCkge1xuICAgICAgdmFyIHIgPSAwLCB4ID0gdGhpcy5zJnRoaXMuRE07XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpIHIgKz0gY2JpdCh0aGlzW2ldXngpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLy8gKHB1YmxpYykgdHJ1ZSBpZmYgbnRoIGJpdCBpcyBzZXRcbiAgICBmdW5jdGlvbiBiblRlc3RCaXQobikge1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKG4vdGhpcy5EQik7XG4gICAgICBpZihqID49IHRoaXMudCkgcmV0dXJuKHRoaXMucyE9MCk7XG4gICAgICByZXR1cm4oKHRoaXNbal0mKDE8PChuJXRoaXMuREIpKSkhPTApO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHRoaXMgb3AgKDE8PG4pXG4gICAgZnVuY3Rpb24gYm5wQ2hhbmdlQml0KG4sb3ApIHtcbiAgICAgIHZhciByID0gQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KG4pO1xuICAgICAgdGhpcy5iaXR3aXNlVG8ocixvcCxyKTtcbiAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIHRoaXMgfCAoMTw8bilcbiAgICBmdW5jdGlvbiBiblNldEJpdChuKSB7IHJldHVybiB0aGlzLmNoYW5nZUJpdChuLG9wX29yKTsgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyAmIH4oMTw8bilcbiAgICBmdW5jdGlvbiBibkNsZWFyQml0KG4pIHsgcmV0dXJuIHRoaXMuY2hhbmdlQml0KG4sb3BfYW5kbm90KTsgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyBeICgxPDxuKVxuICAgIGZ1bmN0aW9uIGJuRmxpcEJpdChuKSB7IHJldHVybiB0aGlzLmNoYW5nZUJpdChuLG9wX3hvcik7IH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzICsgYVxuICAgIGZ1bmN0aW9uIGJucEFkZFRvKGEscikge1xuICAgICAgdmFyIGkgPSAwLCBjID0gMCwgbSA9IE1hdGgubWluKGEudCx0aGlzLnQpO1xuICAgICAgd2hpbGUoaSA8IG0pIHtcbiAgICAgICAgYyArPSB0aGlzW2ldK2FbaV07XG4gICAgICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgIH1cbiAgICAgIGlmKGEudCA8IHRoaXMudCkge1xuICAgICAgICBjICs9IGEucztcbiAgICAgICAgd2hpbGUoaSA8IHRoaXMudCkge1xuICAgICAgICAgIGMgKz0gdGhpc1tpXTtcbiAgICAgICAgICByW2krK10gPSBjJnRoaXMuRE07XG4gICAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgICAgfVxuICAgICAgICBjICs9IHRoaXMucztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjICs9IHRoaXMucztcbiAgICAgICAgd2hpbGUoaSA8IGEudCkge1xuICAgICAgICAgIGMgKz0gYVtpXTtcbiAgICAgICAgICByW2krK10gPSBjJnRoaXMuRE07XG4gICAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgICAgfVxuICAgICAgICBjICs9IGEucztcbiAgICAgIH1cbiAgICAgIHIucyA9IChjPDApPy0xOjA7XG4gICAgICBpZihjID4gMCkgcltpKytdID0gYztcbiAgICAgIGVsc2UgaWYoYyA8IC0xKSByW2krK10gPSB0aGlzLkRWK2M7XG4gICAgICByLnQgPSBpO1xuICAgICAgci5jbGFtcCgpO1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIHRoaXMgKyBhXG4gICAgZnVuY3Rpb24gYm5BZGQoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLmFkZFRvKGEscik7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzIC0gYVxuICAgIGZ1bmN0aW9uIGJuU3VidHJhY3QoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLnN1YlRvKGEscik7IHJldHVybiByOyB9XG5cbiAgICAvLyAocHVibGljKSB0aGlzICogYVxuICAgIGZ1bmN0aW9uIGJuTXVsdGlwbHkoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLm11bHRpcGx5VG8oYSxyKTsgcmV0dXJuIHI7IH1cblxuICAgIC8vIChwdWJsaWMpIHRoaXNeMlxuICAgIGZ1bmN0aW9uIGJuU3F1YXJlKCkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLnNxdWFyZVRvKHIpOyByZXR1cm4gcjsgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyAvIGFcbiAgICBmdW5jdGlvbiBibkRpdmlkZShhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuZGl2UmVtVG8oYSxyLG51bGwpOyByZXR1cm4gcjsgfVxuXG4gICAgLy8gKHB1YmxpYykgdGhpcyAlIGFcbiAgICBmdW5jdGlvbiBiblJlbWFpbmRlcihhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuZGl2UmVtVG8oYSxudWxsLHIpOyByZXR1cm4gcjsgfVxuXG4gICAgLy8gKHB1YmxpYykgW3RoaXMvYSx0aGlzJWFdXG4gICAgZnVuY3Rpb24gYm5EaXZpZGVBbmRSZW1haW5kZXIoYSkge1xuICAgICAgdmFyIHEgPSBuYmkoKSwgciA9IG5iaSgpO1xuICAgICAgdGhpcy5kaXZSZW1UbyhhLHEscik7XG4gICAgICByZXR1cm4gbmV3IEFycmF5KHEscik7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgdGhpcyAqPSBuLCB0aGlzID49IDAsIDEgPCBuIDwgRFZcbiAgICBmdW5jdGlvbiBibnBETXVsdGlwbHkobikge1xuICAgICAgdGhpc1t0aGlzLnRdID0gdGhpcy5hbSgwLG4tMSx0aGlzLDAsMCx0aGlzLnQpO1xuICAgICAgKyt0aGlzLnQ7XG4gICAgICB0aGlzLmNsYW1wKCk7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgdGhpcyArPSBuIDw8IHcgd29yZHMsIHRoaXMgPj0gMFxuICAgIGZ1bmN0aW9uIGJucERBZGRPZmZzZXQobix3KSB7XG4gICAgICBpZihuID09IDApIHJldHVybjtcbiAgICAgIHdoaWxlKHRoaXMudCA8PSB3KSB0aGlzW3RoaXMudCsrXSA9IDA7XG4gICAgICB0aGlzW3ddICs9IG47XG4gICAgICB3aGlsZSh0aGlzW3ddID49IHRoaXMuRFYpIHtcbiAgICAgICAgdGhpc1t3XSAtPSB0aGlzLkRWO1xuICAgICAgICBpZigrK3cgPj0gdGhpcy50KSB0aGlzW3RoaXMudCsrXSA9IDA7XG4gICAgICAgICsrdGhpc1t3XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBIFwibnVsbFwiIHJlZHVjZXJcbiAgICBmdW5jdGlvbiBOdWxsRXhwKCkge31cbiAgICBmdW5jdGlvbiBuTm9wKHgpIHsgcmV0dXJuIHg7IH1cbiAgICBmdW5jdGlvbiBuTXVsVG8oeCx5LHIpIHsgeC5tdWx0aXBseVRvKHkscik7IH1cbiAgICBmdW5jdGlvbiBuU3FyVG8oeCxyKSB7IHguc3F1YXJlVG8ocik7IH1cblxuICAgIE51bGxFeHAucHJvdG90eXBlLmNvbnZlcnQgPSBuTm9wO1xuICAgIE51bGxFeHAucHJvdG90eXBlLnJldmVydCA9IG5Ob3A7XG4gICAgTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBuTXVsVG87XG4gICAgTnVsbEV4cC5wcm90b3R5cGUuc3FyVG8gPSBuU3FyVG87XG5cbiAgICAvLyAocHVibGljKSB0aGlzXmVcbiAgICBmdW5jdGlvbiBiblBvdyhlKSB7IHJldHVybiB0aGlzLmV4cChlLG5ldyBOdWxsRXhwKCkpOyB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSByID0gbG93ZXIgbiB3b3JkcyBvZiBcInRoaXMgKiBhXCIsIGEudCA8PSBuXG4gICAgLy8gXCJ0aGlzXCIgc2hvdWxkIGJlIHRoZSBsYXJnZXIgb25lIGlmIGFwcHJvcHJpYXRlLlxuICAgIGZ1bmN0aW9uIGJucE11bHRpcGx5TG93ZXJUbyhhLG4scikge1xuICAgICAgdmFyIGkgPSBNYXRoLm1pbih0aGlzLnQrYS50LG4pO1xuICAgICAgci5zID0gMDsgLy8gYXNzdW1lcyBhLHRoaXMgPj0gMFxuICAgICAgci50ID0gaTtcbiAgICAgIHdoaWxlKGkgPiAwKSByWy0taV0gPSAwO1xuICAgICAgdmFyIGo7XG4gICAgICBmb3IoaiA9IHIudC10aGlzLnQ7IGkgPCBqOyArK2kpIHJbaSt0aGlzLnRdID0gdGhpcy5hbSgwLGFbaV0scixpLDAsdGhpcy50KTtcbiAgICAgIGZvcihqID0gTWF0aC5taW4oYS50LG4pOyBpIDwgajsgKytpKSB0aGlzLmFtKDAsYVtpXSxyLGksMCxuLWkpO1xuICAgICAgci5jbGFtcCgpO1xuICAgIH1cblxuICAgIC8vIChwcm90ZWN0ZWQpIHIgPSBcInRoaXMgKiBhXCIgd2l0aG91dCBsb3dlciBuIHdvcmRzLCBuID4gMFxuICAgIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cbiAgICBmdW5jdGlvbiBibnBNdWx0aXBseVVwcGVyVG8oYSxuLHIpIHtcbiAgICAgIC0tbjtcbiAgICAgIHZhciBpID0gci50ID0gdGhpcy50K2EudC1uO1xuICAgICAgci5zID0gMDsgLy8gYXNzdW1lcyBhLHRoaXMgPj0gMFxuICAgICAgd2hpbGUoLS1pID49IDApIHJbaV0gPSAwO1xuICAgICAgZm9yKGkgPSBNYXRoLm1heChuLXRoaXMudCwwKTsgaSA8IGEudDsgKytpKVxuICAgICAgICByW3RoaXMudCtpLW5dID0gdGhpcy5hbShuLWksYVtpXSxyLDAsMCx0aGlzLnQraS1uKTtcbiAgICAgIHIuY2xhbXAoKTtcbiAgICAgIHIuZHJTaGlmdFRvKDEscik7XG4gICAgfVxuXG4gICAgLy8gQmFycmV0dCBtb2R1bGFyIHJlZHVjdGlvblxuICAgIGZ1bmN0aW9uIEJhcnJldHQobSkge1xuICAgICAgLy8gc2V0dXAgQmFycmV0dFxuICAgICAgdGhpcy5yMiA9IG5iaSgpO1xuICAgICAgdGhpcy5xMyA9IG5iaSgpO1xuICAgICAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKDIqbS50LHRoaXMucjIpO1xuICAgICAgdGhpcy5tdSA9IHRoaXMucjIuZGl2aWRlKG0pO1xuICAgICAgdGhpcy5tID0gbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiYXJyZXR0Q29udmVydCh4KSB7XG4gICAgICBpZih4LnMgPCAwIHx8IHgudCA+IDIqdGhpcy5tLnQpIHJldHVybiB4Lm1vZCh0aGlzLm0pO1xuICAgICAgZWxzZSBpZih4LmNvbXBhcmVUbyh0aGlzLm0pIDwgMCkgcmV0dXJuIHg7XG4gICAgICBlbHNlIHsgdmFyIHIgPSBuYmkoKTsgeC5jb3B5VG8ocik7IHRoaXMucmVkdWNlKHIpOyByZXR1cm4gcjsgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJhcnJldHRSZXZlcnQoeCkgeyByZXR1cm4geDsgfVxuXG4gICAgLy8geCA9IHggbW9kIG0gKEhBQyAxNC40MilcbiAgICBmdW5jdGlvbiBiYXJyZXR0UmVkdWNlKHgpIHtcbiAgICAgIHguZHJTaGlmdFRvKHRoaXMubS50LTEsdGhpcy5yMik7XG4gICAgICBpZih4LnQgPiB0aGlzLm0udCsxKSB7IHgudCA9IHRoaXMubS50KzE7IHguY2xhbXAoKTsgfVxuICAgICAgdGhpcy5tdS5tdWx0aXBseVVwcGVyVG8odGhpcy5yMix0aGlzLm0udCsxLHRoaXMucTMpO1xuICAgICAgdGhpcy5tLm11bHRpcGx5TG93ZXJUbyh0aGlzLnEzLHRoaXMubS50KzEsdGhpcy5yMik7XG4gICAgICB3aGlsZSh4LmNvbXBhcmVUbyh0aGlzLnIyKSA8IDApIHguZEFkZE9mZnNldCgxLHRoaXMubS50KzEpO1xuICAgICAgeC5zdWJUbyh0aGlzLnIyLHgpO1xuICAgICAgd2hpbGUoeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB4LnN1YlRvKHRoaXMubSx4KTtcbiAgICB9XG5cbiAgICAvLyByID0geF4yIG1vZCBtOyB4ICE9IHJcbiAgICBmdW5jdGlvbiBiYXJyZXR0U3FyVG8oeCxyKSB7IHguc3F1YXJlVG8ocik7IHRoaXMucmVkdWNlKHIpOyB9XG5cbiAgICAvLyByID0geCp5IG1vZCBtOyB4LHkgIT0gclxuICAgIGZ1bmN0aW9uIGJhcnJldHRNdWxUbyh4LHkscikgeyB4Lm11bHRpcGx5VG8oeSxyKTsgdGhpcy5yZWR1Y2Uocik7IH1cblxuICAgIEJhcnJldHQucHJvdG90eXBlLmNvbnZlcnQgPSBiYXJyZXR0Q29udmVydDtcbiAgICBCYXJyZXR0LnByb3RvdHlwZS5yZXZlcnQgPSBiYXJyZXR0UmV2ZXJ0O1xuICAgIEJhcnJldHQucHJvdG90eXBlLnJlZHVjZSA9IGJhcnJldHRSZWR1Y2U7XG4gICAgQmFycmV0dC5wcm90b3R5cGUubXVsVG8gPSBiYXJyZXR0TXVsVG87XG4gICAgQmFycmV0dC5wcm90b3R5cGUuc3FyVG8gPSBiYXJyZXR0U3FyVG87XG5cbiAgICAvLyAocHVibGljKSB0aGlzXmUgJSBtIChIQUMgMTQuODUpXG4gICAgZnVuY3Rpb24gYm5Nb2RQb3coZSxtKSB7XG4gICAgICB2YXIgaSA9IGUuYml0TGVuZ3RoKCksIGssIHIgPSBuYnYoMSksIHo7XG4gICAgICBpZihpIDw9IDApIHJldHVybiByO1xuICAgICAgZWxzZSBpZihpIDwgMTgpIGsgPSAxO1xuICAgICAgZWxzZSBpZihpIDwgNDgpIGsgPSAzO1xuICAgICAgZWxzZSBpZihpIDwgMTQ0KSBrID0gNDtcbiAgICAgIGVsc2UgaWYoaSA8IDc2OCkgayA9IDU7XG4gICAgICBlbHNlIGsgPSA2O1xuICAgICAgaWYoaSA8IDgpXG4gICAgICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcbiAgICAgIGVsc2UgaWYobS5pc0V2ZW4oKSlcbiAgICAgICAgeiA9IG5ldyBCYXJyZXR0KG0pO1xuICAgICAgZWxzZVxuICAgICAgICB6ID0gbmV3IE1vbnRnb21lcnkobSk7XG5cbiAgICAgIC8vIHByZWNvbXB1dGF0aW9uXG4gICAgICB2YXIgZyA9IG5ldyBBcnJheSgpLCBuID0gMywgazEgPSBrLTEsIGttID0gKDE8PGspLTE7XG4gICAgICBnWzFdID0gei5jb252ZXJ0KHRoaXMpO1xuICAgICAgaWYoayA+IDEpIHtcbiAgICAgICAgdmFyIGcyID0gbmJpKCk7XG4gICAgICAgIHouc3FyVG8oZ1sxXSxnMik7XG4gICAgICAgIHdoaWxlKG4gPD0ga20pIHtcbiAgICAgICAgICBnW25dID0gbmJpKCk7XG4gICAgICAgICAgei5tdWxUbyhnMixnW24tMl0sZ1tuXSk7XG4gICAgICAgICAgbiArPSAyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBqID0gZS50LTEsIHcsIGlzMSA9IHRydWUsIHIyID0gbmJpKCksIHQ7XG4gICAgICBpID0gbmJpdHMoZVtqXSktMTtcbiAgICAgIHdoaWxlKGogPj0gMCkge1xuICAgICAgICBpZihpID49IGsxKSB3ID0gKGVbal0+PihpLWsxKSkma207XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHcgPSAoZVtqXSYoKDE8PChpKzEpKS0xKSk8PChrMS1pKTtcbiAgICAgICAgICBpZihqID4gMCkgdyB8PSBlW2otMV0+Pih0aGlzLkRCK2ktazEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbiA9IGs7XG4gICAgICAgIHdoaWxlKCh3JjEpID09IDApIHsgdyA+Pj0gMTsgLS1uOyB9XG4gICAgICAgIGlmKChpIC09IG4pIDwgMCkgeyBpICs9IHRoaXMuREI7IC0tajsgfVxuICAgICAgICBpZihpczEpIHtcdC8vIHJldCA9PSAxLCBkb24ndCBib3RoZXIgc3F1YXJpbmcgb3IgbXVsdGlwbHlpbmcgaXRcbiAgICAgICAgICBnW3ddLmNvcHlUbyhyKTtcbiAgICAgICAgICBpczEgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB3aGlsZShuID4gMSkgeyB6LnNxclRvKHIscjIpOyB6LnNxclRvKHIyLHIpOyBuIC09IDI7IH1cbiAgICAgICAgICBpZihuID4gMCkgei5zcXJUbyhyLHIyKTsgZWxzZSB7IHQgPSByOyByID0gcjI7IHIyID0gdDsgfVxuICAgICAgICAgIHoubXVsVG8ocjIsZ1t3XSxyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGogPj0gMCAmJiAoZVtqXSYoMTw8aSkpID09IDApIHtcbiAgICAgICAgICB6LnNxclRvKHIscjIpOyB0ID0gcjsgciA9IHIyOyByMiA9IHQ7XG4gICAgICAgICAgaWYoLS1pIDwgMCkgeyBpID0gdGhpcy5EQi0xOyAtLWo7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHoucmV2ZXJ0KHIpO1xuICAgIH1cblxuICAgIC8vIChwdWJsaWMpIGdjZCh0aGlzLGEpIChIQUMgMTQuNTQpXG4gICAgZnVuY3Rpb24gYm5HQ0QoYSkge1xuICAgICAgdmFyIHggPSAodGhpcy5zPDApP3RoaXMubmVnYXRlKCk6dGhpcy5jbG9uZSgpO1xuICAgICAgdmFyIHkgPSAoYS5zPDApP2EubmVnYXRlKCk6YS5jbG9uZSgpO1xuICAgICAgaWYoeC5jb21wYXJlVG8oeSkgPCAwKSB7IHZhciB0ID0geDsgeCA9IHk7IHkgPSB0OyB9XG4gICAgICB2YXIgaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCksIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xuICAgICAgaWYoZyA8IDApIHJldHVybiB4O1xuICAgICAgaWYoaSA8IGcpIGcgPSBpO1xuICAgICAgaWYoZyA+IDApIHtcbiAgICAgICAgeC5yU2hpZnRUbyhnLHgpO1xuICAgICAgICB5LnJTaGlmdFRvKGcseSk7XG4gICAgICB9XG4gICAgICB3aGlsZSh4LnNpZ251bSgpID4gMCkge1xuICAgICAgICBpZigoaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkgeC5yU2hpZnRUbyhpLHgpO1xuICAgICAgICBpZigoaSA9IHkuZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkgeS5yU2hpZnRUbyhpLHkpO1xuICAgICAgICBpZih4LmNvbXBhcmVUbyh5KSA+PSAwKSB7XG4gICAgICAgICAgeC5zdWJUbyh5LHgpO1xuICAgICAgICAgIHguclNoaWZ0VG8oMSx4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB5LnN1YlRvKHgseSk7XG4gICAgICAgICAgeS5yU2hpZnRUbygxLHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihnID4gMCkgeS5sU2hpZnRUbyhnLHkpO1xuICAgICAgcmV0dXJuIHk7XG4gICAgfVxuXG4gICAgLy8gKHByb3RlY3RlZCkgdGhpcyAlIG4sIG4gPCAyXjI2XG4gICAgZnVuY3Rpb24gYm5wTW9kSW50KG4pIHtcbiAgICAgIGlmKG4gPD0gMCkgcmV0dXJuIDA7XG4gICAgICB2YXIgZCA9IHRoaXMuRFYlbiwgciA9ICh0aGlzLnM8MCk/bi0xOjA7XG4gICAgICBpZih0aGlzLnQgPiAwKVxuICAgICAgICBpZihkID09IDApIHIgPSB0aGlzWzBdJW47XG4gICAgICAgIGVsc2UgZm9yKHZhciBpID0gdGhpcy50LTE7IGkgPj0gMDsgLS1pKSByID0gKGQqcit0aGlzW2ldKSVuO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLy8gKHB1YmxpYykgMS90aGlzICUgbSAoSEFDIDE0LjYxKVxuICAgIGZ1bmN0aW9uIGJuTW9kSW52ZXJzZShtKSB7XG4gICAgICB2YXIgYWMgPSBtLmlzRXZlbigpO1xuICAgICAgaWYoKHRoaXMuaXNFdmVuKCkgJiYgYWMpIHx8IG0uc2lnbnVtKCkgPT0gMCkgcmV0dXJuIEJpZ0ludGVnZXIuWkVSTztcbiAgICAgIHZhciB1ID0gbS5jbG9uZSgpLCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgICAgdmFyIGEgPSBuYnYoMSksIGIgPSBuYnYoMCksIGMgPSBuYnYoMCksIGQgPSBuYnYoMSk7XG4gICAgICB3aGlsZSh1LnNpZ251bSgpICE9IDApIHtcbiAgICAgICAgd2hpbGUodS5pc0V2ZW4oKSkge1xuICAgICAgICAgIHUuclNoaWZ0VG8oMSx1KTtcbiAgICAgICAgICBpZihhYykge1xuICAgICAgICAgICAgaWYoIWEuaXNFdmVuKCkgfHwgIWIuaXNFdmVuKCkpIHsgYS5hZGRUbyh0aGlzLGEpOyBiLnN1YlRvKG0sYik7IH1cbiAgICAgICAgICAgIGEuclNoaWZ0VG8oMSxhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZighYi5pc0V2ZW4oKSkgYi5zdWJUbyhtLGIpO1xuICAgICAgICAgIGIuclNoaWZ0VG8oMSxiKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSh2LmlzRXZlbigpKSB7XG4gICAgICAgICAgdi5yU2hpZnRUbygxLHYpO1xuICAgICAgICAgIGlmKGFjKSB7XG4gICAgICAgICAgICBpZighYy5pc0V2ZW4oKSB8fCAhZC5pc0V2ZW4oKSkgeyBjLmFkZFRvKHRoaXMsYyk7IGQuc3ViVG8obSxkKTsgfVxuICAgICAgICAgICAgYy5yU2hpZnRUbygxLGMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKCFkLmlzRXZlbigpKSBkLnN1YlRvKG0sZCk7XG4gICAgICAgICAgZC5yU2hpZnRUbygxLGQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHUuY29tcGFyZVRvKHYpID49IDApIHtcbiAgICAgICAgICB1LnN1YlRvKHYsdSk7XG4gICAgICAgICAgaWYoYWMpIGEuc3ViVG8oYyxhKTtcbiAgICAgICAgICBiLnN1YlRvKGQsYik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdi5zdWJUbyh1LHYpO1xuICAgICAgICAgIGlmKGFjKSBjLnN1YlRvKGEsYyk7XG4gICAgICAgICAgZC5zdWJUbyhiLGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZih2LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgIT0gMCkgcmV0dXJuIEJpZ0ludGVnZXIuWkVSTztcbiAgICAgIGlmKGQuY29tcGFyZVRvKG0pID49IDApIHJldHVybiBkLnN1YnRyYWN0KG0pO1xuICAgICAgaWYoZC5zaWdudW0oKSA8IDApIGQuYWRkVG8obSxkKTsgZWxzZSByZXR1cm4gZDtcbiAgICAgIGlmKGQuc2lnbnVtKCkgPCAwKSByZXR1cm4gZC5hZGQobSk7IGVsc2UgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgdmFyIGxvd3ByaW1lcyA9IFsyLDMsNSw3LDExLDEzLDE3LDE5LDIzLDI5LDMxLDM3LDQxLDQzLDQ3LDUzLDU5LDYxLDY3LDcxLDczLDc5LDgzLDg5LDk3LDEwMSwxMDMsMTA3LDEwOSwxMTMsMTI3LDEzMSwxMzcsMTM5LDE0OSwxNTEsMTU3LDE2MywxNjcsMTczLDE3OSwxODEsMTkxLDE5MywxOTcsMTk5LDIxMSwyMjMsMjI3LDIyOSwyMzMsMjM5LDI0MSwyNTEsMjU3LDI2MywyNjksMjcxLDI3NywyODEsMjgzLDI5MywzMDcsMzExLDMxMywzMTcsMzMxLDMzNywzNDcsMzQ5LDM1MywzNTksMzY3LDM3MywzNzksMzgzLDM4OSwzOTcsNDAxLDQwOSw0MTksNDIxLDQzMSw0MzMsNDM5LDQ0Myw0NDksNDU3LDQ2MSw0NjMsNDY3LDQ3OSw0ODcsNDkxLDQ5OSw1MDMsNTA5LDUyMSw1MjMsNTQxLDU0Nyw1NTcsNTYzLDU2OSw1NzEsNTc3LDU4Nyw1OTMsNTk5LDYwMSw2MDcsNjEzLDYxNyw2MTksNjMxLDY0MSw2NDMsNjQ3LDY1Myw2NTksNjYxLDY3Myw2NzcsNjgzLDY5MSw3MDEsNzA5LDcxOSw3MjcsNzMzLDczOSw3NDMsNzUxLDc1Nyw3NjEsNzY5LDc3Myw3ODcsNzk3LDgwOSw4MTEsODIxLDgyMyw4MjcsODI5LDgzOSw4NTMsODU3LDg1OSw4NjMsODc3LDg4MSw4ODMsODg3LDkwNyw5MTEsOTE5LDkyOSw5MzcsOTQxLDk0Nyw5NTMsOTY3LDk3MSw5NzcsOTgzLDk5MSw5OTddO1xuICAgIHZhciBscGxpbSA9ICgxPDwyNikvbG93cHJpbWVzW2xvd3ByaW1lcy5sZW5ndGgtMV07XG5cbiAgICAvLyAocHVibGljKSB0ZXN0IHByaW1hbGl0eSB3aXRoIGNlcnRhaW50eSA+PSAxLS41XnRcbiAgICBmdW5jdGlvbiBibklzUHJvYmFibGVQcmltZSh0KSB7XG4gICAgICB2YXIgaSwgeCA9IHRoaXMuYWJzKCk7XG4gICAgICBpZih4LnQgPT0gMSAmJiB4WzBdIDw9IGxvd3ByaW1lc1tsb3dwcmltZXMubGVuZ3RoLTFdKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxvd3ByaW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgICBpZih4WzBdID09IGxvd3ByaW1lc1tpXSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmKHguaXNFdmVuKCkpIHJldHVybiBmYWxzZTtcbiAgICAgIGkgPSAxO1xuICAgICAgd2hpbGUoaSA8IGxvd3ByaW1lcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG0gPSBsb3dwcmltZXNbaV0sIGogPSBpKzE7XG4gICAgICAgIHdoaWxlKGogPCBsb3dwcmltZXMubGVuZ3RoICYmIG0gPCBscGxpbSkgbSAqPSBsb3dwcmltZXNbaisrXTtcbiAgICAgICAgbSA9IHgubW9kSW50KG0pO1xuICAgICAgICB3aGlsZShpIDwgaikgaWYobSVsb3dwcmltZXNbaSsrXSA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4geC5taWxsZXJSYWJpbih0KTtcbiAgICB9XG5cbiAgICAvLyAocHJvdGVjdGVkKSB0cnVlIGlmIHByb2JhYmx5IHByaW1lIChIQUMgNC4yNCwgTWlsbGVyLVJhYmluKVxuICAgIGZ1bmN0aW9uIGJucE1pbGxlclJhYmluKHQpIHtcbiAgICAgIHZhciBuMSA9IHRoaXMuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xuICAgICAgdmFyIGsgPSBuMS5nZXRMb3dlc3RTZXRCaXQoKTtcbiAgICAgIGlmKGsgPD0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIHIgPSBuMS5zaGlmdFJpZ2h0KGspO1xuICAgICAgdCA9ICh0KzEpPj4xO1xuICAgICAgaWYodCA+IGxvd3ByaW1lcy5sZW5ndGgpIHQgPSBsb3dwcmltZXMubGVuZ3RoO1xuICAgICAgdmFyIGEgPSBuYmkoKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0OyArK2kpIHtcbiAgICAgICAgLy9QaWNrIGJhc2VzIGF0IHJhbmRvbSwgaW5zdGVhZCBvZiBzdGFydGluZyBhdCAyXG4gICAgICAgIGEuZnJvbUludChsb3dwcmltZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmxvd3ByaW1lcy5sZW5ndGgpXSk7XG4gICAgICAgIHZhciB5ID0gYS5tb2RQb3cocix0aGlzKTtcbiAgICAgICAgaWYoeS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpICE9IDAgJiYgeS5jb21wYXJlVG8objEpICE9IDApIHtcbiAgICAgICAgICB2YXIgaiA9IDE7XG4gICAgICAgICAgd2hpbGUoaisrIDwgayAmJiB5LmNvbXBhcmVUbyhuMSkgIT0gMCkge1xuICAgICAgICAgICAgeSA9IHkubW9kUG93SW50KDIsdGhpcyk7XG4gICAgICAgICAgICBpZih5LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZih5LmNvbXBhcmVUbyhuMSkgIT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0ZWRcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jaHVua1NpemUgPSBibnBDaHVua1NpemU7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUudG9SYWRpeCA9IGJucFRvUmFkaXg7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVJhZGl4ID0gYm5wRnJvbVJhZGl4O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21OdW1iZXIgPSBibnBGcm9tTnVtYmVyO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdHdpc2VUbyA9IGJucEJpdHdpc2VUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jaGFuZ2VCaXQgPSBibnBDaGFuZ2VCaXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkVG8gPSBibnBBZGRUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kTXVsdGlwbHkgPSBibnBETXVsdGlwbHk7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZEFkZE9mZnNldCA9IGJucERBZGRPZmZzZXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlMb3dlclRvID0gYm5wTXVsdGlwbHlMb3dlclRvO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VXBwZXJUbyA9IGJucE11bHRpcGx5VXBwZXJUbztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnQgPSBibnBNb2RJbnQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUubWlsbGVyUmFiaW4gPSBibnBNaWxsZXJSYWJpbjtcblxuICAgIC8vIHB1YmxpY1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsb25lID0gYm5DbG9uZTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pbnRWYWx1ZSA9IGJuSW50VmFsdWU7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYnl0ZVZhbHVlID0gYm5CeXRlVmFsdWU7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2hvcnRWYWx1ZSA9IGJuU2hvcnRWYWx1ZTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaWdudW0gPSBiblNpZ051bTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b0J5dGVBcnJheSA9IGJuVG9CeXRlQXJyYXk7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gYm5FcXVhbHM7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUubWluID0gYm5NaW47XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUubWF4ID0gYm5NYXg7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW5kID0gYm5BbmQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUub3IgPSBibk9yO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnhvciA9IGJuWG9yO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGJuQW5kTm90O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm5vdCA9IGJuTm90O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0TGVmdCA9IGJuU2hpZnRMZWZ0O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0UmlnaHQgPSBiblNoaWZ0UmlnaHQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZ2V0TG93ZXN0U2V0Qml0ID0gYm5HZXRMb3dlc3RTZXRCaXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYml0Q291bnQgPSBibkJpdENvdW50O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnRlc3RCaXQgPSBiblRlc3RCaXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2V0Qml0ID0gYm5TZXRCaXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2xlYXJCaXQgPSBibkNsZWFyQml0O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmZsaXBCaXQgPSBibkZsaXBCaXQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkID0gYm5BZGQ7XG4gICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc3VidHJhY3QgPSBiblN1YnRyYWN0O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5ID0gYm5NdWx0aXBseTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGUgPSBibkRpdmlkZTtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5yZW1haW5kZXIgPSBiblJlbWFpbmRlcjtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGVBbmRSZW1haW5kZXIgPSBibkRpdmlkZUFuZFJlbWFpbmRlcjtcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3cgPSBibk1vZFBvdztcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnZlcnNlID0gYm5Nb2RJbnZlcnNlO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnBvdyA9IGJuUG93O1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmdjZCA9IGJuR0NEO1xuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmlzUHJvYmFibGVQcmltZSA9IGJuSXNQcm9iYWJsZVByaW1lO1xuXG4gICAgLy8gSlNCTi1zcGVjaWZpYyBleHRlbnNpb25cbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmUgPSBiblNxdWFyZTtcblxuICAgIC8vIEV4cG9zZSB0aGUgQmFycmV0dCBmdW5jdGlvblxuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkJhcnJldHQgPSBCYXJyZXR0XG5cbiAgICAvLyBCaWdJbnRlZ2VyIGludGVyZmFjZXMgbm90IGltcGxlbWVudGVkIGluIGpzYm46XG5cbiAgICAvLyBCaWdJbnRlZ2VyKGludCBzaWdudW0sIGJ5dGVbXSBtYWduaXR1ZGUpXG4gICAgLy8gZG91YmxlIGRvdWJsZVZhbHVlKClcbiAgICAvLyBmbG9hdCBmbG9hdFZhbHVlKClcbiAgICAvLyBpbnQgaGFzaENvZGUoKVxuICAgIC8vIGxvbmcgbG9uZ1ZhbHVlKClcbiAgICAvLyBzdGF0aWMgQmlnSW50ZWdlciB2YWx1ZU9mKGxvbmcgdmFsKVxuXG5cdC8vIFJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIC0gcmVxdWlyZXMgYSBQUk5HIGJhY2tlbmQsIGUuZy4gcHJuZzQuanNcblxuXHQvLyBGb3IgYmVzdCByZXN1bHRzLCBwdXQgY29kZSBsaWtlXG5cdC8vIDxib2R5IG9uQ2xpY2s9J3JuZ19zZWVkX3RpbWUoKTsnIG9uS2V5UHJlc3M9J3JuZ19zZWVkX3RpbWUoKTsnPlxuXHQvLyBpbiB5b3VyIG1haW4gSFRNTCBkb2N1bWVudC5cblxuXHR2YXIgcm5nX3N0YXRlO1xuXHR2YXIgcm5nX3Bvb2w7XG5cdHZhciBybmdfcHB0cjtcblxuXHQvLyBNaXggaW4gYSAzMi1iaXQgaW50ZWdlciBpbnRvIHRoZSBwb29sXG5cdGZ1bmN0aW9uIHJuZ19zZWVkX2ludCh4KSB7XG5cdCAgcm5nX3Bvb2xbcm5nX3BwdHIrK10gXj0geCAmIDI1NTtcblx0ICBybmdfcG9vbFtybmdfcHB0cisrXSBePSAoeCA+PiA4KSAmIDI1NTtcblx0ICBybmdfcG9vbFtybmdfcHB0cisrXSBePSAoeCA+PiAxNikgJiAyNTU7XG5cdCAgcm5nX3Bvb2xbcm5nX3BwdHIrK10gXj0gKHggPj4gMjQpICYgMjU1O1xuXHQgIGlmKHJuZ19wcHRyID49IHJuZ19wc2l6ZSkgcm5nX3BwdHIgLT0gcm5nX3BzaXplO1xuXHR9XG5cblx0Ly8gTWl4IGluIHRoZSBjdXJyZW50IHRpbWUgKHcvbWlsbGlzZWNvbmRzKSBpbnRvIHRoZSBwb29sXG5cdGZ1bmN0aW9uIHJuZ19zZWVkX3RpbWUoKSB7XG5cdCAgcm5nX3NlZWRfaW50KG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblx0fVxuXG5cdC8vIEluaXRpYWxpemUgdGhlIHBvb2wgd2l0aCBqdW5rIGlmIG5lZWRlZC5cblx0aWYocm5nX3Bvb2wgPT0gbnVsbCkge1xuXHQgIHJuZ19wb29sID0gbmV3IEFycmF5KCk7XG5cdCAgcm5nX3BwdHIgPSAwO1xuXHQgIHZhciB0O1xuXHQgIGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmNyeXB0bykge1xuXHRcdGlmICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuXHRcdCAgLy8gVXNlIHdlYmNyeXB0byBpZiBhdmFpbGFibGVcblx0XHQgIHZhciB1YSA9IG5ldyBVaW50OEFycmF5KDMyKTtcblx0XHQgIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHVhKTtcblx0XHQgIGZvcih0ID0gMDsgdCA8IDMyOyArK3QpXG5cdFx0XHRybmdfcG9vbFtybmdfcHB0cisrXSA9IHVhW3RdO1xuXHRcdH1cblx0XHRlbHNlIGlmKG5hdmlnYXRvci5hcHBOYW1lID09IFwiTmV0c2NhcGVcIiAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbiA8IFwiNVwiKSB7XG5cdFx0ICAvLyBFeHRyYWN0IGVudHJvcHkgKDI1NiBiaXRzKSBmcm9tIE5TNCBSTkcgaWYgYXZhaWxhYmxlXG5cdFx0ICB2YXIgeiA9IHdpbmRvdy5jcnlwdG8ucmFuZG9tKDMyKTtcblx0XHQgIGZvcih0ID0gMDsgdCA8IHoubGVuZ3RoOyArK3QpXG5cdFx0XHRybmdfcG9vbFtybmdfcHB0cisrXSA9IHouY2hhckNvZGVBdCh0KSAmIDI1NTtcblx0XHR9XG5cdCAgfVxuXHQgIHdoaWxlKHJuZ19wcHRyIDwgcm5nX3BzaXplKSB7ICAvLyBleHRyYWN0IHNvbWUgcmFuZG9tbmVzcyBmcm9tIE1hdGgucmFuZG9tKClcblx0XHR0ID0gTWF0aC5mbG9vcig2NTUzNiAqIE1hdGgucmFuZG9tKCkpO1xuXHRcdHJuZ19wb29sW3JuZ19wcHRyKytdID0gdCA+Pj4gODtcblx0XHRybmdfcG9vbFtybmdfcHB0cisrXSA9IHQgJiAyNTU7XG5cdCAgfVxuXHQgIHJuZ19wcHRyID0gMDtcblx0ICBybmdfc2VlZF90aW1lKCk7XG5cdCAgLy9ybmdfc2VlZF9pbnQod2luZG93LnNjcmVlblgpO1xuXHQgIC8vcm5nX3NlZWRfaW50KHdpbmRvdy5zY3JlZW5ZKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJuZ19nZXRfYnl0ZSgpIHtcblx0ICBpZihybmdfc3RhdGUgPT0gbnVsbCkge1xuXHRcdHJuZ19zZWVkX3RpbWUoKTtcblx0XHRybmdfc3RhdGUgPSBwcm5nX25ld3N0YXRlKCk7XG5cdFx0cm5nX3N0YXRlLmluaXQocm5nX3Bvb2wpO1xuXHRcdGZvcihybmdfcHB0ciA9IDA7IHJuZ19wcHRyIDwgcm5nX3Bvb2wubGVuZ3RoOyArK3JuZ19wcHRyKVxuXHRcdCAgcm5nX3Bvb2xbcm5nX3BwdHJdID0gMDtcblx0XHRybmdfcHB0ciA9IDA7XG5cdFx0Ly9ybmdfcG9vbCA9IG51bGw7XG5cdCAgfVxuXHQgIC8vIFRPRE86IGFsbG93IHJlc2VlZGluZyBhZnRlciBmaXJzdCByZXF1ZXN0XG5cdCAgcmV0dXJuIHJuZ19zdGF0ZS5uZXh0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBybmdfZ2V0X2J5dGVzKGJhKSB7XG5cdCAgdmFyIGk7XG5cdCAgZm9yKGkgPSAwOyBpIDwgYmEubGVuZ3RoOyArK2kpIGJhW2ldID0gcm5nX2dldF9ieXRlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZWN1cmVSYW5kb20oKSB7fVxuXG5cdFNlY3VyZVJhbmRvbS5wcm90b3R5cGUubmV4dEJ5dGVzID0gcm5nX2dldF9ieXRlcztcblxuXHQvLyBwcm5nNC5qcyAtIHVzZXMgQXJjZm91ciBhcyBhIFBSTkdcblxuXHRmdW5jdGlvbiBBcmNmb3VyKCkge1xuXHQgIHRoaXMuaSA9IDA7XG5cdCAgdGhpcy5qID0gMDtcblx0ICB0aGlzLlMgPSBuZXcgQXJyYXkoKTtcblx0fVxuXG5cdC8vIEluaXRpYWxpemUgYXJjZm91ciBjb250ZXh0IGZyb20ga2V5LCBhbiBhcnJheSBvZiBpbnRzLCBlYWNoIGZyb20gWzAuLjI1NV1cblx0ZnVuY3Rpb24gQVJDNGluaXQoa2V5KSB7XG5cdCAgdmFyIGksIGosIHQ7XG5cdCAgZm9yKGkgPSAwOyBpIDwgMjU2OyArK2kpXG5cdFx0dGhpcy5TW2ldID0gaTtcblx0ICBqID0gMDtcblx0ICBmb3IoaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuXHRcdGogPSAoaiArIHRoaXMuU1tpXSArIGtleVtpICUga2V5Lmxlbmd0aF0pICYgMjU1O1xuXHRcdHQgPSB0aGlzLlNbaV07XG5cdFx0dGhpcy5TW2ldID0gdGhpcy5TW2pdO1xuXHRcdHRoaXMuU1tqXSA9IHQ7XG5cdCAgfVxuXHQgIHRoaXMuaSA9IDA7XG5cdCAgdGhpcy5qID0gMDtcblx0fVxuXG5cdGZ1bmN0aW9uIEFSQzRuZXh0KCkge1xuXHQgIHZhciB0O1xuXHQgIHRoaXMuaSA9ICh0aGlzLmkgKyAxKSAmIDI1NTtcblx0ICB0aGlzLmogPSAodGhpcy5qICsgdGhpcy5TW3RoaXMuaV0pICYgMjU1O1xuXHQgIHQgPSB0aGlzLlNbdGhpcy5pXTtcblx0ICB0aGlzLlNbdGhpcy5pXSA9IHRoaXMuU1t0aGlzLmpdO1xuXHQgIHRoaXMuU1t0aGlzLmpdID0gdDtcblx0ICByZXR1cm4gdGhpcy5TWyh0ICsgdGhpcy5TW3RoaXMuaV0pICYgMjU1XTtcblx0fVxuXG5cdEFyY2ZvdXIucHJvdG90eXBlLmluaXQgPSBBUkM0aW5pdDtcblx0QXJjZm91ci5wcm90b3R5cGUubmV4dCA9IEFSQzRuZXh0O1xuXG5cdC8vIFBsdWcgaW4geW91ciBSTkcgY29uc3RydWN0b3IgaGVyZVxuXHRmdW5jdGlvbiBwcm5nX25ld3N0YXRlKCkge1xuXHQgIHJldHVybiBuZXcgQXJjZm91cigpO1xuXHR9XG5cblx0Ly8gUG9vbCBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0IGFuZCBncmVhdGVyIHRoYW4gMzIuXG5cdC8vIEFuIGFycmF5IG9mIGJ5dGVzIHRoZSBzaXplIG9mIHRoZSBwb29sIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKVxuXHR2YXIgcm5nX3BzaXplID0gMjU2O1xuXG4gIEJpZ0ludGVnZXIuU2VjdXJlUmFuZG9tID0gU2VjdXJlUmFuZG9tO1xuICBCaWdJbnRlZ2VyLkJpZ0ludGVnZXIgPSBCaWdJbnRlZ2VyO1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQmlnSW50ZWdlcjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkJpZ0ludGVnZXIgPSBCaWdJbnRlZ2VyO1xuICAgIHRoaXMuU2VjdXJlUmFuZG9tID0gU2VjdXJlUmFuZG9tO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanNibi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgdmFyIHBvcyA9IHBhcnQuaW5kZXhPZignXT0nKSA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IHBhcnQuaW5kZXhPZignXT0nKSArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IFtdLmNvbmNhdChvYmpba2V5XSkuY29uY2F0KHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiBwYXJzZU9iamVjdFJlY3Vyc2l2ZShjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjaGFpbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IGNoYWluLnNoaWZ0KCk7XG5cbiAgICB2YXIgb2JqO1xuICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgIG9iaiA9IFtdO1xuICAgICAgICBvYmogPSBvYmouY29uY2F0KHBhcnNlT2JqZWN0KGNoYWluLCB2YWwsIG9wdGlvbnMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjbGVhblJvb3QsIDEwKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWlzTmFOKGluZGV4KSAmJlxuICAgICAgICAgICAgcm9vdCAhPT0gY2xlYW5Sb290ICYmXG4gICAgICAgICAgICBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4ID49IDAgJiZcbiAgICAgICAgICAgIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9ialtpbmRleF0gPSBwYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gcGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5c1xuICAgICAgICAvLyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fTtcblxuICAgIGlmIChvcHRpb25zLmRlY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRpb25zLmRlbGltaXRlcikgPyBvcHRpb25zLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcjtcbiAgICBvcHRpb25zLmRlcHRoID0gdHlwZW9mIG9wdGlvbnMuZGVwdGggPT09ICdudW1iZXInID8gb3B0aW9ucy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoO1xuICAgIG9wdGlvbnMuYXJyYXlMaW1pdCA9IHR5cGVvZiBvcHRpb25zLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdDtcbiAgICBvcHRpb25zLnBhcnNlQXJyYXlzID0gb3B0aW9ucy5wYXJzZUFycmF5cyAhPT0gZmFsc2U7XG4gICAgb3B0aW9ucy5kZWNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXI7XG4gICAgb3B0aW9ucy5hbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dEb3RzIDogZGVmYXVsdHMuYWxsb3dEb3RzO1xuICAgIG9wdGlvbnMucGxhaW5PYmplY3RzID0gdHlwZW9mIG9wdGlvbnMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cztcbiAgICBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9IHR5cGVvZiBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXM7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9IHR5cGVvZiBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdDtcbiAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3FzL2xpYi9wYXJzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHlcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICB2YXIgc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcbiAgICB2YXIgc2tpcE51bGxzID0gdHlwZW9mIG9wdGlvbnMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscztcbiAgICB2YXIgZW5jb2RlID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZTtcbiAgICB2YXIgZW5jb2RlciA9IHR5cGVvZiBvcHRpb25zLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyO1xuICAgIHZhciBzb3J0ID0gdHlwZW9mIG9wdGlvbnMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc29ydCA6IG51bGw7XG4gICAgdmFyIGFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dEb3RzO1xuICAgIHZhciBzZXJpYWxpemVEYXRlID0gdHlwZW9mIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGU7XG4gICAgdmFyIGVuY29kZVZhbHVlc09ubHkgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0cy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZSA/IGVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcXMvbGliL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVjayBpZiBgZm5gIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmbikge1xuICB2YXIgdGFnID0gaXNPYmplY3QoZm4pID8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZuKSA6ICcnO1xuICByZXR1cm4gdGFnID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3VwZXJhZ2VudC9saWIvaXMtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxuICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlcXVlc3RCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVxdWVzdEJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gX2NsZWFyVGltZW91dCgpe1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICBkZWxldGUgdGhpcy5fdGltZXI7XG4gIGRlbGV0ZSB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVzcG9uc2UgYm9keSBwYXJzZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgaW5jb21pbmcgZGF0YSBpbnRvIHJlcXVlc3QuYm9keVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGZuKXtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZm9ybWF0IG9mIGJpbmFyeSByZXNwb25zZSBib2R5LlxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXG4gKiB3aGljaCByZXR1cm4gQmxvYiBhbmQgQXJyYXlCdWZmZXIsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5yZXNwb25zZVR5cGUoJ2Jsb2InKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsKXtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXF1ZXN0IGJvZHkgc2VyaWFsaXplclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBkYXRhIHNldCB2aWEgLnNlbmQgb3IgLmF0dGFjaCBpbnRvIHBheWxvYWQgdG8gc2VuZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoZm4pe1xuICB0aGlzLl9zZXJpYWxpemVyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dHMuXG4gKlxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxuICogLSBkZWFkbGluZSBpcyB0aGUgdGltZSBmcm9tIHN0YXJ0IG9mIHRoZSByZXF1ZXN0IHRvIHJlY2VpdmluZyByZXNwb25zZSBib2R5IGluIGZ1bGwuIElmIHRoZSBkZWFkbGluZSBpcyB0b28gc2hvcnQgbGFyZ2UgZmlsZXMgbWF5IG5vdCBsb2FkIGF0IGFsbCBvbiBzbG93IGNvbm5lY3Rpb25zLlxuICpcbiAqIFZhbHVlIG9mIDAgb3IgZmFsc2UgbWVhbnMgbm8gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG1zIG9yIHtyZXNwb25zZSwgcmVhZCwgZGVhZGxpbmV9XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiB0aW1lb3V0KG9wdGlvbnMpe1xuICBpZiAoIW9wdGlvbnMgfHwgJ29iamVjdCcgIT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnM7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvcih2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlICdkZWFkbGluZSc6XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jlc3BvbnNlJzpcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIHRpbWVvdXQgb3B0aW9uXCIsIG9wdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIG9uIGVycm9yLlxuICpcbiAqIEZhaWxlZCByZXF1ZXN0cyB3aWxsIGJlIHJldHJpZWQgJ2NvdW50JyB0aW1lcyBpZiB0aW1lb3V0IG9yIGVyci5jb2RlID49IDUwMC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmV0cnkgPSBmdW5jdGlvbiByZXRyeShjb3VudCl7XG4gIC8vIERlZmF1bHQgdG8gMSBpZiBubyBjb3VudCBwYXNzZWQgb3IgdHJ1ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBjb3VudCA9PT0gdHJ1ZSkgY291bnQgPSAxO1xuICBpZiAoY291bnQgPD0gMCkgY291bnQgPSAwO1xuICB0aGlzLl9tYXhSZXRyaWVzID0gY291bnQ7XG4gIHRoaXMuX3JldHJpZXMgPSAwO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0cnkgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9yZXRyeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgaWYgKCF0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiBzdXBlcmFnZW50IHJlcXVlc3Qgd2FzIHNlbnQgdHdpY2UsIGJlY2F1c2UgYm90aCAuZW5kKCkgYW5kIC50aGVuKCkgd2VyZSBjYWxsZWQuIE5ldmVyIGNhbGwgLmVuZCgpIGlmIHlvdSB1c2UgcHJvbWlzZXNcIik7XG4gICAgfVxuICAgIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24oaW5uZXJSZXNvbHZlLCBpbm5lclJlamVjdCl7XG4gICAgICBzZWxmLmVuZChmdW5jdGlvbihlcnIsIHJlcyl7XG4gICAgICAgIGlmIChlcnIpIGlubmVyUmVqZWN0KGVycik7IGVsc2UgaW5uZXJSZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZnVsbGZpbGxlZFByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihjYikge1xuICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2IpO1xufTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2IpIHRocm93IEVycm9yKFwiQ2FsbGJhY2sgcmVxdWlyZWRcIik7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV8QnVmZmVyfGZzLlJlYWRTdHJlYW19IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcblxuICAvLyBuYW1lIHNob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gb2JqZWN0LlxuICBpZiAobnVsbCA9PT0gbmFtZSB8fCAgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5maWVsZCgpIGNhbid0IGJlIHVzZWQgaWYgLnNlbmQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICBmb3IgKHZhciBpIGluIHZhbCkge1xuICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKG51bGwgPT09IHZhbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsKSB7XG4gICAgdmFsID0gJycgKyB2YWw7XG4gIH1cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyICYmIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24ob24pe1xuICAvLyBUaGlzIGlzIGJyb3dzZXItb25seSBmdW5jdGlvbmFsaXR5LiBOb2RlIHNpZGUgaXMgbm8tb3AuXG4gIGlmKG9uPT11bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGluZyBpbiBicm93c2VyIFhIUiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZWRpcmVjdHMgPSBmdW5jdGlvbihuKXtcbiAgdGhpcy5fbWF4UmVkaXJlY3RzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdCAobm90IEpTT04gc3RyaW5nKSBvZiBzY2FsYXIgcHJvcGVydGllcy5cbiAqIE5vdGUgYXMgdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gcmV0dXJuIGEgdXNlZnVsIG5vbi10aGlzIHZhbHVlLFxuICogaXQgY2Fubm90IGJlIGNoYWluZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZXNjcmliaW5nIG1ldGhvZCwgdXJsLCBhbmQgZGF0YSBvZiB0aGlzIHJlcXVlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyXG4gIH07XG59O1xuXG5cbi8qKlxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcbiAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIGlzT2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBkYXRhKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGlmICgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyA9PSB0eXBlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fZGF0YVxuICAgICAgICA/IHRoaXMuX2RhdGEgKyAnJicgKyBkYXRhXG4gICAgICAgIDogZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9ICh0aGlzLl9kYXRhIHx8ICcnKSArIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCFpc09iaiB8fCB0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8ganNvblxuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24oc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl90aW1lb3V0RXJyb3IgPSBmdW5jdGlvbihyZWFzb24sIHRpbWVvdXQsIGVycm5vKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGVyciA9IG5ldyBFcnJvcihyZWFzb24gKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG4gIC8vIHJlc3BvbnNlIHRpbWVvdXRcbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignUmVzcG9uc2UgdGltZW91dCBvZiAnLCBzZWxmLl9yZXNwb25zZVRpbWVvdXQsICdFVElNRURPVVQnKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlc3BvbnNlQmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlc3BvbnNlQmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICAgIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKXtcbiAgICAvLyBUT0RPOiBtb2FyIVxuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAgIC8vIGNvbnRlbnQtdHlwZVxuICAgIHZhciBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgdGhpcy50eXBlID0gdXRpbHMudHlwZShjdCk7XG5cbiAgICAvLyBwYXJhbXNcbiAgICB2YXIgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcblxuICAgIHRoaXMubGlua3MgPSB7fTtcblxuICAgIC8vIGxpbmtzXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGhlYWRlci5saW5rKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtzID0gdXRpbHMucGFyc2VMaW5rcyhoZWFkZXIubGluayk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc3RhdHVzKXtcbiAgICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgICAvLyBzdGF0dXMgLyBjbGFzc1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgICAvLyBiYXNpY3NcbiAgICB0aGlzLmluZm8gPSAxID09IHR5cGU7XG4gICAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgICB0aGlzLnJlZGlyZWN0ID0gMyA9PSB0eXBlO1xuICAgIHRoaXMuY2xpZW50RXJyb3IgPSA0ID09IHR5cGU7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgICAgID8gdGhpcy50b0Vycm9yKClcbiAgICAgICAgOiBmYWxzZTtcblxuICAgIC8vIHN1Z2FyXG4gICAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzO1xuICAgIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gICAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRVJST1JfQ09ERVMgPSBbXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQUREUklORk8nLFxuICAnRVNPQ0tFVFRJTUVET1VUJ1xuXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hvdWxkUmV0cnkoZXJyLCByZXMpIHtcbiAgaWYgKGVyciAmJiBlcnIuY29kZSAmJiB+RVJST1JfQ09ERVMuaW5kZXhPZihlcnIuY29kZSkpIHJldHVybiB0cnVlO1xuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHJldHVybiB0cnVlO1xuICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgaWYgKGVyciAmJiAndGltZW91dCcgaW4gZXJyICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGVyciAmJiAnY3Jvc3NEb21haW4nIGluIGVycikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3VwZXJhZ2VudC9saWIvc2hvdWxkLXJldHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N1cGVyYWdlbnQvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBOzs7Ozs7OztBQ2pDQTtBQUdBOzs7QUFRQTs7O0FBUUE7QUFHQTs7O0FBTUE7OztBQU1BOzs7QUFRQTtBQUNBO0FBRUE7QUFDQTs7QUFHQTs7O0FDbERBOzs7Ozs7QUNNQTtBQUdBO0FBQ0E7OztBQVNBOzs7QUNmQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FDRUE7QUFDQTs7Ozs7QUNMQTs7QUFJQTtBQUNBOzs7Ozs7QUFvQkE7QUFLQTs7QUFLQTtBQUNBOzs7Ozs7QUN0QkE7QUFLQTtBQUdBO0FBR0E7QUFLQTs7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBSUE7OztBQUdBO0FBQ0E7QUFFQTtBQUNBOzs7QUFlQTtBQUVBO0FBQ0E7QUFDQTs7QUFPQTtBQUNBOztBQVFBO0FBQ0E7OztBQzdGQTs7OztBQUtBO0FBQ0E7QUFFQTtBQUNBOzs7QUNJQTs7O0FBR0E7Ozs7Ozs7O0FBb0JBOztBQU1BOzs7Ozs7QUFTQTs7QUFLQTtBQUtBO0FBSUE7QUFFQTs7O0FBUUE7OztBQUlBOztBQUtBO0FBSUE7QUFVQTs7O0FBZ0JBOzs7OztBQWNBO0FBQ0E7QUFHQTs7QUFLQTtBQUNBOztBQVFBO0FBR0E7Ozs7O0FBNEJBO0FBS0E7QUFFQTtBQUNBO0FBQUE7O0FBRUE7O0FBTUE7QUFHQTtBQUNBO0FBT0E7QUFDQTs7Ozs7O0FBUUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFNQTtBQUVBOzs7OztBQWVBOztBQVFBO0FBQ0E7OztBQU9BO0FBQ0E7O0FBUUE7QUFFQTs7QUFTQTs7O0FBU0E7OztBQVlBOzs7Ozs7QUM1U0E7QUFHQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTs7QUFJQTs7Ozs7Ozs7QUNKQTtBQUNBO0FBSUE7O0FBRUE7O0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFRQTs7Ozs7QUEwQkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBOztBQUtBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUlBO0FBSUE7O0FBSUE7QUFDQTs7QUFLQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBS0E7Ozs7O0FBTUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7Ozs7O0FBT0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7QUFJQTs7O0FBSUE7QUFHQTtBQUdBOztBQUdBO0FBR0E7QUFFQTs7Ozs7QUFrQkE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFFQTs7QUFFQTs7QUFHQTtBQUNBOzs7O0FBS0E7O0FBU0E7Ozs7QUFTQTs7O0FBTUE7OztBQU9BO0FBQ0E7QUFDQTs7QUFHQTs7O0FBS0E7QUFDQTs7OztBQ2pRQTtBQUVBOzs7Ozs7Ozs7O0FYeUNBO0FBQ0E7OztBQU1BO0FBQ0E7Ozs7QVkvREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7OztBVmFBOztBS0RBO0FBR0E7OztBQ3lTQTs7Ozs7O0FHN1BBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBU0E7QUFDQTs7Ozs7Ozs7QUU5REE7QUFDQTs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFMQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFMQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3R0E7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFIQTtBQVlBO0FBdkRBOzs7Ozs7OztBQ2xCQTs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUkE7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBREE7QUFGQTtBQVlBO0FBdkNBOzs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEE7QUFXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU5BO0FBakJBO0FBREE7QUFtQ0E7QUFoRUE7Ozs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQVNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQVZBO0FBREE7QUFEQTtBQW9CQTtBQXJCQTtBQXdCQTtBQWhEQTs7Ozs7Ozs7O0FDWkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBTkE7QUFEQTtBQUZBO0FBaUJBOzs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3Z2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1MENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9