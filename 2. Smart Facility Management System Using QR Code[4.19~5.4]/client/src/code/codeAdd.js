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

const currencies_A = [
    { value: '가스설비', label: '가스설비' },
    { value: '급수설비', label: '급수설비' },
    { value: '급탕설비', label: '급탕설비' },
    { value: '방재설비', label: '방재설비' },
    { value: '소방설비', label: '소방설비' },
    { value: '운송설비', label: '운송설비' },
];

// const currencies_Aa = [
//     { value: '저압공급방식', label: '저압공급방식' },
//     { value: '중압공급방식', label: '중압공급방식' },
// ];

// const currencies_Ab = [
//     { value: '수도직결방식', label: '수도직결방식' },
//     { value: '고가수조방식', label: '고가수조방식' },
//     { value: '압력수조방식', label: '압력수조방식' },
//     { value: '수조없는 부스터방식', label: '수조없는 부스터방식' },
// ];

// const currencies_Ac = [
//     { value: '국소식 급탕법', label: '국소식 급탕법' },
//     { value: '중앙식 급탕법', label: '중앙식 급탕법' },
// ];

// const currencies_Ad = [
//     { value: '방재설비', label: '방재설비' },
//     { value: '경보설비', label: '경보설비' },
//     { value: '비상전원과 비상조명', label: '비상전원과 비상조명' },
//     { value: '자동 화재탐지설비', label: '자동 화재탐지설비' },
// ];

// const currencies_Ae = [
//     { value: '소화설비', label: '소화설비' },
//     { value: '경보설비', label: '경보설비' },
//     { value: '피난설비', label: '피난설비' },
//     { value: '소화용수설비', label: '소화용수설비' },
//     { value: '소화활동설비', label: '소화활동설비' },
// ];

// const currencies_Af = [
//     { value: '엘리베이터', label: '엘리베이터' },
//     { value: '에스컬레이터', label: '에스컬레이터' },
//     { value: '전동 덤웨이터', label: '전동 덤웨이터' },
// ];

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CodeAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CODE: '',
            SULBI_TITLE: '',
            // TYPE_B: '',
            // TYPE_C: '',
            open: false
            // testdata: []
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
            CODE: '',
            SULBI_TITLE: '',
            // TYPE_B: '',
            // TYPE_C: '',
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

        // if(e.target.value == '가스설비') {
        //     this.setState({
        //         testdata: currencies_Aa
        //     })
        // } else  if(e.target.value == '급수설비') {
        //     this.setState({
        //         testdata: currencies_Ab
        //     })
        // }else  if(e.target.value == '급탕설비') {
        //     this.setState({
        //         testdata: currencies_Ac
        //     })
        // }else  if(e.target.value == '방재설비') {
        //     this.setState({
        //         testdata: currencies_Ad
        //     })
        // }else  if(e.target.value == '소방설비') {
        //     this.setState({
        //         testdata: currencies_Ae
        //     })
        // }else  if(e.target.value == '운송설비') {
        //     this.setState({
        //         testdata: currencies_Af
        //     })
        // }
    }

    addCode = () => {
        const url = '/api/codes';
        const formData = new FormData();
        formData.append('CODE', this.state.CODE);
        formData.append('SULBI_TITLE', this.state.SULBI_TITLE);
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
            CODE: '',
            SULBI_TITLE: '',
            // TYPE_B: '',
            // TYPE_C: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    설비분류 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>설비분류 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="ID" type="text" name="CODE" value={this.state.CODE} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        <TextField label="설비분류" type="text" name="SULBI_TITLE" value={this.state.SULBI_TITLE} onChange={this.handleValueChange} style={{width: '100%'}}/><br/>
                        {/* <TextField label="설비분류" name="SULBI_TITLE" value={this.state.SULBI_TITLE} select defaultValue="this.props.SULBI_TITLE" onChange={this.handleValueChange} style={{width: '100%'}}>
                            {currencies_A.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                            <div>
                            {
                                option.value === '가스설비'
                                ?   <TextField label="설비방식" name="TYPE_B" value={this.state.TYPE_B} select defaultValue="this.props.TYPE_B" onChange={this.handleValueChange} style={{width: '250px'}}>
                                        {currencies_Aa.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                                    </TextField>
                                : null
                            }
                            </div>
                        </TextField><br/>
                        <TextField label="설비방식" name="TYPE_B" value={this.state.TYPE_B} onChange={this.handleValueChange} select style={{width: '250px'}}>
                            {this.state.testdata.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) )}<br/>
                        </TextField><br/>
                        <TextField label="설비설명" type="text" name="TYPE_C" value={this.state.TYPE_C} onChange={this.handleValueChange} style={{width: '250px'}}/><br/> */}
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