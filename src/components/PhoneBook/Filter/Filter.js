
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../../redux/reducers';



function Filter (){
  const dispatch = useDispatch()
  const filter = useSelector(state => state.contacts.filter)

  const changeFilter = (e) => {
    dispatch(updateFilter(e.target.value))
  }

    return(
      <label>Find Contacts by name
        <input name="filter" type='text' value={filter} onChange={changeFilter}/>
      </label>
    )
}



export default Filter;
