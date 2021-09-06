import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/apiServise';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ query }) {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalHit, setModalHit] = useState({});

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prev = usePrevious({ query, page });

  useEffect(() => {
    if (!query || prev === undefined) {
      return;
    }

    if (prev.page !== page && page > 1) {
      loadImages();
    }

    if (prev.query !== query) {
      resetState();
      loadImages();
    }

    async function loadImages() {
      try {
        setLoader(true);

        const response = await apiService(query, page);

        if (prev.page !== page && page > 1) {
          setHits(prevHits => [...prevHits, ...response.data.hits]);
          autoScroll();
        } else {
          setHits(response.data.hits);
        }

        if (response.data.hits.length === 0) {
          return toast.warn('Oops, such item has not found');
        }
      } catch (error) {
        console.log(error);
        return toast.error('Error while loading data. Try again later');
      } finally {
        setLoader(false);
      }
    }
  }, [page, prev, query]);

  function autoScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  function incrementPage() {
    setPage(prevPage => prevPage + 1);
  }

  function resetState() {
    setHits([]);
    setPage(1);
  }

  function showModal(data) {
    setModal(true);
    setModalHit(data);
  }

  function hideModal() {
    setModal(false);
    setModalHit({});
  }

  return (
    <main>
      {loader && <Loader />}
      {modal && (
        <Modal onClose={hideModal}>
          <img src={modalHit.largeImageURL} alt={modalHit.tags} />
        </Modal>
      )}
      <ul className={s.ImageGallery}>
        {hits.map(hit => (
          <ImageGalleryItem
            key={hit.id}
            hit={hit}
            className={s.ImageGalleryItem}
            showModal={showModal}
          />
        ))}
      </ul>
      {hits.length >= 12 && <Button onClick={incrementPage} />}
    </main>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;
