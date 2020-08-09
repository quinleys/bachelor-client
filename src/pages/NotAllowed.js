import React, { Component } from 'react'
import {
    Link,
  } from "react-router-dom";
import { Trans } from 'react-i18next'
  import { Container,Button, } from 'reactstrap';
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
