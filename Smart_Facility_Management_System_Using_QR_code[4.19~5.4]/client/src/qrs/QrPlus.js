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
    { value: 'E', label: 'E' },
];

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class QrPlus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JAJAE_NAME: '',
            JAJAE_TYPE: '',
            JAJAE_GRADE: '',
            JAJAE_DATE: '',
            JAJAE_QR: '',
            TYPE: [],
            file: null,
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addJajae()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })

        this.setState({
            JAJAE_NAME: '',
            JAJAE_TYPE: '',
            JAJAE_GRADE: '',
            JAJAE_DATE: '',
            JAJAE_QR: '',
            file: null,
            open: false
        })
    }

    componentDidMount() {
        this.callApi('/api/jajae/type')
            .then(res => this.setState({ TYPE: res }))
            .catch(err => console.log(err));
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

    addJajae = () => {
        const url = '/api/jajaeqr';
        const formData = new FormData();
        formData.append('JAJAE_NAME', this.state.JAJAE_NAME);
        formData.append('JAJAE_TYPE', this.state.JAJAE_TYPE);
        formData.append('JAJAE_GRADE', this.state.JAJAE_GRADE);
        formData.append('JAJAE_DATE', this.state.JAJAE_DATE);
        formData.append('JAJAE_QR', this.state.JAJAE_QR);
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
            JAJAE_NAME: '',
            JAJAE_TYPE: '',
            JAJAE_DATE: '',
            JAJAE_GRADE: '',
            JAJAE_QR: '',
            file: null,
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    자재 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>자재 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="자재명" type="text" name="JAJAE_NAME" value={this.state.JAJAE_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="자재분류" name="JAJAE_TYPE" value={this.state.JAJAE_TYPE} select onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.TYPE.map((option) => (<MenuItem key={option.JAJAE_TYPE} value={option.JAJAE_TYPE}>{option.JAJAE_TYPE}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="자재등급" name="JAJAE_GRADE" value={this.state.JAJAE_GRADE} select onChange={this.handleValueChange} style={{width: '100%'}}>
                            {currencies_자재등급.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                        </TextField><br/><br/>
                        자재 입고날짜<br/>
                        <TextField  type="date" name="JAJAE_DATE" value={this.state.JAJAE_DATE} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        자재 이미지:<br/><input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <TextField label="QR 링크입력" type="text" name="JAJAE_QR" value={this.state.JAJAE_QR} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
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

export default withStyles(styles)(QrPlus);