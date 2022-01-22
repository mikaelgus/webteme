import fazerFinnish from '../fazer-fin-example.json';
import fazerEnglish from '../fazer-en-example.json';

const fazerFin = fazerFinnish.LunchMenus[0].SetMenus;
const fazerEng = fazerEnglish.LunchMenus[0].SetMenus;

const FazerMenu = {fazerFin, fazerEng};
export default FazerMenu;
