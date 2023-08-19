import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Card from './Card';
import Carousal from './Carousal';
import { useState, useEffect } from 'react';
function Home() {
    const [search, setSearch] = useState(' ');
    const [foodcat, setFoodcat] = useState([]);
    const [fooditem, setFooditem] = useState([]);

    const loadData = async () => {
        let response = await fetch("/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFooditem(response[0]);
        setFoodcat(response[1]);
        //console.log(response[0],response[1]);
    }
    useEffect(() => {
        loadData();
    }, [])




    return (<>
        <div> <Navbar></Navbar></div>
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}></input>
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                    <div className="carousel-item" >
                        <img src="https://source.unsplash.com/random/300x300/?cake" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300x300/?biryani" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div className='container'>
            {
                foodcat !== []
                    ? foodcat.map((data) => {
                        return (
                            <div className="row mb-3">
                                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {
                                    fooditem !== []
                                        ?
                                        fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className="  col-12 col-md-6 col-lg-3 m-4  ">
                                                        <Card
                                                           foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                           ></Card>
                                                    </div>
                                                )
                                            }) : <div>NO SUCH DATA FOUND</div>
                                }
                            </div>
                        )
                    })
                    : <div></div>
            }
        </div>
        <div ><Footer></Footer></div>
    </>
    )
}
export default Home;
