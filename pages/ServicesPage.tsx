
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/helpers';
import { SERVICES_DATA } from '../constants';

const ServicesPage = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Cleaning Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SERVICES_DATA.map(service => (
                    <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg border border-transparent hover:border-teal-200 flex flex-col transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-teal-100 rounded-full mr-4 text-teal-500"><service.icon className="h-8 w-8" /></div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                            </div>
                        </div>
                        <p className="text-gray-600 flex-grow mb-6">{service.description}</p>
                        <button onClick={() => navigate(`/booking?service=${service.id}`)} className="mt-auto bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition duration-300 self-start">
                            Book This Service
                        </button>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default ServicesPage;
