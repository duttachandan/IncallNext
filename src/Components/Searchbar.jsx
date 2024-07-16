import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function Middlebar({ show, handleClose }) {
    const [loading, setLoading] = useState(false);
    const [searchCat, setSearchCat] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [keyword, setKeyword] = useState("");
    const [isLocationSelected, setIsLocationSelected] = useState(false);
    const router = useRouter();
    const { state } = useContext(AppContext);

    useEffect(() => {
        if (state) {
            setCategories(state.categories);
            try {
                const uniqueStates = state.states.filter(
                    (state, index, self) =>
                        self.findIndex((s) => s.state === state.state) === index
                );
                setStates(uniqueStates);
            } catch (error) {
                console.error("Error fetching states:", error);
            } finally {
                setLoading(state.loading);
            }
        }
    }, [state]);

    const handleStateChange = async (event) => {
        const selectedStateName = event.target.value;
        setSelectedState(selectedStateName);
        try {
            const districtsData = await getDistrictsByState(selectedStateName);
            districtsData.sort((a, b) => a.district.localeCompare(b.district));
            setDistricts(districtsData);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
        setIsLocationSelected(false);
    };

    const handleSearchButtonClick = async () => {
        if (selectedState && !selectedDistrict) {
            alert("Please select a location");
            return;
        }

        let selectedCategoryObj;
        if (!selectedCategory) {
            selectedCategoryObj = categories[0];
        } else {
            selectedCategoryObj = categories.find(
                (category) => category.title === selectedCategory
            );
        }

        const selectedDistrictObj = districts.find(
            (district) => district.district === selectedDistrict
        );

        const requestData = {
            categoryId: selectedCategoryObj?.id,
            locationId: selectedDistrictObj?.id,
            keyWord: keyword,
            districtName: selectedDistrict,
        };

        try {
            const response = await getPostsByLocationAndCategory(requestData);
            setSearchCat(response);

            const districtName = selectedDistrict.replaceAll(" ", "-").toLowerCase();
            const categoryName = selectedCategoryObj.title
                .replaceAll(" ", "-")
                .toLowerCase();

            router.push({
                pathname: `/${categoryName}/${districtName}`,
                query: {
                    districtName: selectedDistrict,
                    keyWord: keyword,
                },
                state: {
                    districtData: response,
                },
            });

            handleClose();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleClear = () => {
        setSelectedState("");
        setSelectedCategory("");
        setSelectedDistrict("");
        setKeyword("");
        setIsLocationSelected(false);
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <>
            {show && (
                <>
                    <div className="overlay" onClick={handleClose}></div>

                    <div className="centered-div">
                        <div
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                            className="d-flex w-100 justify-content-end align-items-end top-0 right-0 mt-2 mx-2 searchBarXmark"
                        >
                            <i className="fa-solid fa-xmark pe-3"></i>
                        </div>
                        <div className="d-flex justify-content-center align-items-center w-100 h-25 pb-3 pt-1">
                            <Link
                                className="navbar-brand d-flex align-items-center justify-content-center"
                                href={`/`}
                            >
                                <Image
                                    src="../assets/InCallApp.png"
                                    alt="Logo Of IncallUp"
                                    className="d-inline-block align-text-top navLogoImg"
                                />
                                <h2 className="navLogo">InCallup</h2>
                            </Link>
                        </div>
                        <div className="w-100 gap-4 h-75">
                            <select
                                className="form-select mb-4"
                                aria-label="Default select example"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.length > 0 ? (
                                    <option value={categories[0].title}>
                                        {categories[0].title}
                                    </option>
                                ) : (
                                    <option value="">No categories available</option>
                                )}
                                {categories.slice(1).map((category) => (
                                    <option key={category.id} value={category.title}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="form-select mb-4"
                                aria-label="Default select example"
                                value={selectedState}
                                onChange={handleStateChange}
                            >
                                <option value="">Select State</option>
                                {states &&
                                    states.map((state) => (
                                        <option key={state.id} value={state.state}>
                                            {state.state}
                                        </option>
                                    ))}
                            </select>
                            <select
                                className="form-select mb-4"
                                aria-label="Default select example"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                disabled={!selectedState}
                            >
                                <option value="">Select Location</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.district}>
                                        {district.district}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                className="w-100 py-1 px-2 d-flex align-items-center rounded select-container"
                                placeholder="Search Keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            ></textarea>
                            <div className="d-flex flex-row justify-content-between align-items-center w-100 mt-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleClear}
                                    style={{ width: "45%", backgroundColor: "#103652" }}
                                >
                                    Clear
                                </button>
                                <button
                                    className="btn btn-primary d-flex justify-content-center align-items-center gap-2"
                                    style={{ width: "45%", backgroundColor: "#103652" }}
                                    onClick={handleSearchButtonClick}
                                    disabled={
                                        selectedState && !selectedDistrict && selectedCategory
                                    }
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Middlebar;
