import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import plane from './plane.jpg';
import './dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://rapidapi.com/nabeeldev1340/api/ai-trip-planner', {
                    method: 'GET',
                    url: 'https://ai-trip-planner.p.rapidapi.com/',
                    params: {
                        days: '',
                        destination: ''
                    },
                    headers: {
                        'X-RapidAPI-Key': '[ENTER THE API KEY HERE]',//API KEY = 388efeeae5msh45286bb91f3966bp105b51jsn735057a9da51
                        'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching data from API');
                }

                const jsonData = await response.json();
                setData(jsonData); // Store the retrieved data in the state variable
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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
                        <h3>About</h3>
                    </div>

                    <div className='surprise'>
                        <h3>Surprise me!</h3>
                    </div>


                </div>

                {/* ================== FORM PAGE =======================--= */}
                <div className='containerOne'>
                    <div className='imageContainer'>
                        <img src={plane} alt='Plane in sky' height='750' width='1000' />
                    </div>

                    <div className='formContainer'>
                        <form action="">
                            <div className='labelOne'>
                                <label htmlFor="Location">Location: </label>
                                <input type="text" placeholder='Tokyo, Japan...' />
                            </div>

                            <div className='labelTwo'>
                                <label htmlFor="Days"># of Days: </label>
                                <input type='number' />
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>


                {/* ================= ABOUT SECTION ==================== */}
                
                <div className='aboutContainer'>
                    <div className='aboutHeader'>
                        <h1>About</h1>
                    </div>

                    <div className='aboutBody'>
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, cumque ducimus unde accusantium sapiente maxime iste doloribus officia provident, adipisci neque dicta deserunt,
                            voluptatum alias accusamus tempora modi ad?!</h3>
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, vel quo perspiciatis quasi praesentium adipisci eius commodi maiores earum quaerat optio, doloremque nulla corrupti 
                            sassumenda at consequuntur. Repellat, sequi perspiciatis.</h3>
                    </div>
                </div>

            </div>


            {/* Render the retrieved data */}
            {data.map((item) => (
                <div key={item.id}>
                    {/* Display the relevant data */}
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
        


    );
};

export default Dashboard;