import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "./Reducer";

export const BASE_URL = `https://back.incallup.com`;

const AppContext = createContext();

const initialState = {
    categories: [],
    states: [],
    categoryPosts: {},
    post: [],
    popularLocations: [],
    allStates: [],
    loading: true,
    error: null,
};


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const categoriesResponse = await axios.get(`${BASE_URL}/dashboard/get-all-categories`);
                dispatch({ type: "SET_CATEGORIES", payload: categoriesResponse.data });
                console.log(categoriesResponse);

                const statesResponse = await axios.get(`${BASE_URL}/dashboard/get-all-state`);
                dispatch({ type: "SET_STATES", payload: statesResponse.data });

                const popularLocationsResponse = await axios.get(`${BASE_URL}/dashboard/get-popular-location`);
                dispatch({ type: "SET_POPULAR_LOCATIONS", payload: popularLocationsResponse.data });
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: error.message });
                console.error("Error fetching data:", error);
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };
        fetchData();
    }, []);


    const fetchPost = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/get-post/${id}`);
            dispatch({ type: "SET_POST", payload: response.data, id });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
            console.error("Error fetching the Post Data:", error);
        }
    };

    const fetchAllState = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/get-states`);
            console.log(response.data);
            dispatch({ type: "SET_ALL_STATES", payload: response.data });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
            console.error("Error fetching the Post Data:", error);
        }
    }

    return (
        <AppContext.Provider value={{ state, fetchAllState, fetchPost }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider};