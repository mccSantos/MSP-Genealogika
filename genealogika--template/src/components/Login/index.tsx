import styles from './styles.module.scss';
import logo from '../../assets/Genealogika_logo.png'

export function Login(){
    return(
    
    <div>

        <img src={logo} alt="Genealogika" />
        <div>
            <form>
                <input type="text" placeholder="username"></input>
                <input type="password" placeholder="password"></input>
            </form>
        </div>
    </div>
    
    );
}