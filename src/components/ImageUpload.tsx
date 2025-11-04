import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  preview: string | null;
}

const ImageUpload = ({ onImageSelect, onAnalyze, isAnalyzing, preview }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageSelect(file, preview);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onImageSelect(null as any, null as any);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-card rounded-3xl shadow-[var(--shadow-soft)] p-8 transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Upload Bird Image
        </h2>
        
        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
              ${isDragging 
                ? "border-primary bg-primary/5 scale-[1.02]" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
              }
            `}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-2 font-medium">Drag and drop your bird image here</p>
            <p className="text-sm text-muted-foreground mb-6">or</p>
            <label htmlFor="file-upload">
              <Button variant="default" className="cursor-pointer" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6 animate-scale-in">
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-2xl shadow-md"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={handleClear}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full text-lg py-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Analyzing...
                </span>
              ) : (
                "Identify Bird Species"
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageUpload;
