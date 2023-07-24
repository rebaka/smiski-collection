import React, { useEffect, useState } from 'react'
import './SmiskiCard.css'
import {CardContent, Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import { CardActions, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

type Smiski = {
    _id: String,
    id: Number,
    name: String,
    series: String,
    description: String,
}

interface Props {
    smiski: Smiski;
}

const SmiskiCard: React.FC<Props> = ({ smiski }) => {
    return(
        <Card className="smiskiCard" style={{ borderRadius: 18}} key={smiski._id}>
            <CardContent className="customCardContent">
                <div className="checkboxContainer">
                    <CardActions>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ height: 5, mt: -6, mb: -2 }}/>} label="" />
                        </FormGroup>
                    </CardActions>
                </div>

                <Typography className="SmiskiName" variant="h5" component="div" style={{ marginTop: '-8px' }}>
                    {smiski.name}
                </Typography>

                <Typography className="SmiskiSeries" variant="h6" style={{ marginTop: '-40px' }}>
                    {smiski.series}
                </Typography>

                <Typography className="SmiskiDescription" variant="body2" paragraph>
                    {smiski.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SmiskiCard;

// type Smiski = {
//     _id: String,
//     id: Number,
//     name: String,
//     series: String,
//     description: String,
// }


// const SmiskiCard: React.FC = () => {

//     const [smiskis, setSmiskis] = useState<Smiski[]>([]);

//     //To fetch data from API endpoints created
//     useEffect(() => {
//         async function fetchSmiskis() {
//         const response = await fetch("http://localhost:5000/smiski"); //return object with JSON method
//         const newSmiskis = await response.json();
//         setSmiskis(newSmiskis);
//         }
//         fetchSmiskis();
//     }, []);

//     return(
//         <div className="container">
//             <div className="smiskiContainer">
//             {smiskis.map((smiski) => (
//                 <Card className="smiskiCard" style={{ borderRadius: 18}} key={smiski._id}>
//                 <CardContent className="customCardContent">
//                     <CardActions>
//                     <FormGroup>
//                         <FormControlLabel control={<Checkbox/>} label="" />
//                     </FormGroup>
//                     </CardActions>

//                     <Typography className="SmiskiName" variant="h5" component="div" style={{ marginTop: '-8px' }}>
//                     {smiski.name}
//                     </Typography>

//                     <Typography className="SmiskiSeries" variant="h6" style={{ marginTop: '-8px' }}>
//                     {smiski.series}
//                     </Typography>

//                     <Typography className="SmiskiDescription" variant="body2" paragraph>
//                     {smiski.description}
//                     </Typography>
//                 </CardContent>
//                 </Card>
//                 )
//             )}
//             </div>
//         </div>
//     )

// }

// export default SmiskiCard;