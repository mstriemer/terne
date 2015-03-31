describe('Terne.init', function() {
    'use strict';

    function createElement(html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.children[0];
    }

    it('renders the template', function() {
        var root = createElement(`<terne-element name="terne-init-base">
            <template>
                <h1>Terne Test Element</h1>
                <p>This is a test.</p>
            </template>
        </terne-element>`);
        document.body.appendChild(root);

        class TerneInitBase extends HTMLElement {
            createdCallback() {
                Terne.init(this);
            }
        }
        document.registerElement('terne-init-base', TerneInitBase);

        var el = document.createElement('terne-init-base');
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent, 'Terne Test Element');
        assert.equal(el.querySelector('p').textContent, 'This is a test.');
    });

    it('can pull content from the template', function() {
        var root = createElement(`<terne-element name="terne-init-content">
            <template>
                <h1>Terne Test Element</h1>
                <p><content></content></p>
            </template>
        </terne-element>`);
        document.body.appendChild(root);

        class TerneInitContent extends HTMLElement {
            createdCallback() {
                Terne.init(this);
            }
        }
        document.registerElement('terne-init-content', TerneInitContent);

        var el = createElement(`<terne-init-content>This text goes in the p.</terne-init-content>`);
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent, 'Terne Test Element');
        assert.equal(el.querySelector('p').textContent,
                     'This text goes in the p.');
    });

    it('can select content from the template', function() {
        var root = createElement(`<terne-element name="terne-init-select">
            <template>
                <h1><content select="h1"></content></h1>
                <p><content select="p"></content></p>
            </template>
        </terne-element>`);
        document.body.appendChild(root);

        class TerneInitSelect extends HTMLElement {
            createdCallback() {
                Terne.init(this);
            }
        }
        document.registerElement('terne-init-select', TerneInitSelect);

        var el = createElement(`<terne-init-select>
            <h1>The h1 has some text</h1>
            <p>The p has some text.</p>
            <div>This div is ignored.</div>
            So is this content on its own.
        </terne-init-select>`);
        assert.equal(el.children.length, 2);
        assert.equal(el.querySelector('h1').textContent,
                     'The h1 has some text');
        assert.equal(el.querySelector('p').textContent,
                     'The p has some text.');
    });
});
