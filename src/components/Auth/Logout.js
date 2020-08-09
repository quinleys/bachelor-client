import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

// the hoc
import { Trans } from 'react-i18next'

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <div onClick={this.props.logout} >
                <Trans i18nKey="logout"></Trans>
                </div>
            </Fragment>
        )
    }
}
export default connect(
    null,
    { logout }
)(Logout);