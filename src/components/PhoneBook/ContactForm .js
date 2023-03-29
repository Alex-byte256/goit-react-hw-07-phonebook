
import css from './ContactForm.module.css'
import { useState } from 'react';
import { addContact, fetchContacts } from '../../redux/api';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

function ContactForm (){
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.contacts.items)
  const [name,setName] = useState("");
  const [number,setNumber] = useState("");


  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value)
        break
      case "number":
        setNumber(e.target.value)
        break
      default:
        return
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const index = contacts.find(item => item.name.toLowerCase() === event.target.name.value.toLowerCase());
    if (index) {
      alert("Контакт з таким іменем уже присутній")
      return;
    }
    setName("");
    setNumber("")
    dispatch(addContact(
      { name:event.target.name.value,phone:event.target.number.value, id: nanoid(10)}
    )).then(()=>dispatch(fetchContacts()))

  }


        return(
          <>
            <form className={css.form} onSubmit={handleSubmit}  >
              <input
                value={name}
                onChange={handleOnChange}
                type="text"
                name="name"
                placeholder="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
              <input
                value={number }
                onChange={handleOnChange}
                type="tel"
                name="number"
                placeholder="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
             <button type={'submit'}>Добавити контакт</button>
            </form>
          </>
        )

}



export default ContactForm;
