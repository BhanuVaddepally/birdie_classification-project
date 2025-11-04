import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import ImageUpload from "@/components/ImageUpload";
import ResultsDisplay, { BirdPrediction } from "@/components/ResultsDisplay";
import DetailsModal from "@/components/DetailsModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<BirdPrediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<BirdPrediction | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setPredictions([]);
  };

  const handleAnalyze = async () => {
    if (!preview) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("classify-bird", {
        body: { image: preview },
      });

      if (error) {
        throw error;
      }

      if (data?.predictions && Array.isArray(data.predictions)) {
        setPredictions(data.predictions);
        toast({
          title: "Analysis Complete",
          description: `Identified as ${data.predictions[0].commonName}`,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewDetails = (prediction: BirdPrediction) => {
    setSelectedPrediction(prediction);
  };

  const handleCloseDetails = () => {
    setSelectedPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Hero />
      <ImageUpload
        onImageSelect={handleImageSelect}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        preview={preview}
      />
      <ResultsDisplay
        predictions={predictions}
        onViewDetails={handleViewDetails}
      />
      <DetailsModal
        prediction={selectedPrediction}
        onClose={handleCloseDetails}
      />
      <Footer />
    </div>
  );
};

export default Index;
