import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <div>
                About this application: It's awesome!
            </div>
            <div> 
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}