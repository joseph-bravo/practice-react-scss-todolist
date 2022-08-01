import { useEffect, useState } from 'react';
export function PreviewImage(props: {
  imageurl: string;
  setIsImageUrlValid: Function;
}) {
  const [error, setError] = useState(true);
  useEffect(() => console.log(error), [error]);
  return (
    <div className="image-preview">
      <h3>Image Preview</h3>
      <p className={`${error ? '' : 'hidden'}`}>Error loading image...</p>
      <img
        className={`${!error ? '' : 'hidden'}`}
        onLoad={e => {
          setError(false);
          props.setIsImageUrlValid(true);
        }}
        onError={e => {
          console.log('hi');
          props.setIsImageUrlValid(false);
          setError(true);
        }}
        src={props.imageurl}
        alt="Preview Image"
      />
    </div>
  );
}
