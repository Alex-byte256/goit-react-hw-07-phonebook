
import css from './ContactList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/api';


function ContactList (){
  const dispatch = useDispatch()
  const filter = useSelector(state => state.contacts.filter)
  const contacts = useSelector(state => state.contacts.contacts.items)
  const deleteContactU = (contactId) => {
    dispatch(deleteContact(contactId))
  }

  const normalizedFilter = filter.toLowerCase();

  const visibleContacts = contacts.filter(el=>el.name.toLowerCase().includes(normalizedFilter))

    return(
      <ul className={css.list}>
        {visibleContacts.map(el => (
          <li className={css.item} key={el.id}>{el.name} - {el.phone}
          <button type='button' onClick={()=> deleteContactU(el.id)}>Delete</button></li>
        ))}
      </ul>
    )


}




export default ContactList;
