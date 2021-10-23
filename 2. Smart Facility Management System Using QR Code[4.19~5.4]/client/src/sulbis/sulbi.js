import React, { Component } from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import '../css/App.css';

import Sulbi from './sulbi_list'
import SulbiAdd from './sulbiAdd';
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
  
  class sulbi extends Component {

    constructor(props) {
      super(props);
      this.state = {
        sulbis: '',
        completed: 0,
        searchKeyword: ''
      }
    }
  
    stateRefresh = () => {
      this.setState({
        sulbis: '',
        completed: 0,
        searchKeyword: ''
      });
      this.callApi()
        .then(res => this.setState({sulbis: res}))
        .catch(err => console.log(err));
    }
  
    componentDidMount() {
      this.timer = setInterval(this.progress, 20);
      this.callApi()
        .then(res => this.setState({sulbis: res}))
        .catch(err => console.log(err));
    }
  
    callApi = async () => {
      const response = await fetch('/api/sulbis');
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
                return c.SULBI_NAME.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return <Sulbi stateRefresh={this.stateRefresh}
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
        const cellList = ['ID', '설비분류', '설비방식', '설비 상세내용', '설비위치', '진행구분', '담당자', '예정날짜', '수정', '삭제', '상세보기'];

      return (
        <div>
          {/* <!-- Basic Layout --> */}
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
              <SulbiAdd stateRefresh={this.stateRefresh} />
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
          </div><br />
        </div>
      );
    }
  }
  
  export default withStyles(styles)(sulbi);