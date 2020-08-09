import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Trans } from 'react-i18next'
import { deleteReservation, clearDeleteSuccess } from '../../actions/reservationActions';
import { clearErrors } from '../../actions/errorActions'; 
import PropTypes from 'prop-types';
import Spinner from '../../components/Components/Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
class AnnulationModal extends Component {
    constructor(props){
        super(props)
        this.state={
            modal: false,
            item: []
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.props.clearErrors();
        this.props.clearDeleteSuccess();
    }
    confirm = (id) => {
       
        this.props.deleteReservation(id)
    }
    closeAlert = () => {
        this.setState({
            alert: false
        })
        this.props.clearErrors();
        this.props.clearDeleteSuccess();
    }
    render() {
        const { loadingReservation, deleteSuccess } = this.props.reservation
        const { error } = this.props.error
        return (
           
            <div>
                 {this.props.item ?
                <div>
            <Button color="danger" className="fullLengthButton" style={{width: '100%' }} onClick={this.toggle}><Trans i18nKey="annulation" ></Trans></Button>
            <Modal data-backdrop="static" isOpen={this.state.modal} toggle={this.toggle} style={{marginTop: "70px"}}>
              <ModalHeader toggle={this.toggle}><Trans i18nKey="annulation" > </Trans></ModalHeader>
              { loadingReservation ? <Spinner/> : 
               deleteSuccess  ?
              <ModalBody> <div><Trans i18nKey="deletesuccess" ></Trans></div></ModalBody>
              :
              <ModalBody>
              { this.props.error && this.props.error.status == 'RESERVATION_DELETE_FAIL'  ? <Alert severity="error" onClose={() => this.closeAlert()}> <Trans i18nKey="somethingwentwrong"></Trans> </Alert> : null }
              <Trans i18nKey="annulationconfirm" ></Trans>
           
             
             <div className="my-2">

             <h6><Trans i18nKey="reservationoverview"></Trans></h6>
             <h6><strong>{this.props.item.restaurant.title}</strong></h6>
                <p><Trans i18nKey="date"></Trans>: {this.props.item.date}</p>
                <p><Trans i18nKey="hour"></Trans>: {this.props.item.time}</p>
                <p><Trans i18nKey="persons"></Trans>: {this.props.item.persons} </p>
                </div>
              
              </ModalBody>
              }
                {deleteSuccess  ? <ModalFooter> <Button color="primary" ><Trans i18nKey="close" ></Trans></Button>  </ModalFooter>:
                    <ModalFooter>
                <Button color="primary" onClick={() => this.confirm(this.props.item.id)} disabled={loadingReservation}><Trans i18nKey="confirm" ></Trans></Button>
                <Button color="secondary" onClick={this.toggle}><Trans i18nKey="cancel" ></Trans></Button>
                </ModalFooter>
            }
             

            </Modal>
            </div>
            : null }
          </div>
        )
    }
}
AnnulationModal.propTypes = {
    deleteReservation: PropTypes.func.isRequired,
    clearDeleteSuccess: PropTypes.func.isRequired,
    reservation: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    reservation: state.reservation
});

export default connect(mapStateToProps,{deleteReservation, clearErrors ,clearDeleteSuccess })(AnnulationModal)