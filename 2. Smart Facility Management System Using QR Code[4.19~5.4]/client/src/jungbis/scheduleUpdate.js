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

const currencies_구분 = [
    { value: '정기점검', label: '정기점검' },
    { value: '예방점검', label: '예방점검' },
];

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class ScheduleUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SULBI_TITLE: this.props.SULBI_TITLE,
            JUNGBI_TYPE: this.props.JUNGBI_TYPE,
            LOCATION_NAME: this.props.LOCATION_NAME,
            JUNGBI_CHECKLIST: this.props.JUNGBI_CHECKLIST,
            JUNGBI_NAME: this.props.JUNGBI_NAME,
            JUNGBI_START: this.props.JUNGBI_START,
            TITLE: [],
            LOCATION: [],
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.updateSchedule()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
            
        this.setState({
            SULBI_TITLE: '',
            JUNGBI_TYPE: '',
            LOCATION_NAME: '',
            JUNGBI_CHECKLIST: '',
            JUNGBI_NAME: '',
            JUNGBI_START: '',
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

    updateSchedule = () => {
        const JUNGBI_CODE = this.props.JUNGBI_CODE;
        const url = '/api/schedules/patch/' + JUNGBI_CODE;
        const formData = new FormData();
        formData.append('SULBI_TITLE', this.state.SULBI_TITLE);
        formData.append('JUNGBI_TYPE', this.state.JUNGBI_TYPE);
        formData.append('LOCATION_NAME', this.state.LOCATION_NAME);
        formData.append('JUNGBI_CHECKLIST', this.state.JUNGBI_CHECKLIST);
        formData.append('JUNGBI_NAME', this.state.JUNGBI_NAME);
        formData.append('JUNGBI_START', this.state.JUNGBI_START);
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
            SULBI_TITLE: '',
            JUNGBI_TYPE: '',
            LOCATION_NAME: '',
            JUNGBI_CHECKLIST: '',
            JUNGBI_NAME: '',
            JUNGBI_START: '',
            open: false
        })
        this.props.stateRefresh();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" style={{backgroundColor: 'green', color: 'white'}} onClick={this.handleClickOpen}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>수정</DialogTitle>
                    <DialogContent>
                        <TextField label="설비분류" name="SULBI_TITLE" value={this.state.SULBI_TITLE} select defaultValue={this.props.SULBI_TITLE} onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.TITLE.map((option) => (<MenuItem key={option.SULBI_TITLE} value={option.SULBI_TITLE}>{option.SULBI_TITLE}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="구분" name="JUNGBI_TYPE" value={this.state.JUNGBI_TYPE} select defaultValue={this.props.JUNGBI_TYPE} onChange={this.handleValueChange} style={{width: '100%'}}>
                            {currencies_구분.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="설비위치" name="LOCATION_NAME" value={this.state.LOCATION_NAME} select defaultValue={this.props.LOCATION_NAME} onChange={this.handleValueChange} style={{width: '100%'}}><br/>
                            {this.state.LOCATION.map((option) => (<MenuItem key={option.LOCATION_NAME} value={option.LOCATION_NAME}>{option.LOCATION_NAME}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="점검항목" type="text" name="JUNGBI_CHECKLIST" value={this.state.JUNGBI_CHECKLIST} defaultValue={this.props.JUNGBI_CHECKLIST} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="담당자" type="text" name="JUNGBI_NAME" value={this.state.JUNGBI_NAME} defaultValue={this.props.JUNGBI_NAME} onChange={this.handleValueChange} style={{width: '100%'}}/><br/><br/>
                        정비시작일 <TextField type="date" name="JUNGBI_START" value={this.state.JUNGBI_START} defaultValue={this.props.JUNGBI_START} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
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

export default withStyles(styles)(ScheduleUpdate);