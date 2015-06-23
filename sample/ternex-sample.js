window.itemStore = {
    items: [],
    addItem(item) {
        this.items.push(item);
        this.onChange();
    },
};
document.body.addEventListener('create-item', function(e) {
    itemStore.addItem(e.detail);
});
itemStore.onChange = function() {
    Terne.render(<terne-list items={itemStore.items} />, window['terne-list']);
};
itemStore.onChange();
Terne.render(<terne-item />, window['terne-item']);
