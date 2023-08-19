import React, { useEffect, useState } from 'react'
import './SmiskiCard.css'
import {CardContent, Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import { CardActions, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { error } from 'console';

type Smiski = {
    _id: String,
    id: Number,
    name: String,
    series: String,
    description: String,
}
interface Props {
    smiski: Smiski;
    checkedStatus: boolean;
}

const SmiskiCard: React.FC<Props> = ({ smiski, checkedStatus }) => {
    const authUser = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const username = authUser()?.username;

    const [checked, setChecked] = useState(checkedStatus);

    //For updating database with new checked items
    const handleChecked = async () => {
        const newChecked = !checked;
        setChecked(newChecked);

        if(isAuthenticated() && username) {
            try {
                const response = await fetch('http://localhost:5000/api/checked', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ 
                        username: username, 
                        smiskiId: smiski._id, 
                        isChecked: newChecked, 
                    }),
                });

                if(response.ok) {
                    console.log("Checked items updated successfully.");
                } else {
                    console.log("Error checking items.")
                }

            } catch(error) {
                console.log("Error updating items.", error);
            }
        }
    }

    useEffect(() => {
        setChecked(checkedStatus);
    }, [checkedStatus]);

    return(
        <Card className="smiskiCard" style={{ borderRadius: 18}} key={smiski._id}>
            <CardContent className="customCardContent">
                <div className="checkboxContainer">
                    <CardActions>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ height: 5, mt: -6, mb: -2 } } checked={checked} onChange={handleChecked}/>} label="" />
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