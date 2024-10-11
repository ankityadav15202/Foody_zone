import React,{useEffect, useState} from 'react';
import styled from 'styled-components'
import logo from '../src/assets/FoodyZone.svg'
import { SearchResult } from './components/SearchResults/SearchResult';
export const BASE_URL = "http://localhost:9000";



const App = () => {
  const button = ["All", "Breakfast", "Lunch", "Dinner"]

  const [Data, setData] = useState(null)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)

  const [selectBtn, setselectBtn] = useState("all")

  const [filteredData, setfilteredData] = useState(null)

  useEffect(()=>{
    setloading("loading...")
    const fetchFoodData = async()=>{
      try {
        
        
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setData(data)
        setfilteredData(data)
        setloading(false)
      } 
      catch (error) {
        console.log(error.message);
        seterror("Unable to fetch data")
      }
    }
    
    fetchFoodData()
    
  },[])

  const searchFood= (e)=>{
    const searchValue = e.target.value
    console.log(searchValue);
    
    const filter = Data?.filter((food)=>{
      return food.name.toLowerCase().includes(searchValue.toLowerCase())
    })

    setfilteredData(filter)
  }

  const filteredFood = (type)=>{
    if(type === "all"){
      setfilteredData(Data)
      setselectBtn("all")
      return
    }

    const filteredfoodtype = Data?.filter((food)=> food.type.toLowerCase()== type)
    setfilteredData(filteredfoodtype)
    setselectBtn(type)
  }

  if(error){
    return <div>{error}</div>
  }
  if(loading) {
    return <div>
      {loading}
    </div>
  }



  return (
    <>
      <Container>
      <TopContainer>
        <div className='logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='search'>
          <input onChange={searchFood} type="text" placeholder='search food...' />
        </div>
      </TopContainer>   
      <FillterContainer>
       { button.map((value,i)=>{
          return (
          <Button
          onClick={()=> filteredFood(value.toLowerCase())}
          key={i}>
            {value}
          </Button>
        )
        })}
      </FillterContainer>
    </Container>
      <SearchResult data={filteredData}/>
    </>
)};

export default App;

export const Container =styled.div`
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

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  color: white;
  border: none;
  place-items: center;
  padding: 6px 12px;

  &:hover{
    cursor: pointer;
    background-color: #ff0000;
  }
`
