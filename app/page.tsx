'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Home.css';

export default function Home() {
  const [formData, setFormData] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();
      console.log(data);
      // Handle the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="home_a">
      <div className="home_b">
        <h1 className="text_a">ทดสอบระบบ reCAPTCHA </h1>
        <form onSubmit={handleSubmit} className="form_a">
          {/* Your form fields here */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setRecaptchaToken}
          />
          <div className="home_c">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
