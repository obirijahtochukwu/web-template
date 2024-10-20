Here are examples of how to use axios in your React app to interact with the Django backend for creating, updating, deleting, and fetching email templates.
1. Create an Email Template

To create a new email template, you would make a POST request to the templates/ endpoint:

javascript

import axios from 'axios';

const createTemplate = async () => {
  try {
    const response = await axios.post('/api/templates/', {
      name: 'New Email Template',
      subject: 'Welcome Email',
      content: '<html><body>Welcome to our platform!</body></html>',
    });
    console.log('Template Created:', response.data);
  } catch (error) {
    console.error('Error creating template:', error);
  }
};

createTemplate();

2. Update an Email Template

To update an existing template, make a PUT request to the templates/<id>/ endpoint where <id> is the template's ID:

javascript

const updateTemplate = async (templateId) => {
  try {
    const response = await axios.put(`/api/templates/${templateId}/`, {
      name: 'Updated Email Template',
      subject: 'Updated Subject',
      content: '<html><body>Updated email content.</body></html>',
    });
    console.log('Template Updated:', response.data);
  } catch (error) {
    console.error('Error updating template:', error);
  }
};

// Pass the template ID you want to update
updateTemplate(1);  // Replace 1 with the actual ID of the template

3. Delete an Email Template

To delete a template, make a DELETE request to the templates/<id>/ endpoint:

javascript

const deleteTemplate = async (templateId) => {
  try {
    await axios.delete(`/api/templates/${templateId}/`);
    console.log(`Template with ID ${templateId} deleted.`);
  } catch (error) {
    console.error('Error deleting template:', error);
  }
};

// Pass the template ID you want to delete
deleteTemplate(1);  // Replace 1 with the actual ID of the template

4. Fetch All Email Templates

To fetch all templates, you can make a GET request to the templates/ endpoint:

javascript

const fetchTemplates = async () => {
  try {
    const response = await axios.get('/api/templates/');
    console.log('Fetched Templates:', response.data);
  } catch (error) {
    console.error('Error fetching templates:', error);
  }
};

fetchTemplates();

5. Fetch a Single Email Template

To fetch a specific template by ID, make a GET request to templates/<id>/:

javascript

const fetchTemplateById = async (templateId) => {
  try {
    const response = await axios.get(`/api/templates/${templateId}/`);
    console.log('Fetched Template:', response.data);
  } catch (error) {
    console.error('Error fetching template:', error);
  }
};

// Pass the template ID you want to fetch
fetchTemplateById(1);  // Replace 1 with the actual ID of the template