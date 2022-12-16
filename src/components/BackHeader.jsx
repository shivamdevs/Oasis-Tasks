import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BackHeader({children = "", label = ""}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [autoBorder, setBorder] = useState(false);
    const goBack = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    document.querySelector("#layout").addEventListener("scroll", ({target}) => setBorder(target.scrollTop > 20));
    return (
        <header style={{ ...css.header, borderBottomColor: (autoBorder ? "#ddd" : "transparent"), boxShadow: autoBorder ? "0 4px 8px -4px #0003" : ""}}>
            <button style={css.navigate} onClick={goBack}>
                {location.key !== "default" && <i className="fas fa-arrow-left"></i>}
                {location.key === "default" && <i className="fas fa-home"></i>}
            </button>
            <span className='text'>{children || label || ""}</span>
        </header>
    );
};

export default BackHeader;

const css = {
    header: {
        "width": "100%",
        "fontSize": "20px",
        "fontWeight": "700",
        "color": "#624ef0",
        "padding": "10px",
        "display": "flex",
        "flexWrap": "nowrap",
        "alignItems": "center",
        "position": "sticky",
        "top": "0",
        "backgroundColor": "#fff",
        "borderBottomWidth": "1px",
        "borderBottomStyle": "solid",
        "transition": ".2s",
    },
    navigate: {
        "display": "flex",
        "justifyContent": "center",
        "fontSize": "25px",
        "alignItems": "center",
        "background": "none",
        "border": "none",
        "color": "inherit",
        "flexWrap": "nowrap",
        "marginRight": "10px",
    }
};