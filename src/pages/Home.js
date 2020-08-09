import React, { Component, } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Badge,Button, Form, Input, Label, FormGroup, Card, CardImg, CardText, CardBody,
    CardTitle, } from 'reactstrap';
import 'react-google-places-autocomplete/dist/index.min.css';
import FadeIn from 'react-fade-in';
import Chip from '@material-ui/core/Chip';
import HorizontalScroll from 'react-scroll-horizontal'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { getRandom } from '../actions/itemActions';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import { Trans } from 'react-i18next'
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

class Home extends Component {
    
    state = {
        title: '',
        date: '',
        time:'',    
        categories: [],
        persons: '',
        submit: false,
        error: false,
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired,
        getRandom: PropTypes.func.isRequired,
    }
    componentDidMount(){
        this.props.getRandom(); 
    }
    onChange = e => {
        this.setState({ [e.target.name] : e.target.value})
    }
    toggle = m => {
        let item = m;
        if(this.state.categories.includes(m)){
            this.setState({categories: this.state.categories.filter(function(category) { 
                return category !== item
            })});
        }else{
            this.setState(previousState => ({
                categories: [...previousState.categories, item]
            }));
        }
    }
    onSubmit = e => {
        e.preventDefault();
        {this.setState({
            sumbit: true
        })}
    }
    setError = () => {
        this.setState({
            error: true
        })
    }
    closeAlert = () => {
        this.setState({
            error: false,
        })
        
    }
    render() {
        const { random , loading } = this.props.item;
        const { categories , categoriesloading } = this.props.categories;
        const { t } = this.props;
        return (
            <div>
                                <Grid 
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="full-height">
                                    { !loading && !categoriesloading ? 
                                    
                                        <div>
                              
                                <div className="row">
                                <div className="col-lg-7 background-image"></div>
                                </div>
                               
                                <FadeIn>
                                <Container>
                            <div className="section homepage flex-column-reverse">
                                <div className="row">
                                    <div className="home-picture col-lg-7 ">
                                    <h1 className="whitetext">
                                    <Trans i18nKey="hometitle">
                                    </Trans>
                                    </h1>

                                   
                                    
                                    <div className="indekijker d-md-none d-lg-block ">
                                    <h1 className="whitetext"><Trans i18nKey="homesubtitle">
                                    </Trans></h1>
                                     <div className="row ">
                                    { random.data && random.data.map((m, i) => {
                                        
                                        return(
                                            <div className="col-lg-6 my-2 d-flex align-items-stretch" key={i}>
                                            
                                            <FadeIn
                                                transitionDuration="500"
                                                delay="100"
                                                className="d-flex align-items-stretch"
                                            >
                                                 <Link to={{
                                                        pathname: `/restaurants:${m.id}`,
                                                        
                                                        }}>
                                            <Card key={m.id} className="h-100">
                                            <CardImg top width="100%" className='cardimgTest'  src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.primary_img}`} alt="Card image cap" />
                                            <CardBody>
                                            <CardTitle><h5><strong>{m.title}</strong></h5></CardTitle>
                                            <CardText><Badge>{m.category.title}</Badge>
                                            <p className="pt-1"><RoomIcon /> {m.address} </p>
                                            {m.ratings ? <div className="row"><Box><Rating name="rating" precision={0.5} defaultValue={m.average_rating} readOnly/></Box> <div> ( {m.totalrating} )</div> </div>: null }
                                            </CardText>
                                       
                                            </CardBody>
                                                </Card>
                                                </Link>
                                                </FadeIn>  
                                                </div>
                                        
                                        )})} 
                                    </div> 
                                    </div>
                                </div>     
                            
                                <div className="col-lg offset-lg-1">
                                    <Card className="homecard">                                
                                    <CardBody>
                                    <h3><Trans i18nKey="homecardtitle">
                                    </Trans></h3>
                                    {this.state.error ? ( <Alert severity="error" onClose={() => this.closeAlert()}> <Trans i18nKey="timedateerror"></Trans> </Alert> ): null }
                                    <p><Trans i18nKey="kitchen">
                                    </Trans></p>
                                    <div className="row keuken-row overflow-x-scroll" >
                                    <HorizontalScroll>
                                   { categories.length > 1 && categories.map((m,i) => {
                                        return (
                                          
                                               <Chip key={i} label={m.title} value={m.title} color={this.state.categories.includes(m) ? 'primary' : 'default'} onClick={() => this.toggle(m)} />   
                                                
                                        )
                                    })}
                                    </HorizontalScroll>
                              
                                    </div>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                        <Label for="title"><Trans i18nKey="name">
                                    </Trans></Label>
                                        <Input 
                                                type="input"
                                                name="title"
                                                onChange={this.onChange}
                                                id="title"
                                                placeholder="Search by name"
                                                />
                                                <Label for="date"><Trans i18nKey="date">
                                    </Trans></Label>
                                                <Input
                                                type="date"
                                                name="date"
                                                min= {moment().format("YYYY-MM-DD")}
                                                onChange={this.onChange}
                                                required={this.state.time != ''}
                                                id="date"
                                                placeholder="date placeholder"
                                                />
                                            
                                                <Label for="time"><Trans i18nKey="hour">
                                    </Trans></Label>
                                                <Input
                                                type="time"
                                                name="time"
                                                required={this.state.date != ''}
                                                onChange={this.onChange}
                                                id="time"
                                                placeholder="time placeholder"
                                                />
                                                <Label for="persons"><Trans i18nKey="persons">
                                    </Trans></Label>
                                                <Input type="select" name="persons" id="persons" onChange={this.onChange}>
                                                    <option value="">Kies ...</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                </Input>
                                                {this.state.date != '' || this.state.time != ''  ?
                                                this.state.date != '' && this.state.time != '' ?
                                                <Link to={{
                                                    pathname: "/restaurants",
                                                    searchProps: {
                                                        categories: this.state.categories,
                                                        date: this.state.date ,
                                                        time: this.state.time,
                                                        persons: this.state.persons,
                                                        title: this.state.title
                                                    }
                                                    }}>
                                                        { this.state.error ? this.closeAlert() : null }
                                                <Button 
                                                className="mb-2 mt-2 buttonstyle noradius"
                                                color="dark"
                                                block 
                                                renderAs="button">
                                                <span><Trans i18nKey="search">
                                                    </Trans></span>
                                                </Button>
                                                </Link>
                                                :  
                                                
                                                <Link to={{
                                                    pathname: "/restaurants",
                                                    searchProps: {
                                                        categories: this.state.categories,
                                                        date: this.state.date ,
                                                        time: this.state.time,
                                                        persons: this.state.persons,
                                                        title: this.state.title
                                                    }
                                                    }}>
                                                       { this.state.error ? null : this.setError() }
                                                <Button 
                                                className="mb-2 mt-2 buttonstyle noradius"
                                                color="dark"
                                                disabled
                                                block 
                                                renderAs="button">
                                                <span><Trans i18nKey="search">
                                                    </Trans></span>
                                                </Button>
                                                </Link> 
                                            : <Link to={{
                                                pathname: "/restaurants",
                                                searchProps: {
                                                    categories: this.state.categories,
                                                    persons: this.state.persons,
                                                    title: this.state.title,
                                                    date: this.state.date ,
                                                    time: this.state.time,
                                                }
                                                }}>
                                            <Button 
                                            className="my-4 buttonstyle noradius"
                                            color="dark"
                                            block 
                                            renderAs="button">
                                            <span><Trans i18nKey="search">
                                                </Trans></span>
                                            </Button>
                                            </Link> }
                                        </FormGroup>
                                    </Form>
                                    </CardBody>
                                    </Card> 
                                </div> 
                                
                            </div>
                              
                            </div>
                            </Container>
                            </FadeIn>
                            </div>
                             : null }
                            </Grid>
                            
                            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item,
    categories: state.categories,
})
export default connect(mapStateToProps, { getRandom })(Home)
