import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import SulbiDelete from './sulbiDelete';
import SulbiUpdate from './sulbiUpdate';
import SulbiDetail from './sulbiDetail';

class sulbi_list extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.SULBI_CODE}</TableCell>
                <TableCell>{this.props.SULBI_TITLE}</TableCell>
                <TableCell>{this.props.SULBI_TITLE_SECOND}</TableCell>
                <TableCell>{this.props.SULBI_TITLE_THIRD}</TableCell>
                <TableCell>{this.props.LOCATION_NAME}</TableCell>
                <TableCell>{this.props.SULBI_PROGRESS}</TableCell>
                <TableCell>{this.props.SULBI_NAME}</TableCell>
                <TableCell>{this.props.SULBI_START}</TableCell>
                <TableCell><SulbiUpdate stateRefresh={this.props.stateRefresh}
                                        SULBI_CODE={this.props.SULBI_CODE}
                                        SULBI_TITLE= {this.props.SULBI_TITLE}
                                        SULBI_TITLE_SECOND= {this.props.SULBI_TITLE_SECOND}
                                        SULBI_TITLE_THIRD= {this.props.SULBI_TITLE_THIRD}
                                        LOCATION_NAME= {this.props.LOCATION_NAME}
                                        SULBI_PROGRESS= {this.props.SULBI_PROGRESS}
                                        SULBI_NAME= {this.props.SULBI_NAME}
                                        SULBI_START= {this.props.SULBI_START} />
                </TableCell>
                <TableCell><SulbiDelete stateRefresh={this.props.stateRefresh} SULBI_CODE={this.props.SULBI_CODE}/></TableCell>
                <TableCell><SulbiDetail sulbiCode={this.props.SULBI_CODE}/></TableCell>
            </TableRow>
        )
    }
}

export default sulbi_list;