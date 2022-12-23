import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Input } from '../../AuthLayout';
import css from './../../../styles/Auth.module.css';

function Create() {
    const [score, setScore] = useState(0);
    const [password, setPassword] = useState("");
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
                value={score}
            />
            <PasswordStrengthBar
                password={password}
                onChangeScore={(value) => setScore(value)}
            />
            <Input
                id="password"
                type="password"
                complete="new-password"
                label="Password"
                error="google it"
                updater={(value) => setPassword(value)}
            />
            <div className={css.formaction}>
                <button type="submit" className="button filled">Create Account</button>
            </div>
        </form>
    );
};

export default Create;