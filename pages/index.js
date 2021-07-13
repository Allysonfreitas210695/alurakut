import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({githubUser}) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{borderRadius:'8px'}}/>
      <hr/>

      <p>
        <a href={`https://github.com/${githubUser}`} className="boxLink">
          @{githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  );
}

export default function Home() {
  const githubUser = "Allysonfreitas210695";
  const [comunidades, setComunidades] = useState([{
    id: '11919191911991',
    title: 'Eu odeio acordar cedo!',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
    {/*header*/}
    <AlurakutMenu githubUser={githubUser}/>

    <MainGrid>
      {/*area 1 */}
      <div style={{gridArea:'profileArea'}} className="profileArea"> 
        <ProfileSidebar githubUser={githubUser}/>
      </div>

      {/*area 2 */}
      <div style={{gridArea:'WelcomeArea'}} className="WelcomeArea">
        <Box >
        <h1 className="title">Bem-vindos(a)</h1> 
        <OrkutNostalgicIconSet/>
        </Box>
         
        <Box>
          <h2 className="subTitle">O que voçê deseja fazer?</h2>
          <form onSubmit={function handlecriarComunidade(event){
            event.preventDefault();

            const dataForm = new FormData(event.target);
            const comunidade = {
              id: new Date().toISOString(),
              titulo: dataForm.get('title'),
              image: dataForm.get('image'),
            }

            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas);
          }}>
            <div>
              <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label="Qual vai ser o nome da sua comunidade?" 
              type="text"
              />
            </div>

            <div>
              <input 
              placeholder="Coloque uma URL para colocamos de capa" 
              name="image" 
              aria-label="Coloque uma URL para colocamos de capa" 
              />
            </div>

            <button>
              Criar Comunidade
            </button>
          </form>
        </Box>
      </div>

      {/*area 3*/}
      <div style={{gridArea:'profileRelationsArea'}} className="profileRelationsArea">
        <ProfileRelationsBoxWrapper >
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
        <ul>
          {comunidades.map((favoritos) => {
            return(
              <li key={favoritos.id}>
                <a href={`/users/${favoritos.title}`} >
                <img src={favoritos.image}/>
                <span>{favoritos.title}</span>
                </a>
              </li>

            )
          })}   
        </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
        <ul>
        {pessoasFavoritas.map((favoritos) => {
          return(
            <li key={favoritos}>
              <a href={`/users/${favoritos}`} >
              <img src={`https://github.com/${favoritos}.png`} alt="imagem do usuario github"/>
              <span>{favoritos}</span>
              </a>
            </li>
          )
        })}   
        </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>

    </>
  );
}
