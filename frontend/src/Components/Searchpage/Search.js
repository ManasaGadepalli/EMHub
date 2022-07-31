//import "./App.css";
import { useState } from "react";
import Axios from "axios";

function Search() {
    const [comp_name, setName] = useState("");
    const [event_type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState(0);
    const [minprice, setMinPrice] = useState(0);
    const [email, setEmail] = useState("");

    const [newMinPrice, setNewMinPrice] = useState(0);

    const [compList, setCompList] = useState([]);

    const addCompany = () => {
        Axios.post("http://localhost:3001/create", {
            comp_name: comp_name,
            event_type: event_type,
            location: location,
            rating: rating,
            minprice: minprice,
            email: email
        }).then(() => {
            setCompList([
                ...compList,
                {
                    comp_name: comp_name,
                    event_type: event_type,
                    location: location,
                    rating: rating,
                    minprice: minprice,
                    email: email
                },
            ]);
        });
    };

    const getCompanies = () => {
        Axios.get("http://localhost:3001/event_companies").then((response) => {
            setCompList(response.data);
        });
    };

    const updateMinPrice = (id) => {
        Axios.put("http://localhost:3001/update", { minprice: newMinPrice, id: id }).then(
            (response) => {
                setCompList(
                    compList.map((val) => {
                        return val.id == id
                            ? {
                                id: val.id,
                                comp_name: val.comp_name,
                                event_type: val.event_type,
                                location: val.location,
                                rating: val.rating,
                                minprice: newMinPrice,
                                email: val.email
                            }
                            : val;
                    })
                );
            }
        );
    };

    const deleteCompany = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setCompList(
                compList.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };


    return (
        <div className="App">
            <div className="information">
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <label>Event Type:</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setType(event.target.value);
                    }}
                />
                <label>Location:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setLocation(event.target.value);
                    }}
                />
                <label>Rating:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setRating(event.target.value);
                    }}
                />
                <label>Min Price:</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setMinPrice(event.target.value);
                    }}
                />
                <label>Email:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <button onClick={addCompany}>Add Event Companies</button>
            </div>
            <div className="employees">
                <button onClick={getCompanies}>Show Event Companies</button>

                {compList.map((val, key) => {
                    return (
                        <div className="Companies">
                            <div>
                                <h3>CompName: {val.comp_name}</h3>
                                <h3>Event_type: {val.event_type}</h3>
                                <h3>Location: {val.location}</h3>
                                <h3>Rating: {val.rating}</h3>
                                <h3>MinPrice: {val.minprice}</h3>
                                <h3>Email: {val.email}</h3>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="2000..."
                                    onChange={(event) => {
                                        setNewMinPrice(event.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        updateMinPrice(val.id);
                                    }}
                                >
                                    {" "}
                                    Update
                                </button>

                                <button
                                    onClick={() => {
                                        deleteCompany(val.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;