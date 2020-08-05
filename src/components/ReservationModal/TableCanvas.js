import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { addReservation } from '../../actions/reservationActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text, Circle, Line, Shape } from 'react-konva';
import Konva from 'konva';
import { getRooms } from '../../actions/roomActions'
class TableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: this.props.room.rooms,
            walls: this.props.room.rooms.walls
        }
    }
    componentDidMount() {
       this.props.getRooms(1)
    }


    handleClick(e) {
        e.stopPropagation();
        console.log(e)
        console.log('INSIDE');
        this.setState({inside: 'inside'});
    }
    mouseDown(e){
        console.log(e.target)

    }
    onClick = e => {
        console.log(e.target)
        this.setState({
           selectedTable: e.target.attrs.id
       }) 
    }
    render() {
        const { rooms, loading } = this.props.room;
        const { tablereservations } = this.props.reservation;
        
        return (
            <div>
                {console.log(rooms, loading, this.props.reservation.tablereservations)}
                {console.log('window', window.innerWidth)}
                { rooms && !loading && !this.props.reservation.loading && tablereservations[0]== 'open' ? 
                 <Stage width={window.innerWidth /* < 1000 ? window.innerWidth  : 1000  */} height={window.innerHeight /* < 1000 ? window.innerHeight : 1000 */ }>
                 {  this.props.room.rooms[0].walls ?  
                 <Layer>
                     <Shape
                         sceneFunc={(context, shape) => {
                         context.beginPath();
                         {rooms[0].walls.map(m => {
                             if(m.id == 1){
                                 context.moveTo(m.point1, m.point2);
                             }
                             
                             context.lineTo(m.point1, m.point2);
                             context.moveTo(m.point1, m.point2);
                             if(m.id == rooms[0].walls.length){
                                 
                                 context.moveTo(m.point1, m.point2);
                                 rooms[0].walls.map(m => {
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
                     {console.log('ex',this.props.room.rooms.extras)}
                { this.props.room.rooms[0].extras ? 
                
                this.props.room.rooms[0].extras.map(m => {
                    console.log('m',m)
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

                  />
                  <Text text={m.title} fontSize={15} x={m.pivot.x} y={m.pivot.y} />
                </Layer>)
                })
            : null
            }

            {this.props.room.rooms[0].layout.tables ? 
            this.props.room.rooms[0].layout.tables.map(m => {
                 console.log('m',m, )
                 return(
                 <Layer>
                     <Rect
                            id={m}
                            key={m.pivot.id}
                            x={m.pivot.x}
                            y={m.pivot.y}
                            width={m.pivot.width}
                            height={m.pivot.height}
                           
                            fill={"red"}
                            
                            closed
                            shadowBlur={10}
                            onChange={this.onChangeDrag}
                            onDragStart={this.handleDragStart}
                            onDragEnd={this.handleDragEnd}
                            onClick={this.onClick}
           
                          />    
                          {console.log('reservation tables',this.props.reservation.tablereservations[1])}
                        

                                              {this.props.reservation.tablereservations[1] !== 'no reservations' ? 
                                            
                                             this.props.reservation.tablereservations[1].map(res => {
                                                console.log(res[0].pivot.id, m.pivot.id)
                                                if(res[0].pivot.id == m.pivot.id){
                                                    console.log('gevonden')
                                                    return (
                                                        <Rect
                                                        id={m.id}
                                                        
                                                        x={m.pivot.x}
                                                        y={m.pivot.y}
                                                        width={m.pivot.width}
                                                        height={m.pivot.height}
                                                        fill={'grey'}
                                                        closed
                                                      />
                                                    )
                                                } 
                                            }) : null } 

                 
               <Text text={m.title} fontSize={15} x={m.pivot.x} y={m.pivot.y} />
             </Layer>)
             })

            : null }
             </Stage>
             : this.props.reservation.tablereservations[0] == "closed" ? <div>Closed </div>:<div> Loading </div>
            
            
            }
{/*                 {this.props.room.rooms && this.props.room ?
            
            <Stage width={800} height={800}>
                {console.log('rooms', this.state.walls)}
                {  this.props.room.rooms[0].walls ?  
                <Layer>
                    <Shape
                        sceneFunc={(context, shape) => {
                        context.beginPath();
                        {this.props.room.rooms.walls.map(m => {
                            if(m.id == 1){
                                context.moveTo(m.point1, m.point2);
                            }
                            
                            context.lineTo(m.point1, m.point2);
                            context.moveTo(m.point1, m.point2);
                            if(m.id == this.props.room.rooms.walls.length){
                                
                                context.moveTo(m.point1, m.point2);
                                this.props.room.rooms.walls.map(m => {
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
                <Layer>
                <Rect
                    x={20}
                    y={50}
                    width={100}
                    height={100}
                    fill="red"
                    shadowBlur={10}
                />
                </Layer>
            </Stage>
            : null } */}
                </div>
        );
    }
}
TableComponent.propTypes = {
    error: PropTypes.object.isRequired,
     clearErrors: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     getRooms: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
 }
const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    room: state.room,
    reservation: state.reservation
});

export default connect(mapStateToProps,{addReservation, clearErrors, getRooms })(TableComponent);