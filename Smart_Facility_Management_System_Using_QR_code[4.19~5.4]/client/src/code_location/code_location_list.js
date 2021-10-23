import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CodeDelete from './code_locationDelete';
import CodeUpdate from './code_locationUpdate';

class CodeList extends React.Component {
    render() {
        return (
            <TableRow>
                    <TableCell>{this.props.LOCATION_CODE}</TableCell>
                    <TableCell>{this.props.LOCATION_NAME}</TableCell>
                    <TableCell><CodeUpdate stateRefresh={this.props.stateRefresh}
                                            LOCATION_CODE={this.props.LOCATION_CODE}
                                            LOCATION_NAME={this.props.LOCATION_NAME} />
                    </TableCell>
                    <TableCell><CodeDelete stateRefresh={this.props.stateRefresh} LOCATION_CODE={this.props.LOCATION_CODE}/></TableCell>
            </TableRow>
        )
    }
}

export default CodeList;