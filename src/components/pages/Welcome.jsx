import { Carousel } from 'react-responsive-carousel';
import css from './../../styles/Welcome.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import app, { NavAnchor, NavButton } from '../../appdata';
import Layout from '../Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../fb.user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Welcome() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/lists", {replace: true});
        if (loading) {}
        if (error) toast.error(error);
    }, [error, loading, navigate, user]);
    return (
        <>{!user && <>
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
                    <NavButton to="/auth/create" className="button filled">Create Account</NavButton>
                    <NavButton to="/auth/email" className="button">Already have an Account? Sign in</NavButton>
                    <div className={css.labeled}>By <strong>continuing</strong> to this website you agree to our <NavAnchor to="/docs/legal">Privacy policy</NavAnchor> and <NavAnchor to="/docs/legal/terms">Terms of Usage</NavAnchor>.</div>
                    <div className={css.links}>
                        <NavAnchor to="/lists">Docs</NavAnchor>
                        <span className={css.dot}>•</span>
                        <NavAnchor to="/support">Support</NavAnchor>
                        <span className={css.dot}>•</span>
                        <NavAnchor to="/about">About</NavAnchor>
                    </div>
                </div>
            </Layout>
        </>}</>
    );
};

export default Welcome;