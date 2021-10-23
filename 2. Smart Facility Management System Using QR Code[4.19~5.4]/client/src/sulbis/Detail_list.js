import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { QRCode } from 'react-qr-svg';
import Qrdisplay from '../qrs/Qrdisplay';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';  

class detail_list extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (
            <>
            <TableRow>
                <TableCell>{this.props.SULBI_PROGRESS}</TableCell>
                <TableCell>{this.props.SULBI_TITLE_SECOND}</TableCell>
                <TableCell>{this.props.SULBI_TITLE_THIRD}</TableCell>
                <TableCell>{this.props.LOCATION_NAME}</TableCell>
                <TableCell>{this.props.SULBI_START}</TableCell>
                <TableCell>{this.props.SULBI_NAME}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>QR코드</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        QR코드
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            <Qrdisplay/>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        <Button variant="contained" color="primary" onClick={window.print}>출력</Button> 
                    </DialogActions>
                </Dialog>
                </TableCell>
            </TableRow>
            <br/><br/>
            </>
        )
    }
}

export default detail_list;