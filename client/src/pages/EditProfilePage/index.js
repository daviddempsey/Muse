import { Component } from 'react';

class EditProfilePage extends Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      Biography: 'Edit your biography!',
    };
    //event handlers for when we update text field and submit button
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    this.getBiography();
  }

  getBiography() {
    //var bioText = UserService.getBiography();
    var bioText = 'place holder for UserService';
    this.setState({ Biography: bioText });
  }

  /*event handler for when our text field changes so we update this.state.value
            and text box to reflect change*/
  handleClick(event) {
    this.setState({ Biography: event.target.Biography });
  }
  /* event handler for when user hits submit button*/
  handleSubmit(event) {
    //bioText = this.state.value;
    alert('Biography updated: ' + this.state.Biography);
    event.preventDefault();
  }

  /* render text box*/
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Biography:
          <textarea value={this.state.Biography} />{' '}
        </label>{' '}
        <input type='submit' value='Save' onClick={this.state.handleChange} />{' '}
      </form>
    );
  }
}

export default EditProfilePage;
