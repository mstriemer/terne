(function() {
    'use strict';

    function getHTML(elements) {
        return Array.prototype.map.call(elements, function(el) {
            return el.outerHTML;
        }).join('');
    }

    window.Alloy = {
        elements: {},
        init: function(element) {
            var elementName = element.tagName.toLowerCase();
            var alloy = Alloy.elements[elementName];
            element.innerHTML = alloy.render(element);
        },
    };

    class AlloyElement extends HTMLElement {
        createdCallback() {
            this.name = this.getAttribute('name');
            if (!this.name) {
                throw new Error('name is required');
            } else if (this.name in AlloyElement) {
                throw new Error(`element ${this.name} is already defined`);
            }
            this.template = this.querySelector('template');
            this.content = this.template.content;
            this.hasContent = !!this.content.querySelector('content');
            Alloy.elements[this.name] = this;
        }
        render(content) {
            var template = this.content.cloneNode(true);
            var contentTags = template.querySelectorAll('content');
            Array.prototype.forEach.call(contentTags, function(el) {
                var selected;
                var select = el.getAttribute('select');
                if (select) {
                    selected = content.querySelector(select);
                } else {
                    selected = content;
                }
                el.outerHTML = selected.innerHTML;
            });
            return getHTML(template.children);
        }
    }

    document.registerElement('alloy-element', AlloyElement);
})();
