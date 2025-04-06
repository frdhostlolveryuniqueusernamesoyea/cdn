import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    if (data.url) {
      setUrl(data.url);
    } else {
      alert('Chyba při nahrávání.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Nahrát soubor</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Nahrávám...' : 'Upload'}
        </button>
      </form>
      {url && (
        <p>
          ✅ Soubor nahrán: <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </p>
      )}
    </div>
  );
}
