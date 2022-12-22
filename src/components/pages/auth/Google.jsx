import './../../../styles/override.css';
import css from './../../../styles/Auth.module.css';
import { signInWithGoogle } from '../../../firebase';

function Google() {
    const startGoogleAuth = async () => {
        const auth = signInWithGoogle();
        console.log(auth);
    };
    return (
        <div className={css.authform}>
            <div className={css.authgreet}>
                <div className={css.title}>Welcome!</div>
                <div className={css.subtitle}>Connect with your Google account.</div>
            </div>
            <div className={css.formgroup}>
                <button type="button" className={`button ${css.google}`} onClick={startGoogleAuth}>
                    <img src="/assets/images/welcome/google_auth.svg" alt="" />
                    <span>Start Google Authentication</span>
                </button>
            </div>
        </div>
    );
};

export default Google;