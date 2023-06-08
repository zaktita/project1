import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';


const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        // Check if the loaded image has a valid width and height
        if (image.width && image.height) {
          // Check if the file type is supported
          if (supportedFileTypes.includes(file.type)) {
            resolve(); // Proceed with upload
          } else {
            reject('Invalid file type. Please select a JPEG, PNG, JPG, GIF, or WebP file.');
          }
        } else {
          reject('The selected file is not a valid image.');
        }
      };

      image.onerror = () => {
        reject('Error loading the image file.');
      };
    };

    reader.onerror = () => {
      reject('Error reading the file.');
    };
  });
};


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const supportedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

const ImageUploader = ({ uploadLimit }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    // Filter out unsupported file types
    const filteredFileList = newFileList.filter((file) => supportedFileTypes.includes(file.type));

    // Update the file list
    setFileList(filteredFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
     <Upload
  action="http://127.0.0.1:8000/api/category"
  listType="picture-card"
  fileList={fileList}
  onPreview={handlePreview}
  onChange={handleFileChange}
  accept=".jpeg,.png,.jpg,.gif,.webp"
  beforeUpload={beforeUpload}
>
  {fileList.length >= uploadLimit ? null : uploadButton}
</Upload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUploader;
