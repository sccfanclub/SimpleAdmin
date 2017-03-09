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
            results.map(item => {
                this.state.items.push(item)
                console.log(item)
            });
            this.setState(this.state);
        }).bind(this);
}
  
  onClick() {
    if (this.state.newProject && this.state.newUrl && this.state.newName) {
      let newItem = {project: this.state.newProject, url: this.state.newUrl, name: this.state.newName};
      console.log(newItem)
      this.state.items.push(newItem);
      this.setState(this.state);
      this.postData(newItem);
    }
  }

   itemAdd({newProject, newName, newUrl}) {
          return (
              <div class="item_add">
                  <label htmlFor="project">项目</label>
                  <input type="text" id="project"  placeholder="please input project" onChange={event => this.setState({newProject: event.target.value})}
                         value={newProject}/>
                  <label htmlFor="name">名字</label>
                  <input type="text" id="name"  placeholder="please input name" onChange={event => this.setState({newName: event.target.value})}
                         value={newName}/>
                  <label htmlFor="url">链接</label>
                  <input type="text" id="url" placeholder="please input url" onChange={event => this.setState({newUrl: event.target.value})}
                         value={newUrl}/>
                  <button onClick={this.onClick}>add</button>
              </div>
          );
   }

    itemList({items}) {
        return (
            <div id="item_list">
                <h3 style={{color: 'blue'}}>UCM:</h3>
                {items.map((item, index) => (
                    <div key={index}><a href={item.link.url}>{item.project + " " + item.link.name}</a></div>))}
            </div>
        );
    }

  render() {
    // const {newProject, newName, newUrl, items} = this.state;
    return (
      <div >
            {this.itemAdd(this.state)}
            {this.itemList(this.state)}
      </div>
    );
  }
}

export default App;
