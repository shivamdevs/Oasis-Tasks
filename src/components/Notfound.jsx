import css from './../styles/Notfound.module.css';
import BackHeader from './BackHeader';

import { NavButton } from '../appdata';

function Notfound() {
    const undraw = Math.floor(Math.random() * 3);
    console.log(undraw);
    return (
        <div className={css.notfound}>
            <BackHeader label="Page not found" />
            <div className={css.text}>
                This page is not available right now.<br />
                Either <strong>go back</strong> or continue to <strong>Home</strong> page.
            </div>
            <div className={css.flex}>
                <NavButton className={css.button} to={-1}>Go back</NavButton>
                <NavButton className={`${css.button} ${css.filled}`} to="/">Continue to Home</NavButton>
            </div>
            {undraw === 0 && <img className={css.image} src="/assets/images/notfound/undraw-404.svg" alt="" />}
            {undraw === 1 && <img className={css.image} src="/assets/images/notfound/undraw-canvas.svg" alt="" />}
            {undraw === 2 && <img className={css.image} src="/assets/images/notfound/undraw-tree.svg" alt="" />}
        </div>
    );
};

export default Notfound;