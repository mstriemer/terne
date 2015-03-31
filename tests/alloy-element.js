describe('Alloy.init', function() {
    'use strict';

    function createElement(html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.children[0];
    }

    it('renders the template', function() {
        var root = createElement(`<alloy-element name="alloy-init-base">
            <template>
                <h1>Alloy Test Element</h1>
                <p>This is a test.</p>
            </template>
        </alloy-element>`);
        document.body.appendChild(root);

        class AlloyInitBase extends HTMLElement {
            createdCallback() {
                Alloy.init(this);
            }
        }
        document.registerElement('alloy-init-base', AlloyInitBase);

        var el = document.createElement('alloy-init-base');
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent, 'Alloy Test Element');
        assert.equal(el.querySelector('p').textContent, 'This is a test.');
    });

    it('can pull content from the template', function() {
        var root = createElement(`<alloy-element name="alloy-init-content">
            <template>
                <h1>Alloy Test Element</h1>
                <p><content></content></p>
            </template>
        </alloy-element>`);
        document.body.appendChild(root);

        class AlloyInitContent extends HTMLElement {
            createdCallback() {
                Alloy.init(this);
            }
        }
        document.registerElement('alloy-init-content', AlloyInitContent);

        var el = createElement(`<alloy-init-content>This text goes in the p.</alloy-init-content>`);
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent, 'Alloy Test Element');
        assert.equal(el.querySelector('p').textContent,
                     'This text goes in the p.');
    });

    it('can select content from the template', function() {
        var root = createElement(`<alloy-element name="alloy-init-select">
            <template>
                <h1><content select="h1"></content></h1>
                <p><content select="p"></content></p>
            </template>
        </alloy-element>`);
        document.body.appendChild(root);

        class AlloyInitSelect extends HTMLElement {
            createdCallback() {
                Alloy.init(this);
            }
        }
        document.registerElement('alloy-init-select', AlloyInitSelect);

        var el = createElement(`<alloy-init-select>
            <h1>The h1 has some text</h1>
            <p>The p has some text.</p>
            <div>This div is ignored.</div>
            So is this content on its own.
        </alloy-init-select>`);
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent,
                     'The h1 has some text');
        assert.equal(el.querySelector('p').textContent,
                     'The p has some text.');
    });
});
