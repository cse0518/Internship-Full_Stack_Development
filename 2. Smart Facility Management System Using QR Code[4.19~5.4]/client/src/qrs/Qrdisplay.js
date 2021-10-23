import React from "react";
import { QRCode } from "react-qr-svg";
import Typography from '@material-ui/core/Typography';  

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

class Qrdisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sulbis: '',
          jajaes: '',
          jajaesqr:'',
          JAJAE_QR:'',
          completed: 0,
          open: false
        }
      }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
  
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    stateRefresh = () => {
        this.setState({
            sulbis: '',
            jajaes: '',
            jajaeqr: '',
            completed: 0,
        });

        this.callApi()
            .then(res => this.setState({
                jajaes: res,
                jajaeqr: res
            }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi('/api/jajaeqr')
            .then(res => this.setState({jajaeqr: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/jajaeqr');
        const body = await response.json();
        return body;
    }
    
    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1});
    }
    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>QR코드</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        QR코드
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            <QRCode
                                style={{ width: 300 }}
                                value={this.props.JAJAE_QR}
                            />
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        <Button variant="contained" color="primary" onClick={window.print}>출력</Button> 
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Qrdisplay;