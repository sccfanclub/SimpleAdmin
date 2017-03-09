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

    componentDidMount() {
    fetch("http://127.0.0.1:3001/get")
        .then(res => {
            return res.json()})
        .then(results =>{
            results.map(item => {this.state.items.push(item)});
            this.setState(this.state);
        })
        .bind(this);
}
  
  onClick() {
    if (this.state.newProject && this.state.newLink && this.state.newName) {
      let newItem = {project: this.state.newProject, link: this.state.newLink, name: this.state.newName};
      console.log(newItem)
      this.state.items.push(newItem);
      this.setState(this.state);
      this.postData(newItem);
    }
  }

  render() {
    const {newProject, newName, newLink, items} = this.state;
    return (
      <div >
        <div>
          <div>
            <label htmlFor="project">项目</label>
            <input type="text" id="project"  placeholder="please input project" onChange={event => this.setState({newProject: event.target.value})}
                   value={newProject}/>
            <label htmlFor="name">名字</label>
            <input type="text" id="name"  placeholder="please input name" onChange={event => this.setState({newName: event.target.value})}
                   value={newName}/>
            <label htmlFor="link">链接</label>
            <input type="text" id="link" placeholder="please input link" onChange={event => this.setState({newLink: event.target.value})}
                   value={newLink}/>
            <button onClick={this.onClick}>add</button>
          </div>
          <div id="list_item">
            {/*<h3 style={{color: 'blue'}}>{this.state.project}</h3>*/}
            {items.map((item, index) => (<div key={index}><a href={item.item.link}>{item.project + " " + item.item.name}</a></div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
