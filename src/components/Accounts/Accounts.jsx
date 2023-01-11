import { Link, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import css from './Accounts.module.css';
import { getCoverArt, setTitle } from './appdata';
import { auth, registerWithEmail, signInWithEmail, signInWithFacebook, signInWithGoogle } from './firebase';

import LogoGoogle from './images/auth_google.svg';
import LogoFacebook from './images/auth_facebook.svg';
import { useEffect, useState } from 'react';

import './override.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function Accounts() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) navigate(-1);
    }, [navigate, user]);
    return (
        <div className={css.fixbox} style={{ backgroundImage: `url(${getCoverArt()})` }}>
            <div className={css.row}>
                <div className={`${css.container} ${css.proxy}`}></div>
                <div className={css.container}>
                    <div className={css.authbox}>
                        <Routes>
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/recover" element={<Recover />} />
                            <Route path="/provider" element={<Provider />} />
                            <Route exact path="/" element={<Navigate to="/accounts/provider" replace />} />
                        </Routes>
                        <div className={css.footer}>
                            <a href="https://myoasis.tech" target="_blank" className={css.foot} rel="noreferrer">© Oasis.tech</a>
                            •
                            <a href="https://myoasis.tech/policies" target="_blank" rel="noreferrer" className={css.foot}>Privacy</a>
                            •
                            <a href="https://myoasis.tech/policies/terms" target="_blank" rel="noreferrer" className={css.foot}>Terms</a>
                            •
                            <a href="https://myoasis.tech/policies/cookies" target="_blank" rel="noreferrer" className={css.foot}>Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accounts;

function Signin() {
    setTitle("Sign in");

    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");

    const doSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setEmailError("");
        setPassError("");
        const data = await signInWithEmail(email, pass);
        if (data.type !== "success") {
            if (data.for === "email") {
                setEmailError(data.message) && e.target[0].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[1].focus();
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>
                <Link className={css.titleArrow} to={-1}><i className="far fa-arrow-left-long"></i></Link>
                <span>Sign in</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' autoFocus disabled={disabled} name="email" className={css.input} id="user-email" required onChange={({ target }) => setEmail(target.value)} />
                <div className={css.error}>{emailError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='current-password' disabled={disabled} name="password" className={css.input} id="user-password" required onChange={({ target }) => setPass(target.value)} />
                <div className={css.error}>{passError}</div>
            </div>
            <div className={css.group}>
                <button className={`${css.button} ${css.action}`} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Log in"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or don't have an account?</div>
            <div className={css.options}>
                <Link to="/accounts/signup" className={css.link}>Create Account</Link>
                <Link to="/accounts/recover" className={css.link}>Forgot password?</Link>
            </div>
        </form>
    );
}

function Signup() {
    setTitle("Sign up");

    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");

    const doSubmit = async (e) => {
        e.preventDefault();
        if (!name) return e.target[0].focus();
        setDisabled(true);
        setNameError("");
        setEmailError("");
        setPassError("");
        const data = await registerWithEmail(name, email, pass);
        if (data.type !== "success") {
            if (data.for === "name") {
                setNameError(data.message) && e.target[0].focus();
            } else if (data.for === "email") {
                setEmailError(data.message) && e.target[1].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[2].focus();
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>
                <Link className={css.titleArrow} to={-1}><i className="far fa-arrow-left-long"></i></Link>
                <span>Sign up</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-name" className={css.label}>Full name</label>
                <input type="name" autoComplete='name' autoFocus disabled={disabled} name="name" className={css.input} id="user-name" required onChange={({ target }) => setName(target.value.trim())} />
                <div className={css.error}>{nameError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' disabled={disabled} name="email" className={css.input} id="user-email" required onChange={({ target }) => setEmail(target.value)} />
                <div className={css.error}>{emailError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='new-password' disabled={disabled} name="password" className={css.input} id="user-password" required onChange={({ target }) => setPass(target.value)} />
                <div className={css.error}>{passError}</div>
            </div>
            <div className={css.group}>
                <button className={`${css.button} ${css.action}`} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Sign up"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>Already have an Account?</div>
            <div className={css.options}>
                <Link to="/accounts/signin" className={css.link}>Login instead</Link>
            </div>
        </form>
    );
}

function Recover() {
    setTitle("Recover");

    const [disabled, setDisabled] = useState(false);

    const doSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
    };

    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>
                <Link className={css.titleArrow} to={-1}><i className="far fa-arrow-left-long"></i></Link>
                <span>Recover Password</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' autoFocus disabled={disabled} name="email" className={css.input} id="user-email" required />
                <div className={css.error}></div>
            </div>
            <div className={css.group}>
                <button className={`${css.button} ${css.action}`} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Send password reset link"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or remembered password?</div>
            <div className={css.options}>
                <Link to="/accounts/signin" className={css.link}>Back to login</Link>
            </div>
        </form>
    );
}

function Provider() {
    setTitle("Provider");

    const [googleAuth, setGoogleAuth] = useState(false);
    const [facebookAuth, setFacebookAuth] = useState(false);

    const [popError, setPopError] = useState('');

    const doGoogle = async () => {
        setGoogleAuth(true);
        setPopError('');
        const data = await signInWithGoogle();
        if (data.type !== "success") {
            if (data.for === "popup") {
                setPopError(data.message);
            } else {
                console.log(data);
            }
            return setGoogleAuth(false);
        }
    };

    const doFacebook = async () => {
        setFacebookAuth(true);
        setPopError('');
        const data = await signInWithFacebook();
        if (data.type !== "success") {
            if (data.for === "popup") {
                setPopError(data.message);
            } else {
                console.log(data);
            }
            return setFacebookAuth(false);
        }
    };

    return (
        <div className={css.login}>
            <div className={css.title}>Connect with</div>
            <div className={css.group}>
                <button className={`${css.button} ${css.coop}`} type="button" onClick={doGoogle} disabled={googleAuth}>
                    <img src={LogoGoogle} alt="" />
                    <SpinnerButton
                        spin={googleAuth}
                        text="Google"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.group}>
                <button className={`${css.button} ${css.coop}`} type="button" onClick={doFacebook} disabled={facebookAuth}>
                    <img src={LogoFacebook} alt="" />
                    <SpinnerButton
                        spin={facebookAuth}
                        text="Facebook"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.error}><center>{popError}</center></div>
            <div className={css.splitter}>or connect with</div>
            <div className={css.group}>
                <Link className={`${css.button} ${css.coop}`} to={"/accounts/signin"}>
                    <i className="fas fa-envelope"></i>
                    <span>Email Address</span>
                </Link>
            </div>
        </div>
    )
}


function SpinnerButton({spin = false, color = "#fff", width = 10, children, text}) {
    return (
        <div className={css.spinner}>
            {spin && <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className={css.svg}
                    width="1em"
                    height="1em"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#46dff0"
                        strokeWidth="0"
                        fill="none"
                    ></circle>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={color}
                        strokeWidth={width}
                        strokeLinecap="round"
                        fill="none"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1.6s"
                            values="0 50 50;180 50 50;720 50 50"
                            keyTimes="0;0.5;1"
                        ></animateTransform>
                        <animate
                            attributeName="stroke-dasharray"
                            repeatCount="indefinite"
                            dur="1.6s"
                            values="25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651"
                            keyTimes="0;0.5;1"
                        ></animate>
                    </circle>
                </svg>
            </>}
            {!spin && <>{children ?? text}</>}
        </div>
    );
}