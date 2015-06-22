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
    Terne.render(<div>
        <terne-list items={itemStore.items} />
        <terne-item />
    </div>, document.body);
};
itemStore.onChange();


