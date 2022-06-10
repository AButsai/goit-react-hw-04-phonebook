import { useState } from 'react';
import { useLocalStoreg } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { LOCALSTOREGE_KEY } from 'helpers/variablesHelper';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import s from './App.module.css';

export function App() {
  const [contact, setContact] = useLocalStoreg(LOCALSTOREGE_KEY, []);
  const [filter, setFilter] = useState('');

  const onSubmit = data => {
    for (const { name } of contact) {
      if (name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${name} is already in contacts.`);
        return;
      }
    }

    const contactId = nanoid();
    data.id = contactId;

    setContact([...contact, data]);
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
