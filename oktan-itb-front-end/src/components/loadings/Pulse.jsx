import React from 'react'

const Pulse = ({ type }) => {
    return (
        <React.Fragment>
            <div className="shadow rounded-md p-4 max-w-sm w-full">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-lg bg-base-content h-20 w-20"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-base-content rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-base-content rounded col-span-2"></div>
                                <div className="h-2 bg-base-content rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-base-content rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Pulse