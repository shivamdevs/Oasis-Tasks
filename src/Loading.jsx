import css from './styles/Loading.module.css';

function Loading(props) {
    return (
        <div className={css.loader}>
            <div></div>
            <div>
                <img className={css.logo} src="./logo192.png" alt="" />
                <div className={css.progress}>
                    <div className={css.fill} style={{ "--fill": props.progress + "%" }}></div>
                </div>
                <div className={css.current}>{props.current}</div>
            </div>
            <div className={css.footer}>
                <div className={css.company}>© New Age</div>
                <div className={css.version}>1.0.0</div>
            </div>
        </div>
    );
};

export default Loading;