import { Link, useNavigate } from "react-router-dom";
import CenterLayer from "../CenterLayer";
import css from '../styles/Adder.module.css';



function ConfirmLayer({ title, label, button = "Confirm", onOuterClick = null, onConfirm = null }) {
    const navigate = useNavigate();
    return (
        <CenterLayer maxWidth={400} onOuterClick={() => navigate(-1)}>
            <div className={css.header}><span>{title}</span></div>
            <div className={css.body}>
                <div className={css.text}>{label}</div>
                <div className={css.flexbox}>
                    <Link to={-1} className={css.button}>Cancel</Link>
                    <button type="reset" className={css.button} onClick={onConfirm}>{button}</button>
                </div>
            </div>
        </CenterLayer>
    )
}

export default ConfirmLayer;