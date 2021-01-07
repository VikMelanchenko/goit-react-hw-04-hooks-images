import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
