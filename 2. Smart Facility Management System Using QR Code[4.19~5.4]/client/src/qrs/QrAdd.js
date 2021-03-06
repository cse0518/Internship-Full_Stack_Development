import React, { Component } from 'react';
import {Button, Card, Container, Form, Row, Col} from 'react-bootstrap';
import {AiOutlineHome} from 'react-icons/ai';

import '../css/App.css';
import QrPlus from './QrPlus';
import Qraddlist from './QrAddList'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
  
class Qradd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jajaeqr:'',
            sulbis: '',
            jajaes: '',
            completed: 0,
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

    stateRefresh = () => {
        this.setState({
            jajaeqr:'',
            sulbis: '',
            jajaes: '',
            completed: 0,
        });

        this.callApi()
            .then(res => this.setState({
                jajaes: res,
                jajaeqr: res
            }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi('/api/jajaeqr')
            .then(res => this.setState({jajaeqr: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/jajaeqr');
        const body = await response.json();
        return body;
    }
  
    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1});
    }
  
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const { classes } = this.props;
        const JcellList = ['????????????','?????????','????????????','????????????','????????????', '?????????', 'QR??????', '??????', '??????']; 
        
        const filteredJajaeComponents = (data) => {
            return data.map((j) => {
                return <Qraddlist stateRefresh={this.stateRefresh}
                                    key={j.JAJAE_CODE}
                                    JAJAE_CODE={j.JAJAE_CODE}
                                    JAJAE_NAME={j.JAJAE_NAME}
                                    JAJAE_TYPE={j.JAJAE_TYPE}
                                    JAJAE_GRADE={j.JAJAE_GRADE}
                                    JAJAE_DATE={j.JAJAE_DATE}
                                    JAJAE_IMG={j.JAJAE_IMG}
                                    JAJAE_QR={j.JAJAE_QR}
                                    JAJAE_ISDELETED={j.JAJAE_ISDELETED}
                        /> 
            });
        }
      
      return (
        <div>
            <h5><br/>
                <AiOutlineHome /> / QR????????????/ ?????? QR?????? ??????
            </h5><br/>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        ?????? QR ?????? ??????
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <QrPlus stateRefresh={this.stateRefresh} />
                </div>
                <Card style={{width: '140px', height:'45px', backgroundColor:'gray', color:'white', textAlign:'center', justifyContent:'center'}}><h5>?????? ?????? ??????</h5></Card>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {JcellList.map(j => {
                                    return <TableCell className={classes.tableHead}>{j}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.jajaeqr ?
                                filteredJajaeComponents(this.state.jajaeqr) :
                                <TableRow>
                                    <TableCell colSpan="11" align="center">
                                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(Qradd);