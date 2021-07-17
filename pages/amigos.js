import React from 'react'
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container{
    width: 560px;
    height: 600px;
    background: #FFF;
    padding: 3px;
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
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  a strong{
    font-size: 12px;
    color: #000;
  }

  }
`

export default function amigos() {
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(()=>{
      //GET
      fetch("https://api.github.com/users/Allysonfreitas210695/followers")
      .then((Response) =>{
        return Response.json();
      }).then((result) =>{
        setSeguidores(result)
      })

  }, [])
   
  return (
    <>
    
      <H1> Seguidores da AluraKut ({(seguidores.length)})</H1>
      <BoxContainer>
        <div className="container">
        {
            seguidores.map((seguidores) =>{
              return(
                <div key={seguidores.id} className="boxContainer">
                  <ul>
                    <li>
                      <a href={seguidores.html_url}>
                         <img src={seguidores.avatar_url}/>
                         <strong>{seguidores.login}</strong>
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
