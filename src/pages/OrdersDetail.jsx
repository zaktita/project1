import React, { useState } from 'react'
import ImageUploader from '../Component/ImageUploader';

function OrdersDetail() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <div>
      <ImageUploader
              uploadLimit="1"
              id="image"
              onChange={handleImageUpload}
            />
    </div>
  )
}

export default OrdersDetail
