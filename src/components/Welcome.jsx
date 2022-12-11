import { Carousel } from 'react-responsive-carousel';
import css from './../styles/Welcome.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './../styles/override.css';
import { Link } from 'react-router-dom';
import app from '../appdata';

function Welcome() {
    return (
        <div className={css.welcome}>
            <div className={css.title}>
                <img src="./logo192.png" alt="" />
                <span>{app.name}</span>
            </div>
            <div className={css.slider}>
                <Carousel
                    autoPlay={true}
                    interval={2000}
                    swipeable={false}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    transitionTime={500}
                >
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-1.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-2.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-3.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-4.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-5.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-6.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-7.svg" alt="" />
                    </div>
                    <div className={css.card}>
                        <img src="/assets/images/welcome/undraw-8.svg" alt="" />
                    </div>
                </Carousel>
            </div>
            <div className={css.step}>
                <Link to="/auth/create" className={`${css.button} ${css.filled}`}>Create Account</Link>
                <Link to="/auth/email" className={css.button}>Already have an Account? Sign in</Link>
                <div className={css.splitter}>or</div>
                <Link to="/auth/google" className={`${css.button} ${css.google}`}>
                    <img src="/assets/images/welcome/google_auth.svg" alt="" />
                    <span>Continue with Google</span>
                </Link>
                <div className={css.labeled}>By <strong>continuing</strong> to this website you agree to our <Link to="/docs/legal" className={css.link}>Privacy policy</Link> and <Link to="/docs/legal/terms" className={css.link}>Terms of Usage</Link>.</div>
                <div className={css.links}>
                    <Link to="/docs/legal" className={css.link}>Privacy</Link>
                    <span className={css.dot}>•</span>
                    <span>Version: {app.version}</span>
                    <span className={css.dot}>•</span>
                    <Link to="/docs/about" className={css.link}>About</Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;