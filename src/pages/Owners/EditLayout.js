import React, { Component } from 'react'
import { Container, Card } from 'reactstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTables } from '../../actions/tableActions'
import { getExtras } from '../../actions/extraActions'
import { getRooms, getRoom } from '../../actions/roomActions'
import { addLayout } from '../../actions/layoutActions'

import { Stage, Layer, Rect, Text, Circle, Transformer, Shape , Image } from 'react-konva';
import Konva from 'konva';
import { getLayout } from '../../actions/layoutActions';
import { updateLayout } from '../../actions/dashboardActions';

import { Button,   Input, Form, FormGroup, Label } from 'reactstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import {forgetLayout } from '../../actions/layoutActions'
import NotAllowed from '../NotAllowed';
import Spinner from '../../components/Components/Spinner/Spinner'
import Alert from '@material-ui/lab/Alert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { getLayouts} from '../../actions/dashboardActions'
class URLImage extends React.Component {
    state = {
      image: null
    };
    componentDidMount() {
      this.loadImage();

    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      });
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
        id={this.props.id}
            name={this.props.name}
          x={this.props.x}
          y={this.props.y}
          height={this.props.height}
          width={this.props.width}
          /* fill={this.props.fill} */
          image={this.state.image}
          /* fill={this.props.fill}
          style={{fill: this.props.fill }} */
          ref={node => {
            this.imageNode = node;
          }}
          closed
          draggable={true}
        onClick={this.props.onClick}
            onTap={this.props.onTap}
            onTransform={this.props.onTransform}
            onDragStart={this.props.onDragStart}
           onDragEnd={this.props.onDragEnd}   
            onDragMove={this.props.onDragMove} 
          />
          );
        }
      } 
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
          enabledAnchors= {['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          rotateEnabled={false}
        />
      );
    }
  }

