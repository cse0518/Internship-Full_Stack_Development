import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ScheduleDelete from './scheduleDelete';
import ScheduleUpdate from './scheduleUpdate';

class ScheduleList extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.JUNGBI_CODE}</TableCell>
                <TableCell>{this.props.JUNGBI_TITLE}</TableCell>
                <TableCell>{this.props.JUNGBI_TYPE}</TableCell>
                <TableCell>{this.props.LOCATION_NAME}</TableCell>
                <TableCell>{this.props.JUNGBI_CHECKLIST}</TableCell>
                <TableCell>{this.props.JUNGBI_NAME}</TableCell>
                <TableCell>{this.props.JUNGBI_START}</TableCell>
                <TableCell><ScheduleUpdate stateRefresh={this.props.stateRefresh}
                                           JUNGBI_CODE={this.props.JUNGBI_CODE}
                                           SULBI_TITLE={this.props.SULBI_TITLE}
                                           JUNGBI_TYPE={this.props.JUNGBI_TYPE}
                                           LOCATION_NAME={this.props.LOCATION_NAME}
                                           JUNGBI_CHECKLIST={this.props.JUNGBI_CHECKLIST}
                                           JUNGBI_NAME={this.props.JUNGBI_NAME}
                                           JUNGBI_START={this.props.JUNGBI_START} />
                </TableCell>
                <TableCell><ScheduleDelete stateRefresh={this.props.stateRefresh} JUNGBI_CODE={this.props.JUNGBI_CODE}/></TableCell>
            </TableRow>
        )
    }
}

export default ScheduleList;