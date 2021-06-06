import React, { Component } from 'react';
import '../css/App.css';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Button from '@material-ui/core/Button';

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
      align: 'center',
      marginLeft: 18,
      marginRight: 18
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
  
class sulbi_detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            jj:''
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

    render() {
        return (
            <div>
                <Button variant="contained" color="silver" onClick={() => {
                    window.location.href = '/Detail/' + this.props.sulbiCode;
                }}>상세보기</Button>
            </div>
          );
    }
  }
  
  export default withStyles(styles)(sulbi_detail);