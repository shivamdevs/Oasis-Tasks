import { NavButton } from '../../../appdata';
import { Input } from '../../AuthLayout';
import css from './../../../styles/Auth.module.css';

function Email() {
    return (
        <form action="" method="post" className={css.authform}>
            <div className={css.authgreet}>
                <div className={css.title}>Welcome back!</div>
                <div className={css.subtitle}>It's good to see you again!</div>
            </div>
            <Input
                id="email"
                type="email"
                complete="email"
                focus={true}
                label="Email address"
            />
            <Input
                id="password"
                type="password"
                complete="current-password"
                label="Password"
            />
            <div className={css.formtag}></div>
            <div className={css.formactioncol}>
                <button type="submit" className="button filled">Continue</button>
                <NavButton type="button" className="button" to="/auth/reset">Forgot password?</NavButton>
            </div>
        </form>
    );
};

export default Email;