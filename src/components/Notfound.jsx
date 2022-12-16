import css from './../styles/Notfound.module.css';

import { NavButton } from '../appdata';
import Layout from './Layout';
import BackHeader from './BackHeader';

function Notfound() {
    const undraw = Math.floor(Math.random() * 3);
    return (
        <Layout className={css.notfound}>
            <BackHeader label="Page not found" border={true} />
            <div className={css.wrap}>
                <div className={css.text}>
                    This page is not available right now.<br />
                    Either <strong>go back</strong> or continue to <strong>Home</strong> page.
                </div>
                <div className={css.flex}>
                    <NavButton to={-1}>Go back</NavButton>
                    <NavButton className="button filled" to="/">Continue to Home</NavButton>
                </div>
            </div>
            {undraw === 0 && <img className={css.image} src="/assets/images/notfound/undraw-404.svg" alt="" />}
            {undraw === 1 && <img className={css.image} src="/assets/images/notfound/undraw-canvas.svg" alt="" />}
            {undraw === 2 && <img className={css.image} style={{borderTop: "1px solid #ddd"}} src="/assets/images/notfound/undraw-tree.svg" alt="" />}
        </Layout>
    );
};

export default Notfound;