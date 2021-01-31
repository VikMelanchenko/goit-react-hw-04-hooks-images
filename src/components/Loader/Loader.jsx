import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Loader from 'react-loader-spinner';

export default function Spinner() {
  //other logic
  return (
    <Loader
      className="spinner"
      type="ThreeDots"
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
}
