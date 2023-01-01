import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import app from "../../../../appdata";
import { TransLayout } from "../../../layouts/Layout";
import css from './../../../../styles/Home.module.css';

function AllCategories({ categories = {}, currentList = {} }) {
    const navigate = useNavigate();
    function navigateToList(to, key) {
        navigate(-1);
        if (window.localStorage) {
            window.localStorage.setItem(`${app.bucket}.current.bucket`, key);
        }
        setTimeout(() => {
            navigate(to, { replace: true });
        }, 20);
    }
    return (
        <TransLayout className={css.categoryViewer} onOuterClick={() => navigate(-1)}>
            {categories && (categories.length > 0) && categories.map((list, index) => <span key={list.key}>
                <div onClick={() => navigateToList(`/lists/${list.key}`, list.key)} className={classNames(
                    css.categoryView,
                    (list.key === currentList.key ? css.categoryViewActive : "")
                )}>
                    <span>{(list.key === "starred" ? <i className="fas fa-star"></i> : list.key === "default" ? <i className="fas fa-feather-pointed"></i> : <i className="fas fa-tags"></i>)}</span>
                    <span>{(list.label === "*star*" ? "Starred" : list.label)}</span>
                </div>
                {(list.key === "starred") && <div className={css.categoryViewStarred}></div>}
            </span>)}
            <div onClick={() => navigate("../newlist", { replace: true })} className={css.categoryView}>
                <span><i className="fas fa-plus"></i></span>
                <span>New list</span>
            </div>
        </TransLayout>
    );
}

export default AllCategories;