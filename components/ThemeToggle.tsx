import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import Icons from '../constants/icons';
import { Colors } from '../constants';

export const ThemeToggle = () => {
  const { isDark, setIsDark } = useContext(GlobalContext);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      { isDark ? <Icons.dark fill={Colors.tx.dark} /> : <Icons.light fill={Colors.tx.light} /> }
    </button>
  )
}
