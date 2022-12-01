import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='img-div'>
            <img id='inputimage' src={imageUrl} alt="face recognition"></img>
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    )
}

export default FaceRecognition;

