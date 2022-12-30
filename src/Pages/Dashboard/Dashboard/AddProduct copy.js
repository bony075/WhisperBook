import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageKey = process.env.REACT_APP_imgbb_KEY;
  console.log(imageKey);
  const navigate = useNavigate();
  const { data: ctproduct, isLoading } = useQuery({
    queryKey: ["ctproduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categoryCollection");
      const data = await res.json();
      return data;
    },
  });

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          console.log(imgData.data.url);
          const product = {
            category_id: data.ctproduct,

            name: data.name,

            location: data.location,

            originalPrice: data.originalPrice,

            resalePrice: data.resalePrice,

            yearsOfUse: data.yearsOfUse,

            posted: data.posted,

            seller: user?.displayName,

            image_url: imgData.data.url,

            details: data.details,
          };


          fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/");
            });
        }
      });
  };

  return (
    <div className="w-96 p-7 mx-auto">
      <h2 className="text-4xl">Add A Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is Required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("location", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="text"
            {...register("originalPrice", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.originalPrice && (
            <p className="text-red-500">{errors.originalPrice.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="text"
            {...register("resalePrice", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.resalePrice && (
            <p className="text-red-500">{errors.resalePrice.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Years of Use</span>
          </label>
          <input
            type="text"
            {...register("yearsOfUse", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.yearsOfUse && (
            <p className="text-red-500">{errors.yearsOfUse.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Posted Date</span>
          </label>
          <input
            type="text"
            {...register("posted", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.posted && (
            <p className="text-red-500">{errors.posted.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Seller Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            disabled
            {...register("seller", {})}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.seller && (
            <p className="text-red-500">{errors.seller.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Category</span>
          </label>
          <select
            {...register("ctproduct")}
            className="select input-bordered w-full max-w-xs"
          >
            {ctproduct?.map((ctproduct) => (
              <option key={ctproduct._id} value={ctproduct.category_id}>
                {ctproduct.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Upload Product Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Photo is Required",
            })}
            className="input  w-full max-w-xs"
          />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Details</span>
          </label>


          <select
            {...register("details")}
            className="select input-bordered w-full max-w-xs"
          >

            <option value='Excellent'>Excellent</option>
            <option value='Good'>Good</option>
            <option value='Fair'>Fair</option>

          </select>

          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>
        <input
          className="btn btn-primary w-full mt-4"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;
