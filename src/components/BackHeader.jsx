import { useLocation, useNavigate } from 'react-router-dom';

function BackHeader(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    return (
        <header style={css.header}>
            <button style={css.navigate} onClick={goBack}>
                {location.key !== "default" && <i className="fas fa-arrow-left"></i>}
                {location.key === "default" && <i className="fas fa-home"></i>}
            </button>
            <span className='text'>{props.children || props.label}</span>
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
        "borderBottom": "1px solid #ddd",
        "alignItems": "center",
        "position": "sticky",
        "top": "0",
        "backgroundColor": "#fff",
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