Terne.registerElement('terne-item', class {
    render() {
        return <form>
            <input type="text" name="item" />
            <button type="submit">Create</button>
        </form>;
    }
    init() {
        this.on('submit', (e) => {
            e.preventDefault();
            this.trigger('create-item', this.querySelector('input').value);
            this.value = '';
        });
    }
});
