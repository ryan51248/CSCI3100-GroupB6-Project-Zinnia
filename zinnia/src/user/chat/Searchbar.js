import React, {useEffect, useState} from 'react';
import "./Searchbar.css";

function Searchbar({placeholder, user_id}) {

    const [rawData, setRawData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [valueEntered, setValueEntered] = useState("");

    const fetchFriendlist = async (user_id) => {
        fetch(`https://localhost:8080/private/friendlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                userId: user_id})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setRawData(data);
        })
    }

    const handleFilter = (e) => {
        const keyword = e.target.value;
        setValueEntered(keyword);
        const newFilter = rawData.filter((value) => {
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

    useEffect(() => {
        // fetchFriendlist(user_id);
    },[])

  return (
    <div className="search">
        <div className="search-input">
            <input type="text" placeholder={placeholder} value={valueEntered} onChange={handleFilter}/>
            {filteredData.length !== 0 && (<button id="clear-button" img="" onClick={clearInput}/>)}
        </div>
        {filteredData.length != 0 && (
            <div className="search-results" >
                {filteredData.map((data) => {
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