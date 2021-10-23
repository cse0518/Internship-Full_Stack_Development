import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const currencies_자재등급 = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' }
];
const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class JDetailUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JAJAE_CODE: this.props.JAJAE_CODE,
            JAJAE_NAME: this.props.JAJAE_NAME,
            JAJAE_TYPE: this.props.JAJAE_TYPE,
            JAJAE_GRADE: this.props.JAJAE_GRADE,
            JAJAE_DATE: this.props.JAJAE_DATE,
            JAJAE_IMG: this.props.JAJAE_IMG,
            TITLE: [],
            LOCATION: [],
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.updateSulbi()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
            
        this.setState({
            JAJAE_CODE: '',
            JAJAE_NAME: '',
            JAJAE_TYPE: '',
            JAJAE_GRADE: '',
            JAJAE_DATE: '',
            JAJAE_IMG: '',
            open: false
        })
    }

    callApi = async (url) => {
        const response = await fetch(url);
        const body = await response.json();
        return body;
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
    updateSulbi = () => {
        const JAJAE_CODE = this.props.JAJAE_CODE;
        const url = '/api/jajaes/patch/' + JAJAE_CODE;
        const formData = new FormData();
        formData.append('JAJAE_CODE', this.state.JAJAE_CODE);
        formData.append('JAJAE_NAME', this.state.JAJAE_NAME);
        formData.append('JAJAE_TYPE', this.state.JAJAE_TYPE);
        formData.append('JAJAE_GRADE', this.state.JAJAE_GRADE);
        formData.append('JAJAE_DATE', this.state.JAJAE_DATE);
        formData.append('JAJAE_IMG', this.state.JAJAE_IMG);
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
            JAJAE_CODE: '',
            JAJAE_NAME: '',
            JAJAE_TYPE: '',
            JAJAE_GRADE: '',
            JAJAE_DATE: '',
            JAJAE_IMG: '',
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
                    <DialogTitle>수정</DialogTitle>
                    <DialogContent>
                        <TextField label="자재코드" type="text" name="JAJAE_CODE" value={this.state.JAJAE_CODE} defaultValue={this.props.JAJAE_CODE} onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.TITLE.map((option) => (<MenuItem key={option.JAJAE_CODE} value={option.JAJAE_CODE}>{option.JAJAE_CODE}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="자재명" type="text" name="JAJAE_NAME" value={this.state.JAJAE_NAME} defaultValue={this.props.JAJAE_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="자재분류" type="text" name="JAJAE_TYPE" value={this.state.JAJAE_TYPE} defaultValue={this.props.JAJAE_TYPE} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="자재등급" name="JAJAE_GRADE" value={this.state.JAJAE_GRADE} select defaultValue={this.props.JAJAE_GRADE} onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {currencies_자재등급.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <br/>
                        <TextField label="이미지" type="text" name="JAJAE_IMG" value={this.state.JAJAE_IMG} defaultValue={this.props.JAJAE_IMG} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        입고날짜 <TextField type="date" name="JAJAE_DATE" value={this.state.JAJAE_DATE} defaultValue={this.props.JAJAE_DATE} onChange={this.handleValueChange} style={{width: '100%'}}>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(JDetailUpdate);