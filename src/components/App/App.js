import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls, deleteUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      errorMessage: ''
    }
  }

  componentDidMount() {
      getUrls()
      .catch(err => this.setState({errorMessage:'Sorry, server error please try again later'}))
      .then(data => this.setState({urls: data.urls}))
  }

  handleSubmit = (e, title, url) => {
    e.preventDefault();
    postUrls({long_url:url, title: title})
    .then(data => {
      if(data === 'Sorry, server error please try again later') {
      return this.setState({errorMessage: data})
      }
      return this.setState({urls: [...this.state.urls, data]})
    })
  }

  handleDelete = (e, id) => {
    deleteUrls(id)
    getUrls()
    .catch(err => this.setState({errorMessage:'Sorry, server error please try again later'}))
    .then(data => this.setState({urls: data.urls}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm handleSubmit={this.handleSubmit}/>
        </header>

        {this.state.errorMessage?<h1 style={{color:'red'}}>{this.state.errorMessage}</h1>:
        <UrlContainer handleDelete={this.handleDelete} urls={this.state.urls}/>}
      </main>
    );
  }
}

export default App;
