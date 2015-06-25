Terne.registerElement('terne-list', class {
    render() {
        return <ul>
            {this.props.items.map((item) => <li>{item}</li>)}
        </ul>;
    }
});
Terne.registerElement('terne-list-count', class {
    render() {
        return <div>{"There are " + this.props.items.length.toString() + " items"}</div>;
    }
});
