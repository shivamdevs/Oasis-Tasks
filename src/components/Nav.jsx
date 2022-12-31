import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NavButton = ({ children = "", to, className = "", replace = false, ...props }) => {
    const navigate = useNavigate();
    return (
        <button {...props} className={className || "button"} onClick={() => navigate(to, { replace: replace })}>{children}</button>
    );
};
export const NavAnchor = ({ children = "", to, className = "", replace = false, ...props }) => {
    const navigate = useNavigate();
    return (
        <a {...props} className={className || "link"} onClick={() => navigate(to, { replace: replace })}>{children}</a>
    );
};

export const Redirect = ({ to, replace = true }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: replace });
    }, [navigate, replace, to]);
}