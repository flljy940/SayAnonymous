import React from 'react';
import { Link } from 'react-router-dom';
import './Entrance.css';

function Entrance() {
    return (
        
        <div className="container">
            <title>SayAnonymous</title>
            <div className="headline">
                <div className="headline1">
                    <h1 className="name">SayAnonymous</h1>
                </div>
            </div>

            <div className="titleAndButton">
                <div className="title">Delve deep into the intricacies of SayAnonymous</div>
                <div className="get-started">
                <nav>
                    <button>
                        <Link to="/pages/auth" class='toClick'>
                            Get Started {'>>'}
                        </Link>
                    </button>
                </nav>
            </div>
        </div>
        
        

    </div>           
    );
}
            
export default Entrance();
