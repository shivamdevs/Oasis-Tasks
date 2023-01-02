import { Carousel } from 'react-responsive-carousel';
import css from './../../styles/Welcome.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import app from '../../app.data';
import Layout from '../layouts/Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../fb.user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavAnchor, NavButton } from '../parts/Nav';

function Welcome() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/lists", {replace: true});
        if (loading) {}
        if (error) console.error(error);
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
                    <div className={css.labeled}>By <strong>continuing</strong> to this website you agree to our <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}/legal`}>Privacy policy</a> and <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}/legal/terms`}>Terms of Usage</a>.</div>
                    <div className={css.links}>
                        <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}`}>{app.parent}</a>
                        <span className={css.dot}>•</span>
                        <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}/support/tasks`}>Support</a>
                        <span className={css.dot}>•</span>
                        <NavAnchor to="/about">About</NavAnchor>
                    </div>
                </div>
            </Layout>
        </>}</>
    );
};

export default Welcome;