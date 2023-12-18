import React from "react";
import { Skeleton } from "@mui/material";


export const Loading = () => {
    return (
        <div style={{marginTop:"100px"}}>
            <div className="loading">
                <Skeleton variant="rounded" animation="wave" width={'60%'} height={120}/>
            </div>
            <div className="loading">
                <Skeleton variant="rounded" animation="wave" width={'60%'} height={120}/>
            </div>
            <div className="loading">
                <Skeleton variant="rounded" animation="wave" width={'60%'} height={120}/>
            </div>
            <div className="loading">
                <Skeleton variant="rounded" animation="wave" width={'60%'} height={120}/>
            </div>
        </div>
    )
}