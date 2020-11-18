import React from 'react';
import ReactDOM from 'react-dom';

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/
class Biography extends React.Component {
    //constructor
    constructor(props) {
        super(props);
        // set default state of text element instead text box
        this.state = {
          value: 'Tell us a little bit about yourself :)'
        };
        //event handlers for when we update text field and submit button
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      /*event handler for when our text field changes so we update this.state.value
        and text box to reflect change*/
      handleChange(event) {
        this.setState({value: event.target.value});
      }
      /* event handler for when user hits submit button*/
      handleSubmit(event) {
        var biographyTxt = this.state.value;
        alert('Biography updated: ' + this.state.value);
        event.preventDefault();
      }
      
      /* render text box*/
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Biography:
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Save" />
          </form>
        );
      }
}

export default Biography;