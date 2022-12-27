import { useState } from "react";
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

export default Layout;
export {
    FormLayout
};

const css = {
    "position": "fixed",
    "inset": "0",
    "overflow": "auto",
};