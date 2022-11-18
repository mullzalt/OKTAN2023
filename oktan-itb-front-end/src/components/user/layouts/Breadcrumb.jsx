import React from 'react'

const mapLocation = () => {
    console.log(window.location.pathname)
    return (<></>)
}


const Breadcrumb = (props) => {
    return (
        <div className={props.className}>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>{window.location.pathname}</a></li>
                    <li><a>Documents</a></li>
                    <li>Add Document</li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcrumb