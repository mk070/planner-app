import React, { useState } from 'react';

const PhotoWidget = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPhoto(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {photo && (
        <div style={{ width: '200px', height: '200px' }}>
          <img
            src={photo}
            alt="Uploaded Photo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoWidget;
