import React, { useEffect, useState } from 'react'
import { getTopReferrals } from './../../services/Api/api'


const Referrals = () => {
    const [referrals, setReferals] = useState([]);
    const fetchTopReferrals = () => {
        getTopReferrals({ setReferals });
    };

    useEffect(() => {
        // Call fetchTopReferrals initially
        fetchTopReferrals();

        // Set up a timer to call fetchTopReferrals every 5 seconds
        const timerId = setInterval(() => {
            fetchTopReferrals();
        }, 5000);

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(timerId);
        };
    }, []);
    const [nav, SetNav] = useState(true);
    const toogleNavigation = () => {
        SetNav(!nav);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                SetNav(true);
            } else {
                SetNav(false);

            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>


            <div style={{
                borderRadius: '12px',
                padding: '20px', backgroundColor: '#251705',
            }} className="card-content">
                <div style={{
                    display: 'flex',
                    justifyContent:
                        'space-between',
                    alignItems: 'center',
                    // border: '1px solid red',
                    flexDirection: 'column',


                }}   >
                    <h1 style={{ color: '#F0971F', marginRight: '5px', fontWeight: 'bold', fontSize:'32px'}}>Top 3 BFM Referrals </h1>
                    {referrals?.map((val, index) => {
                        return (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                padding: '8px',
                                '@media (maxWidth: 768px)': {
                                    flexDirection: 'column',

                                    // Change flex direction to column
                                },
                            }} >
                                {nav ? <p style={{ marginRight: '5px' }}><span style={{ color: '#F0971F', marginRight: '5px', fontWeight: 'bold' }}>Referral Address</span>{val?.address}</p> : <p style={{ marginRight: '5px' }}><span style={{ color: '#F0971F', marginRight: '5px', fontWeight: 'bold' }}>Referral Address</span>{val?.address.slice(0, 12)}...{val?.address.slice(-3, -1)}</p>}
                                <p style={{ marginLeft: '5px' }}><span style={{ color: '#F0971F', marginRight: '5px', fontWeight: 'bold' }}>Bonus Earned</span>{parseFloat(val?.count).toFixed(4)} BNB</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Referrals
