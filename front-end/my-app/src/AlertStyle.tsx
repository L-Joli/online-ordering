import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { IRootState, ThunkDispatch } from './redux/store';
import { connect } from 'react-redux';
import { removeAlert } from './redux/alertStyle/actions';
import './scss/AlertStyle.scss';


interface IAlertProps {
    alertmsg: string;
    removeAlert: () => void;
}

const AlertStyle: React.FC<IAlertProps> = (props) => {
  
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
        setVisible(false);
        props.removeAlert();

    };

    return (
  
        <Alert className="alertStyle" isOpen={visible} toggle={onDismiss}>{props.alertmsg}</Alert>

    )
}


const mapStateToProps = (state: IRootState) => {
    return {
        alertmsg: state.alert.alertmsg
  }
}
  
  const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        removeAlert: () => dispatch(removeAlert())
    }
  }

//   const mapDispatchToProps = {
//       removeAlert
//   }
  
export default connect(mapStateToProps, mapDispatchToProps)(AlertStyle);