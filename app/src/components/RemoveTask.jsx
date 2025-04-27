import RemoveComboBox from "./RemoveComboBox.jsx";
import RemoveButton from "./RemoveButton.jsx";
export default function RemoveTask({data}){
    return(
        <div className="bubble" style={{height: "120px"}}>
            <RemoveComboBox data={data}/>
            <RemoveButton/>
        </div>
    );
}