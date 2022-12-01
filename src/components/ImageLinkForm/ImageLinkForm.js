import React from "react";


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="ilf">
            <p>
                {'This ass-ugly brain app will detect faces in your photos'}
            </p>
            <p>{'Try It!'}</p>
            <div>
                <input type="text" placeholder="enter url of image to scan" onChange={onInputChange} />
                <button onClick={onButtonSubmit}>Detect Faces</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;