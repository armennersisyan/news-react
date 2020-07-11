import React, {PureComponent} from "react";
import TextField from './TextField';
import SuccessMessage from './SuccessMessage';
import styles from './style.module.scss';
import PropTypes from "prop-types";

class ContactForm extends PureComponent {
  constructor(props) {
    super(props);
    this.emailFieldRef = React.createRef();
    this.messageFieldRef = React.createRef();
  }
  
  static propTypes = {
    onSuccess: PropTypes.func,
  };
  
  state = {
    fields: {
      email: '',
      message: '',
    },
    isSent: false,
    errors: {}
  };
  
  handleInputChange = (e) => {
    const fields = { ...this.state.fields };
    const key = e.target.name;
    const value = e.target.value;
    fields[key] = value;
    this.setState({
      fields,
      isSent: false,
    })
  };
  
  handleSendClick = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length) return;
    this.handleSuccess()
  };
  
  validate = () => {
    const errors = {
      ...this.emailFieldRef.current.validate(),
      ...this.messageFieldRef.current.validate()
    };
    this.setState({ errors });
    return errors
  };
  
  handleSuccess = () => {
    this.setState({ isSent: true });
  };
  
  render() {
    const { email, message } = this.state.fields;
    return (
      <div className={styles['contact-form']}>
        <div className="text-center">
          <h2>Get in touch</h2>
        </div>
        <TextField
          ref={this.emailFieldRef}
          type="text"
          name="email"
          placeholder="Your Email address"
          value={email}
          validate={(val) => (!val && 'Email Required')}
          onChange={(e) => this.handleInputChange(e)}
        />
        
        <TextField
          ref={this.messageFieldRef}
          type="textarea"
          name="message"
          placeholder="Your Message"
          value={message}
          validate={(val) => (!val && 'Message Required')}
          onChange={(e) => this.handleInputChange(e)}
        />
        
        <div className="text-center">
          <button
            className={styles['contact-form__btn']}
            onClick={this.handleSendClick}
          >
            Send Message
          </button>
        </div>
        <SuccessMessage
          show={this.state.isSent}
          message="Your message has been sent successfully!"
        />
      </div>
    )
  }
}

export default ContactForm
