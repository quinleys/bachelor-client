import React, { Component } from 'react'
import { Container, Card } from 'reactstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { Button, Collapse, CardBody, Input, Form, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTables } from '../../actions/tableActions'
import { getExtras } from '../../actions/extraActions'
import { getRoom } from '../../actions/dashboardActions'; 
/* import { getRoom } from '../../actions/roomActions'; */
import Spinner from '../../components/Components/Spinner/Spinner'
import { Stage, Layer, Rect, Text, Circle, Line, Shape, Transformer, Image } from 'react-konva';
import Konva from 'konva';
import DeleteIcon from '@material-ui/icons/Delete';
import { updateRoom } from '../../actions/dashboardActions' 
import { removeRoom } from '../../actions/dashboardActions' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import Alert from '@material-ui/lab/Alert';
import { clearErrors } from '../../actions/errorActions'; 
import NotAllowed from '../NotAllowed';

class TransformerComponent extends React.Component {
    componentDidMount() {
      this.checkNode();
    }
    componentDidUpdate() {
      this.checkNode();
    }
    checkNode() {
      const stage = this.transformer.getStage();
      const { selectedShapeName } = this.props;
      const selectedNode = stage.findOne("." + selectedShapeName);
      if (selectedNode === this.transformer.node()) {
        return;
      }
      if (selectedNode) {
        this.transformer.attachTo(selectedNode);
      } else {
        this.transformer.detach();
      }
      this.transformer.getLayer().batchDraw();
    }
    render() {
      return (
        <Transformer
          ref={node => {
            this.transformer = node;
          }}
        />
      );
    }
  }

class EditRoom extends Component {
    constructor(props){
        super(props)
        this.state = {
            walls: [],
            extras: [
                /* { id: 1, title: 'Wc' , x: 10 , y: 10 , width: 100, height: 100 } */
            ],
            x: 0,
            y: 0,
            error: '',
            errorTables: '',
            title: '',
            toggle: false,
            toggle2: false,
            toggle3: false,
            errorExtra: '',
            amountOfWall: 0,
            lengthOfWall: [],
            length0: 0,
            length1: 0,
            setStateCorrect: true,
            length2: 0,
            length3:0,
            length4: 0,
            length5: 0,
            length6:0,
            title:'',
            errormsg: '',
            selected: '',
            selectedTable:'',
            selectedExtra: '',
            selectedExtraTitle: '',
            isSelected: true,
            selectedRect: [],
            selectedShapeName: "",
            maxX: 0,
            minX: 1000,
            maxY: 0,
            minY: 1000,
            scale: 1,
        }
    }
    onChange = e => {
        this.setState({
            walls : e.target.value
        })
    }
    componentDidMount(){
        this.props.getTables();
        this.props.getExtras();
        let id = this.props.match.params.id
        var splitstr = id.split(':');
        let final = splitstr.slice(0)
        console.log('id', final[1] )
        this.setState({
            roomId : final[1]
        })
        this.props.getRoom(final[1])
        this.calcScale();
        window.addEventListener("resize", this.calcScale());
    }
    componentWillUnmount(){
        console.log('unmount')
        window.removeEventListener("resize",  this.calcScale());
        this.props.removeRoom()
        this.props.clearErrors()
    }
    onAddItem = e => {
        // not allowed AND not working
        //console.log(e.target.name)
        //console.log(e.target.value)

        let id = e.target.name.split(".");
        //console.log(id)

        if(id[1] == 'point-1') {
            let point1 = 0
            point1 = parseInt(e.target.value, 10)
            this.setState({
                walls: this.state.walls.map(el => (el.id == id[0] ?  {...el, point1 } : el))
            })
        }else{
            let point2 = 0
            point2 = parseInt(e.target.value, 10)
            this.setState({
                walls: this.state.walls.map(el => (el.id == id[0] ?  {...el, point2 } : el))
            })
        }

      };
      addWall = () => {
          let newWall = { id: this.state.walls.length + 1 , point1: 0, point2:0}
        this.setState({
            walls: this.state.walls.concat(newWall),
            error: ''
        })
      }
      deleteWall = e => {
          if(this.state.walls.length > 4){
            let filteredArray = this.state.walls.filter(item => 
                item.id != e.target.value )
                this.setState({
                    walls: filteredArray,
                    error: ''
                });
                //console.log(filteredArray)
                
          }else{
              this.setState({
                  error: 'De kamer heeft minstens 4 muren nodig'
              })
          }

        
      }
      toggle = () => {
          this.setState({
              toggle: !this.state.toggle
          })
      }
      toggle2 = () => {
        this.setState({
            toggle2: !this.state.toggle2
        })
    }
    toggle3 = () => {
        this.setState({
            toggle3: !this.state.toggle3
        })
    }
      addTable = () => {
        let newWall = { id: this.state.tables.length + 1 , title: this.state.selected, x: 0, x:0, height: 100, width: 100}
        this.setState({
            tables: this.state.tables.concat(newWall),
            
      })
    }
    onChangeExtra = (e) => {
        //console.log(e.target)
        let titel;
        this.setState({
            selectedExtra: e.target.value,
        }, function (){
            console.log('function')
            this.props.extra.extras.map(m => {
                console.log('checking extras', m )
                console.log(m.id, this.state.selectedExtra)
                if(m.id == this.state.selectedExtra){
                    this.setState({
                        selectedExtraTitle: m.title
                    })
                }
            }
        )})
    }
    addExtra = () => {
        //console.log('selected', this.state.selectedExtra)
        //console.log('title', this.state.selectedExtraTitle)

            let newExtra = { "id": this.state.extras.length + 1 ,/*  title: this.state.selected, */ "x": 0, "y":0, "height": 100, "width": 100, "title": this.state.selectedExtraTitle , "realId" : this.state.selectedExtra , fill:Konva.Util.getRandomColor()  }
            //console.log('newExtra', newExtra)
            this.setState({
                extras: this.state.extras.concat(newExtra),
                
          })
        
        

    }

