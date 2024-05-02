import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Multiselect from 'multiselect-react-dropdown';
import '../pages/CSS/Upload.css';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [abstract, setAbstract] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    // Fetch departments
    axios.get('http://localhost:9001/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });

    // Fetch categories
    axios.get('http://localhost:9001/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch authors
    axios.get('http://localhost:9001/api/users')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('user_id', selectedAuthors.map(author => author.user_id)); // Extract author IDs from selectedAuthors
      formData.append('publish_date', publishDate);
      formData.append('abstract', abstract);
      formData.append('department_id', departmentId);
      formData.append('category_id', categoryId);
      formData.append('file', file);

      const response = await axios.post('http://localhost:9001/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'Success') {
        Swal.fire({
          title: 'Success!',
          text: 'Submitted',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        setTitle('');
        setPublishDate('');
        setAbstract('');
        setDepartmentId('');
        setCategoryId('');
        setFile(null);
        setSelectedAuthors([]); // Clear selected authors after successful submission
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Upload failed: ' + response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error creating research:', error);
    }
  };

  return (
    <section id="upload" className="block categories-block">
      <Container fluid className="upload-container">
        <div className="title-bar">
          <h1 className="title1">Upload</h1>
        </div>
      </Container>

      <Container className="up-container">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="exampleForm.ControlInput"
            label="Research Title"
            className="mb-2"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Title of the Research Paper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDate"
            label="Published Date"
            className="mb-2"
          >
            <Form.Control
              type="date"
              name="publishDate"
              placeholder="yyyy-mm-dd"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Abstract of the Paper"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              rows={3}
              name="abstract"
              placeholder="A brief overview of the research paper."
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDepartment"
            label="Department"
            className="mb-2"
          >
            <Form.Select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department.department_id} value={department.department_id}>{department.department_name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingCategory"
            label="Category"
            className="mb-2"
          >
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="authors" label="Authors" className="mb-2">
            <Multiselect
              options={authors}
              onSelect={(selectedList, selectedItem) => setSelectedAuthors(selectedList)}
              onRemove={(selectedList, removedItem) => setSelectedAuthors(selectedList)}
              displayValue="firstName"
              selectedValues={selectedAuthors}
            />
          </FloatingLabel>

          <FloatingLabel controlId="file" label="Please select a PDF file." className="mb-2">
            <Form.Control type="file" name="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} required />
          </FloatingLabel>

          <Button type="submit" className="btn btn-primary">Upload</Button>
        </Form>
      </Container>
    </section>
  );
};

export default Upload;
