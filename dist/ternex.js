'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TerneCustomEvent = function TerneCustomEvent(event, detail) {
    var bubbles = true;
    var cancelable = true;
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, bubbles, cancelable, detail);
    return evt;
};
var T = {
    each: function each(list, callback) {
        return Array.prototype.forEach.call(list, callback);
    }
};

var TerneNode = function TerneNode(tagName, data) {
    _classCallCheck(this, TerneNode);

    this.tagName = tagName;
    this.data = data;

    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        children[_key2 - 2] = arguments[_key2];
    }

    this.children = children;
};

window.Terne = {
    elements: [],
    createElement: function createElement(tagName, attrs) {
        console.log('createElement');
        var tag = document.createElement(tagName);
        var setJSON = tagName.indexOf('-') !== -1;
        if (attrs) {
            Object.keys(attrs).forEach(function (name) {
                var value = setJSON ? JSON.stringify(attrs[name]) : attrs[name];
                tag.setAttribute(name, value);
            });
        }

        for (var _len = arguments.length, content = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            content[_key - 2] = arguments[_key];
        }

        if (content) {
            content.forEach(function (el) {
                if (el.split) {
                    tag.textContent = el;
                } else if (el.forEach) {
                    el.forEach(function (e) {
                        if (e.split) {
                            e = document.createTextNode(e);
                        }
                        tag.appendChild(e);
                    });
                } else {
                    tag.appendChild(el);
                }
            });
        }
        return tag;
    },
    render: function render(element, container) {
        console.log('Terne.render');
        container.innerHTML = '';
        container.appendChild(element);
    },
    registerElement: function registerElement(name, Handler) {
        document.registerElement(name, (function (_HTMLElement) {
            var _class = function _class() {
                _classCallCheck(this, _class);

                _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
            };

            _inherits(_class, _HTMLElement);

            _createClass(_class, [{
                key: 'createdCallback',
                value: function createdCallback() {
                    var _this = this;

                    console.log('createdCallback');
                    this.awaitingRender = false;
                    this.handler = new Handler();
                    this.handler.props = {};
                    this.handler.on = this.on.bind(this);
                    this.handler.trigger = this.trigger.bind(this);
                    this.handler.querySelector = this.querySelector.bind(this);
                    this.handler.querySelectorAll = this.querySelectorAll.bind(this);
                    this.handler.root = this;
                    T.each(this.attributes, function (attr) {
                        _this.handler.props[attr.name] = JSON.parse(attr.value);
                    });
                    if (typeof this.handler.init === 'function') {
                        this.handler.init();
                    }
                }
            }, {
                key: 'attributeChangedCallback',
                value: function attributeChangedCallback(name, oldValue, newValue) {
                    var _this2 = this;

                    console.log('attributeChangedCallback');
                    this.handler.props[name] = JSON.parse(newValue);
                    if (!this.awaitingRender) {
                        this.awaitingRender = true;
                        requestAnimationFrame(function () {
                            _this2.render();
                            _this2.awaitingRender = false;
                        });
                    }
                }
            }, {
                key: 'attachedCallback',
                value: function attachedCallback() {
                    console.log('attachedCallback');
                    this.render();
                }
            }, {
                key: 'render',
                value: function render() {
                    console.log('render');
                    var content = this.handler.render();
                    this.innerHTML = '';
                    this.appendChild(content);
                }
            }, {
                key: 'trigger',
                value: function trigger(eventName, payload) {
                    this.dispatchEvent(new TerneCustomEvent(eventName, payload));
                }
            }, {
                key: 'on',
                value: function on(eventName, callback) {
                    this.addEventListener(eventName, callback.bind(this.handler));
                }
            }]);

            return _class;
        })(HTMLElement));
    }
};

window.React = {
    createElement: Terne.createElement
};