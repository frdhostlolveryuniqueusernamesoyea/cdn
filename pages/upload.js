import formidable from 'formidable';
import fs from 'fs';
import { supabase } from '../../utils/supabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) return res.status(500).json({ error: 'Upload failed' });

    const file = files.file[0];
    const data = fs.readFileSync(file.filepath);

    const fileExt = file.originalFilename.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data: uploadData, error } = await supabase.storage
      .from('cdn')
      .upload(fileName, data, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) return res.status(500).json({ error: error.message });

    const { data: publicUrl } = supabase.storage.from('cdn').getPublicUrl(fileName);
    return res.status(200).json({ url: publicUrl.publicUrl });
  });
}
