import LoaderInstance from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.wrapper}>
      <LoaderInstance />;
    </div>
  );
}

export default Loader;
