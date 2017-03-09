import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.onClick = this.onClick.bind(this);
  }
  
  
  postData(newItem) {
    fetch("http://127.0.0.1:3001/add",
      {
        method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
        body:  JSON.stringify( newItem )
      });
  }

  //TODO
  // getData(){
  //     fetch("http://127.0.0.1:3001/get")
  //         .then(res => {
  //             return res.json()})
  //         .then(json =>{
  //             this.state.items.push(json);
  //             this.setState(this.state);
  //         })
  // }

    componentDidMount() {
    fetch("http://127.0.0.1:3001/get")
        .then(res => {
            return res.json()})
        .then(json =>{
            this.state.items.push(json);
            this.setState(this.state);
        })
        .bind(this);
}
  
  onClick() {
    if (this.state.newLink && this.state.newName) {
      let newItem = {link: this.state.newLink, name: this.state.newName};
      this.state.items.push(newItem);
      this.setState(this.state);
      this.postData(newItem);
    }
  }

  render() {
    const {newName, newLink, items} = this.state;
    return (
      <div>
        <div>
          <div>
            <label htmlFor="name">名字</label>
            <input type="text" id="name"  placeholder="please input name" onChange={event => this.setState({newName: event.target.value})}
                   value={newName}/>
            <label htmlFor="link">链接</label>
            <input type="text" id="link" placeholder="please input link" onChange={event => this.setState({newLink: event.target.value})}
                   value={newLink}/>
            <button onClick={this.onClick}>add</button>
          </div>
          
          <br/>
          <br/>
          
          <div id="list_item">

            {items.map((item, index) => (<div key={index}><a href={item.link}>{item.name}</a></div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
