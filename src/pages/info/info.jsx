import { useNavigate } from 'react-router';
import './info.css';
import { ArrowLeft } from 'lucide-react';
import logo from '../../assets/logo.png'

function Info(){
    let navigate = useNavigate()
    return(
        <main id='main'>

            <button id='backButton' onClick={() => navigate('/map')}><ArrowLeft /></button>

            <div id="infoHeader">
                <h1>Informações</h1>
                <p>
                    Este projeto foi idealizado e desenvolvido por um grupo de alunos do CEPMG Pedro Ludovico Teixeira engajados do Estudantes de Atitude, em parceria com o Senai, com o propósito de criar soluções inovadoras que contribuam diretamente para a melhoria da qualidade de vida, do bem-estar e da participação ativa de todos os cidadãos da cidade.<br/><br/>

    Nosso objetivo vai muito além da tecnologia: buscamos promover um espaço de escuta, colaboração e transformação social, em que cada pessoa possa se sentir parte da construção de uma comunidade mais justa, organizada e consciente.<br /><br />

    O projeto nasceu do desejo de aproximar a população dos processos de melhoria urbana, oferecendo uma plataforma prática, acessível e transparente, onde os cidadãos podem registrar suas necessidades, acompanhar soluções e participar ativamente na construção de uma cidade melhor para todos.
                </p>
            </div>

            <footer id="infoFooter">
                <img src={logo} width={200} alt="Logo" />
            </footer>

        </main>
    );
}


export default Info;