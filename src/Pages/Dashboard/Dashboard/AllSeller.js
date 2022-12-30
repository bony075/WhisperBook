import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import toast from "react-hot-toast";
const AllSeller = () => {
    const [deleteSeller, setDeleteSeller] = useState(null);

    const closeModal = () => {
        setDeleteSeller(null);
    }



    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/allSeller");
            const data = await res.json();
            return data;
        },
    });


    const handleDeleteSeller = seller => {
        fetch(`http://localhost:5000/users/${seller._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`seller ${seller.name} deleted successfully`)
                }
            })
        console.log(seller);
    }




    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.usertype}</td>
                                {/* <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>*/}
                                <td>
                                    {/* <button className="btn btn-xs btn-danger">Delete</button> */}
                                    <label onClick={() => setDeleteSeller(user)} htmlFor="delete-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                deleteSeller &&
                <DeleteModal
                    title={`Are you sure you want to delete?`}
                    message={`You delete ${deleteSeller.name}. It cannot be Recover.`}
                    successAction={handleDeleteSeller}
                    successButtonName="Delete"
                    modalData={deleteSeller}
                    closeModal={closeModal}
                ></DeleteModal>}
        </div>
    );
};

export default AllSeller;
