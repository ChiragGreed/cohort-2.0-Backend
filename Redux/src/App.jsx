import { useDispatch, useSelector } from 'react-redux'
import { Decrement, Increment, IncrementBy5 } from './Redux/slices/counterSlice';
import { changeThemeToDark, changeThemeToLight } from './Redux/slices/themeSlice';

const App = () => {

  const count = useSelector((state) => { return state.counter.value });
  const theme = useSelector((state) => { return state.theme.value });

  const dispatch = useDispatch();

  return (
    <div className={`App ${(theme == 'light' ? "lightTheme" : "darkTheme")}`}>
      <h1>{count}</h1>

      <div className='counter_buttons'>
        <button onClick={() => { dispatch(Increment()) }} className="add_button">Add +</button>
        <button onClick={() => { dispatch(IncrementBy5()) }} className="subtract_button">Add + 5</button>
        <button onClick={() => { dispatch(Decrement()) }} className="subtract_button">Sub -</button>
      </div>

      <div className='changeTheme_button'>
        <button onClick={() => { theme == 'dark' ? dispatch(changeThemeToLight()) : dispatch(changeThemeToDark()) }} className={theme == 'dark' ? "darkTheme_button" : "lightTheme_button"}>Change theme</button>
      </div>
    </div>
  )
}

export default App
