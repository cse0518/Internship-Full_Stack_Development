import React from 'react';

const CardHeader = ({ title }) => {

    return (
        <div className="card-header">
            <h6 className="m-0 font-weight-bold py-1">{title}</h6>
        </div>
    );
};

export default CardHeader;