import React from 'react';

const CardBody = ({contents}) => {
    return (
        <div className="card-body card-body-bg-black">
            <div className="h-100">
                {contents}
            </div>
        </div>
    );
};

export default CardBody;