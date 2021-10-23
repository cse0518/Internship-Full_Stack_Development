import React, { Component } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import '../css/App.css';

import Code from './code_location_list'
import CodeAdd from './code_locationAdd.js';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        marginLeft: 18,
        marginRight: 18
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    grow: {
        flexGrow: 1,
    },
    tableHead: {
        fontSize: '1.0rem'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});

class code extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codes: '',
            completed: 0,
            searchKeyword: '',
            selectItem: []
        }
    }

    stateRefresh = () => {
        this.setState({
            codes: '',
            completed: 0,
            searchKeyword: ''
        });
        this.callApi()
            .then(res => this.setState({ codes: res, }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({ codes: res, selectItem: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/sulbi/locations');
        const body = await response.json();
        return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const filteredComponents = (data) => {
            data = data.filter((c) => {
                return c.LOCATION_NAME.indexOf(this.state.searchKeyword) > -1;
            });
            
            return data.map((c) => {
                return <Code stateRefresh={this.stateRefresh} key={c.LOCATION_NAME} LOCATION_CODE={c.LOCATION_CODE} LOCATION_NAME={c.LOCATION_NAME} />
            });
        }
        const { classes } = this.props;
        const cellList = ['ID', '설비위치', '수정', '삭제'];

        return (
            <div>
                <h5><br />
                    <AiOutlineHome /> / 코드관리 / 설비위치관리
                </h5><br />
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                설비위치관리
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label" />
                                    <Select style={{width: '300px', color: 'white'}}
                                        name="searchKeyword"
                                        value={this.state.searchKeyword}
                                        onChange={this.handleValueChange}
                                    >
                                        <MenuItem value="">전체</MenuItem>
                                        {
                                            this.state.selectItem.map(function(item, LOCATION_NAME){
                                                return ( <MenuItem value={item.LOCATION_NAME}>{item.LOCATION_NAME}</MenuItem> );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.menu}>
                        <CodeAdd stateRefresh={this.stateRefresh} />
                        <Button variant="contained" style={{backgroundColor:'gray', color:'white', marginLeft:'10px'}} onClick={this.handleClickOpen} href="/Freeview">
                            360도 사진보기
                        </Button>
                    </div>
                    <Paper className={classes.paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {cellList.map(c => {
                                        return <TableCell className={classes.tableHead}>{c}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.codes ?
                                    filteredComponents(this.state.codes) :
                                    <TableRow>
                                        <TableCell colSpan="4" align="center">
                                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </div><br />
            </div>
        );
    }
}

export default withStyles(styles)(code);