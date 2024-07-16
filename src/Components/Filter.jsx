import React, { useState, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';

const Filter = ({ value, popularLocation }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [data, setData] = useState([]);
    const [mostSearched, setMostSearched] = useState([]);
    useEffect(() => {
        if (value) {
            setData(value);
            setMostSearched(popularLocation);
        }
    }, [value, popularLocation]);

    const Accordion = ({ title, children, show = false }) => {
        const accordionBodyRef = useRef(null);
        const [{ collapse }, dispatch] = useReducer(reducer, { collapse: show });
        const randomId = useRef(window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36));

        useEffect(() => {
            if (show) dispatch({ type: 'show' });
        }, [show]);

        return (
            <div className="accordion-item" style={{ borderRadius: '25px', backgroundColor: '#E2E2E2' }}>
                <h2 className="accordion-header" id={`heading-${randomId.current}`}>
                    <button
                        className={`accordion-button${collapse ? '' : ' collapsed'} accordionButton d-flex justify-content-between align-items-center`}
                        style={{ backgroundColor: 'transparent' }}
                        type="button"
                        aria-expanded={collapse}
                        aria-controls={`collapse-${randomId.current}`}
                        onClick={() => dispatch({ type: 'collapse' })}
                    >
                        <div 
                        style={{ fontSize: '1.2em', marginLeft: '10px' }} 
                        className="position-relative w-100 
                        d-flex justify-content-between px-3 py-2"
                        >
                            {title}
                            <i className={`fa-solid fa-caret-${collapse ? 'up' : 'down'}`}  />
                        </div>
                    </button>
                </h2>
                <div
                    id={`collapse-${randomId.current}`}
                    aria-labelledby={`heading-${randomId.current}`}
                    className="accordion-collapse"
                    style={{
                        height: collapse ? accordionBodyRef.current?.clientHeight : 0,
                        transition: 'height 0.2s ease',
                        overflow: 'hidden',
                    }}
                >
                    <div className="accordion-body px-2" ref={accordionBodyRef}>
                        {children || 'none.'}
                    </div>
                </div>
            </div>
        );
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'collapse':
                return { collapse: !state.collapse };
            case 'show':
                return { collapse: true };
            default:
                throw new Error();
        }
    }

    return (
        <div className="container my-3">
            <div className="d-flex flex-column gap-2" id="accordionPanelsStayOpenExample">
                {data.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    return (
                        <div key={item.id}>
                            <Accordion title={item.title} key={item.id} show={isSelected}>
                                <ul className="list-unstyled row">
                                    {mostSearched[item.id] &&
                                        mostSearched[item.id].map((box) => {
                                            const shortenTitle = item.title.replaceAll(' ', '-').toLowerCase();
                                            const shortboxLocationid = box.locationName.replaceAll(' ', '-').toLowerCase();
                                            return (
                                                <li key={box.id} className="px-3 mx-0 col-4">
                                                    <Link href={`/${shortenTitle}/${shortboxLocationid}`} passHref style={{textDecoration:"none"}}>
                                                        <div style={{ textDecoration: 'none' }}>
                                                            <div className="location d-flex gap-1 px-1">
                                                                {box.locationName}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </Accordion>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Filter;
