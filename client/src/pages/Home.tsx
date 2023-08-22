import { useEffect, useState } from 'react'
import './Home.css'
import { Autocomplete, TextField } from '@mui/material';
import SmiskiCard from '../components/SmiskiCard';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

type Smiski = {
    _id: String,
    id: Number,
    name: String,
    series: String,
    description: String,
}

//filer out duplicate series names
function getUniqueSeries(smiskis: Smiski[]): string[] {
  const seriesSet = new Set<string>(); //contains only unique values
  smiskis.forEach((smiski) => seriesSet.add(smiski.series.toString()));

  const seriesArray = Array.from(seriesSet);

  return seriesArray;
}

export default function Home() {

  const [smiskis, setSmiskis] = useState<Smiski[]>([]);

  const [filteredSmiskis, setFilteredSmiskis] = useState<Smiski[]>([]);
  const [filterText] = useState<string>('');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const uniqueSeries = getUniqueSeries(smiskis);

  const authUser = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const username = authUser()?.username;

  //To fetch data from API endpoints created
  useEffect(() => {
    async function fetchSmiskis() {
      const response = await fetch("https://smiski-collection-backend.onrender.com/smiski"); //return object with JSON method
      const newSmiskis = await response.json();
      setSmiskis(newSmiskis);
      setFilteredSmiskis(newSmiskis); //automatically sets filtered smiskis as all smiskis
    }
    fetchSmiskis();
  }, []);

  //For filtering data based off of series
  useEffect(() => {
    const filteredSmiskis = smiskis.filter((smiski) =>
      smiski.series.toLowerCase().includes(filterText.toLowerCase()) &&
      (!selectedSeries || smiski.series.toLowerCase().includes(selectedSeries.toLowerCase()))
    );
    setFilteredSmiskis(filteredSmiskis);
  }, [smiskis, filterText, selectedSeries]);

  //For remembering and passing checked smiskis
  const [checkedSmiskis, setCheckedSmiskis] = useState<Record<string, boolean>>({});

  const loadCheckedSmiskis = async (username : String) => {
    try {
      const response = await fetch(`https://smiski-collection-backend.onrender.com/api/checked/${username}`);
      const data = await response.json(); 

      const newCheckedSmiskis: Record<string, boolean> = {};
      data.checkedSmiskis.forEach((item: any) => {
        newCheckedSmiskis[item.smiskiId] = item.isChecked;
      });

      setCheckedSmiskis(newCheckedSmiskis);

    } catch(error) {
      console.log("Error loading checked smiskis", error);
    }
  } 

  useEffect(() => {
    if (isAuthenticated() && username) {
      loadCheckedSmiskis(username);
    }
  }, [isAuthenticated, username]);

  return (
      <div className="Home">
        <div className="content">
          <div className="filter" >
            <Autocomplete
              id="seriesFilter"
              value={selectedSeries}
              onChange={(_event, newValue) => setSelectedSeries(newValue)}
              options={uniqueSeries}
              renderInput={(params) => <TextField {...params} label="Filter by Series" />}
              sx={{
                backgroundColor: 'white',
                borderRadius: 4,
                p: 1.5,
                fontWeight: 'bold',
              }}
              componentsProps={{ popper: { style: { width: 'fit-content' } } }}

            />
          </div>

          <div className="container">
            <div className="smiskiContainer">
              {filteredSmiskis.map((smiski) => (
                <SmiskiCard 
                key={smiski.id as any} 
                smiski={smiski} 
                checkedStatus={checkedSmiskis[smiski._id as keyof typeof checkedSmiskis] || false}
              />
              ))}
            </div>
          </div>
        </div>
    </div> 
  )
}