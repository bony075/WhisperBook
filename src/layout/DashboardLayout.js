import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hook/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        
                        {
                            isAdmin==='admin' &&
                            <>
                                <li><Link to="/dashboard/allbuyer">All Buyer</Link></li>
                                <li><Link to="/dashboard/allSeller">All Seller</Link></li>
                                
                            </>
                        }
                        {
                            isAdmin ==='seller' &&
                            <>
                                <li><Link to="/dashboard/addproduct">Add Product</Link></li>
                                <li><Link to="/dashboard/myProduct">My Product</Link></li>
                            </>
                        }
                        {
                            isAdmin ==='buyer' &&
                            <>
                                <li><Link to="/dashboard/myBooking">My Orders</Link></li>
                                <li><Link to="/dashboard/myBooking">My Wishlist</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;