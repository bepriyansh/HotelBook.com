import { useEffect, useState } from "react";
import { baseURL } from "../../baseURL/baseURL"
import useFetch from "../../hooks/useFetch"
import axios from "axios";

const UpdateRoom = ({ hotelId, roomId, i }) => {
    const { data, loading, error, reFetch } = useFetch(`${baseURL}/room/${hotelId}/${roomId}`);
    console.log(data);

    if (error) { console.log(error) }
    const [title, setTitle] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setMaxPeople(data.maxPeople);

    }, [data]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleChangeMaxPeople = (e) => {
        setMaxPeople(e.target.value);
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    }



    const [alert, setAlert] = useState(false);
    const [option, setOption] = useState("update");

    const handleOpenUpdateBox = () => {
        setOption("update");
        setAlert(true);
    }
    const handleOpenDeleteBox = () => {
        setOption("delete");
        setAlert(true);
    }

    const handleUpdate = async () => {
        const access_token = localStorage.getItem('access_token');
        try {
            await axios.patch(`${baseURL}/room/${access_token}/${roomId}`, {
                title,
                description,
                price,
                maxPeople
            });
            console.log("Room updated successfully");
            reFetch();
            setAlert(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        const access_token = localStorage.getItem('access_token');
        try {
            await axios.delete(`${baseURL}/room/${access_token}/${hotelId}/${roomId}`);
            console.log("Room deleted successfully");
            reFetch();
            setAlert(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCancel = () => {
        setAlert(false);
        reFetch();
    }
    return (
        <div className="updateContainer">
            {loading ? <h1>Loading...</h1> : <div>
                <div className="updateInputs">
                    <div className='title'>Room {i + 1} :</div>

                    <div className='inputFields'>
                        <label>Title : </label>
                        <input type='text' value={title} onChange={handleChangeTitle} />
                    </div>
                    <div className='inputFields'>
                        <label>Max People : </label>
                        <input type='Number' value={maxPeople} onChange={handleChangeMaxPeople} />
                    </div>
                    <div className='inputFields'>
                        <label>Description : </label>
                        <textarea type='text' value={description} onChange={handleChangeDescription} />
                    </div>
                    <div className='inputFields'>
                        <label>Price : </label>
                        <input type='Number' value={price} onChange={handleChangePrice} />
                    </div>
                    <div className='updateButtonWrapper'>
                        <p className='updateText'>Update Now : </p>
                        <button onClick={() => handleOpenUpdateBox()} className='updateButton'>Update</button>
                        <button onClick={() => handleOpenDeleteBox()} className='deleteButton'>Delete</button>
                    </div>
                    {alert &&
                        <div className='deleteBox'>
                            <div className='deleteBoxWrapper'>
                                <p className='alert'>Do you want to {option}?</p>
                                <p className='smallAlert'>This can't be undone.</p>
                                <div className='buttonContainer'>
                                    {option === "delete" && <button onClick={() => handleDelete()} className='deleteButton'>Delete</button>}
                                    {option === "update" && <button onClick={() => handleUpdate()} className='updateButton'>Update</button>}
                                    <button onClick={() => handleCancel()} className='cancelButton'>No</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
            }
        </div>
    )
}

export default UpdateRoom