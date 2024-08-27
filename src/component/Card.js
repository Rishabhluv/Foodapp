import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart } from './ContextReducer';
import { useCart } from './ContextReducer';
function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    let priceRef = useRef();
    let priceOptions = Object.keys(options)
    //let foodItem = props.foodItem;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let handleAddtoCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
               return
                //  console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <div>
            <div><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ height: "170px", objectFit: "fill" }}></img>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-10'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data} >{data}</option>
                            })}
                            {/* <option value={"half"}>HALF</option>
                            <option value={"full"}>FULL</option> */}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>AddtoCart</button>
                </div>
            </div></div>
        </div>
    )
}

export default Card
