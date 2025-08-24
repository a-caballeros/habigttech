import { useAuth } from "@/contexts/AuthContext";
import ClientProfile from "@/components/ClientProfile";
import AgentProfile from "@/components/AgentProfile";
import AgentSubscriptionGuard from "@/components/AgentSubscriptionGuard";

const Profile = () => {
  const { userType } = useAuth();

  if (userType === 'agent') {
    return (
      <AgentSubscriptionGuard>
        <AgentProfile />
      </AgentSubscriptionGuard>
    );
  }

  return <ClientProfile />;
};

export default Profile;