//src/components/contactDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactDetail = () => {
    const location = useLocation();
    const { contact } = location.state;

    return (
        <div className="mt-8 flex flex-col items-center justify-center h-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-xs min-w-[16rem] flex flex-col items-center">

            {/* <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-center">  */}
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <span className="text-xl sm:text-2xl font-semibold">{contact.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                    <div className="text-sm sm:text-base font-semibold mb-2">Name: {contact.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Email: {contact.email}</div>
                </div>
            </div>
            <div>
                <Link to='/'>
                    <button className="px-2 py-1 sm:px-2 sm:py-1 text-base bg-teal-600 text-white rounded hover:bg-teal-700">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const ContactDetail = () => {
//     const location = useLocation();
//     const { contact } = location.state;

//     return (
//         <div className="mt-8 flex flex-col items-center justify-center h-full px-4 py-6 sm:px-6 lg:px-8">
//             <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-xs min-w-[16rem] flex flex-col items-center">
//                 <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center mb-4">
//                     <span className="text-xl sm:text-2xl font-semibold">{contact.name.charAt(0)}</span>
//                 </div>
//                 <div className="text-center">
//                     <div className="text-sm sm:text-base font-semibold mb-2">Name: {contact.name}</div>
//                     <div className="text-xs sm:text-sm text-gray-500">Email: {contact.email}</div>
//                 </div>
//             </div>
//             <div>
//                 <Link to='/'>
//                     <button className="px-4 py-2 sm:px-6 sm:py-3 text-base bg-teal-600 text-white rounded hover:bg-teal-700">
//                         Back
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ContactDetail;

