import React, { Component } from 'react'
import {
  
    Link,
  } from "react-router-dom";

// the hoc
import { Trans,  } from 'react-i18next'
  import { Container,Button,  } from 'reactstrap';
export default class NoMatch extends Component {
    
    render() {
        return (
            <div className="padding-top">
                <Container>
                <div className="row align-items-center justify-content-center">
                    <div className="col" style={{textAlign: 'center'}}>
                    <h1  >
                        404
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
