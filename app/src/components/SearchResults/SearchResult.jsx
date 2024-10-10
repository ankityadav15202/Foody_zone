import React,{useState, useEffect} from "react";
import styled from "styled-components";


export const SearchResult = ({data:foods}) => {



  return (
    <Container>
        <FoodCardContainer>
        <FoodCards>
            {
            foods.map((food, i) => {
                return (
                <FoodCard key={i}>
                    {food.text}
                </FoodCard>
                )
            })
            }</FoodCards>
        </FoodCardContainer>
    </Container>
  );
};

const Container = styled.div`
    
`

const FoodCardContainer = styled.section`
  height: calc(100vh - 210px);
  background-image: url('/bg.png');
  background-size: cover;
`

const FoodCards = styled.div``


const FoodCard = styled.div``