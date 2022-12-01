import React from 'react'

const Register = ({ onRouteChange }) => {
    return (
        <div className='form-div'>
            <form className='form'>
                
                <fieldset id='signup' className='form-fieldset'>
                    <legend className='form-legend'>Please Register</legend>
                    <div className='form-group name-group'>
                        <label className='label name-label'>Name
                        <input className='form-input name-input' type='text' placeholder='enter name' />
                        </label>
                    </div>
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
                </fieldset>

                <div className='submit-div'>
                    <button onClick={() => onRouteChange('home')} className='submit-button' type='submit'>Register</button>
                </div>
                <div className='form-other-links'>
                    <p onClick={() => onRouteChange('signin')} className='form-other signup'>Sign In</p>
                </div>
            </form>        
        </div>
        
    )
}


export default Register;