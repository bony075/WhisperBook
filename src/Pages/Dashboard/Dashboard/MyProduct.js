import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../../../contexts/AuthProvider';





const MyProduct = () => {

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/myProduct?seller=${user?.displayName}`;

    const { data: myProduct = [] } = useQuery({
        queryKey: ["myProduct", user?.displayName],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const data = await res.json();
            return data;
        },
    });


    return (
        <div>
            <h3 className="text-3xl mb-5">My Product</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Resale price</th>
                            <th>Status</th>
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProduct?.map((booking, i) => (
                            <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-xl">
                                        <img src={booking.image_url} alt="" />
                                    </div>
                                </div></td>


                                <td>{booking.name}</td>
                                <td>{booking.resalePrice}</td>
                                <td><button className="btn btn-outline">Available</button></td>
                                <td><button className="btn btn-warning">DELETE</button></td>


                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;