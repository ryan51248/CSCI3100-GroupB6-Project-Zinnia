import React, {useEffect, useState} from 'react';
import {Buffer} from 'buffer';
import "./Searchbar.css";
import {Alert} from 'reactstrap'

function Searchbar({placeholder, user_id}) {

    const userId = user_id;
    const [rawData, setRawData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [valueEntered, setValueEntered] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const fetchFriendlist = async (user_id) => {
        fetch(`http://localhost:8080/private/friendlist`, {
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
            setRawData(data.friend);
        })
    }

    const handleFilter = (e) => {
        const keyword = e.target.value;
        setValueEntered(keyword);
        const newFilter = rawData.filter((value) => {
            return value.username.toLowerCase().includes(keyword.toLowerCase());
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

    const createChat = async (user_id) => {
        fetch(`http://localhost:8080/private/createChat`, {
            method: 'POST', headers: {'Content-Type': 'application/json',},
            mode: 'cors', body: JSON.stringify({user1: userId, user2: user_id})
        })
        .then(res => {
            if (!res.ok)
            return res.json();
            return null;
        })
        .then(data => {
            if(data) {
                showAlert(data.msg);
            } else clearInput();
        });
    }

    const showAlert = (error) => {
        setAlertVisible(true);
    }

    useEffect(() => {
        window.setTimeout(() => {
            setAlertVisible(false);
        }, 3500)
    },[alertVisible])

    useEffect(() => {
        fetchFriendlist(user_id);
    },[])

  return (
    <div className="search">
        <div className="search-input">
            <input type="text" id="searchbar" placeholder={placeholder} value={valueEntered} onChange={handleFilter}/>
            <input type="submit" id="clear-button" onClick={clearInput}/>
            {console.log(rawData)}
        </div>
        {filteredData.length != 0 && (
            <div className="search-results" >
                {filteredData.map((data) => {
                    return <div className="data-item" onClick={() => {createChat(data.userId)}}>
                            <img height="40" width="40" src={data.photo && Buffer.from(data.photo,"base64").toString("ascii")}/>
                            <p>{data.username && data.username}</p>
                        </div>;
                })}
            </div>
        )}
        <Alert color="danger" isOpen={alertVisible}>
               The chat already exists
        </Alert>
    </div>
  )
}

export default Searchbar;