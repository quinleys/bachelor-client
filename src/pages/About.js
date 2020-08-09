import React, { Component } from 'react'
import { Container  } from 'reactstrap';
export default class About extends Component {
    render() {
        return (
            <div className='padding-top text-center'>
                <Container>
                    <div className="row m-1">
                        <div className='col-12'>
                           <h3> About </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                           Deze website is de bachelorproef van Quinten Leysen. <br/>
                           
                         <strong>  Concept: </strong> <br /> <br />
                           We zitten momenteel in het midden van de corona-crisis. Er wordt een lockdown gehandhaafd. Mensen kunnen niet wachten om eindelijk terug hun normale leven te kunnen leiden. Opeens beseffen mensen hoe de normale dingen van het leven niet meer zo normaal zijn. Na het hoogtepunt van de crisis worden de restricities stilaan opgeheven. Iedereen wil er van profitieren dat ze terug buiten mogen en gaan geregeld uit eten. Maar in deze bizare tijden moet er voor elk restaurant een reservatie gemaakt worden. 

Maar het reservatieproces is helemaal niet zo gestroomleind zoals het zou moeten zijn en dit brengt heel wat frustraties met zich mee. Persoonlijk ga ik ook geregeld uit eten en heb ik deze frustraties vanuit de eerste hand beleeft. Zo zijn er verschillende platformen en manieren om te reserveren en gebruikt zowat elk restaurant een ander platform. Met deze bachelorproef wil ik het proces van het maken van een reservatie optimaliseren.
                            <br />
                         <strong>  De website is in opdracht gemaakt voor Artevelde Hogeschool.</strong>  <br />
                        </div>
                        <div className="col-md-6  mx-auto">
                            <img className="w-100" src={window.location.origin + '/ARTEVELDE_hs_logo RGB.jpg'} alt="artevelde logo" />
                        </div>
                    </div>
                </Container> 
            </div>
        )
    }
}
