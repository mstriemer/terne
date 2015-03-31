(function() {
    'use strict';

    class TerneBar extends HTMLElement {
        createdCallback() {
            Terne.init(this);
        }
    }

    document.registerElement('terne-bar', TerneBar);
})();
