
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/helpers';
import { SERVICES_DATA } from '../constants';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="relative bg-teal-800 text-center py-20 md:py-32 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=2070')" }}
                />
                <div className="absolute inset-0 bg-black opacity-50 z-10" />
                <div className="relative z-20 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">Pristine Clean for a Sparkling Home</h1>
                    <p className="text-lg md:text-xl text-slate-200 mt-4 max-w-2xl mx-auto">Reliable, professional, and thorough cleaning services tailored to your needs.</p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => navigate('/booking')} className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-lg transform hover:scale-105">
                            Book a Cleaning
                        </button>
                        <button onClick={() => navigate('/status')} className="bg-white text-teal-600 border border-teal-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-50 transition duration-300 shadow-lg transform hover:scale-105">
                            Check Booking Status
                        </button>
                    </div>
                </div>
            </div>
            <PageWrapper>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES_DATA.slice(0, 6).map(service => (
                        <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg border border-transparent hover:border-teal-200 hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1">
                            <div className="flex justify-center items-center mb-4 text-teal-500"><service.icon className="h-12 w-12" /></div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                            <p className="text-gray-600">{service.description.substring(0, 80)}...</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12"><Link to="/services" className="text-teal-600 font-semibold hover:underline">View All Services &rarr;</Link></div>
            </PageWrapper>
        </div>
    );
};

export default HomePage;
