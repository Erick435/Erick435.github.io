import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';
import plane from './plane.jpg';
import './dashboard.css';

/*
This is a react application, you must first install the required items needed for this project BELOW
You may also copy and paste after the ">"

    >npm install react react-helmet react-router-dom axios react-spinners @emotion/react

*/


const Dashboard = () => {
    const [location, setLocation] = useState('');
    const [days, setDays] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const aboutSectionRef = useRef(null);
    const contactSectionRef = useRef(null);

    //CSS override to use spinner for loading API data
    const override = css`
        display: block;
        margin: 0 auto;
        `;

    useEffect(() => {

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const options = {

                method: 'GET',
                url: 'https://ai-trip-planner.p.rapidapi.com/',
                params: {
                    days: days,
                    destination: location
                },
                headers: {
//============================ IMPORTANT IN ORDER TO RUN CODE ===================

//You must obtain your own API key and insert it below V     it should look like it 
//                    'X-RapidAPI-Key': 'e0812d1714msh60632h304e328z4p1abc0ejust856fa0001f',

                    'X-RapidAPI-Key': 'dc1750ddbemsh5f58d12dc52051cp188511jsn7da49909e51a',

// =============================== STOP MODIFYING FROM HERE ============================
                    'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            console.log(response.data);

            if(response.status !== 200){
                throw new Error('Error getting data from API');
            }

            const jsonData = response.data;
            navigate(`/search-results`, { 
                state:{
                    location, days, data: jsonData,
                }
        });
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    };

    if (location && days) {
        //Get api data and store it 
        fetchData();
    }
}, [location, days, navigate]);


    const scrollToAboutSection = () => {
        if(aboutSectionRef.current){
            aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContactSection = () => {
        if(contactSectionRef.current){
            contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const locationValue = e.target.location.value;
        const daysValue = e.target.days.value;
        setLocation(locationValue);
        setDays(daysValue);
    };


    return (

        <div className='app'>
            <div className='HeaderApp'>
                <Helmet>
                    <title>TravelStrats</title>
                </Helmet>
            </div>

            <div className='BodyApp'>

                {/* ================= HEADING/TOP BAR ===================== */}
                <div className='topLabel'>
                    <div className='dash'>
                        <h1>TravelStrats</h1>
                    </div>

                    <div className='aboutLabel'>
                        <h3 onClick={scrollToAboutSection}>About</h3>
                    </div>

                    <div className='contactLabel'>
                        <h3 onClick={scrollToContactSection}>Contact</h3>
                    </div>


                </div>

                {/* ================== FORM PAGE =======================--= */}

                <div className='containerOne'>
                    <div className='imageContainer'>
                        <img src={plane} alt='Plane in sky' height='750' width='1000' />
                    </div>

                    <div className='formContainer'>
                        <form onSubmit={handleFormSubmit}>
                            <div className='labelOne'>
                                <label htmlFor="location">Location: </label>
                                <input className='inputLocation' type="text" name='location' placeholder='Tokyo, Japan . . .' required/>
                            </div>

                            <div className='labelTwo'>
                                <label htmlFor="days"># of Days: </label>
                                <input className='inputDays' type='number' name='days' placeholder='0 . . .' required/>
                            </div>
                            <input className='buttonSubmit' type="submit" value="Submit" />
                        </form>
                    </div>
                </div>


                {/* ================= ABOUT SECTION ==================== */}
<div className='aboutContainer' ref={aboutSectionRef}>
    <div className='aboutHeader'>
        <h1>About TravelStrats</h1>
    </div>

    <div className='aboutBody'>
        <p>
            Are you a passionate traveler who craves adventure in new destinations but often finds the process of planning your
             journeys overwhelming? TravelStrats is here to be your ultimate travel companion and guide, designed to simplify and 
             enrich your travel experiences.
        </p>
        <p>
            TravelStrats is a project born out of a love for exploration and a deep-seated desire to streamline the vacation 
            planning process. In a world where information overload is commonplace, our dynamic platform has been meticulously 
            crafted to empower travelers with curated, personalized travel recommendations, ensuring you make the most of your 
            valuable time away from home.
        </p>
        <p>
            As the creator of this project, I understand the challenges that come with planning trips to unfamiliar destinations. 
            Hours spent scouring the internet for things to do, places to visit, and the best dining spots can often lead to 
            frustration. With TravelStrats, our goal is to revolutionize this process.
        </p>
        <p>
            Our mission is straightforward: to serve as your one-stop resource for discovering hidden gems, must-see attractions, 
            and authentic experiences that transform each journey into an unforgettable adventure. TravelStrats harnesses 
            cutting-edge technology and real-time data from a trusted API source to provide you with the latest and most reliable 
            information about your chosen destination.
        </p>
        <p>
            Join us on a quest to make your travel dreams a reality. With TravelStrats, we aim to empower travelers to embark on 
            unforgettable adventures, explore new horizons, and create lasting memories.
        </p>
    </div>
</div>



                {/* =================== CONTACT SECTION =============== */}

                <div className='contactContainer' ref={contactSectionRef}>
                    <div className='contactHeader'>
                        <h1>Contact</h1>
                    </div>

                    <div className='contactBody'>
                        <h5>Phone Number: +1 (929)-578-4848</h5>
                        <h5>Email: shut435@yahoo.com</h5>
                        <h5>NYC, NY, USA</h5>
                    </div>
                </div>

            </div>
            {isLoading && (
                <div className='loadingScreen'>
                <BarLoader color='#ffffff' css={override} loading={isLoading} />
                </div>)}
        </div>

    );
};

export default Dashboard;