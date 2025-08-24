import AgentDashboard from "@/components/AgentDashboard";
import AgentSubscriptionGuard from "@/components/AgentSubscriptionGuard";

const Dashboard = () => {
  return (
    <AgentSubscriptionGuard>
      <AgentDashboard />
    </AgentSubscriptionGuard>
  );
};

export default Dashboard;