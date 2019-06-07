import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card, Form, Input } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';
import { loginUser } from '../../services/loginService';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
    this.props.loginUser(user);
  };

  render() {
    const errors = this.state.errors;

    return (
      <div className="login-wrapper">
        <Card className="login-card" fluid>
          <Card.Header className="login-card-header">
            <span>
              <h1>Login</h1>
            </span>
          </Card.Header>
          <Card.Content className="login-card-content">
            <Form className="login-form">
              <Form.Field error={!!errors.email} required>
                <label for="email" className="login-field-text">
                  Email
                </label>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
                <span className="login-field-msg">{errors.email}</span>
              </Form.Field>

              <Form.Field error={!!errors.password} required>
                <label for="password" className="login-field-text">
                  Password
                </label>
                <Input
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
                <span className="login-field-msg">{errors.password}</span>
              </Form.Field>

              <Form.Field
                as={Button}
                className="login-button"
                onClick={this.onSubmit}
                animated="vertical"
                size="large"
                primary
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <FontAwesomeIcon icon={['fas', 'check']} size="1x" />
                </Button.Content>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);