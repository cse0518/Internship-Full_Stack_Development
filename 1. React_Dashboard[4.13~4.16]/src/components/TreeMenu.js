import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {AiFillPlusSquare, AiFillMinusSquare} from 'react-icons/ai';
import {FaServer} from 'react-icons/fa';

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const TreeMenu = () => {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<AiFillMinusSquare />}
            defaultExpandIcon={<AiFillPlusSquare />}
            style={{color: '#0791d1'}}
        >
            <TreeItem nodeId="1" label="평택" labelInfo="2/2">
                <TreeItem icon={<FaServer />} nodeId="2" label="DESKTOP-6LLTQOK" style={{color: '#e74a3b'}}/>
                <TreeItem icon={<FaServer />} nodeId="3" label="ktthaiiptv" style={{color: '#fb811c'}}/>
            </TreeItem>
        </TreeView>
    );
}
export default TreeMenu;