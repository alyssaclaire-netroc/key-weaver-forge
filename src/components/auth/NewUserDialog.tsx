import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NewUserDialogProps {
  open: boolean;
  onNewUser: () => void;
  onExistingUser: () => void;
}

const NewUserDialog = ({ open, onNewUser, onExistingUser }: NewUserDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="glass-card max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            Are you a new user?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onNewUser} className="glass-button">
            Yes, I'm new
          </Button>
          <Button onClick={onExistingUser} variant="outline" className="glass-input">
            No, existing user
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserDialog;