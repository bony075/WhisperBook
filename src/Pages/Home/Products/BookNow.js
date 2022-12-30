import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookNow = ({ Allproduct, singleProduct, setsingleProduct }) => {
  const { name, resalePrice } = singleProduct;

  const { user } = useContext(AuthContext);
  console.log("sdfdsfsd", singleProduct);
  console.log("bookalpererkj ", Allproduct);
  const handleBooking = (event) => {
    event.preventDefault();

    const form = event.target;
    // const slot = form.slot.value;
    const user = form.user.value;
    const email = form.email.value;
    const price = form.price.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const booking = {
      name,
      user,
      image_url: Allproduct[0].image_url,
      //   slot,
      email,
      price,
      phone,
      location,
    };
    console.log('taerdrf asdas', booking);
    fetch("http://localhost:5000/bookedProduct", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setsingleProduct(null);
          toast.success("The item is booked!!");
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            {/* <input
              type="text"
              disabled
              // value={date}
              className="input w-full input-bordered "
            /> */}
            {/* <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, i) => (
                  <option value={slot} key={i}>
                    {slot}
                  </option>
                ))}
            </select> */}
            <input
              name="user"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <input
              name="price"
              type="text"
              defaultValue={resalePrice}
              disabled
              placeholder="price "
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              placeholder=" Meeting Address "
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-primary text-white w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookNow;
