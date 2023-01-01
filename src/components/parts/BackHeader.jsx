import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadSVG } from '../layouts/Loading';

import css from './../../styles/Backheader.module.css';

function BackHeader({children = "", label = ""}) {
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
        <header className={css.header}>
            <button className={css.navigate} onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <span className={css.text}>{children || label || ""}</span>
        </header>
    );
};

export default BackHeader;

export function BackHeaderWithButton({children, label = "", button = "Done", type = "button", disabled = false}) {
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
        <header className={css.headerAuto}>
            <button className={css.navigate} type="button" onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <span className={css.text}>{children || label || ""}</span>
            <button className={css.button} type={type} disabled={disabled}>{button}</button>
        </header>
    );
}

export function BackHeaderForTasks({buttons = []}) {
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
        <header className={css.headerAuto}>
            <button className={classNames(css.navigate, css.navigateRight)} type="button" onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            {buttons.map((button, index) => <button key={index} className={classNames(css.button, css.buttonLarge)} type="button" onClick={button.action}>
                {button.disabled && <LoadSVG width={12} />}
                {!button.disabled && <i className={button.label}></i>}
            </button>)}
        </header>
    );
};