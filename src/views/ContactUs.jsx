import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState('');
    const [animateStatus, setAnimateStatus] = useState(false);  // for animation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message || !formData.phone) {
            setFormStatus('Please fill out all fields.');
            return;
        }

        // Trigger the success message and animation
        setFormStatus('Thank you for your message. We will get back to you soon!');
        setAnimateStatus(true);

        // Clear the form data
        setFormData({ name: '', email: '', contact: '', message: '' });
    };

    return (
        <>
            <section className="text-center mt-4">
                <h2>Contact Us</h2>
                <p>any kind of help related to cats or any emergencies</p>
            </section>

            <section className="contact-form-section mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"> Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"> Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label"> Contact no.</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your Contact Number"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label"> Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-control"
                            rows="5"
                            placeholder="Write your message here"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>

                {formStatus && (
                    <p className={`mt-3 ${animateStatus ? 'fade-in' : ''}`}>
                        {formStatus}
                    </p>
                )}
            </section>

            {/* Hardcoded email addresses section */}
            <section className="email-section mt-5">
                <h3>Email</h3>
                <p>you can also contact us via email:</p>
                <div className="email-addresses">
                    <p>Email : <strong>cat.emergency7@gmail.com</strong></p>
                </div>
            </section>




            <style>
                {`
          .contact-form-section {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .contact-form-section form {
            display: flex;
            flex-direction: column;
          }
          .contact-form-section .form-label {
            font-weight: bold;
          }
          .contact-form-section .form-control {
            margin-bottom: 15px;
          }
          .contact-form-section button {
            align-self: flex-start;
          }

          /* Animation for the success message */
          .fade-in {
            animation: fadeIn 2s ease-in-out;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
            .email-section {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
}

            .email-addresses {
            display: flex;
            color:blue;
            flex-direction: column;
            align-items: center;
}


        `}
            </style>
        </>
    );
}

export default ContactUs;
