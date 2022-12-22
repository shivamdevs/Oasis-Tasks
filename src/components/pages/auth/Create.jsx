import { Input } from '../../AuthLayout';
import css from './../../../styles/Auth.module.css';

function Create() {
    return (
        <form action="" method="post" className={css.authform}>
            <div className={css.authgreet}>
                <div className={css.title}>Welcome!</div>
                <div className={css.subtitle}>It's an honour to be a part of your journey!</div>
            </div>
            <Input
                id="name"
                focus={true}
                complete="name"
                label="Full name"
            />
            <Input
                id="email"
                type="email"
                complete="email"
                label="Email address"
            />
            <Input
                id="password"
                type="password"
                complete="new-password"
                label="Password"
            />
            <div className={css.formaction}>
                <button type="submit" className="button filled">Create Account</button>
            </div>
        </form>
    );
};

export default Create;