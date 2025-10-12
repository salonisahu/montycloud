import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddNewTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNewTransaction = ({ isOpen, onClose }: AddNewTransactionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    category: "",
  });

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.description || !formData.amount || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate amount is a number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Show success message
    toast.success("Transaction added successfully!");

    // Reset form
    setFormData({
      name: "",
      description: "",
      amount: "",
      category: "",
    });

    // Close dialog
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      description: "",
      amount: "",
      category: "",
    });

    // Close dialog
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>Enter the details for your new transaction. This will be added to your transaction history.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Transaction name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Transaction description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="0.00"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
