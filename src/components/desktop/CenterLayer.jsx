

import { useRef } from 'react';
import css from './styles/Overlay.module.css';

function CenterLayer({maxWidth = 600, onOuterClick = null, children = null}) {
    const outer = useRef();
    const hideTrans = ({target}) => {
        if (target === outer.current) onOuterClick && onOuterClick();
    };
    return (
        <div className={css.centerLayer} ref={outer} onClick={hideTrans}>
            <div className={css.centerLayerCrop} style={{maxWidth: maxWidth}}>
                {children}
            </div>
        </div>
    )
}

export default CenterLayer;