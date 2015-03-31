class AlloyBar extends HTMLElement {
    createdCallback() {
        this.alloy = AlloyElements[this.tagName.toLowerCase()];
        console.log(this.tagName, this.alloy);
        this.originalContent = this.innerHTML;
        var template = this.alloy.content.cloneNode(true);
        var h1 = this.querySelector('h1');
        template.querySelector('.alloy-bar-wrapper').appendChild(h1);
        this.appendChild(template);
    }
}

document.registerElement('alloy-bar', AlloyBar);
