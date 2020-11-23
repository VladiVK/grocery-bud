import React, {useEffect} from 'react'

const ALert = ({type, msg}) => {
    return (
        <p className={`alert alert-${type}`}>
            {msg}
        </p>
    )
}

export default ALert
