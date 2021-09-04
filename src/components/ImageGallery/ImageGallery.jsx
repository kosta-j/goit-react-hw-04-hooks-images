// import axios from 'axios';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/apiServise';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  // static API_KEY = '22389180-c3e3825fb04f5ed43216d445d';
  // static URL = 'https://pixabay.com/api/?q=';

  state = {
    hits: [],
    page: 1,
    loader: false,
    modal: false,
    modalHit: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.resetState();
      this.loadImages();
    }

    if (prevState.page !== this.state.page && this.state.page > 1) {
      await this.loadMoreImages();
      this.autoScroll();
    }
  }

  loadImages = async () => {
    try {
      const { query } = this.props;
      const { page } = this.state;

      this.setState({ loader: true });
      const response = await apiService(query, page);

      this.setState({
        hits: response.data.hits,
      });

      if (response.data.hits.length === 0) {
        return toast.warn('Oops, such item has not found');
      }
    } catch (error) {
      console.log(error);
      return toast.error('Error while loading data. Try again later');
    } finally {
      this.setState({ loader: false });
    }
  };

  loadMoreImages = async () => {
    try {
      const { query } = this.props;
      const { page } = this.state;

      this.setState({ loader: true });

      const response = await apiService(query, page);

      this.setState(prevState => ({
        hits: [...prevState.hits, ...response.data.hits],
      }));

      if (response.data.hits.length === 0) {
        return toast.warn('Oops, such item has not found');
      }
    } catch (error) {
      console.log(error);
      return toast.error('Error while loading data. Try again later');
    } finally {
      this.setState({ loader: false });
    }
  };

  autoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetState = () => {
    this.setState({
      hits: [],
      page: 1,
    });
  };

  showModal = data => {
    this.setState({
      modal: true,
      modalHit: data,
    });
  };

  hideModal = () => {
    this.setState({
      modal: false,
      modalHit: {},
    });
  };

  render() {
    const { hits, loader, modal, modalHit } = this.state;

    return (
      <main>
        {loader && <Loader />}
        {modal && (
          <Modal onClose={this.hideModal}>
            <img src={modalHit.largeImageURL} alt={modalHit.tags} />
          </Modal>
        )}
        <ul className={s.ImageGallery}>
          {hits.map(hit => (
            <ImageGalleryItem
              key={hit.id}
              hit={hit}
              className={s.ImageGalleryItem}
              showModal={this.showModal}
            />
          ))}
        </ul>
        {hits.length >= 12 && <Button onClick={this.incrementPage} />}
      </main>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;
