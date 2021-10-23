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

class CodeUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LOCATION_CODE: this.props.LOCATION_CODE,
            LOCATION_NAME: this.props.LOCATION_NAME,
            file: null,
            LOCATION_IMG: this.props.LOCATION_IMG,
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.updateCode()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
            
        this.setState({
            LOCATION_CODE: '',
            LOCATION_NAME: '',
            file: null,
            LOCATION_IMG: '',
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

    updateCode = () => {
        const LOCATION_CODE = this.props.LOCATION_CODE;
        const url = '/api/codes/location/patch/' + LOCATION_CODE;
        const formData = new FormData();
        formData.append('LOCATION_CODE', this.state.LOCATION_CODE);
        formData.append('LOCATION_NAME', this.state.LOCATION_NAME);
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
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
            LOCATION_CODE: '',
            LOCATION_NAME: '',
            file: null,
            LOCATION_IMG: '',
            open: false
        })
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" style={{backgroundColor: 'green', color: 'white'}} onClick={this.handleClickOpen}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>설비위치 수정</DialogTitle>
                    <DialogContent>
                        <TextField label="ID" name="LOCATION_CODE" value={this.state.LOCATION_CODE} defaultValue={this.props.LOCATION_CODE} onChange={this.handleValueChange} style={{width: '100%'}} /><br/>
                        <TextField label="설비위치" name="LOCATION_NAME" value={this.state.LOCATION_NAME} defaultValue={this.props.LOCATION_NAME} onChange={this.handleValueChange} style={{width: '100%'}} /><br/>
                        3D 위치 이미지:<br/><input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose} >닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CodeUpdate);