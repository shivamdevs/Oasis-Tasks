import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";


function Layout({children, ...props}) {
    const [autoBorder, setBorder] = useState(false);
    return (
        <div {...props} style={css} onScroll={({ target }) => setBorder(target.scrollTop > 0)} scrolled={autoBorder.toString()} id="layout">
            <Toaster position="bottom-center" />
            {children}
        </div>
    )
}
function FormLayout({ children, onSubmit = null, ...props }) {
    const [autoBorder, setBorder] = useState(false);
    return (
        <form {...props} style={css} onSubmit={onSubmit} onScroll={({ target }) => setBorder(target.scrollTop > 0)} scrolled={autoBorder.toString()} id="form-layout">
            {children}
        </form>
    )
}

function TransLayout({ children, onOuterClick = null, parentProps, ...props }) {
    const outer = useRef();
    const hideTrans = (target) => {
        if (target === outer.current) onOuterClick && onOuterClick();
    };
    return (
        <div {...parentProps} ref={outer} onClick={({target}) => hideTrans(target)} style={csstrans}>
            <div {...props} style={csstranslow}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
export {
    FormLayout,
    TransLayout,
};

const css = {
    "position": "fixed",
    "inset": "0",
    "overflow": "auto",
    "background": "#fff",
};
const csstrans = {
    "position": "fixed",
    "inset": "0",
    "background": "#0007",
};
const csstranslow = {
    "position": "absolute",
    "inset": "auto 0 0 0",
    "maxHeight": "100%",
    "overflow": "auto",
    "background": "#fff",

};