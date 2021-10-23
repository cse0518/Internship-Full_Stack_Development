import React, { Component } from 'react';
import {Button, Card, Container, Form, Row, Col} from 'react-bootstrap';
import {AiOutlineHome} from 'react-icons/ai';
import '../css/App.css';

import Schedule from './schedule_list'
import ScheduleAdd from './scheduleAdd';
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
import InputBase from '@material-ui/core/InputBase';
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
  
  class schedule extends Component {

    constructor(props) {
      super(props);
      this.state = {
        schedules: '',
        completed: 0,
        searchKeyword: ''
      }
    }
  
    stateRefresh = () => {
      this.setState({
        schedules: '',
        completed: 0,
        searchKeyword: ''
      });
      this.callApi()
        .then(res => this.setState({schedules: res}))
        .catch(err => console.log(err));
    }
  
    componentDidMount() {
      this.timer = setInterval(this.progress, 20);
      this.callApi()
        .then(res => this.setState({schedules: res}))
        .catch(err => console.log(err));
    }
  
    callApi = async () => {
      const response = await fetch('/api/schedules');
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
          data = data.filter((c) => {
              return c.JUNGBI_NAME.indexOf(this.state.searchKeyword) > -1;
          });
          return data.map((c) => {
              return <Schedule stateRefresh={this.stateRefresh}
                               key={c.JUNGBI_CODE}
                               JUNGBI_CODE={c.JUNGBI_CODE}
                               SULBI_TITLE={c.SULBI_TITLE}
                               JUNGBI_TYPE={c.JUNGBI_TYPE}
                               JUNGBI_TITLE={c.JUNGBI_TITLE}
                               LOCATION_NAME={c.LOCATION_NAME}
                               JUNGBI_CHECKLIST={c.JUNGBI_CHECKLIST}
                               JUNGBI_NAME={c.JUNGBI_NAME}
                               JUNGBI_START={c.JUNGBI_START}
                               JUNGBI_ISDELETED={c.JUNGBI_ISDELETED}
                       />
          });
      }
      const { classes } = this.props;
      const cellList = ['번호', '설비분류', '구분', '정비위치', '점검항목', '담당자', '점검 예정날짜', '수정', '삭제'];

      return (
          <div>
              <h5><br />
                <AiOutlineHome /> / 정비관리 / 정비스케쥴관리
              </h5><br />
              <div className={classes.root}>
                  <AppBar position="static">
                      <Toolbar>
                      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                          정비스케쥴 관리
                      </Typography>
                          <div className={classes.grow} />
                          <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                  <SearchIcon />
                              </div>
                              <InputBase
                                placeholder="담당자 검색"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                              />
                          </div>
                      </Toolbar>
                  </AppBar>
                  <div className={classes.menu}>
                      <ScheduleAdd stateRefresh={this.stateRefresh}/>
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
                              {this.state.schedules ? 
                                  filteredComponents(this.state.schedules) :
                                  <TableRow>
                                      <TableCell colSpan="9" align="center">
                                          <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                                      </TableCell>
                                  </TableRow>
                              }
                          </TableBody>
                      </Table>
                  </Paper>
              </div><br/>
          </div>
        );
  }
}

export default withStyles(styles)(schedule);