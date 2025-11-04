import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BirdPrediction {
  commonName: string;
  scientificName: string;
  family: string;
  confidence: number;
  description: string;
}

interface ResultsDisplayProps {
  predictions: BirdPrediction[];
  onViewDetails: (prediction: BirdPrediction) => void;
}

const ResultsDisplay = ({ predictions, onViewDetails }: ResultsDisplayProps) => {
  if (!predictions || predictions.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Identification Results
      </h2>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl shadow-[var(--shadow-soft)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.01] animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {prediction.commonName}
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  {prediction.scientificName}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(prediction)}
                className="flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Details
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold">{Math.round(prediction.confidence)}%</span>
              </div>
              <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${prediction.confidence}%`,
                    animation: "progress 1s ease-out"
                  }}
                />
              </div>
            </div>
            
            {index === 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Family:</span> {prediction.family}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsDisplay;
