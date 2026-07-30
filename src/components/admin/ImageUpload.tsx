'use client';

import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  images: string[];
  onUpload: (files: File[]) => Promise<void>;
  onRemove: (index: number) => Promise<void>;
  multiple?: boolean;
  maxFiles?: number;
  label?: string;
  uploading?: boolean;
}

export default function ImageUpload({
  images,
  onUpload,
  onRemove,
  multiple = true,
  maxFiles = 10,
  label = 'Upload Images',
  uploading = false,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const remaining = maxFiles - images.length;
      if (fileArray.length > remaining) {
        alert(`You can only upload ${remaining} more image(s).`);
        return;
      }
      await onUpload(fileArray);
    }
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const remaining = maxFiles - images.length;
      if (fileArray.length > remaining) {
        alert(`You can only upload ${remaining} more image(s).`);
        return;
      }
      await onUpload(fileArray);
    }
  };

  const handleRemove = async (index: number) => {
    await onRemove(index);
  };

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? 'border-primary bg-muted/50' : 'border-muted-foreground/25'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading || images.length >= maxFiles}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Upload className="h-8 w-8" />
          <p className="text-sm font-light">
            {dragActive ? 'Drop images here' : `${label} (${images.length}/${maxFiles})`}
          </p>
          <p className="text-xs font-light text-muted-foreground/60">
            Drag & drop or click to browse
          </p>
          {uploading && <p className="text-sm text-foreground">Uploading...</p>}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded border border-muted"
              />
              <Button
                onClick={() => handleRemove(index)}
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={uploading}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}