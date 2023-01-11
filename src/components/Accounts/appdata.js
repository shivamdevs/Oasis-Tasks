import bg0 from './images/coverarts/o-0.jpg';
import bg1 from './images/coverarts/o-1.jpg';
import bg2 from './images/coverarts/o-2.jpg';
import bg3 from './images/coverarts/o-3.jpg';
import bg4 from './images/coverarts/o-4.jpg';
import bg5 from './images/coverarts/o-5.jpg';
import bg6 from './images/coverarts/o-6.jpg';
import bg7 from './images/coverarts/o-7.jpg';
import bg8 from './images/coverarts/o-8.jpg';
import bg9 from './images/coverarts/o-9.jpg';


const AppName = "Accounts";
const setTitle = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + AppName;
};


const getCoverArt = () => {
    const arts = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
    var coverArt = Math.floor(Math.random() * arts.length);
    
    if (window.sessionStorage) {
        if (window.sessionStorage.getItem("accounts:coverart") !== null) {
            coverArt = window.sessionStorage.getItem("accounts:coverart");
        } else {
            window.sessionStorage.setItem("accounts:coverart", coverArt);
        }
    }
    return arts[coverArt];
};

export {
    AppName,
    setTitle,
    getCoverArt,
};