import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({githubUser}) {
  return(
    <Box >
      <img src={`https://github.com/${githubUser}.png`} style={{borderRadius:'8px'}}/>
    </Box>
  );
}

export default function Home() {
  const githubUser = "Allysonfreitas210695";
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
    {/*header*/}
    <AlurakutMenu githubUser={githubUser}/>

    <MainGrid>
      <div style={{gridArea:'profileArea'}} className="profileArea"> 
        <ProfileSidebar githubUser={githubUser}/>
      </div>
      
      <div style={{gridArea:'WelcomeArea'}} className="WelcomeArea">
        <Box className="title">
        <h1>Bem-vindos(a)</h1> 
        <OrkutNostalgicIconSet/>
        </Box>
      </div>
     
      <div style={{gridArea:'profileRelationsArea'}} className="profileRelationsArea">
        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
        <ul>
        {pessoasFavoritas.map((favoritos) => {
          return(
            <li>
              <a href={`/users/${favoritos}`} key={favoritos}>
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
