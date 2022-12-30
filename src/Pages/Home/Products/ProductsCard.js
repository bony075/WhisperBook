
import React, { useContext } from 'react';
import { FaCartPlus } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider';

const ProductsCard = ({ product, setsingleProduct }) => {
  const { user } = useContext(AuthContext);
  console.log(product.name);
  const {
    name,
    location,
    originalPrice,
    resalePrice,
    yearsOfUse,
    posted,
    seller,
    image_url,
    details,
  } = product;

  return (
    
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{user?.displayName}</h2>
        <p>{location}</p>
      </div>
      <figure><img src={image_url} alt="Shoes" /></figure>
      <div className="card-actions ">
        {user?.uid && <>
          
          <label

            htmlFor="booking-modal"
            className="btn btn-primary text-white"
            // onClick={() => setsingleProduct(product)}
          >
            Like
          </label>
          <button className="btn btn-outline"> Comment</button>
        </>}
      </div>
    </div>
  );
};

export default ProductsCard;