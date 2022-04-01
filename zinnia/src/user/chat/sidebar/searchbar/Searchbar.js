import React, {useState} from 'react';
import "./Searchbar.css";

function Searchbar({placeholder, data}) {

    const [filteredData, setFilteredData] = useState([]);
    const [valueEntered, setValueEntered] = useState("");

    const handleFilter = (e) => {
        const keyword = e.target.value;
        setValueEntered(keyword);
        const newFilter = data.filter((value) => {
            // return value. .toLowerCase().includes(keyword.toLowerCase());
        });
        if (keyword === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }       
    }
    const clearInput = () => {
        setFilteredData([]);
        setValueEntered("");
    }

  return (
    <div className="search">
        <div className="search-input">
            <input type="text" placeholder={placeholder} value={valueEntered} onChange={handleFilter}/>
            {filteredData.length !== 0 && (<button id="clear-button" img="" onClick={clearInput}/>)}
        </div>
        {filteredData.length != 0 && (
            <div className="search-results" >
                {filteredData.map(() => {
                    return <div className="data-item">
                            <p>{}</p>
                        </div>;
                })}
            </div>
        )}
    </div>
  )
}

export default Searchbar;