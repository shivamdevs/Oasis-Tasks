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

function ConfirmLayout({ title, label, button = "Confirm", onOuterClick = null, onConfirm = null, parentProps, ...props}) {
    const outer = useRef();
    const hideTrans = () => {
        onOuterClick && onOuterClick();
    };
    return (
        <div {...parentProps} ref={outer} onClick={({ target }) => (target === outer.current) && hideTrans()} style={cssConfirm}>
            <div {...props} style={cssConfirmCenter}>
                <div style={cssConfirmTitle}>{title}</div>
                <div style={cssConfirmLabel}>{label}</div>
                <div style={cssConfirmFLex}>
                    <button type="button" style={cssConfirmButton} onClick={hideTrans}>Cancel</button>
                    <button type="button" style={cssConfirmButton} onClick={onConfirm}>{button}</button>
                </div>
            </div>
        </div>
    );
}

export default Layout;
export {
    FormLayout,
    TransLayout,
    ConfirmLayout,
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

const cssConfirm = {
    "position": "fixed",
    "inset": "0",
    "background": "#0007",
    "display": "flex",
    "flexWrap": "nowrap",
    "justifyContent": "center",
    "alignItems": "center",
};
const cssConfirmCenter = {
    "maxHeight": "100%",
    "overflow": "auto",
    "background": "#fff",
    "width": "100%",
    "maxWidth": "300px",
    "padding": "20px 10px 10px",
    "borderRadius": "6px",
    "boxShadow": "0 0 6px 3px #0003",
};
const cssConfirmTitle = {
    "color": "#e45973",
    "fontSize": "18px",
    "fontWeight": "500",
    "marginBottom": "10px",
};
const cssConfirmLabel = {
    "fontSize": "16px",
    "fontWeight": "500",
    "marginBottom": "20px",
};
const cssConfirmFLex = {
    "display": "flex",
    "flexWrap": "nowrap",
    "justifyContent": "flex-end",
    "alignItems": "center",
    "gap": "10px",
    "paddingInline": "20px",
};
const cssConfirmButton = {
    "padding": "10px",
    "border": "none",
    "background": "none",
    "fontWeight": "500",
    "color": "#624ef0",
};
