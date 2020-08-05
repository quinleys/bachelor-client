import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'

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