import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testRegister() {
  try {
    // Create a dummy image
    const dummyImagePath = path.join(__dirname, 'dummy.jpg');
    fs.writeFileSync(dummyImagePath, 'dummy content');

    const form = new FormData();
    form.append('name', 'Test User');
    form.append('email', 'testuser123@example.com');
    form.append('phone', '1234567890');
    form.append('password', 'password123');
    form.append('role', 'user');
    form.append('education', 'B.Tech');
    form.append('photo', fs.createReadStream(dummyImagePath));

    const response = await axios.post('http://localhost:4000/api/users/register', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testRegister();
