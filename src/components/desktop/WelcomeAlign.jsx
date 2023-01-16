import { Carousel } from 'react-responsive-carousel';
import css from './../../styles/Welcome.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import app from '../../app.data';
import Layout from '../layouts/Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../fb.user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../parts/Nav';
import { setTitle } from '../../app.functions';

function WelcomeAlign() {
    const [user, loading, error] = useAuthState(auth);

    setTitle('Welcome');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/lists", { replace: true });
        if (loading) { }
        if (error) console.error(error);
    }, [error, loading, navigate, user]);
    return (
        <>{!user && <>
            <Layout className={css.welcome}>
                <div className={css.title}>
                    <img src="/logo192.png" alt="" />
                    <span>{app.name}</span>
                </div>
                <div className={css.appflex}>
                    <div className={css.leftflex}>
                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_zavtox71.json" background="transparent" speed="1"  loop autoplay></lottie-player>
                    </div>
                    <div className={css.rightflex}>
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
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-1.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-2.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-3.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-4.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-5.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-6.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-7.svg" alt="" />
                                </div>
                                <div className={`${css.card} wccard`}>
                                    <img src="/assets/images/welcome/undraw-8.svg" alt="" />
                                </div>
                            </Carousel>
                        </div>
                        <div className={css.step}>
                            <NavButton to="/accounts" className="button filled">Continue to Accounts</NavButton>
                            <div className={css.labeled}>By <strong>continuing</strong> to this website you agree to our <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}/legal`}>Privacy policy</a> and <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}/legal/terms`}>Terms of Usage</a>.</div>
                            <div className={css.links}>
                                <a className="link" target="_blank" rel="noreferrer" href={`${app.pathname}`}>© {app.parent} @2023</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>}</>
    );
};

export default WelcomeAlign;