import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
const AllBuyer = () => {
    const [deleteBuyer, setDeleteBuyer] = useState(null);
    const closeModal = () => {
        setDeleteBuyer(null);
    }



    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/allbuyer");
            const data = await res.json();
            return data;
        },
    });
    // const handleMakeVerify = id => {
    //     fetch(`http://localhost:5000/users/verify/${id}`, {
    //         method: 'PUT',
    //         // headers: {
    //         //     authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         // }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.modifiedCount > 0) {
    //                 toast.success(' Verify successful.')
    //                 refetch();
    //             }
    //         })
    // }

    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/${buyer._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`buyer ${buyer.name} deleted successfully`)
                }
            })
        console.log(buyer);
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
                            {/* <th>Verify</th> */}
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
                                {/*  <td>{user?.usertype !== 'verify' && <button onClick={() => handleMakeVerify(user._id)} className='btn btn-xs btn-primary'>Make Verify</button>}</td> */}
                                <td>
                                    {/* <button className="btn btn-xs btn-danger">Delete</button> */}
                                    <label onClick={() => setDeleteBuyer(user)} htmlFor="delete-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                deleteBuyer &&
                <DeleteModal
                    title={`Are you sure you want to delete?`}
                    message={`You delete ${deleteBuyer.name}. It cannot be Recover.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="Delete"
                    modalData={deleteBuyer}
                    closeModal={closeModal}
                ></DeleteModal>}
        </div>
    );
};

export default AllBuyer;
