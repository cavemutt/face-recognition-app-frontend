import React from 'react'

const SignIn = ({ onRouteChange }) => {
    return (
        <div className='form-div'>
            <form className='form'>
                
                <fieldset id='signup' className='form-fieldset'>
                    <legend className='form-legend'>Please Sign In</legend>
                    <div className='form-group email-group'>
                        <label className='label email-label'>Email
                        <input className='form-input email-input' type='email' placeholder='enter email' />
                        </label>
                    </div>
                    <div className='form-group password-group'>
                        <label className='label password-label'>Password
                        <input className='form-input password-input' type='text' placeholder='enter password' />
                        </label>
                    </div>
                    <label className='label remember-me-label'> Remember Me
                        <input className='checkbox-input' type='checkbox' />
                    </label>
                </fieldset>

                <div className='submit-div'>
                    <button onClick={() => onRouteChange('home')} className='submit-button' type='submit'>Sign In</button>
                </div>
                <div className='form-other-links'>
                    <p onClick={() => onRouteChange('register')} className='form-other signup'>Register</p>
                    <p onClick={() => {document.getElementById('p').innerText='too bad ha ha ha'}} id='p' className='form-other forgot-password'>Forgot Password</p>
                </div>
            </form>        
        </div>
        
    )
}


export default SignIn;