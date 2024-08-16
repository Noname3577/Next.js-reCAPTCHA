
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recaptchaToken, ...formData } = req.body;

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    try {
      const recaptchaRes = await axios.post(verifyUrl);

      if (recaptchaRes.data.success) {
        // reCAPTCHA verified, proceed with API call
        const apiResponse = await axios.post('https://levelsitestyle.com/apiData.php', formData);
        res.status(200).json(apiResponse.data);
      } else {
        res.status(400).json({ error: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}