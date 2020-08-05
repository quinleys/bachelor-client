import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink,  } from 'reactstrap';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'; 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Translation } from 'react-i18next';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import Alert from '@material-ui/lab/Alert';
class RegisterModel extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        address: '',
        password: '',
        password_confirmation: '',
        msg: null,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    }
    componentDidUpdate(prevProps) {
        console.log('state modal', this.state.modal)
        const {error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg })
            } else {
                this.setState({msg: null})
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }
    componentWillUnmount(){
        this.props.clearErrors()
    }
    toggle = () => {
        console.log('toggle')
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit = event => {
        event.preventDefault()
        const { name, password, email, password_confirmation } = this.state;
        if(password == password_confirmation){
            this.setState({
                msg: ''
            })
            const newUser = {
                name,
                password,
                email,
                password_confirmation
            }
            console.log(newUser);
            this.props.clearErrors()
            
            // attempt login 
            this.props.register(newUser);
        }else{
            console.log('something went wrong')
            this.setState({
                msg: 'Please make sure the passwords match!'
            })
        }
        

    }
    closeAlert = () => {
        this.setState({
            alert: false
        })
        this.props.clearErrors();
    }
    render() {
        return (
            <Container>
                <p onClick={this.toggle} href="#"><Trans i18nKey="noaccount"></Trans></p>
                <Modal 
                    className="modalMargin"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                > 
                    <ModalHeader toggle={this.toggle}><Trans i18nKey="register"></Trans></ModalHeader>
                    <ModalBody>
                        {this.state.msg ? ( <Alert severity="error"  > {this.state.msg} </Alert> ): null }
        { this.props.error && this.props.error.status == 'REGISTER_FAIL'  ? <Alert severity="error" onClose={() => this.closeAlert()}> {this.props.error.message ?  this.props.error.message  :  <Trans i18nKey="loginfailed"></Trans> }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name"><Trans i18nKey="name"></Trans></Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholer="Username"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email"><Trans i18nKey="email"></Trans></Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    required
                                    placeholer="Username"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password"><Trans i18nKey="password"></Trans></Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="mb-3"
                                    placeholer="Password"
                                    onChange={this.onChange}
                                />
                                <Label for="password_confirmation"><Trans i18nKey="passwordconfirmation"></Trans></Label>
                                <Input
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    required
                                    className="mb-3"
                                    placeholer="Password Confirmation"
                                    onChange={this.onChange}
                                />
                                 { this.props.auth.isLoading ?  <Button 
                                    className="mb-2 mt-2"
                                    color="dark"
                                    block
                                    disabled
        > <Trans i18nKey="loading"></Trans> 
                                </Button> :
                                <Button 
                                    className="mb-2 mt-2"
                                    color="dark"
                                    block
        > <Trans i18nKey="register"></Trans> 
                                </Button>
                                    }
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps,{register, clearErrors })(RegisterModel)