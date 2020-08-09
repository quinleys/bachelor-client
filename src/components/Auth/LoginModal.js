import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup,   } from 'reactstrap';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'; 
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RegisterModal from '../Auth/RegisterModal';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { Trans } from 'react-i18next'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
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
      
        this.setState({
            modal: !this.state.modal
        })
    }
    toggleNow = () => {

        this.setState({
            modal: true
        }, function (){

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
        window.location.assign('https://quinten.staging.7.web.codedor.online/api/user/login/google')
       /*  window.location.replace =  */
       /*  window.location.href =  */
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
            <Button className='fullLengthButton' onClick={this.toggle}><Trans i18nKey="givearating"></Trans></Button> :
           this.props.type == "favoritebutton" ? 
           <Button  variant="outlined" className="outlinedButton" >
                    
           <div> <Trans i18nKey="favorite"></Trans> <FavoriteBorderIcon /> </div>
           </Button>
           :
           this.props.type == "comment" ?
           <Button className="my-2 noradius fullLengthButton" onClick={this.toggle}>
            <Trans i18nKey="writecomment"></Trans>
             </Button>
           :
           <a className="loginbutton" onClick={() => this.toggleNow(true)}>
                <VpnKeyIcon/>
            {/* <Trans i18nKey="login"></Trans> */}
            </a> }
             
              
                <Container>
                    <Modal 
                        className="modalMargin"
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    > 
                    <ModalHeader toggle={this.toggle}><Trans i18nKey="login"></Trans></ModalHeader>
                    <ModalBody>
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
                               <a href="https://quinten.staging.7.web.codedor.online/api/user/login/google">
                                 <Button 
                                 className="mb-2 mt-2"
                                 color="dark"
                                 block
                                 disabled
                               /*   onClick={this.googleLogin}  */
                             > <Trans i18nKey="logingoogle"></Trans>
                             </Button> 
                             </a>
                             </div>:
       
                                <div> 
                                <Button 
                                    className="mb-2 fullLengthButton mt-2"
                                    color="dark"
                                    block
                                    type='submit'
                                > <Trans i18nKey="login"></Trans>
                                </Button>
                                <a href="https://quinten.staging.7.web.codedor.online/api/user/login/google">
                                <Button 
                                    className="mb-2 fullLengthButton mt-2"
                                    color="dark"
                                    block
                                 /*    onClick={this.googleLogin} */
                                > <Trans i18nKey="logingoogle"></Trans>
                                </Button>
                                </a>
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