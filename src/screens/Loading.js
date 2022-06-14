import React from "react";
import gif from "../Images/loading.gif";
function Loading(){
    return(
        <>
            <div className="gif">
                <div className="gif_container">
                    <img src={gif} alt="Gif" />
                </div>
            </div>
        </>
    );
}

export default Loading;