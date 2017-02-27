import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    if (this.state.newLink && this.state.newName) {
      this.state.items.push({link: this.state.newLink, name: this.state.newName});
      this.setState(this.state);
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
          
          <div>
            {items.map((item, index) => (<div key={index}><a href={item.link}>{item.name}</a></div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
