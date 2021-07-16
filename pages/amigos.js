import React from 'react'
import styled from 'styled-components'


const BoxContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1{
      color: #ffffff;
      font-size: 30px;
  }

  .container{
    width: 500px;
    height: 500px;
    padding: 5px;
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
    color: #FFF;
    margin-left: 20px;
    text-align: center;
  }

  img {
    
    width: 120px;
    height: 120px;
    border-radius: 8px;
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
     
      <BoxContainer>
      <h1 > Seguidores ({(seguidores.length)})</h1>
        <div className="container">
        {
            seguidores.map((seguidores) =>{
              return(
                <div key={seguidores.id} className="boxContainer">
                  <ul>
                    <li>
                      <img src={seguidores.avatar_url}/>
                      <strong>{seguidores.login}</strong>
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
