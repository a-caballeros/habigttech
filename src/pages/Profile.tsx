import { useAuth } from "@/contexts/AuthContext";
import ClientProfile from "@/components/ClientProfile";
import AgentProfile from "@/components/AgentProfile";

const Profile = () => {
  const { userType } = useAuth();

  if (userType === 'agent') {
    return <AgentProfile />;
  }

  return <ClientProfile />;
};

export default Profile;