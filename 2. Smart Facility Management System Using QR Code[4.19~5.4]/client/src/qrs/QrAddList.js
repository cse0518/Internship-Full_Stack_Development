import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Qrdisplay from './Qrdisplay';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import QrUpdate from './QrUpdate';
import QrDelete from './QrDelete';

class Qraddlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleQrClose = () =>{
        this.setState({
            open:false
        })
    }
    handleClickQrOpen = () =>{
        this.setState({
            open:true
        })
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

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.JAJAE_CODE}</TableCell>
                <TableCell>{this.props.JAJAE_NAME}</TableCell>
                <TableCell>{this.props.JAJAE_TYPE}</TableCell>
                <TableCell>{this.props.JAJAE_GRADE}</TableCell>
                <TableCell>{this.props.JAJAE_DATE}</TableCell>
                <TableCell>
                    <img style={{width:'200px'}} src={this.props.JAJAE_IMG} onClick={this.handleClickOpen}/>
                    <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="lg">
                        <DialogTitle onClose={this.handleClose}>
                            이미지 크게보기
                        </DialogTitle>
                        <DialogContent>
                            <img style={{width:'700px'}} src={this.props.JAJAE_IMG}/>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={window.print}>출력</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
                <TableCell>
                    <Qrdisplay JAJAE_QR={this.props.JAJAE_QR} />
                </TableCell>
                <TableCell><QrUpdate stateRefresh={this.props.stateRefresh}
                                    JAJAE_CODE={this.props.JAJAE_CODE}
                                    JAJAE_NAME={this.props.JAJAE_NAME}
                                    JAJAE_TYPE={this.props.JAJAE_TYPE}
                                    JAJAE_GRADE={this.props.JAJAE_GRADE}
                                    JAJAE_DATE={this.props.JAJAE_DATE}
                                    JAJAE_QR={this.props.JAJAE_QR}
                                    JAJAE_IMG={this.props.JAJAE_NAME}
                            />
                </TableCell>
                <TableCell><QrDelete stateRefresh={this.props.stateRefresh} JAJAE_CODE={this.props.JAJAE_CODE}/></TableCell>
            </TableRow>
        )
    }
}

export default Qraddlist;