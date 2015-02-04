class AlloyBar extends HTMLElement {
    createdCallback() {
        this.alloy = AlloyElements[this.tagName.toLowerCase()];
        console.log(this.tagName, this.alloy);
    }
}

document.registerElement('alloy-bar', AlloyBar);