    changeExtra = e => {
        //console.log('change extra')
        // not allowed AND not working
        //console.log(e.target.name)
        //console.log(e.target.value)

        let id = e.target.name.split(".");
        //console.log(id)

        if(id[1] == 'x') {
            //console.log('inside x')
            let x = 0
            x = e.target.value
            this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, x } : el))
            })
        }if(id[1] == 'y'){
           //console.log('inside y')
            let y = 0
            y = parseInt(e.target.value, 10)
            this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, y } : el))
            })
        }if(id[1] == 'height'){
           //console.log('inside height')
           let height = 0
           height = parseInt(e.target.value, 10)
           this.setState({
            extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, height } : el))
           })
       }if(id[1] =='width'){
           //console.log('inside width')
               let width = 0
               width = parseInt(e.target.value, 10)
               this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, width } : el))
               })
           
       }
       //console.log(this.state.tables)
   }
    deleteExtra = (id) => {
        
        if(this.state.extras.length > 0){
            let filteredArray = this.state.extras.filter(item => 
                item.id != id )
                this.setState({
                    extras: filteredArray,
                    errorTables: ''
                });
                //console.log(filteredArray)
                
          }else{
              this.setState({
                errorExtra: 'you need to have atleast 1 table'
              })
          }
    }
    selected = e => {
        this.setState({
            selected: e.target.value
        })
    }
    formChange = e => {
        //console.log(e.target.name)
        this.setState({
            [e.target.name] : e.target.value
        },function(){
            //console.log(this.state.length1)
        })
    }
   
    createTable = () => {
            let table = []
        
            // Outer loop to create parent
            for (let i = 0; i < this.state.amountOfWall; i++) {
             
              //Create the parent and add the children
              table.push(<Input 
                type="input"
                name={`length` + i}
                onChange={this.formChange}
                id={i}
                required
                placeholder="length of wall"
                />)
            }
            return table
        
    }
    onSubmit = e => {
        e.preventDefault();
        if(this.state.amountOfWall == 4){
            this.setState({
                errormsg: '',
                walls: [
                    {"id": 1, "point1": 0, "point2": this.state.length0}, {"id": 2, "point1": 1000, "point2": 0}, {"id": 3, "point1": 1000, "point2": 1000}, {"id": 4, "point1": 0, "point2": 1000}
                ]
            })
        }
        //console.log('calculate')
    }
    saveRoom = () => {
        this.setState({
            errormsg: ''
        },function (){
            this.state.walls.map(m => {
                if(m.point1 > 1000 || m.point2 > 1000){
                    this.setState({
                        errormsg: 'Muur ' + m.id + 'max waarde is 1000'
                    },function(){
                        toast.error(this.state.errormsg)
                    })
                }
            })
            if(this.state.title == ''){
                this.setState({
                    errormsg: 'Layout moet een titel hebben.'
                }, function(){
                    toast.error(this.state.errormsg)
                })
            }
            let item = {
                "title": this.state.title,
                "id" : this.state.roomId,
                "layout_id": this.props.dashboard.room.layout_id,
                "walls": this.state.walls,
                "extras": this.state.extras,
            }
            if(this.state.errormsg == '' && this.state.title !== ''){
                this.props.updateRoom(item);
            }
        })

    }
    handleDragStartPoint = e => {
        e.target.setAttrs({
          scaleX: 1.1,
          scaleY: 1.1,
          fill: 'red'
        });

      };
    handleDragEndPoint = e => {

        //console.log('end drag', e.target.attrs.x)
      e.target.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: 1,
        scaleY: 1,
        fill: 'black'
      });
    
    };
        updateDragPoint = e => {

      let item = {
        "id": e.target.attrs.id.id , "point1": e.target.attrs.x, "point2": e.target.attrs.y ,
      }
      //console.log(e.target.attrs)
      //console.log('item', item)
      this.setState(state => {
          const walls = state.walls.map((i, count) => {
              //console.log('vergelijking', i, e.target.attrs.id.id)
              console.log('items', i, count , 'id' ,e.target.attrs.id.id)
            if ( e.target.attrs.id.id == i.id) {
                //console.log('i',i)
                console.log('gevonden');
              return {
                  "id": e.target.attrs.id.id , "point1": e.target.attrs.x, "point2": e.target.attrs.y ,
              };
            } else {
              return i;
            }
          });
     
          return {
              walls,
          };
        
        }, function(){
            this.calcMax()
        });

    
    };
    calcMax = () => {
        console.log('inside calc', this.state.walls)
        this.setState({
            maxX: 0,
            minX: 1000,
            maxY: 0,
            minY: 1000
        }, function(){
            this.state.walls.map(m => {
                if(m.point1 > this.state.maxX){
                    this.setState({
                        maxX: m.point1
                    })
                }else if (m.point1 < this.state.minX){
                    this.setState({
                        minX: m.point1
                    })
                }
                if(m.point2 > this.state.maxY){
                    this.setState({
                        maxY: m.point2
                    })
                }else if(m.point2 < this.state.minY){
                    this.setState({
                        minY: m.point2
                    })
                }
            }
        )
        })

    console.log('new maxes', this.state.maxX, this.state.minX, this.state.maxY, this.state.minY) 
    }
    handleDragStart = e => {
        console.log('drag start', e.target.attrs)
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
       
        });
      };

      onChangeRect = e =>{
          console.log('changing')
        console.log(e.target, 'target')
        console.log(e.target.attrs.scaleX)
          let item = {
            "id": e.target.attrs.id.id , "title": e.target.attrs.id.title, "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height * e.target.attrs.scaleY, "width": e.target.attrs.width * e.target.attrs.scaleX, "realId" : e.target.attrs.id.realId
        }
        //console.log(e.target.attrs)
        //console.log('item', item)
        this.setState(state => {
            const extras = state.extras.map((i) => {
                //console.log('vergelijking', i, e.target.attrs.id.id)
              if ( e.target.attrs.id.id == i.id) {
                  //console.log('i',i)
                
                return {
                    "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height * e.target.attrs.scaleY, "width": e.target.attrs.width * e.target.attrs.scaleX ,"realId" : e.target.attrs.id.realId, 'fill': e.target.attrs.fill 
                };
                
              } else {
                return i;
              }
            });
       
            return {
                extras,
            };
          });

      }
      handleDragEnd = e => {

        console.log('end drag', e.target.attrs)
        e.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
          shadowOffsetX: 5,
          shadowOffsetY: 5
        });
        let item = {
            "id": e.target.attrs.id.id , "title": e.target.attrs.id.title, "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width, "realId" : e.target.attrs.id.realId
        }
        //console.log(e.target.attrs)
        //console.log('item', item)
        this.setState(state => {
            const extras = state.extras.map((i) => {
                //console.log('vergelijking', i, e.target.attrs.id.id)
              if ( e.target.attrs.id.id == i.id) {
                  //console.log('i',i)
                  console.log(e.target.attrs.x, 'X')
                  if(e.target.attrs.x > this.state.minX ){
                      console.log('between points')
                return {
                    "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width,"realId" : e.target.attrs.id.realId, 'fill': e.target.attrs.fill 
                };
            }else{ 
                 console.log('not between points')
                return {
                    "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width,"realId" : e.target.attrs.id.realId, 'fill': e.target.attrs.fill 
                };
              
            }
              } else {
                return i;
              }
            });
       
            return {
                extras,
            };
          });
      };
      updateRect = e => {
        this.setState(state => {
            const extras = state.extras.map((i) => {
                //console.log('vergelijking', i, e.target.attrs.id.id)
              if ( e.target.attrs.id.id == i.id) {
                  //console.log('i',i)
                  console.log(e.target.attrs.x, 'X')
                
                      console.log('between points')
                return {
                    "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width,"realId" : e.target.attrs.id.realId, 'fill': e.target.attrs.fill 
                };
     
                
              
            
              } else {
                return i;
              }
            });
       
            return {
                extras,
            };
          });
      }
      setStateCorrect = () => {
          //console.log('set state correct', this.props.dashboard)
          if(this.state.setStateCorrect){
            this.setState({
                walls: this.props.dashboard.room.walls,
                
                title: this.props.dashboard.room.title,
                setStateCorrect: false,
              }, function(){
                  //console.log('extras of dashboard',this.props.dashboard.room.extras)
                this.props.dashboard.room.extras.map((m,i) => {
                    /* { id: 1, title: 'Wc' , x: 10 , y: 10 , width: 100, height: 100 } */
                    let item = { "id": i, 'realId': m.id, "title" :m.title, "x": m.pivot.x , "y": m.pivot.y , "width":m.pivot.width, "height":m.pivot.height, "fill":Konva.Util.getRandomColor()  }
                    this.setState(previousState => ({
                        extras: [...previousState.extras, item ]
                    }));
                })
                
                    this.calcMax()
                
              })
          }
        
      }
      /* onSelect = () => { 
        trRef.current.setNode(shapeRef.current);
        trRef.current.getLayer().batchDraw();
      } */
      onClickThis = e => {
          console.log(e)
          e.stage.getPointerPosition()
      }
      onSelect = (e) => {
        console.log(e)
        this.setState({
            selectedRect : e.target
        })
      }
      handleStageClick = e => {
        this.setState({
          selectedShapeName: e.target.name()
        })
    }
    calcScale = () => {
        const CANVAS_VIRTUAL_WIDTH = 1000;
        const CANVAS_VIRTUAL_HEIGHT = 1000;
       if( window.innerWidth < 1140){
           console.log('smaller then')
            let scaleCalc = Math.min(
                1140 / CANVAS_VIRTUAL_WIDTH,
                ) - 0.1;
                this.setState({
                    scale: scaleCalc
                })
        }
       else {
        console.log('smaller then')
            let scaleCalc = Math.min(
                1140 / CANVAS_VIRTUAL_WIDTH,
                ) - 0.1;
                this.setState({
                    scale: scaleCalc
                })
        }
    }
      render() {
          const {loading , room, dashboardloading } = this.props.dashboard
                  // lets think you want to make all your objects visible in
            

            // now you may want to make it visible even on small screens
            // we can just scale it
          
            const { status } = this.props.error;
        
        return (
           
            <div className="dashboard">
                {console.log('extras',this.state.extras)}
                {console.log(status,'status')}
                {dashboardloading ? <Spinner /> : 
                <div>
                     {console.log(this.props.error.status == 'NOT_ALLOWED')}
                { room == 'Not allowed' ? <NotAllowed /> : 
           
            <div>
                {room ? 
                <Container>
                    {room.title && !loading && this.state.setStateCorrect ? this.setStateCorrect() : null}
                    <div className="row">
                        <div className="col-11">
                        <h1>Bewerk uw pagina!</h1>
                        </div>
                        <div className="col">
                        <Button onClick={this.saveRoom}>Opslaan!</Button>
                        </div>
                    </div>
                
                {console.log(this.state.maxX,this.state.minX, this.state.maxY, this.state.minY, 'new max and min')}
                <div className="row">
                    <div className="col-12">
                       
                        <Card>
                        <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Basic Information</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    
                                <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input 
                                                type="input"
                                                name="title"
                                                onChange={this.formChange}
                                                value={this.state.title}
                                                id="title"
                                                required
                                                placeholder="Geef de kamer een naam"
                                                />
                                                
                                                </FormGroup>
                                                </Form>
                                </AccordionDetails>
                            </Accordion>
                            
                        </Card>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        <Card>
                        <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Bouw de kamer!</Typography>
                                </AccordionSummary>
                            <div className="row">
                                <div className="col-12" style={{textAlign: "end"}}>
                                <Tooltip title={"Versleep de zwarte punten. Deze zwarte punten zullen niet te zijn tijdens het reservatieproces. Deze zijn puur om het bewerken eenvoudiger te maken."}>
                                <HelpIcon />
                                
                                    </Tooltip>
                                    </div>
                                <div className="col-12">
                        <h5>Kies de lengte van de muren.</h5>
                        <p>Ga kloksgewijs. Hoe u het hier ziet zal de gebruiker ook zien.</p>
                        {this.state.errormsg != '' ? <Alert severity="error" > {this.state.errormsg} </Alert>: null }
                        
                        <p>{this.state.error}</p>
                            {this.state.walls ? 
                            this.state.walls.map((m,i) => {
                                //console.log(m)
                                return(
                                    <div className="row mt-1">
                                    <div className="col-1">
                                        {m.id}
                                    </div>
                                    <div className="col">
                                        <Input type="number" name={ m.id + ".point-1"}  onChange={this.onAddItem} value={m.point1}  min={0} max={1000}>
                                        </Input>
                                    </div>
                                   <div className="col">
                                   <Input type="number" name={ m.id + ".point-2"} id="walls" onChange={this.onAddItem} value={m.point2} min={0} max={1000}>
                                    </Input>
                                   </div>
                                   <Button >
                                   <DeleteIcon value={m.id} onClick={this.deleteWall}/>
                                   </Button>
                                    
                                    </div>
                                )
                            })
                            
                        : ''}
                        <div className="row my-2">
                        <Button onClick={this.addWall}> Add wall</Button>
                        </div>
                    
                        </div>
                        </div>              
                            </Accordion>
                            
                        </Card>
                    </div>
                </div>
                                
                <div className="row mb-3">

                    <div className="col-12">
                        <Card>
                        <Accordion className="">
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Voeg extra's toe!</Typography>
                                </AccordionSummary>

                        <div>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-10">
                                    <p>Voeg extra's toe om de gebruiker een beter gevoel te geven over de ruimte.</p>
                                    </div>
                                    <div className="col">
                                   
                                    </div>
                                </div>
                           
                        <div className="row mb-2">
                            <p>{this.state.errorExtra}</p>
                            <div className="col-10">

                            
                            <Input type="select" name="extras" id="extras" onChange={this.onChangeExtra}>
                                <option value=''>Kies een extra</option>
                                    {this.props.extra && this.props.extra.extras ? 
                                    
                                    
                                    this.props.extra.extras.map(m => {
                                        
                                        return (
                                            <option id={m.id} value={m.id} >{m.title}</option>
                                        )
                                    })
                                    
                                    :''}  

                                    </Input>
                                    </div>
                                    <div className="col floatright">
                                    {this.state.selectedExtra != '' ?  <Button onClick={this.addExtra}>Voeg toe</Button> : <Button disabled >Kies een extra</Button> }
                                    </div>
                                    
                        </div>
                        {console.log(this.state.extras)}
                        {this.state.extras ? 
                            this.state.extras.map((m,i) => {
                                //console.log('state extra', m)
                                return(
                                    <div className="row my-1">
                                    <div className="col-2">
                                        {m.title}
                                    </div>
                                    <div className="col-1">
                                        <div style={{backgroundColor: m.fill, width:'100%', height:'100%' }}>
                                            </div>
                                    </div>
                                    <div className="col">
                                    <Input type="number" onChange={this.changeExtra} id="x" name={ m.id + ".x"}  value={m.x}>
                                        </Input>
                                    </div>
                                    <div className="col">
                                    <Input type="number" onChange={this.changeExtra} id="y" name={ m.id + ".y"}  value={m.y}>
                                    </Input>
                                    </div>
                                   <div className="col">
                                   <Input type="number" onChange={this.changeExtra} id="height" name={ m.id + ".height"}  value={m.height}>
                                    </Input>
                                   </div>
                                   <div className="col">
                                   <Input type="number" onChange={this.changeExtra} id="width" name={ m.id + ".width"}  value={m.width}>
                                    </Input>
                                   </div>
                                   <Button >
                                        <DeleteIcon value={m.id} onClick={() => this.deleteExtra(m.id)}/>
                                   </Button>
                                    
                                    </div>
                                    
              
                                )
                            })
                            
                        : ''}
                        
                      
                            </div>
                        </div>
                       
                       
                        
                        </div>  
                         </Accordion>
                            
                        </Card>
                       
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">{
                        console.log(this.state.scale ,'scale')
                    }
                    { this.state.walls ?      
                <Stage  onClick={this.handleStageClick} width={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } height={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } scaleX={this.state.scale} scaleY={this.state.scale}>
                <Layer>
                { this.state.walls ?  
                    <Shape
                        sceneFunc={(context, shape) => {
                        context.beginPath();
                        {this.state.walls.map(m => {
                            //console.log(m)
                            if(m.id == 1){
                                context.moveTo(m.point1, m.point2);
                            }
                            
                            context.lineTo(m.point1, m.point2);
                            context.moveTo(m.point1, m.point2);
                            if(m.id == this.state.walls.length){
                                
                                context.moveTo(m.point1, m.point2);
                                this.state.walls.map(m => {
                                    if(m.id == 1){
                                        context.lineTo(m.point1,m.point2)
                                    }
                                })
                                context.lineTo()
                                context.closePath();
                            }
                        })}
                        
                        /* context.closePath(); */
                        // (!) Konva specific method, it is very important
                        context.fillStrokeShape(shape);
                        }}
                        fill="#00D2FF"
                        stroke="black"
                        strokeWidth={5}
                        onClick={this.onClickThis}
                        closed
                    /> : null }
                      { this.state.walls ? 
                    this.state.walls.map((m,i) =>
                        <Circle x={m.point1} y={m.point2} radius={20} fill="black" 
                        id={m}
                        
                        draggable={true} 
                        onClick={this.onSelect}
                        onTap={this.onSelect}
                        onTransform={this.updateDragPoint}
                        onDragStart={this.handleDragStartPoint}
                        onDragEnd={this.handleDragEndPoint}
                        onChange={this.updateDragPoint}
                        onDragMove={this.updateDragPoint}
                        />
                    )    
               : null }
                </Layer>
                <Layer>
                
                                    <TransformerComponent
                                               selectedShapeName={this.state.selectedShapeName}
                                           />
                                        </Layer>
                       {this.state.extras ? 
                               
                               this.state.extras.map((m,i) => {
                                   //console.log(m.id)
                                       return (
                                        <Layer 
                                     
                                        /* id={m}
                                        x={m.x}
                                        y={m.y}
                                        width={m.width}
                                        height={m.height}
                                        fill={m.fill}
                                        closed
                                        shadowBlur={10}
                                        draggable={true}  */
                                       /*  onClick={console.log('on click')}
                                        onTransform={console.log('on transform')}
                                        onDragStart={console.log('on dragstart')}
                                        onDragEnd={console.log('on dragend')}
                                        onDragMove={console.log('on dragmove')} */
                                      /*  onClick={ this.onSelect }
                                        onTap={this.onSelect}
                                        onTransform={this.onChangeRect}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd} */
                                
                                        >
                                      {/*   <URLImage src="https://konvajs.org/assets/yoda.jpg" 
                                        name={`rectange${i}`}
                                        id={m}
                                      x={m.x}
                                      y={m.y}
                                      width={m.width}
                                      height={m.height}
                                      onClick={ this.onSelect }
                                   /> */}
                                       <Rect
                                        name={`rectange${i}`}
                                        id={m}
                                        x={m.x}
                                        y={m.y}
                                        width={m.width}
                                        height={m.height}
                                        fill={m.fill}
                                        closed
                                        shadowBlur={10}
                                        draggable={true} 
                                        onClick={this.onSelect}
                                        onTap={this.onSelect}
                                        onTransform={this.onChangeRect}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd}
                        
                                     /> 
                                      
                                      <Text text={m.title} fontSize={15} x={m.x} y={m.y} />
                                      <TransformerComponent
                                               selectedShapeName={this.state.selectedShapeName}
                                           />
                                      </Layer>
                                       )
                               }) : null }
                   

                                
                    
                   
                </Stage>
                : null }   
                    </div>
                </div>
                
                </Container>
               : <Spinner /> }
               </div>
               }
                </div>

}
                </div>
          
        )
    }
}
EditRoom.propTypes = {
    getTables: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    getExtras: PropTypes.func.isRequired,
    addRoom: PropTypes.func.isRequired,
    extra: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    getRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    removeRoom: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    table: state.table,
    extra: state.extra,
    dashboard: state.dashboard,
    error: state.error
})
export default connect(mapStateToProps, { getTables, getExtras, getRoom, clearErrors, updateRoom, removeRoom })( EditRoom )