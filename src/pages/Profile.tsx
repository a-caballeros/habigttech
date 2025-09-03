import { useAuth } from "@/contexts/AuthContext";
import ClientProfile from "@/components/ClientProfile";
import AgentProfile from "@/components/AgentProfile";
import AgentSubscriptionGuard from "@/components/AgentSubscriptionGuard";

const Profile = () => {
  const { userType } = useAuth();

  if (userType === 'admin') {
    // Redirect to admin users page for admin users
    window.location.href = '/admin-users';
    return null;
  }

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