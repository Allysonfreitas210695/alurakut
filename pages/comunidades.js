import React,{ useState, useEffect } from 'react'
import styled from 'styled-components'


const H1 = styled.h1`
  font-size: 25px;
  padding: 10px;
  font-weight: 500;
  background-color: #308BC5;
  color: #000;
  text-align: center;
`

const BoxContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container{
    width: 550px;
    height: 500px;
    background: #FFF;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-wrap: wrap;
    
    ul {
      flex-grow: 1;
      list-style: none;
      align-items: center;
    }

  li{
    font-size: 12px;
    font-weight: 500;
    font-family: sans-serif;
    color: #000;
    margin-left: 20px;
    text-align: center;
  }

  a {
    text-decoration: none;
    text-align: center;
  }

  img {
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  a strong{
    font-size: 10px;
    color: #000;
  }


  }
`


export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);

  useEffect(()=>{
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '098d45683ceef5de46bd6c8343eb6c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then(response => response.json()) 
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  },[]);

  return (
    <>
      
      <H1> Comunidades da AluraKut ({(comunidades.length)})</H1>
      <BoxContainer>
        <div className="container">
        {
            comunidades.map((comunidades) =>{
              return(
                <div key={comunidades.id} className="boxContainer">
                  <ul>
                    <li>
                      <a href="/">
                         <img src={comunidades.imageUrl}/>
                         <strong>{comunidades.title}</strong>
                      </a>
                     
                    </li>
                  </ul>
                </div>
              )
            })
          }
        </div>
      </BoxContainer>
    </>
  )
}
