import React, { Component } from 'react';
import {Button, Card, Container, Form, Row, Col} from 'react-bootstrap';
import {AiOutlineHome} from 'react-icons/ai';

import '../css/App.css';
import Detail from './Detail_list'
import JDetail_list from './JDetail_list'

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
import SearchIcon from '@material-ui/icons/Search';

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
  
  class detail extends Component {

    constructor(props) {
      super(props);
      this.state = {
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
        sulbis: '',
        jajaes: '',
        completed: 0,
      });
      this.callApi()
        .then(res => this.setState({
          sulbis: res, 
          jajaes: res
        }))
        .catch(err => console.log(err));
    }
  
    componentDidMount() {
      this.timer = setInterval(this.progress, 20);
      this.callApi('/api/detail?code=' + this.props.match.params.idx)
        .then(res => this.setState({sulbis: res}))
        .catch(err => console.log(err));
      this.callApi('/api/jajae?code=' + this.props.match.params.idx)
        .then(res => this.setState({jajaes: res}))
        .catch(err => console.log(err));
    }
    
    callApi = async (url) => {
      const response = await fetch(url);
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
        const filteredComponents = (data) => {
            return data.map((c) => {
                return <Detail stateRefresh={this.stateRefresh}
                              key={c.SULBI_CODE}
                              SULBI_CODE={c.SULBI_CODE}
                              SULBI_TITLE={c.SULBI_TITLE}
                              SULBI_TITLE_SECOND={c.SULBI_TITLE_SECOND}
                              SULBI_TITLE_THIRD={c.SULBI_TITLE_THIRD}
                              LOCATION_NAME={c.LOCATION_NAME}
                              SULBI_PROGRESS={c.SULBI_PROGRESS}
                              SULBI_NAME={c.SULBI_NAME}
                              SULBI_START={c.SULBI_START}
                              SULBI_ISDELETED={c.SULBI_ISDELETED}
                        /> 
            });
        }
      const { classes } = this.props;
      const cellList = ['진행상태', '설비명', '설비방식', '설비위치', '시작날짜', '담당자','QR'];
      const JcellList = ['자재코드','자재명','자재분류','자재등급','입고날짜', '이미지', '수정']; 
      
      // 자재
      const filteredJajaeComponents = (data) => {
        return data.map((j) => {
            return <JDetail_list stateRefresh={this.stateRefresh}
                          key={j.SULBI_CODE}
                          JAJAE_CODE={j.JAJAE_CODE}
                          JAJAE_NAME={j.JAJAE_NAME}
                          JAJAE_TYPE={j.JAJAE_TYPE}
                          JAJAE_DATE={j.JAJAE_DATE}
                          JAJAE_GRADE={j.JAJAE_GRADE}
                          JAJAE_IMG={j.JAJAE_IMG}
                          JAJAE_ISDELETED={j.JAJAE_ISDELETED}
                    /> 
        });
      }
      
      return (
        <div>
          <h5><br />
            <AiOutlineHome /> / 설비관리 / 설비정보관리 
          </h5><br />
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  설비 보고서
                </Typography>
                <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  
                </div>
              </Toolbar>
            </AppBar>
            <br/>
            <Button size="lg" variant="dark"  >설비 기본 정보</Button>
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
                  {this.state.sulbis ?
                    filteredComponents(this.state.sulbis) :
                    <TableRow>
                      <TableCell colSpan="11" align="center">
                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
              </Paper>
              <br/> 
            {/* //자재~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Button size="lg" variant="dark"  >자재 상세 정보</Button>
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
                  {this.state.jajaes ?
                    filteredJajaeComponents(this.state.jajaes) :
                    <TableRow>
                      <TableCell colSpan="11" align="center">
                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Paper>
            <br/>
          </div>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(detail);