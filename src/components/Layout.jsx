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

export default Layout;

const css = {
    "position": "fixed",
    "inset": "0",
    "overflow": "auto",
};