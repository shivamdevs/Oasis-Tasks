

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './styles/Overlay.module.css';

function CenterLayer({maxWidth = 600, className = "", children = null}) {
    const outer = useRef();
    const navigate = useNavigate();
    const hideTrans = ({target}) => {
        if (target === outer.current) navigate(-1);
    };
    useEffect(function escapePage(e) {
        window.addEventListener('keyup', (e) => {
            if ((e.which || e.keyCode) === 27) {
                if (!window.escapePageNavigated) {
                    window.escapePageNavigated = true;
                    navigate(-1);
                    setTimeout(() => {
                        window.escapePageNavigated = false;
                    }, 20);
                }
            } else escapePage();
        }, { once: true });
    }, [navigate]);
    return (
        <div className={css.centerLayer} ref={outer} onClick={hideTrans}>
            <div className={`${className} ${css.centerLayerCrop}`} style={{maxWidth: maxWidth}}>
                {children}
            </div>
        </div>
    )
}

export default CenterLayer;