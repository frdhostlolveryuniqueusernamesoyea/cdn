import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) setUrl(data.url);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload to Supabase CDN</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {url && (
        <p>
          Soubor nahrán: <a href={url} target="_blank">{url}</a>
        </p>
      )}
    </div>
  );
}
