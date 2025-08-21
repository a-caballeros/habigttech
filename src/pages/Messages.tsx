import Navigation from "@/components/Navigation";
import MessagingSystem from "@/components/MessagingSystem";

const Messages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <MessagingSystem />
      </div>
    </div>
  );
};

export default Messages;