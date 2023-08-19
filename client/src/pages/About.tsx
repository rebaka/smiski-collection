import { Paper } from '@material-ui/core';
import './About.css'
import { Typography } from '@material-ui/core';

export default function About() {

    const paperStyle = {padding: 20, height: '50vh', width:350, margin: "20px auto"}

    return (
        <div className='aboutContainer'>

            <p>
                Smiski are curious little creatures that love hiding in small spaces and corners of your room.
            </p>

            <p>
                Keep track of your collection of smiskis and see which ones you haven't collected yet.
            </p>

            <p>
                Create an account to save your smiski collection!
            </p>
        </div>
    );
}