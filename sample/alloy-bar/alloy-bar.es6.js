(function() {
    'use strict';

    class AlloyBar extends HTMLElement {
        createdCallback() {
            Alloy.init(this);
            this.originalContent = this.innerHTML;
            var template = alloy.content.cloneNode(true);
            var h1 = this.querySelector('h1');
            template.querySelector('.alloy-bar-wrapper').appendChild(h1);
            this.appendChild(template);
        }
    }

    document.registerElement('alloy-bar', AlloyBar);
})();
