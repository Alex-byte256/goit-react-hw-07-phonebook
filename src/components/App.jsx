import ContactForm from './PhoneBook/ContactForm ';
import { nanoid } from 'nanoid'
import Filter from './PhoneBook/Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useSelector , useDispatch } from 'react-redux';
import {  updateFilter } from '../redux/reducers';
import {fetchContacts,deleteContact,addContact} from '../redux/api'
import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';



function  App (){
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items)
  const loading = useSelector(state => state.contacts.loading)
  const filter = useSelector(state => state.contacts.filter)

  useEffect(()=>{
    dispatch(fetchContacts())
    // eslint-disable-next-line
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const index = contacts.find(item => item.name === event.target.name.value);
    if (index) {
      alert("Контакт з таким іменем уже присутній")
      return;
    }
    dispatch(addContact(
      { name:event.target.name.value,phone:event.target.number.value, id: nanoid(10) }
    ))
  }

  const changeFilter = (e) => {
    dispatch(updateFilter(e.target.value))
  }

  const deleteContactU = (contactId) => {
    dispatch(deleteContact(contactId))
  }



    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(el=>el.name.toLowerCase().includes(normalizedFilter))

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit}  />
        <Filter value={filter} onChange={changeFilter}/>
        <h2>Contacts </h2>
        {!loading ? <ContactList visContacts={visibleContacts} onDeleteContacts={deleteContactU}/>: <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />}
      </div>
    );

};



export default App;
