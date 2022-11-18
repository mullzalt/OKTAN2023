import React from 'react'

const NotificationWrapper = props => {
    return (
        <>
            <div className={`indicator ${props.className}`}>
                {props.children}
                <span className="indicator-item badge badge-secondary"></span>
            </div>
        </>

    )
}

export default NotificationWrapper