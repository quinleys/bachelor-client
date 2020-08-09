import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSocial } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import  Spinner  from '../components/Components/Spinner/Spinner';
import { Link } from 'react-router-dom';

// the hoc
import { Trans } from 'react-i18next'
import { Container, Button } from 'reactstrap';
class SocialCallback extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        loginSocial: PropTypes.func.isRequired,
    }
    componentDidMount(){
        this.getQuery();
        /* const token = query.get('token')
        const id = query.get('id')
        console.log(token, id)
        this.props.loginSocial(id, token);  */
    }
    getQuery = () => {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const id = query.get('id')
        console.log('token', token, 'id', id)
     /*    this.props.loginSocial(query.get('id'), query.get('token')); */
        this.props.loginSocial(id, token);
    }
    render() {
        const { isLoading, isAuthenticated } = this.props.auth
        return (
            <div style={{'margin-top': "200px"}} className="dashboard">
                { isLoading ? 
                   <div> Please wait ... <Spinner /> </div>
                   : localStorage.getItem('authenticated') ? 
                   <div className="detail">
                   <Container>
                   <div className="row align-items-center justify-content-center">
                       <div className="col" style={{textAlign: 'center'}}>
                       <h1  >
                       <Trans i18nKey="loggedin">
                           </Trans>
                       </h1>
                    
                       <Link to="/">
                       <Button><Trans i18nKey="backtohome">
                           </Trans></Button>
                       </Link>
                       </div>
                   </div>
                   </Container>
                   
               </div>
           :
                   <p><Trans i18nKey="pageisnotavailable">
                   </Trans></p>
                }
                
              
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,

    error: state.error
});
export default connect(mapStateToProps,{loginSocial, clearErrors })(SocialCallback)