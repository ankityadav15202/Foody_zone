import React,{useEffect, useState} from 'react';
import styled from 'styled-components'
import logo from '../src/assets/FoodyZone.svg'
import { SearchResult } from './components/SearchResults/SearchResult';
const BASE_URL = "http://localhost:9000/";



const App = () => {
  const button = ["All", "Breakfast", "Lunch", "Dinner"]

  const [Data, setData] = useState(null)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)

  useEffect(()=>{
    setloading("loading...")
    const fetchFoodData = async()=>{
      try {
        
        
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setData(data)
        setloading(false)
      } 
      catch (error) {
        console.log(error.message);
        seterror("Unable to fetch data")
      }
    }
    
    fetchFoodData()
    
  },[])

  if(error){
    return <div>{error}</div>
  }
  if(loading) {
    return <div>
      {loading}
    </div>
  }



  return (
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='search'>
          <input type="text" placeholder='search food...' />
        </div>
      </TopContainer>   
      <FillterContainer>
       { button.map((value,i)=>{
          return (
          <Button
          key={i}>
            {value}
          </Button>
        )
        })}
      </FillterContainer>
      <SearchResult data={Data}/>
    </Container>
)};

export default App;

const Container =styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input{
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid red;
    color: white;
    background-color: transparent;
  } 
`

const FillterContainer = styled.div`
  display: flex;
  gap: 12px;
  place-content: center;
  padding-bottom: 40px;
`

const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  color: white;
  border: none;
  place-items: center;
  padding: 6px 12px;

  &:hover{
    cursor: pointer;
  }
`
