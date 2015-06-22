Terne.registerElement('terne-list', class {
    render() {
        return <ul>
            {this.props.items.map((item) => <li>{item}</li>)}
        </ul>;
    }
});
