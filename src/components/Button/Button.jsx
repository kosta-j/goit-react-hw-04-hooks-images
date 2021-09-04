import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <div className={s.wrapper}>
      <button type="button" className={s.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;
