import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

const ContactListItem = ({ contacts: { id, name, number }, deleteContact }) => {
  return (
    <li className={s.item}>
      <span className={s.span}>
        {name}: {number}
      </span>
      <button
        className={s.btn}
        onClick={() => {
          deleteContact(id);
        }}
        onMouseDown={e => {
          e.target.style.backgroundColor = '#0000ff';
          e.target.style.color = '#ffffff';
        }}
        onMouseUp={e => {
          e.target.style.backgroundColor = 'transparent';
        }}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),

  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
