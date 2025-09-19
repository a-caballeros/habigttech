import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Mail } from 'lucide-react';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, billingCycle } = location.state || {};

  const getPaymentLink = (tierName: string, billingCycle: string) => {
    const tierNameLower = tierName.toLowerCase();
    
    if (tierNameLower === 'bronce') {
      return billingCycle === 'monthly' ? 'https://pay.n1co.shop/pl/E8mRms2ol' : 'https://pay.n1co.shop/pl/jzb23cYbj';
    } else if (tierNameLower === 'plata') {
      return billingCycle === 'monthly' ? 'https://pay.n1co.shop/pl/yqkdkuZkq' : 'https://pay.n1co.shop/pl/24mYAfldX';
    } else if (tierNameLower === 'oro') {
      return billingCycle === 'monthly' ? 'https://pay.n1co.shop/pl/Zq4XXHbR8' : 'https://pay.n1co.shop/pl/BLm2LSYO0';
    } else if (tierNameLower === 'platino') {
      return billingCycle === 'monthly' ? 'https://pay.n1co.shop/pl/lK0QAFb02' : 'https://pay.n1co.shop/pl/KwyX4fA9K';
    }
    return '';
  };

  const handleCreditCardPayment = () => {
    const paymentLink = getPaymentLink(selectedPlan?.name || '', billingCycle || 'monthly');
    if (paymentLink) {
      window.open(paymentLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Formas de pago</h1>
            {selectedPlan && (
              <p className="text-muted-foreground">
                Plan seleccionado: <span className="font-semibold">{selectedPlan.name}</span> - {billingCycle === 'monthly' ? 'Mensual' : 'Anual'} - {new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(billingCycle === 'monthly' ? selectedPlan.monthly_price : selectedPlan.annual_price)}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-1 gap-6 mb-8 max-w-md mx-auto">
            {/* Credit Card Payment */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={handleCreditCardPayment}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Pagos con Tarjeta de Crédito/Débito</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Realiza tu pago de forma segura con tarjeta de crédito o débito
                </p>
                <Button variant="outline" className="w-full">
                  Pagar con Tarjeta
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={() => navigate('/subscription')}>
              ← Volver a planes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
