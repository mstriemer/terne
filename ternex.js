let TerneCustomEvent = function(event, detail) {
    let bubbles = true;
    let cancelable = true;
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, bubbles, cancelable, detail);
    return evt;
};
let T = {
    each(list, callback) {
        return Array.prototype.forEach.call(list, callback);
    }
};

window.Terne = {
    elements: [],
    createElement(tagName, attrs, ...content) {
        console.log('createElement');
        let tag = document.createElement(tagName);
        if (attrs) {
            Object.keys(attrs).forEach((name) => {
                tag.setAttribute(name, JSON.stringify(attrs[name]));
            });
        }
        if (content) {
            content.forEach((el) => {
                if (el.split) {
                    tag.textContent = el;
                } else if (el.forEach) {
                    el.forEach((e) => {
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
    render(element, container) {
        console.log('Terne.render');
        container.innerHTML = '';
        container.appendChild(element);
    },
    registerElement(name, Handler) {
        document.registerElement(name, class extends HTMLElement {
            createdCallback() {
                console.log('createdCallback');
                this.handler = new Handler();
                this.handler.props = {};
                this.handler.on = this.on.bind(this);
                this.handler.trigger = this.trigger.bind(this);
                this.handler.querySelector = this.querySelector.bind(this);
                this.handler.querySelectorAll = this.querySelectorAll.bind(this);
                this.handler.root = this;
                T.each(this.attributes, (attr) => {
                    this.handler.props[attr.name] = JSON.parse(attr.value);
                });
                if (typeof this.handler.init === 'function') {
                    this.handler.init();
                }
            }
            attributeChangedCallback(name, oldValue, newValue) {
                console.log('attributeChangedCallback');
                this.handler.props[name] = JSON.parse(newValue);
                this.render();
            }
            attachedCallback() {
                console.log('attachedCallback');
                this.render();
            }
            render() {
                console.log('render');
                let content = this.handler.render();
                this.innerHTML = '';
                this.appendChild(content);
            }
            trigger(eventName, payload) {
                this.dispatchEvent(new TerneCustomEvent(eventName, payload));
            }
            on(eventName, callback) {
                this.addEventListener(eventName, callback.bind(this.handler));
            }
        });
    },
};

window.React = {
    createElement: Terne.createElement,
};
