import { useSelection } from './SelectionContext';

export default function TaskDetail(){
    const { selectedItem } = useSelection();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    //component has tree returns - one for basic task and one for project subtask and one nonselected
    if(!selectedItem){ //nothing selected
        return (
            <div className="bubble" >
                <div id="task_detail">
                    <h2>Vyberte úkol</h2>
                </div>
            </div>
        );
    }
    else if(selectedItem.type === "task"){
        return ( //selected basic task
            <div className="bubble">
                <div id="task_detail">
                    <h2> {selectedItem.priority ? (<img src="src/icons/alert.png" alt="important_icon" style={{ width: "16px", height: "auto", marginRight: "8px", verticalAlign: "middle" }}/>) : null}{selectedItem.name}</h2>
                    <h3>{formatDate(selectedItem.date)}</h3>
                    <h3>{!selectedItem.category ? ("Bez štítku"):(selectedItem.category)}</h3>
                </div>
            </div>
        );
    }
    //TO-DO tady by bylo fajn projít si data znovu a vytáhnout si celý projekt a vypsat to i s tím zbytkem pod tím, celý projekt se totiž v kontextu nepředává
    else if(selectedItem.type === "subtask"){ //selected project subtask
        return (
            <div className="bubble">
                <div id="task_detail">
                    <h2> {selectedItem.priority ? (<img src="src/icons/alert.png" alt="important_icon" style={{ width: "16px", height: "auto", marginRight: "8px", verticalAlign: "middle" }}/>) : null}{selectedItem.name}</h2>
                    <h3>{formatDate(selectedItem.date)}</h3>
                    <h3>{!selectedItem.category ? ("Bez štítku"):(selectedItem.category)}</h3>
                </div>
            </div>
        );
    }
};
