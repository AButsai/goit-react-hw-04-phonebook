import { useState } from 'react';
import { useLocalStoreg } from 'hooks/useLocalStorage';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import s from './App.module.css';

export function App() {
  const LOCALSTOREGE_KEY = 'contacts-key';

  const [contact, setContact] = useLocalStoreg(LOCALSTOREGE_KEY, []);
  const [filter, setFilter] = useState('');

  const onSubmit = data => {
    const contacts = [...contact];

    for (const { name } of contacts) {
      if (name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${name} is already in contacts.`);
        return;
      }
    }

    setContact([...contacts, data]);
  };

  const onFilterName = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const onFilterContacts = () => {
    return [...contact].filter(
      ({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  };

  const onDeleteContact = contactId => {
    setContact([...contact].filter(({ id }) => id !== contactId));
    setFilter('');
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>

      <ContactForm addContacts={onSubmit} />

      <h2 className={s.contactsTitle}>Contacts</h2>

      <Filter value={filter} onFilterName={onFilterName} />

      <ContactList
        filterContact={onFilterContacts()}
        deleteContact={onDeleteContact}
      />
    </div>
  );
}
