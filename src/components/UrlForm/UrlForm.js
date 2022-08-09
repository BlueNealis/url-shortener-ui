import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleChange = e => {
    const {value, name} = e.target
    this.setState({ [name]: value });
  }


  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleChange(e)}
        />

        <button onClick={e => {
          this.props.handleSubmit(e, this.state.title, this.state.urlToShorten)
          this.clearInputs()
        }
        }>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
