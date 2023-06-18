import React from 'react';

const HospitalInfo = (props) => {
    const name = props.hospital.name;
    const location = props.hospital.location;

    return (
        <React.Fragment>
            <h1>{name}</h1>
            <h2>{location}</h2>
        </React.Fragment>
    );
}


export default HospitalInfo;