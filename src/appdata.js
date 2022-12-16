import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/override.css";

const app = {
    name: 'To do',
    version: '1.0.0',
    copyright: '© Shivam Devs 2022',
    updated: 'December 12, 2022 06:55 PM',
};

export default app;

const NavButton = ({children = "", to, className = "", ...props}) => {
    const navigate = useNavigate();
    return (
        <button {...props} className={className || "button"} onClick={() => navigate(to)}>{children}</button>
    );
};
const NavAnchor = ({ children = "", to, className = "", ...props }) => {
    const navigate = useNavigate();
    return (
        <a {...props} className={className || "link"} onClick={() => navigate(to)}>{children}</a>
    );
};

export {
    NavAnchor,
    NavButton,
};

export function Redirect({to, replace = true}) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: replace });
    }, [navigate, replace, to]);
}