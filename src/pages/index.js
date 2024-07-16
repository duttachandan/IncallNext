import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { BASE_URL } from '../Store/Context';

const Hero = dynamic(() => import('../Components/Hero'), { ssr: true });
const Content = dynamic(() => import('../Components/Content'));
const Filter = dynamic(() => import('../Components/Filter'));
const Disclaimer = dynamic(() => import('../Components/Disclaimer'));

const Home = ({ categories, popularLocations, LogoImage }) => {
    return (
        <div style={{ minHeight: '100vh', background: 'white' }}>
            <Hero initialData={categories} LogoImage={LogoImage} />
            <h4 className="text-center pt-3 fw-bolder hero_add" style={{ wordSpacing: "2px", fontFamily: "Roboto" }}>
                FIND ADS IN LOCAL : INDIA
            </h4>
            <p className="text-center fw-lighter hero_add" style={{ color: "gray" }}>
                Most Popular Location In A Specific Category
            </p>
            <Filter value={categories} popularLocation={popularLocations} />
            <Content />
            <Disclaimer />
        </div>
    );
};

export const getStaticProps = async () => {
    try {
        const [categoriesResponse, popularLocationsResponse] = await Promise.all([
            axios.get(`${BASE_URL}/dashboard/get-all-categories`),
            axios.get(`${BASE_URL}/dashboard/get-popular-location`)
        ]);

        return {
            props: {
                categories: categoriesResponse.data,
                popularLocations: popularLocationsResponse.data,
                LogoImage: '/path/to/your/logo.png', // Add the path to your logo image
            },
            revalidate: 60 // Re-generate the page at most once per minute
        };
    } catch (error) {
        console.log(error.message);
        return {
            props: {
                categories: [],
                popularLocations: [],
                LogoImage: '/path/to/your/logo.png', // Add the path to your logo image
            }
        };
    }
};

export default Home;