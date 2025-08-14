import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PasswordResetDialogProps {
  open: boolean;
  onDidReset: () => void;
  onNeedReset: () => void;
}

const PasswordResetDialog = ({ open, onDidReset, onNeedReset }: PasswordResetDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="glass-card max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            Did you reset your password?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onDidReset} className="glass-button">
            Yes, I reset it
          </Button>
          <Button onClick={onNeedReset} variant="outline" className="glass-input">
            No, I need to reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetDialog;