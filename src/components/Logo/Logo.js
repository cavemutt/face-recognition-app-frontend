import React from 'react';
import brain from './brainLogo.png';
import Tilt from 'react-parallax-tilt';

const Logo = ({makeEyesMove}) => {
    return (
        <div className="logo-div" onMouseMove={makeEyesMove}>
        <Tilt perspective={500} glareEnable={true} glareMaxOpacity={0.45} scale={1.02}>
            <img src={brain} alt="brain logo" ></img>
            <div className='eye right'onMouseMove={makeEyesMove}></div>
            <div className='eye left' onMouseMove={makeEyesMove}></div>
            <p className='logo-p'>{'(mouseover me!)'}</p>
        </Tilt>
        </div>
    );
}

export default Logo;

// const body = document.querySelector('body')
// const eyes = document.querySelectorAll('.eye')

// body.addEventListener('mousemove', (e) => {
//     eyes.forEach(eye => {
//         let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
//         let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

//         let radian = Math.atan2(e.pageX - x, e.pageY - y);
//         let rotation = (radian * (180 / Math.PI) * -1) + 270;
        
//         eye.style.transform = "rotate(" +rotation+ "deg)";
//     })
// })