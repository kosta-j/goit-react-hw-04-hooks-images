import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import s from './Wrapper.module.css';

function Wrapper() {
  const [query, setQuery] = useState('');

  const updateQuery = text => {
    setQuery(text);
  };

  return (
    <div className={s.wrapper}>
      <Searchbar onSubmit={updateQuery} />
      <ImageGallery query={query} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Wrapper;
