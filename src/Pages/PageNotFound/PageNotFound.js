import React from 'react';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return (
        < div className='flex-col justify-center mt-8 text-center' >
            <h1 className='text-4xl font-bold'>This is 404 Page!!!</h1>
            <div className='flex justify-center' >
                <img src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif" alt="" srcset="" />
            </div>
            <Link className='btn-primary p-2 rounded-lg' to='/'>Go Back to Home</Link>
        </div >
    );
};

export default PageNotFound;