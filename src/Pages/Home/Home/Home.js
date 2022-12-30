import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import Products from "../Products/Products";
import { FaChair, FaLeaf, FaTree } from 'react-icons/fa';
import axios from "axios";
import AddProduct from "../../Dashboard/Dashboard/AddProduct";
const Home = () => {
  const uri = "http://localhost:5000/categoryCollection";
  const [category, setCategory] = useState([]);
  // useEffect(() => {
  //   fetch(uri)
  //     .then(res => res.json())
  //   .then(data =>setCategory(data) )
  // },[])


  useEffect(() => {
    axios.get(uri)
      .then(data => setCategory(data.data))
  }, [])



  // const { data: category = [] } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     const res = await fetch(uri);
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  return (
    <>
     
      <div className="container mx-auto">
        <AddProduct></AddProduct>
</div>
      <div className="grid lg:grid-cols-4 container mx-auto mt-12">
        {/* <div className="col-span-1 p-6">
          <h1 className="text-4xl font-bold mb-6">Category</h1>

          <div className="flex flex-col gap-2">
            {category?.map((ct) => (
              <Link
                className="btn btn-primary"
                to={`/category/${ct.category_id}`}
                key={ct._id}
              >
                {ct.name}
              </Link>
            ))}
          </div>
        </div> */}

        <div className="col-span-4">
          <Products></Products>

        </div>
      </div>


     
    </>
  );
};

export default Home;
