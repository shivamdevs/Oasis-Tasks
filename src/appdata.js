import { useNavigate } from "react-router-dom";

const app = {
    name: 'To do',
    version: '1.0.0',
    copyright: '© Shivam Devs 2022',
    updated: 'December 12, 2022 06:55 PM',
};

export default app;

const NavButton = ({children, to, ...props}) => {
    const navigate = useNavigate();
    return (
        <button {...props} onClick={() => navigate(to)}>{children}</button>
    );
};
const NavAnchor = ({ children, to, ...props }) => {
    const navigate = useNavigate();
    return (
        <a {...props} onClick={() => navigate(to)}>{children}</a>
    );
};

export {
    NavAnchor,
    NavButton,
};