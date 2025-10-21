'use client';
import { useState } from 'react';



export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        figmaLink: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('figmaLink', formData.figmaLink);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await fetch('/api/addproject', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Project added successfully!');
                setFormData({ title: '', description: '', figmaLink: '', image: null });
                e.target.reset();
            } else {
                setMessage(`Error: ${result.message || 'Failed to add project'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Figma Link</label>
                    <input
                        type="url"
                        name="figmaLink"
                        value={formData.figmaLink}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Image Upload</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Adding Project...' : 'Add Project'}
                </button>
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}