import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import Carousal from "./Carousal";
import { useState, useEffect } from "react";
function Home() {
  const [search, setSearch] = useState(" ");
  const [foodcat, setFoodcat] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFooditem(response[0]);
    setFoodcat(response[1]);
    //console.log(response[0],response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div>
        {" "}
        <Navbar></Navbar>
      </div>
      <div>
        <Carousal></Carousal>
      </div>
      <div className="container">
        {foodcat ? (
          foodcat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem ? (
                  fooditem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="  col-12 col-md-6 col-lg-3 m-4  "
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>NO SUCH DATA FOUND</div>
                )}
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
export default Home;
