import { useNavigate } from "react-router-dom";
import CenterLayer from "../CenterLayer";
import css from '../styles/Adder.module.css';



function ConfirmLayer({ title, label, button = "Confirm", onConfirm = null }) {
    const navigate = useNavigate();
    return (
        <CenterLayer maxWidth={400}>
            <div className={css.header}><span>{title}</span></div>
            <div className={css.body}>
                <div className={css.text}>{label}</div>
                <div className={css.flexbox}>
                    <button type="button" className={css.button} onClick={() => navigate(-1)} autoFocus>Cancel</button>
                    <button type="reset" className={css.button} onClick={onConfirm}>{button}</button>
                </div>
            </div>
        </CenterLayer>
    )
}

export default ConfirmLayer;