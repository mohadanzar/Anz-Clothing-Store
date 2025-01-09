// Frontend code (contact.js)
const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    console.log('Received form data:', req.body);
    // Here you would typically save to database or send email
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Frontend code (public/js/contact.js)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const modalClose = document.querySelector('.modal-close');
  const formInputs = contactForm.querySelectorAll('input, textarea');

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    subject: /^.{2,100}$/,
    message: /^.{10,1000}$/
  };

  // Error messages
  const errorMessages = {
    name: 'Please enter a valid name (2-50 characters, letters only)',
    email: 'Please enter a valid email address',
    subject: 'Subject must be between 2-100 characters',
    message: 'Message must be between 10-1000 characters'
  };

  function validateField(field) {
    const pattern = patterns[field.id];
    const errorElement = field.nextElementSibling;
    
    if (!pattern.test(field.value)) {
      field.classList.add('error');
      errorElement.textContent = errorMessages[field.id];
      errorElement.classList.add('show');
      return false;
    } else {
      field.classList.remove('error');
      errorElement.classList.remove('show');
      return true;
    }
  }

  function showSuccessMessage() {
    if (successModal) {
      successModal.style.display = 'block';
    } else {
      alert('Form submitted successfully!');
    }
  }

  // Form submission handler
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData);
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        showSuccessMessage();
        contactForm.reset();
        
        formInputs.forEach(input => {
          input.classList.remove('error');
          const errorElement = input.nextElementSibling;
          if (errorElement) {
            errorElement.classList.remove('show');
          }
        });
        
      } catch (error) {
        console.error('Error:', error);
        alert('There was a problem submitting the form. Please try again.');
      }
    }
  });

  // Add input event listeners for real-time validation
  Object.keys(patterns).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', () => validateField(field));
    }
  });

  // Modal close handler
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      successModal.style.display = 'none';
    });
  }
});