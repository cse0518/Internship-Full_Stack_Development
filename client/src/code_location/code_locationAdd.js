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

class CodeAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LOCATION_CODE: '',
            LOCATION_NAME: '',
            file: null,
            LOCATION_IMG: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCode()
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

    addCode = () => {
        const url = '/api/codes/location';
        const formData = new FormData();
        formData.append('LOCATION_CODE', this.state.LOCATION_CODE);
        formData.append('LOCATION_NAME', this.state.LOCATION_NAME);
        formData.append('image', this.state.file);
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
            LOCATION_CODE: '',
            LOCATION_NAME: '',
            file: null,
            LOCATION_IMG: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    설비위치 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>설비위치 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="ID" type="text" name="LOCATION_CODE" value={this.state.LOCATION_CODE} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="설비분류" type="text" name="LOCATION_NAME" value={this.state.LOCATION_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        3D 위치 이미지:<br/><input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <br/>
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

export default withStyles(styles)(CodeAdd);