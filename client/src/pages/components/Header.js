import { useEffect, useState } from 'react'
import { GetUserInfos } from '../../utils/UserInfos'
import '../../css/Header.css'
import burgerMenuIcon from '../../images/burgerMenuIcon.png'
import { logout } from '../../utils/AuthUtils'
import notify from '../../utils/Notification'
import LanguageSwitcher from './LanguageSwitcher'
import { t } from 'i18next'

const Header = ({toggleLoginModal, toggleSignupModal, toggleProfileModal}) => {
    const [isLogged, setIsLogged] = useState()
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
      setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsLogged(GetUserInfos().isLogged);

        const updateLoginState = () => {
            setIsLogged(GetUserInfos().isLogged);
        };

        window.addEventListener('userStatusChange', updateLoginState);
    }, [])

    const tryLogout = async (e) => {
      e.preventDefault()
  
      const logoutError = await logout(e)
  
      if(logoutError) {
        notify("error", logoutError)
        return
      }
    }

  return (
    <div className='header-container top right'>
      <button type="button" className='toggle-button btn btn-light' onClick={togglePanel}>
        <img src={burgerMenuIcon} alt='burgerMenuIcon.png'/>
      </button>
      <div className={`header-elements_container ${isOpen ? "show" : ""}`}>
          {isLogged ? (
              <>
                  <button type='button' className='btn btn-dark' onClick={toggleProfileModal}>{t('Profile')}</button>
                  <button type='button' className='btn btn-dark' onClick={tryLogout}>{t('Logout')}</button>
              </>
          ) : (
              <>
                  <button type='button' className='btn btn-dark' onClick={toggleLoginModal}>{t('Login')}</button>
                  <button type='button' className='btn btn-dark' onClick={toggleSignupModal}>{t('Signup')}</button>
              </>
          )}
          <LanguageSwitcher />
      </div>
    </div>
  )
}

export default Header