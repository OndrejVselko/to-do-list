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

    return (
        <div className="bubble" id="task_detail">
            {!selectedItem ? (
                <h1>Vyberte úkol</h1>
            ) : (
                <div>
                    <h1>{selectedItem.name}</h1>
                    <h2>{formatDate(selectedItem.date)}</h2>
                    <h2>{!selectedItem.category ? ("Bez štítku"):(selectedItem.category)}</h2>


                </div>
            )}
        </div>
    );
};
