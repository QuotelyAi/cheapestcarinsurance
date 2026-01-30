'use client';

import { useState, useRef } from 'react';

interface LeadsUploadProps {
  onUploadSuccess: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function LeadsUpload({ onUploadSuccess }: LeadsUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    setError('');
    setSuccess('');
    setUploading(true);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Successfully uploaded: ${file.name}`);
        onUploadSuccess();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Lead Document</h2>

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        <div className="space-y-2">
          <div className="text-4xl text-gray-400">
            {uploading ? (
              <span className="inline-block animate-spin">&#8635;</span>
            ) : (
              <span>&#128196;</span>
            )}
          </div>
          <p className="text-gray-600">
            {uploading
              ? 'Uploading...'
              : 'Drag and drop a PDF here, or click to select'
            }
          </p>
          <p className="text-sm text-gray-400">
            Maximum file size: 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
          {success}
        </div>
      )}
    </div>
  );
}
