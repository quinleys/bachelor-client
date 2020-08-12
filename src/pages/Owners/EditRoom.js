import React, { Component } from 'react'
import { Container, Card } from 'reactstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button,  Input, Form, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTables } from '../../actions/tableActions'
import { getExtras } from '../../actions/extraActions'
import { getRoom } from '../../actions/dashboardActions'; 
/* import { getRoom } from '../../actions/roomActions'; */
import Spinner from '../../components/Components/Spinner/Spinner'
import { Stage, Layer, Rect, Text, Circle, Shape, Transformer, } from 'react-konva';
import Konva from 'konva';
import DeleteIcon from '@material-ui/icons/Delete';
import { updateRoom } from '../../actions/dashboardActions' 
import { removeRoom } from '../../actions/dashboardActions' 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import Alert from '@material-ui/lab/Alert';
import { clearErrors } from '../../actions/errorActions'; 
import NotAllowed from '../NotAllowed';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
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
        var today = new Date(),
        dateTodayNow = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
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
            dateToday: dateTodayNow,
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
      
        this.setState({
            roomId : final[1]
        })
        this.props.getRoom(final[1])
        this.calcScale();
        window.addEventListener("resize", this.calcScale());
    }
    componentWillUnmount(){
      
        window.removeEventListener("resize",  this.calcScale());
        this.props.removeRoom()
        this.props.clearErrors()
    }
    onAddItem = e => {
      
        let id = e.target.name.split(".");
        
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
      deleteWall = id => {
          if(this.state.walls.length > 4){
            let filteredArray = this.state.walls.filter(item => 
                item.id != id )
                this.setState({
                    walls: filteredArray,
                    error: ''
                });
               
                
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
       
        let titel;
        this.setState({
            selectedExtra: e.target.value,
        }, function (){
      
            this.props.extra.extras.map(m => {

                if(m.id == this.state.selectedExtra){
                    this.setState({
                        selectedExtraTitle: m.title
                    })
                }
            }
        )})
    }
    addExtra = () => {
       

            let newExtra = { "id": this.state.extras.length + 1 ,/*  title: this.state.selected, */ "x": 0, "y":0, "height": 100, "width": 100, "title": this.state.selectedExtraTitle , "realId" : this.state.selectedExtra , fill:Konva.Util.getRandomColor()  }
           
            this.setState({
                extras: this.state.extras.concat(newExtra),
                
          })
        
        

    }

    changeExtra = e => {
    

        let id = e.target.name.split(".");
       
        if(id[1] == 'x') {
           
            let x = 0
            x = e.target.value
            this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, x } : el))
            })
        }if(id[1] == 'y'){
          
            let y = 0
            y = parseInt(e.target.value, 10)
            this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, y } : el))
            })
        }if(id[1] == 'height'){
          
           let height = 0
           height = parseInt(e.target.value, 10)
           this.setState({
            extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, height } : el))
           })
       }if(id[1] =='width'){
         
               let width = 0
               width = parseInt(e.target.value, 10)
               this.setState({
                extras: this.state.extras.map(el => (el.id == id[0] ?  {...el, width } : el))
               })
           
       }
   
   }
    deleteExtra = (id) => {
        
        if(this.state.extras.length > 0){
            let filteredArray = this.state.extras.filter(item => 
                item.id != id )
                this.setState({
                    extras: filteredArray,
                    errorTables: ''
                });
              
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
      
        this.setState({
            [e.target.name] : e.target.value,
          
        },function(){
            if(this.state.title == ''){
              
                    this.setState({
                        errormsg: 'Vul een titel in!'
                    })
                    
            }else {
                this.setState({
                    errormsg: ''
                })
            }
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
                    errormsg: 'De Kamer moet een titel hebben.'
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
   
      this.setState(state => {
          const walls = state.walls.map((i, count) => {

            if ( e.target.attrs.id.id == i.id) {

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

    
    }
    handleDragStart = e => {
       
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
       
        });
      };

      onChangeRect = e =>{
   
          let item = {
            "id": e.target.attrs.id.id , "title": e.target.attrs.id.title, "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height * e.target.attrs.scaleY, "width": e.target.attrs.width * e.target.attrs.scaleX, "realId" : e.target.attrs.id.realId
        }
     
        this.setState(state => {
            const extras = state.extras.map((i) => {
               
              if ( e.target.attrs.id.id == i.id) {
                 
                
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
      
        this.setState(state => {
            const extras = state.extras.map((i) => {
            
              if ( e.target.attrs.id.id == i.id) {
                  
                  if(e.target.attrs.x > this.state.minX ){
                     
                return {
                    "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width,"realId" : e.target.attrs.id.realId, 'fill': e.target.attrs.fill 
                };
            }else{ 
                
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
            
              if ( e.target.attrs.id.id == i.id) {
                  
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
       
          if(this.state.setStateCorrect){
            this.setState({
                walls: this.props.dashboard.room.walls,
                
                title: this.props.dashboard.room.title,
                setStateCorrect: false,
              }, function(){
                
                this.props.dashboard.room.extras.map((m,i) => {
  
                    let item = { "id": i, 'realId': m.id, "title" :m.title, "x": m.pivot.x , "y": m.pivot.y , "width":m.pivot.width, "height":m.pivot.height, "fill":Konva.Util.getRandomColor()  }
                    this.setState(previousState => ({
                        extras: [...previousState.extras, item ]
                    }));
                })
                
                    this.calcMax()
                
              })
          }
        
      }
   
      onClickThis = e => {
        
          e.stage.getPointerPosition()
      }
      onSelect = (e) => {
      
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
         
            let scaleCalc = Math.min(
                1140 / CANVAS_VIRTUAL_WIDTH,
                ) - 0.1;
                this.setState({
                    scale: scaleCalc
                })
        }
       else {
       
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
               
                {dashboardloading ? <Spinner /> : 
                <div>
                    
                { room == 'Not allowed' ? <NotAllowed /> : 
           
            <div>
                {room ? 
                <Container>
                    {room.title && !loading && this.state.setStateCorrect ? this.setStateCorrect() : null}
                    <div className="row">
                        <div className="col-10">
                        <h1>Bewerk uw pagina!</h1>
                        </div>
                        <div className="col">
                        <Button className="floatright" disabled={this.state.errormsg} onClick={this.saveRoom}>Opslaan!</Button>
                        </div>
                    </div>
                    <div className="row justify-content-between my-2">
                          <div className="col">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link to="/dashboard">
                              <Typography color="textPrimary">Dashboard</Typography>
                              </Link>
                              <Link to="/dashboard/layout">
                              <Typography color="textPrimary">Layout</Typography>
                              </Link>
                              <Typography color="textPrimary">Bewerk Kamer</Typography>
                             
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                              <h6 div className="floatright">{this.state.dateToday}</h6>
                            </div>
                        </div>
                    {this.state.errormsg != '' ? <Alert severity="error" > {this.state.errormsg} </Alert>: null }
               
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
                
                        
                        <p>{this.state.error}</p>
                            {this.state.walls ? 
                            this.state.walls.map((m,i) => {
                               
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
                                   <Button value={m.id} onClick={() => this.deleteWall(m.id)}>
                                   <DeleteIcon />
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
                      
                        {this.state.extras ? 
                            this.state.extras.map((m,i) => {
                              
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
                    <div className="col-12 ">
                      
                    
                    { this.state.walls ?      
                <Stage  onClick={this.handleStageClick} width={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } height={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } scaleX={this.state.scale} scaleY={this.state.scale}>
                <Layer>
                { this.state.walls ?  
                    <Shape
                        sceneFunc={(context, shape) => {
                        context.beginPath();
                        {this.state.walls.map(m => {
                          
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
                                 
                                       return (
                                        <Layer 
                                     
                                
                                        >
                                    
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