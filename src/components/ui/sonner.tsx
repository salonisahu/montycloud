import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      position="top-right"
      className="toaster group"
      closeButton
      richColors
      duration={3000}
      toastOptions={{
        classNames: {
          toast: "group toast",
          title: "font-medium",
          description: "text-sm opacity-90",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
