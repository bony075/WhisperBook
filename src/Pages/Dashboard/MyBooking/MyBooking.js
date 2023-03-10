import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookedProduct?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        // headers: {
        //   authorization: `bearer ${localStorage.getItem("accessToken")}`,
        // },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h3 className="text-3xl mb-5">My Orders</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Product</th>
              <th>price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td><div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src={booking.image_url} alt="" />
                  </div>
                </div></td>
                <td>{booking.name}</td>

                {/* <td>{booking.phone}</td> */}
                <td>{booking.price}</td>
                <td>{
                  booking.price && !booking.paid && <Link
                    to={`/dashboard/payment/${booking._id}`}
                  >
                    <button
                      className='btn btn-primary btn-sm'
                    >Pay</button>
                  </Link>
                }
                  {
                    booking.price && booking.paid &&
                    <button className="btn btn-outline">Paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
