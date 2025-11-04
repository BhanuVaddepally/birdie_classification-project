import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { BirdPrediction } from "./ResultsDisplay";

interface DetailsModalProps {
  prediction: BirdPrediction | null;
  onClose: () => void;
}

const DetailsModal = ({ prediction, onClose }: DetailsModalProps) => {
  if (!prediction) return null;

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(prediction.commonName)}`;

  return (
    <Dialog open={!!prediction} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {prediction.commonName}
          </DialogTitle>
          <DialogDescription className="text-base italic text-muted-foreground">
            {prediction.scientificName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold mb-2 text-foreground">Family</h4>
            <p className="text-muted-foreground">{prediction.family}</p>
          </div>
          
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold mb-2 text-foreground">Confidence Score</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
              <span className="font-bold text-lg">{Math.round(prediction.confidence)}%</span>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold mb-2 text-foreground">Description</h4>
            <p className="text-muted-foreground leading-relaxed">
              {prediction.description}
            </p>
          </div>
          
          <Button
            onClick={() => window.open(wikipediaUrl, "_blank")}
            className="w-full"
            variant="default"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Learn More on Wikipedia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
