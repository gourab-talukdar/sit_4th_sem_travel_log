import React from 'react';
import './CaptchaBox.css';

const CaptchaBox = (props) => {
    const captchaText = props.captchaText;
    const [enteredCatpcha, setEnteredCatpcha] = props.enteredCatpcha;

    return (
        <div className="captcha-container">
            <label>Enter Captcha</label>
            <div className="captcha-area">
                <div className="captcha-img">
                    <img src="../../images/captcha-bg.png" alt="Captch Background" />
                    <span className="captcha">{captchaText}</span>
                </div>
                <button className="reload-btn" onClick={props.reloadCaptcha}><span className="material-icons material-symbols-outlined">refresh</span></button>
            </div>
            <input type="text" className='captchaInput' placeholder="Enter Captcha Code" value={enteredCatpcha} onChange={(e) => setEnteredCatpcha(e.target.value)} required />
        </div>
    );
}

export default CaptchaBox;
