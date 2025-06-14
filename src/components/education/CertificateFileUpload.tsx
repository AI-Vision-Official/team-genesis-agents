
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Image } from 'lucide-react';

interface CertificateFileUploadProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export const CertificateFileUpload = ({ uploadedFile, onFileChange }: CertificateFileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <Label className="dark:text-slate-200">Certificate File (PDF or Image)</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            {uploadedFile.type.includes('pdf') ? (
              <FileText className="w-8 h-8 text-red-600" />
            ) : (
              <Image className="w-8 h-8 text-blue-600" />
            )}
            <div className="text-center sm:text-left">
              <p className="font-medium dark:text-slate-200">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground dark:text-slate-400">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onFileChange(null)}
              className="mt-2 sm:mt-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-base sm:text-lg font-medium dark:text-slate-200">Upload Certificate File</p>
            <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button type="button" variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
