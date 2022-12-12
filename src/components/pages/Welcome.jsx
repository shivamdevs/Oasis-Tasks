import { Carousel } from 'react-responsive-carousel';
import css from './../../styles/Welcome.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './../../styles/override.css';
import app, { NavAnchor, NavButton } from '../../appdata';
import Layout from '../Layout';

function Welcome() {
    return (
        <Layout className={css.welcome}>
            <div className={css.title}>
                <img src="/logo192.png" alt="" />
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
                <NavButton to="/auth/create" className={`${css.button} ${css.filled}`}>Create Account</NavButton>
                <NavButton to="/auth/email" className={css.button}>Already have an Account? Sign in</NavButton>
                <div className={css.splitter}>or</div>
                <NavButton to="/auth/google" className={`${css.button} ${css.google}`}>
                    <img src="/assets/images/welcome/google_auth.svg" alt="" />
                    <span>Continue with Google</span>
                </NavButton>
                <div className={css.labeled}>By <strong>continuing</strong> to this website you agree to our <NavAnchor to="/docs/legal" className={css.link}>Privacy policy</NavAnchor> and <NavAnchor to="/docs/legal/terms" className={css.link}>Terms of Usage</NavAnchor>.</div>
                <div className={css.links}>
                    <NavAnchor to="/docs" className={css.link}>Docs</NavAnchor>
                    <span className={css.dot}>•</span>
                    <NavAnchor to="/support" className={css.link}>Support</NavAnchor>
                    <span className={css.dot}>•</span>
                    <NavAnchor to="/about" className={css.link}>About</NavAnchor>
                </div>
            </div>
        </Layout>
    );
};

export default Welcome;