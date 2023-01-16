import css from './../../styles/Notfound.module.css';
import Layout from './Layout';
import BackHeader from '../parts/BackHeader';
import { NavButton } from '../parts/Nav';

function Notfound() {
    return (
        <Layout className={css.notfound}>
            <BackHeader label="Page not found" />
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
        </Layout>
    );
};

export default Notfound;