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

const currencies_진행상태 = [
    { value: '진행예정', label: '진행예정' },
    { value: '진행중', label: '진행중' },
    { value: '진행완료', label: '진행완료' },
];

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class SulbiAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SULBI_TITLE: '',
            LOCATION_NAME: '',
            SULBI_PROGRESS: '',
            SULBI_NAME: '',
            SULBI_START: '',
            TITLE: [],
            LOCATION: [],
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addSulbi()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })

        this.setState({
            SULBI_TITLE: '',
            LOCATION_NAME: '',
            SULBI_PROGRESS: '',
            SULBI_NAME: '',
            SULBI_START: '',
            open: false
        })
    }

    componentDidMount() {
        this.callApi('/api/sulbi/titles')
            .then(res => this.setState({ TITLE: res }))
            .catch(err => console.log(err));
        this.callApi('/api/sulbi/locations')
            .then(res => this.setState({ LOCATION: res }))
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

    addSulbi = () => {
        const url = '/api/sulbis';
        const formData = new FormData();
        formData.append('SULBI_TITLE', this.state.SULBI_TITLE);
        formData.append('LOCATION_NAME', this.state.LOCATION_NAME);
        formData.append('SULBI_PROGRESS', this.state.SULBI_PROGRESS);
        formData.append('SULBI_NAME', this.state.SULBI_NAME);
        formData.append('SULBI_START', this.state.SULBI_START);
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
            SULBI_TITLE: '',
            LOCATION_NAME: '',
            SULBI_PROGRESS: '',
            SULBI_NAME: '',
            SULBI_START: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    보고서 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>보고서 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="설비분류" name="SULBI_TITLE" value={this.state.SULBI_TITLE} select onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.TITLE.map((option) => (<MenuItem key={option.SULBI_TITLE} value={option.SULBI_TITLE}>{option.SULBI_TITLE}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="설비위치" name="LOCATION_NAME" value={this.state.LOCATION_NAME} select onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.LOCATION.map((option) => (<MenuItem key={option.LOCATION_NAME} value={option.LOCATION_NAME}>{option.LOCATION_NAME}</MenuItem>) )}<br/>
                        </TextField><br/>
                        {/* <TextField label="설비위치" type="text" name="LOCATION_NAME" value={this.state.LOCATION_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/> */}
                        <TextField label="진행상태" name="SULBI_PROGRESS" value={this.state.SULBI_PROGRESS} select onChange={this.handleValueChange} style={{width: '100%'}}>
                            {currencies_진행상태.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="담당자" type="text" name="SULBI_NAME" value={this.state.SULBI_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        정비시작일 <TextField type="date" name="SULBI_START" value={this.state.SULBI_START} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
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

export default withStyles(styles)(SulbiAdd);