class EditLayout extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        dateTodayNow = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            walls: [],
            tables: [],
            extras: [
                /* { id: 1, title: 'Wc' , x: 10 , y: 10 , width: 100, height: 100 } */
            ],
            x: 0,
            y: 0,
            error: '',
            errorTables: '',
            toggle: false,
            toggle2: false,
            toggle3: false,
            errorExtra: '',
            selected: '',
            dateToday: dateTodayNow,
            selectedTable:'',
            layoutId: '',
            title: '',
            restaurant_id: '1',
            selectedTableTitle: '',
            roomSelect:false,
            setStateCorrect: true,
            selectedShapeName: "",
            selectedRect: [],
            errormsg:'',
            selectedRoom: [],
            scale: 1
      
          
            ,

        }
    }
    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onChangeSelectedRoom = e => {
        if(e.target.value == ''){
            this.setState({
                roomSelect:false,
                selectedRoom: e.target.value,
                toggle3: false,
            })
        }else{

        
        this.setState({
            roomSelect: true,
            selectedRoom : e.target.value
        }, function(){
            this.props.getRoom(this.state.selectedRoom)})
        }   
    }
    componentDidMount(){
        this.props.getTables()
        this.props.getExtras()
        this.props.getLayouts(localStorage.getItem('restaurant_id'));
        this.props.getRooms(localStorage.getItem('restaurant_id'))
       
        let id = this.props.match.params.id
        var splitstr = id.split(':');
        let final = splitstr.slice(0);
        this.setState({
            layoutId: final[1]
        })
        
      
        if(this.props.layout.layout.title){
           
        }else{
            this.props.getLayout(final[1])
        }
        
    }
    componentWillUnmount(){
        this.props.forgetLayout();
    }
    onAddItem = e => {
        // not allowed AND not working
       

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
    
        let newTable = { "id": this.state.tables.length + 1 ,/*  title: this.state.selected, */ "x": 0, "y":0, "height": 100, "width": 100, "title": this.state.selectedTableTitle , "realId" : this.state.selectedTable , fill:Konva.Util.getRandomColor()  }
       
        this.setState({
            tables: this.state.tables.concat(newTable),
            
      })
    }

    _onMouseMove = e => {
       
        let CTM = e.target.getScreenCTM();
        this.setState({ x: (e.clientX - CTM.e) / CTM.a, y: (e.clientY - CTM.f) / CTM.d /* x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY */ });
      }
    startDrag = e => {
        
      
        
        e.target.setAttribute("x", this.state.x);
        e.target.setAttributeNS(null,"y", this.state.y);
        
     
       
       
    }
    stopDrag = () => {
       
    }
    changeTable = e => {
         // not allowed AND not working
       
 
         let id = e.target.name.split(".");
       
 
         if(id[1] == 'x') {
           
             let x = 0
             x = e.target.value
             this.setState({
                 tables: this.state.tables.map(el => (el.id == id[0] ?  {...el, x } : el))
             })
         }if(id[1] == 'y'){
           
             let y = 0
             y = parseInt(e.target.value, 10)
             this.setState({
                 tables: this.state.tables.map(el => (el.id == id[0] ?  {...el, y } : el))
             })
         }if(id[1] == 'height'){
           
            let height = 0
            height = parseInt(e.target.value, 10)
            this.setState({
                tables: this.state.tables.map(el => (el.id == id[0] ?  {...el, height } : el))
            })
        }if(id[1] =='width'){
           
                let width = 0
                width = parseInt(e.target.value, 10)
                this.setState({
                    tables: this.state.tables.map(el => (el.id == id[0] ?  {...el, width } : el))
                })
            
        }if(id[1] =='rotation'){
         
                let rotation = 0
                rotation = parseInt(e.target.value, 10)
                this.setState({
                    tables: this.state.tables.map(el => (el.id == id[0] ?  {...el, rotation } : el))
                })
            
        }
      
    }

    deleteTable = (id) => {

        if(this.state.tables.length > 1){
            
            let filteredArray = this.state.tables.filter(item => 
                item.id != id )
                this.setState({
                    tables: filteredArray,
                    errorTables: ''
                });
               
                
          }else{
              this.setState({
                errorTables: 'you need to have atleast 1 table'
              })
          }
    }

    selected = e => {
       
        this.setState({
            selected: e.target.value
        })
    }

    handleDragStart = e => {
       
        e.target.setAttrs({
           
          
        });
      };
      handleDragEnd = e => {
        
          e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            
          });

      
          this.setState(state => {
              const tables = state.tables.map((i) => {
                
                if ( e.target.attrs.id.id == i.id) {
                   
                  return {
                      "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height, "width": e.target.attrs.width,"realId" : e.target.attrs.id.realId, 'fill': i.fill 
                  };
                } else {
                  return i;
                }
              });
         
              return {
                  tables,
              };
            });
      };

    saveLayout = () => {
       
        if(this.state.title == ''){
            this.setState({
                errormsg: 'Layout moet een titel hebben.'
            }, function(){
                toast.error(this.state.errormsg)
            })
        }
        let item = {
            "title" : this.state.title,
            "id" : this.state.layoutId,
            "restaurant_id": this.state.restaurant_id,
            "tables": this.state.tables
        }
       
       if(this.state.title != ''){ 
            this.props.updateLayout(item);
        } 
         
    }
    onChangeTable = (e) => {
       
        let titel;
        this.setState({
            selectedTable: e.target.value,
        }, function (){
         
            this.props.table.tables.map(m => {
               
                if(m.id == this.state.selectedTable){
                    this.setState({
                        selectedTableTitle: m.name
                    })
                }
            }
        )})
    }
    onSelect = (e) => {
  
        this.setState({
            selectedRect : e.target
        })
      }
    setStateCorrect = () => {
     
        if(this.state.setStateCorrect && this.props.layout.layout.tables){
          
            this.setState({
                title: this.props.layout.layout.title,
                setStateCorrect: false,
              }, function(){
                  
                if(this.props.layout.layout.tables.length > 0){
            this.props.layout.layout.tables.map((m,i) => {

                let item = { "id": i, 'realId': m.id, "title": m.name, "x": m.pivot.x , "y": m.pivot.y , "width":m.pivot.width, "height":m.pivot.height, "fill":Konva.Util.getRandomColor()  }
                this.setState(previousState => ({
                    tables: [...previousState.tables, item ]
                }));
            })
        }
        })
  
    }
}
onChangeRect = e =>{
   
    let item = {
      "id": e.target.attrs.id.id , "title": e.target.attrs.id.title, "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height * e.target.attrs.scaleY, "width": e.target.attrs.width * e.target.attrs.scaleX, "realId" : e.target.attrs.id.realId
  }

  this.setState(state => {
      const tables = state.tables.map((i) => {
        
        if ( e.target.attrs.id.id == i.id) {
          
          return {
              "id": e.target.attrs.id.id , "title": e.target.attrs.id.title , "x": e.target.attrs.x, "y": e.target.attrs.y , "height": e.target.attrs.height * e.target.attrs.scaleY, "width": e.target.attrs.width * e.target.attrs.scaleX ,"realId" : e.target.attrs.id.realId, 'fill': i.fill
          };
        } else {
          return i;
        }
      });
 
      return {
          tables,
      };
    });

}
    formChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        },function(){
           if(this.state.title == ''){
               this.setState({
                   errormsg: 'Vul een titel in'
               })
           }else{
               this.setState({
                   errormsg: ''
               })
           }
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
                window.innerWidth / CANVAS_VIRTUAL_WIDTH,
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
        const { layout, loading } = this.props.layout
        const { allRooms, dashboardLoading } = this.props.dashboard
        const { rooms } = this.props.room
        const CANVAS_VIRTUAL_WIDTH = 1000;
        const CANVAS_VIRTUAL_HEIGHT = 1000;

        // now you may want to make it visible even on small screens
        // we can just scale it
        const scale = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
          
          ) - 0.2;
        return (
            <div className="dashboard">
                {layout && allRooms && !loading && !dashboardLoading ? 
                <Container>
                     { layout == 'Not allowed' ? <NotAllowed /> : 
                    <div>
                   {console.log(this.props.dashboard)}
                    { layout.title && !loading && this.state.setStateCorrect ? this.setStateCorrect() : null}
                    <div className="row">
                       
                        <div className="col-1à">
                        <h1>Bewerk uw tafel-layout!</h1>
                        </div>
                        <div className="col">
                        <Button className="floatright" disabled={this.state.errormsg || this.state.title == ''} onClick={this.saveLayout}>Opslaan!</Button>
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
                              <Typography color="textPrimary">Bewerk tafel-layout</Typography>
                             
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                              <h6 div className="floatright">{this.state.dateToday}</h6>
                            </div>
                        </div>
                    { this.state.errormsg ? <Alert severity="error"> {this.state.errormsg}</Alert> : null }
                    <div className="row">
                   
                    <div className="col-12">
                        <Card>
                        <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Basis Informatie</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    
                                <Form onSubmit={this.saveLayout}>
                                        <FormGroup>
                                        <Label for="title">Naam</Label>
                                        <Input 
                                            type="input"
                                            name="title"
                                            onChange={this.formChange}
                                            value={this.state.title}
                                            id="title"
                                            required
                                            placeholder="Geef de layout een titel"
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
                                <Typography>Bewerk de layout</Typography>
                                </AccordionSummary>
                             
                        <div className="row my-2">
                                <div className="col-12">
                            <h5>Kamer</h5> 
                            <Label for="persons">Welke kamer?</Label>
                                                <Input type="select" name="selectedRoom" id="selectedRoom" onChange={this.onChangeSelectedRoom}>
                                                {console.log(this.props.dashboard.allRooms)}
                                                  <option value=''> Kies een kamer </option>
                                                  { this.props.dashboard.allRooms ?
                                                    this.props.dashboard.allRooms.map(m => {
                                                        return(
                                                            
                                                            <option value={m.id}>{m.title}</option>
                                                        )
                                                    })  
                                               : 'Please make a room first' }
                                              
                            </Input>
                        </div>
                        </div>
                        </Accordion>
                            </Card>


                    </div>
                    </div>
                        <div className='row'>
                            <div className="col-12 mb-5">

                        <Card >
                          
                        <Accordion disabled={this.state.selectedRoom == '' ? true : false} >
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Voeg tafels toe</Typography>
                                </AccordionSummary>
                                <div className="row">
                                <Label for="tafel">Welke tafel?</Label>
                                </div>
                                <div className='row'>
                                    <div className="col-10">
                                       
                                            <Input type="select" name="tafel" id="tafel" onChange={this.onChangeTable}>
                                            <option value=''>Kies een tafel</option>
                                            {this.props.table && this.props.table.tables ? 
                                            
                                            
                                            this.props.table.tables.map(m => {
                                                return (
                                                    <option id={m.id} value={m.id} >{m.name}</option>
                                                )
                                            })
                                            
                                            :''}  
                                            </Input>
                                            </div>
                                            <div className='col-2'>
                                            { this.state.selectedTable != '' ?   <Button onClick={this.addTable}>Voeg Tafel toe</Button> : <Button disabled  >Kies een tafel</Button> }
                                            </div>
                        </div>
                        
                                 
                        
      
                                
                        {this.state.tables ? 
                            this.state.tables.map((m,i) => {
                             
                                return(
                                    <div className="row my-3">
                                    <div className="col-2">
                                        {m.title}
                                    </div>
                                    <div className="col-1">
                                        <div style={{backgroundColor: m.fill, width:'100%', height:'100%' }}>
                                            </div>
                                    </div>
                                    <div className="col">
                                        <Input type="number" onChange={this.changeTable} id="x" name={ m.id + ".x"}  value={m.x}>
                                        </Input>
                                    </div>
                                    <div className="col">
                                        <Input type="number" onChange={this.changeTable} id="y" name={ m.id + ".y"}  value={m.y}>
                                        </Input>
                                    </div>
                                    <div className="col">
                                        <Input type="number" onChange={this.changeTable} id="height" name={ m.id + ".height"}  value={m.height}>
                                        </Input>
                                    </div>
                                    <div className="col">
                                        <Input type="number" onChange={this.changeTable} id="width" name={ m.id + ".width"}  value={m.width}>
                                        </Input>
                                    </div>
                                        <Button value={m.id} onClick={() => this.deleteTable(m.id)}>  <DeleteIcon /></Button>
                                       
                                    </div>
                                )
                            })
                            
                        : ''}
                     
                     
                            </Accordion>
                        </Card>
                            </div>
                           
                            { this.state.roomSelect && this.props.room.room && this.state.tables && this.props.layout.layout?  
                         /*     <Stage  width={window.innerWidth} height={window.innerWidth} scaleX={scale} scaleY={scale}>  */
                            <Stage onClick={this.handleStageClick}  width={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } height={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } scaleX={this.state.scale} scaleY={this.state.scale}>  
                   
                            { this.state.roomSelect && this.props.layout.layout && this.state.roomSelect !== '' &&this.props.room.room.walls ?  
                            <Layer>
                                <Shape
                                    sceneFunc={(context, shape) => {
                                    context.beginPath();
                                    
                                    {this.props.room.room.walls.map(m => {
                                        if(m.id == 1){
                                            context.moveTo(m.point1, m.point2);
                                        }
                                        
                                        context.lineTo(m.point1, m.point2);
                                        context.moveTo(m.point1, m.point2);
                                        if(m.id == this.props.room.room.walls.length){
                                            
                                            context.moveTo(m.point1, m.point2);
                                            this.props.room.room.walls.map(m => {
                                                if(m.id == 1){
                                                    context.lineTo(m.point1,m.point2)
                                                }
                                            })
                                            context.lineTo()
                                            context.closePath();
                                        }
                                    })}
                                    
                                    context.closePath();
                                    // (!) Konva specific method, it is very important
                                    context.fillStrokeShape(shape);
                                    }}
                                    fill="#00D2FF"
                                    stroke="black"
                                    strokeWidth={5}
                                /> 
                                </Layer>: null }
                                {this.state.roomSelect && this.props.room.room.extras ?
                                this.props.room.room.extras.map(m => {
                                  
                                    return(
                                    <Layer>
                                    <Rect
                                    id={m.id}
                                    x={m.pivot.x}
                                    y={m.pivot.y}
                                    width={m.pivot.width}
                                    height={m.pivot.height}
                                    fill="grey"
                                    closed
                                    shadowBlur={10}
                                    onChange={this.onChangeDrag}
                                    onDragStart={this.handleDragStart}
                                    onDragEnd={this.handleDragEnd}
            
                                  />
                                  <Text text={m.title} fontSize={15} x={m.pivot.x} y={m.pivot.y} />
                                </Layer>
                                  )
            
                                }) 
                                                   : null }
                                     
                                {this.state.tables ? 
                               
                               this.state.tables.map((m,i) => {
                                 
                                       return (
                                        <Layer>
                                    
                                             <URLImage src={process.env.PUBLIC_URL + `/tables/table${m.realId}.svg`}
                                           name={`rectange${i}`}
                                           id={m}
                                        x={m.x}
                                        y={m.y}
                                        width={m.width}
                                        height={m.height}
                                        fill={m.fill}
                                        closed
                                       
                                        draggable={true}
                                        onClick={this.onSelect}
                                        onTap={this.onSelect}
                                        onTransform={this.onChangeRect}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd}
                                        onDragMove={this.handleDragEnd} 
                                        
                                   />
                                   

                                        {/* <Rect
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
                                        
                                      />  */}

                                    <Circle 
                                     id={m}
                                    x={m.x + (m.width / 2)}
                                    y={m.y + (m.height / 2)}
                                    /* onTransform={this.onChangeRect}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd} */
                                    width={15}
                                    height={15}
                                   fill={m.fill}
                                   
                                   />
                                       <TransformerComponent
                                            selectedShapeName={this.state.selectedShapeName}
                                            
                                        />

                                       </Layer>
                                       )
                               }) : null }
                            </Stage>
                          : null }
                            </div>
                    
                    </div>}
                </Container>
            : <Spinner /> }
            </div>
            
        )
    }
}
EditLayout.propTypes = {
    getTables: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    getLayout: PropTypes.func.isRequired,
    getExtras: PropTypes.func.isRequired,
    getRooms: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    addLayout: PropTypes.func.isRequired,
    extra: PropTypes.object.isRequired,
    updateLayout : PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    getLayouts: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    table: state.table,
    room: state.room,
    dashboard: state.dashboard,
    extra: state.extra,
    layout: state.layout
})
export default connect(mapStateToProps, { getTables, getExtras, getLayouts, getRooms, getRoom, getLayout,forgetLayout, addLayout, updateLayout })( EditLayout )