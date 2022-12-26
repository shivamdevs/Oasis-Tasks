import { useLocation, useNavigate } from 'react-router-dom';

import css from './../styles/Backheader.module.css';

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
                {location.key !== "default" && <i className="far fa-arrow-left"></i>}
                {location.key === "default" && <i className="fas fa-home"></i>}
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
                {location.key !== "default" && <i className="far fa-arrow-left"></i>}
                {location.key === "default" && <i className="fas fa-home"></i>}
            </button>
            <span className={css.text}>{children || label || ""}</span>
            <button className={css.button} type={type} disabled={disabled}>{button}</button>
        </header>
    );
}