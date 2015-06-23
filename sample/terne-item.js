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
            let input = this.querySelector('input');
            this.trigger('create-item', input.value);
            input.value = '';
        });
    }
});
