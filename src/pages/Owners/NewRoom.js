import React, { Component } from 'react'
import { Container, Card } from 'reactstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button,   Input, Form, FormGroup, Label, } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTables } from '../../actions/tableActions'
import { getExtras } from '../../actions/extraActions'
import { addRoom } from '../../actions/roomActions';
import { Stage, Layer, Rect, Text, Circle,  Shape, Transformer } from 'react-konva';
import Konva from 'konva';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router-dom';
import { clearErrors } from '../../actions/errorActions'
import Alert from '@material-ui/lab/Alert';
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

class NewRoom extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        dateTodayNow = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            walls: [
                {"id": 1, "point1": 0, "point2": 0}, {"id": 2, "point1": 1000, "point2": 0}, {"id": 3, "point1": 1000, "point2": 1000}, {"id": 4, "point1": 0, "point2": 1000}
              ],
            extras: [
                /* { id: 1, title: 'Wc' , x: 10 , y: 10 , width: 100, height: 100 } */
            ],
            x: 0,
            y: 0,
            error: '',
            errorTables: '',
            dateToday: dateTodayNow,
            toggle: false,
            toggle2: false,
            toggle3: false,
            errorExtra: '',
            amountOfWall: 0,
            lengthOfWall: [],
            length0: 0,
            length1: 0,
            length2: 0,
            length3:0,
            length4: 0,
            length5: 0,
            length6:0,
            title:'',
            errormsg: '',
            selected: '',
            selectedExtraTitle: '',
            selectedTable:'',
            selectedExtra: [],
            selectedExtraId: 0,
            selectedRect: [],
             

        }
    }
    onChange = e => {
        this.setState({
            walls : e.target.value
        })
    }
    componentDidMount(){
        this.calcScale();
        window.addEventListener("resize", this.calcScale());
        this.props.getTables()
        this.props.getExtras()
    }
    componentWillUnmount(){
        window.removeEventListener("resize",  this.calcScale());
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
                  errormsg: 'Je hebt minstens 4 muren nodig.'
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

    _onMouseMove = e => {
      
        let CTM = e.target.getScreenCTM();
        this.setState({ x: (e.clientX - CTM.e) / CTM.a, y: (e.clientY - CTM.f) / CTM.d /* x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY */ });
      }
    startDrag = e => {
        
        /* this._onMouseMove(e); */
        
        e.target.setAttribute("x", this.state.x);
        e.target.setAttributeNS(null,"y", this.state.y);
    
    }
    stopDrag = () => {
    
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
      if(e.target.value !== ''){

      
        this.setState({
            [e.target.name] : e.target.value,
            errormsg: ''
        },function(){
           
        })
    }else{
        this.setState({
            errormsg: 'Vul een titel in!'
        })
        
    }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.amountOfWall == 4){
            this.setState({
                walls: [
                    {"id": 1, "point1": 0, "point2": this.state.length0}, {"id": 2, "point1": 1000, "point2": 0}, {"id": 3, "point1": 1000, "point2": 1000}, {"id": 4, "point1": 0, "point2": 1000}
                ]
            })
        }
    }
    saveRoom = () => {
        if(this.state.title !== ''){

        
        this.setState({
            errormsg: ''
        }, function(){
            this.state.walls.map(m => {
                if(m.point1 > 1000 || m.point2 > 1000 || m.point1 < 0 || m.point2 < 0){
                    this.setState({
                        errormsg: 'Muur ' + m.id + ', de maximum waarde is 1000 en de minimum waarde is 0'
                    },function(){
                        return; 
                    })
                }
            })
    
            if(this.state.errormsg == ""){
                let item = {
                    "title": this.state.title,
                    "restaurant_id": 1,
                    "user_id": 1,
                    "layout_id": 1,
                    "active": 0,
                    "walls": this.state.walls,
                    "extras": this.state.extras,
                }
                this.props.addRoom(item);
            }
        })
       
    }else {
        this.setState({
            errormsg: 'Vul een titel in!'
        })
    }
    }
    handleDragStart = e => {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
          scaleX: 1.1,
          scaleY: 1.1
        });
      };
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
    };
    onSelect = (e) => {
       
        this.setState({
            selectedRect : e.target
        })
      }
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
    handleStageClick = e => {
        this.setState({
          selectedShapeName: e.target.name()
        })
    }
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
          
          });
  
      
      };
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
        const CANVAS_VIRTUAL_WIDTH = 1000;
            const CANVAS_VIRTUAL_HEIGHT = 1000;

            // now you may want to make it visible even on small screens
            // we can just scale it
            const scale = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
            ) - 0.2;
        return (
            <div className="dashboard">
                <Container>
                { this.props.room.madeNew  ? <Redirect  to={`/dashboard/layout`} /> : null  }
                    <div className="row">
                        <div className="col-10">
                        <h1>Maak een nieuwe kamer!</h1>
                        </div>
                        <div className="col">
                        <Button className="floatright" disabled={this.state.errormsg} onClick={this.saveRoom}>Opslaan</Button>
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
                              <Typography color="textPrimary">Nieuwe Kamer</Typography>
                             
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                              <h6 div className="floatright">{this.state.dateToday}</h6>
                            </div>
                        </div>
                    { this.state.errormsg ? <Alert severity="error" onClose={() => this.closeAlert()}> {this.state.errormsg}</Alert> : null }
                
                <div className="row">
                    <div className="col-12">
                        <Card>
                        <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Basis informatie</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                        <Label for="title">Naam</Label>
                                        <Input 
                                                type="input"
                                                name="title"
                                                onChange={this.formChange}
                                                id="title"
                                                required
                                                placeholder="geef de kamer een naam"
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
                                   <Button value={m.id} onClick={() => this.deleteWall(m.id)} >
                                   <DeleteIcon value={m.id}/>
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
          
{/*                         <svg onMouseMove={this._onMouseMove.bind(this)} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/>
    </pattern>
                            <polygon  style={{fill: 'grey'}} points={this.state.walls.map(m => {
                                return(
                                    m.point1 + ',' + m.point2
                                )
                            }
                                )} /> 
                                {this.state.walls.map(m => {
                                    return (
                                        <text x={m.point1 > 900 ? m.point1 - 50 : m.point1} y={m.point2 < 30 ? m.point2 + 30 : m.point2} fill="black" font-size="30">{m.id}</text>
                                    )
                                })}
                               
                                {/* <polyline points={this.state.walls.map(m => {
                                return(
                                    m.point1 + ',' + m.point2
                                
                                )
                                
                            }
                                )} style={{fill:'none',stroke:'black', strokeWidth:3}}/> 

                        </svg> */}
                                
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
                            <div className="col-11">

                            
                            <Input type="select" name="extra" onChange={this.onChangeExtra}>
         
                                    {this.props.extra && this.props.extra.extras ? 
                                    
                                    
                                    this.props.extra.extras.map(m => {
                                        return (
                                            <option id={m.id} value={m.id}>{m.title}</option>
                                        )
                                    })
                                    
                                    :''}  

                                    </Input>
                                    </div>
                                    <div className="col">
                                    <Button onClick={this.addExtra}>Voeg toe</Button>
                                    </div>
                                    
                        </div>
                      
                        {this.state.extras ? 
                            this.state.extras.map((m,i) => {
                              
                                return(
                                    <div className="row my-3">
                                    <div className="col-1">
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
                    <div className="col-12">
                    { this.state.walls ?      
               <Stage onClick={this.handleStageClick} width={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } height={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } scaleX={this.state.scale} scaleY={this.state.scale}>
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
                                        onChange={this.onChangeDrag}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd}
                                        
                                      />
                                       <Text text={m.title} fontSize={15} x={m.x} y={m.y} />
                                       <TransformerComponent
                                            selectedShapeName={this.state.selectedShapeName}
                                        />
                                       </Layer>
                                      
                                       )
                               }) : ''}
                    
                
                </Stage>
                : null }   
                    </div>
                </div>
                
                </Container>
            </div>
        )
    }
}
NewRoom.propTypes = {
    getTables: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    getExtras: PropTypes.func.isRequired,
    addRoom: PropTypes.func.isRequired,
    extra: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    table: state.table,
    extra: state.extra,
    room: state.room,
})
export default connect(mapStateToProps, { getTables, getExtras, addRoom, clearErrors })(NewRoom)