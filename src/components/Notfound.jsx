import css from './../styles/Notfound.module.css';
import BackHeader from './BackHeader';

import undraw1 from './../assets/images/notfound/undraw-404.svg';
import undraw2 from './../assets/images/notfound/undraw-canvas.svg';
import undraw3 from './../assets/images/notfound/undraw-tree.svg';
import { NavButton } from '../appdata';

function Notfound() {
    const undraw = [undraw1, undraw2, undraw3][Math.floor(Math.random() * 3)];

    return (
        <div className={css.notfound}>
            <BackHeader label="Page not found" />
            <div className={css.text}>
                This page is not available right now or never existed in the first place.<br />
                Either <strong>go back</strong> or continue to <strong>Home</strong> page.
            </div>
            <div className={css.flex}>
                <NavButton className={css.button} to={-1}>Go back</NavButton>
                <NavButton className={`${css.button} ${css.filled}`} to="/">Continue to Home</NavButton>
            </div>
            <img className={css.image} src={undraw} alt="" />
        </div>
    );
};

export default Notfound;