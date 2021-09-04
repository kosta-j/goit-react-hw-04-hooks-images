import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

function ImageGalleryItem(props) {
  const { webformatURL, tags } = props.hit;
  const { showModal } = props;

  return (
    <li className={s.item}>
      <img
        width="600"
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => showModal(props.hit)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.object,
  showModal: PropTypes.func,
};

export default ImageGalleryItem;
