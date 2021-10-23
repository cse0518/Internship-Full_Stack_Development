import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class caladd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JUNGBI_TITLE: '',
            JUNGBI_NAME: '',
            JUNGBI_START: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCal()
            .then((response) => {
                console.log(response.data);
                // this.props.stateRefresh();
                this.props.onAfterAdd && this.props.onAfterAdd()
            })

        this.setState({
            JUNGBI_TITLE: '',
            JUNGBI_NAME: '',
            JUNGBI_START: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCal = () => {
        const url = '/api/calendar';
        const formData = new FormData();
        formData.append('JUNGBI_TITLE', this.state.JUNGBI_TITLE);
        formData.append('JUNGBI_NAME', this.state.JUNGBI_NAME);
        formData.append('JUNGBI_START', this.state.JUNGBI_START);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            JUNGBI_TITLE: '',
            JUNGBI_NAME: '',
            JUNGBI_START: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    스케쥴 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>스케쥴 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="정비내용" type="VARCHAR" name="JUNGBI_TITLE" value={this.state.JUNGBI_TITLE}  onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="담당자" type="text" name="JUNGBI_NAME" value={this.state.JUNGBI_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        정비시작일 <TextField type="date" name="JUNGBI_START" value={this.state.JUNGBI_START} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(caladd);