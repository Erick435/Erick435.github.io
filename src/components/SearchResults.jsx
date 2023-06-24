import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './searchResults.css';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const locationData = useLocation();
    const { location, days, data } = locationData.state || {};

    useEffect(() => {
        if(data){
            console.log(data);
        }
    }, [data]);

    if (!data || !data.plan) {
        return <div>No data available</div>;
    }

    return (
        <div className='searchResultsContainer'>
            <div className='HeaderApp'>
                <Helmet>
                    <title>TravelStrats</title>
                </Helmet>
            </div>

            {/* ================= HEADING/TOP BAR ===================== */}
            
            <div className='topLabel'>
                <div className='dash'>
                    <Link to="/" className='linkToDashboard'><h1>TravelStrats</h1></Link>
                </div>

                <div className='aboutLabel'>
                    <Link to="/" className='aboutLink'><h3>About</h3></Link>
                </div>

                <div className='contactLabel'>
                    <Link to="/" className='contactLink'><h3>Contact</h3></Link>
                    
                </div>
            </div>


            {/* =================== RESULTS PAGE BODY ======================== */}

            <div className='headingForSearchResults'>
                <div className='resultAndButton'>
                    <h1 className='searchResultsBody'>Search Results</h1>
                    <Link to="/" className='linkButton'>Back</Link>
                </div>

                <div className='locationAndDays'>
                    <h1><b>Location: {location}</b></h1>
                    <h1><b>Days: {days}</b></h1>
                </div>
            </div>

            {/* ==================RENDER ITEM FROM API CALL ==============*/}
            <div>
                {data.plan.map((day, index) => (
                    <div key={`day-%{index}`}>
                        <h1 className='eachDay'>Day {day.day}</h1>
                        <ol className='listContainer'>
                            {day.activities.map((activity, activityIndex) => (
                                <li key={`activity-${index}-${activityIndex}`}>
                                    <strong className='timeOfActivity'>{activity.time}</strong> <span className='seperateTimeDescription'>-</span> <span className='descriptionOfActivity'>{activity.description}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>

            {/* =================== CONTACT SECTION =============== */}

            <div className='contactContainer'>
                    <div className='contactHeader'>
                        <h1>Contact</h1>
                    </div>

                    <div className='contactBody'>
                        <h5>Phone Number: 1+ (929)-578-4848</h5>
                        <h5>Email: shut435@yahoo.com</h5>
                        <h5>NYC, NY, USA</h5>
                    </div>
            </div>
        </div>
    );
};

export default SearchResults;
