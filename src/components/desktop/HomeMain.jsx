import { Carousel } from "react-responsive-carousel";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TaskList from "../pages/lists/TaskList";
import ListOptions from "./lists/ListOptions";
import css from './styles/Home.module.css';
import './styles/override.css';

function HomeMain({ publish = null, currentList = {}, userLoading = false, categories = [], taskArray = {} }) {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <>
            <div className={css.taskview}>
                {categories && (categories.length > 0) && <Carousel
                    axis="vertical"
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={false}
                    transitionTime={300}
                    showIndicators={false}
                    selectedItem={currentList.index}
                >
                    {categories && (categories.length > 0) && categories.map(item => <TaskList key={item.key} publish={publish} item={item.key} data={taskArray[item.key] || []} />)}
                </Carousel>}
            </div>
            <ListOptions currentList={currentList} userLoading={userLoading} taskArray={taskArray} publish={publish} />
        </>
    )
}

export default HomeMain;