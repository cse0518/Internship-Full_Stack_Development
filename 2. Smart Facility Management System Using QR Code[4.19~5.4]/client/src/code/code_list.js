import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CodeDelete from './codeDelete';
import CodeUpdate from './codeUpdate';

class CodeList extends React.Component {
    render() {
        return (
            <TableRow>
                    <TableCell>{this.props.CODE}</TableCell>
                    <TableCell>{this.props.SULBI_TITLE}</TableCell>
                    <TableCell><CodeUpdate stateRefresh={this.props.stateRefresh}
                                            CODE={this.props.CODE}
                                            SULBI_TITLE={this.props.SULBI_TITLE} />
                    </TableCell>
                    <TableCell><CodeDelete stateRefresh={this.props.stateRefresh} CODE={this.props.CODE}/></TableCell>
            </TableRow>
        )
    }
}

export default CodeList;