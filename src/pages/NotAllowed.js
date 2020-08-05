import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
  } from "react-router-dom";
  import { Translation } from 'react-i18next';
import i18n from '../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
  import { Container, Badge,Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink, Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, } from 'reactstrap';
export default class NotAllowed extends Component {
    
    render() {
        return (
            <div className="detail">
                <Container>
                <div className="row align-items-center justify-content-center">
                    <div className="col" style={{textAlign: 'center'}}>
                    <h1  >
                        Geen toegang!
                    </h1>
                    <h6>Oooops!!</h6>
                    <p><Trans i18nKey="pageisnotavailable">
                        </Trans></p>
                    <Link to="/">
                    <Button><Trans i18nKey="backtohome">
                        </Trans></Button>
                    </Link>
                    </div>
                </div>
                </Container>
                
            </div>
      
            );
            
        
    }
}
