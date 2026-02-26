'use client';

import { useState } from 'react';

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/uploadimg', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert('上传失败');
      }
    } catch (error) {
      alert('上传出错');
    } finally {
      setUploading(false);
    }
  };
console.log(imageUrl);
  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p>上传中...</p>}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="商品图片" style={{ maxWidth: 200 }} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>
      )}
    </div>
  );
}