import { useState } from "react";


function Layout({children, ...props}) {
    const [autoBorder, setBorder] = useState(false);
    return (
        <div {...props} style={css} onScroll={({ target }) => setBorder(target.scrollTop > 20)} scrolled={autoBorder.toString()} id="layout">{children}</div>
    )
}

export default Layout;

const css = {
    "position": "fixed",
    "inset": "0",
    "overflow": "auto",
};