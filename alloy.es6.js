window.AlloyElements = {};

class AlloyElement extends HTMLElement {
    createdCallback() {
        this.name = this.getAttribute('name');
        if (!this.name) {
            throw new Error('name is required');
        } else if (this.name in AlloyElement) {
            throw new Error('element ' + this.name + ' is already defined');
        }
        this.template = this.querySelector('template');
        this.content = this.template.content;
        AlloyElements[this.name] = this;
    }
}

document.registerElement('alloy-element', AlloyElement);
