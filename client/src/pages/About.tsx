import './About.css'
import { Header } from '../components/Header';

export default function About() {
    return (
        <div className='aboutContainer'>
            <p className='aboutText'>
                Keep track of your collection of smiskis and see which ones you haven't collected yet!
            </p>
            {/* <p className='aboutText2'>
                Allows users to save their collection with a username and password.
            </p> */}
        </div>
    );
}