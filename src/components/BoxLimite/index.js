import React from 'react';

export default function BoxLimite({favoritos, index}){
  console.log(favoritos.id)
  return(
    <li key={favoritos.login}>
      <a href={`https://github.com/${favoritos.login}`} >
        <img src={favoritos.avatar_url}/>
        <span>{favoritos.login}</span>
      </a>
    </li>
  )
}