import css from './../styles/Notfound.module.css';

import { useLocation, useNavigate } from 'react-router-dom';

function Notfound() {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    return (
        <div className={css.notfound}>
            <header className={css.header}>
                <button className={css.navigate} onClick={goBack}>
                    {location.key !== "default" && <i className="fas fa-arrow-left-long"></i>}
                    {location.key === "default" && <i className="fas fa-home"></i>}
                </button>
                <span className='text'>Page not found</span>
            </header>
            <img src="/assets/images/notfound/undraw-404.svg" alt="" />
            <img src="/assets/images/notfound/undraw-canvas.svg" alt="" />
        </div>
    );
};

export default Notfound;