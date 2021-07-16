import React, { useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import { pessoasFavoritas } from '../src/components/FakeDate'
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

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
      <ul>
        {props.items.map((favoritos, index) => {
          
          return(
            (index <= 5 ? (
              <li key={favoritos.id}>
              <a href={`https://github.com/${favoritos.login}`} >
                <img src={favoritos.avatar_url}/>
                <span>{favoritos.login}</span>
              </a>
            </li>
            ) 
            : 
            ''
            )
          )
        })}   
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = useState([]);

   const [seguidores, setSeguidores] = useState([]);
  //0- pegar o array de dados do github
      React.useEffect(() => {
          //GET
          fetch("https://api.github.com/users/Allysonfreitas210695/followers")
          .then((Response) =>{
            return Response.json();
          }).then((result) =>{
            setSeguidores(result)
          })

          //API GraphQL
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
  //1- criar um box que vai ter um map, baseado nos items do array
  //que pegamos no gitHub



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
          <form onSubmit={function handlecriarComunidade(e){
            e.preventDefault();
            
            const dadosDoForm = new FormData(e.target);
                
          
            const comunidadeForm = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
            }
           
            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidadeForm),
            })
            .then(async function(response){
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })
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
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>

        <ProfileRelationsBoxWrapper >
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
        <ul>
          {comunidades.map((favoritos, index) => {
            return(
              (index <= 5 ? (
                <li key={favoritos.id}>
                <a href={`/communities/${favoritos.id}`} >
                <img src={favoritos.imageUrl}/>
                <span>{favoritos.title}</span>
                </a>
              </li>
              ) 
              : 
              ''
              )
            )
          })}   
        </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
        <ul>
        {pessoasFavoritas.map((favoritos, index) => {
          return(
            (index <= 5 ? (
            <li key={favoritos}>
              <a href={`/users/${favoritos}`} >
              <img src={`https://github.com/${favoritos}.png`} alt="imagem do usuario github"/>
              <span>{favoritos}</span>
              </a>
            </li>
            )
            : 
            ''
            )
          )
        })}   
        </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>

    </>
  );
}


export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);
  
 
  // const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
  //   headers: {
  //     Authorization: token
  //   }
  // }).then((resposta) => resposta.json())

  // console.log("isAuthenticated: ",isAuthenticated);

  // if(!isAuthenticated){
  //   return{
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
