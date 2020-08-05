import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink,  } from 'reactstrap';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'; 
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RegisterModal from '../Auth/RegisterModal';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Translation } from 'react-i18next';
import ErrorNotification from './ErrorNotifcation';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import Alert from '@material-ui/lab/Alert';
class LoginModal extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        msg: null,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    }
    componentDidUpdate(prevProps) {
        const {error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){ 
                console.log(error)
                this.setState({msg: error.msg })
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
        console.log('toggle', this.state.modal)
        this.setState({
            modal: !this.state.modal
        })
    }
    toggleNow = () => {
        console.log('toggle', this.state.modal)
        this.setState({
            modal: true
        }, function (){
            console.log('modal after change', this.state.modal)
        })
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit = event => {
        event.preventDefault()
        const { email, password } = this.state;
        if(this.state.email != '' && this.state.password != ''){
            const user = {
                email,
                password
            }
            // attempt login 
            this.props.login(user); 
        }
      

    }
    googleLogin = () => {
        window.location.href = 'http://127.0.0.1:8000/api/user/login/google' 
    }
    closeAlert = () => {
        this.setState({
            alert: false
        })
        this.props.clearErrors();
    }
    render() {
        const { error } = this.props.error
        return (
           <div>
               {this.props.type == 'reserveerbutton' ? 
               
               <Button className={this.props.custom ? 'fullLengthButton' : '' } onClick={this.toggle}><Trans i18nKey="reservate"></Trans></Button>
            : this.props.type == 'rating' ?
            <Button className={this.props.custom ? 'fullLengthButton' : '' } onClick={this.toggle}><Trans i18nKey="givearating"></Trans></Button> :
            <a className="loginbutton" onClick={() => this.toggleNow(true)}>
                <VpnKeyIcon/>
            {/* <Trans i18nKey="login"></Trans> */}
            </a> }
               {console.log(error, 'error')}
              
                <Container>
                    <Modal 
                        className="modalMargin"
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    > 
                    <ModalHeader toggle={this.toggle}><Trans i18nKey="login"></Trans></ModalHeader>
                    <ModalBody>
                        {console.log(this.props.error,'eeeeorrrrrorr')}
                    { this.props.error && this.props.error.status == 'LOGIN_FAIL'  ? <Alert severity="error" onClose={() => this.closeAlert()}> <Trans i18nKey="loginfailed"></Trans> </Alert> : null }
                        {this.state.msg ? ( <Alert  severity="error" > {this.state.msg} </Alert> ): null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name"><Trans i18nKey="email"></Trans></Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    required
                                    placeholer="email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="name"><Trans i18nKey="password"></Trans></Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="mb-3"
                                    placeholer="Password"
                                    onChange={this.onChange}
                                />
                                { this.props.auth.isLoading ? <div> <Button 
                                    className="mb-2 mt-2"
                                    color="dark"
                                    block
                                    disabled
        > <Trans i18nKey="loading"></Trans> 
                                </Button> 
                                 <Button 
                                 className="mb-2 mt-2"
                                 color="dark"
                                 block
                                 disabled
                                 onClick={this.googleLogin}
                             > <Trans i18nKey="logingoogle"></Trans>
                             </Button> </div>:
       
                                <div> 
                                <Button 
                                    className="mb-2 mt-2"
                                    color="dark"
                                    block
                                > <Trans i18nKey="login"></Trans>
                                </Button>
                                <Button 
                                    className="mb-2 mt-2"
                                    color="dark"
                                    block
                                    onClick={this.googleLogin}
                                > <Trans i18nKey="logingoogle"></Trans>
                                </Button>
                                </div>
                                  }
                                <p> <RegisterModal onClick={this.toggle}/> </p>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth,
});

export default connect(mapStateToProps,{login, clearErrors })(LoginModal)