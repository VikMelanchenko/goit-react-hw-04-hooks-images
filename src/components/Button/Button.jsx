import '../css/styles.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <div className="load__button">
      <button className="Button" type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
