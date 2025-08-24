import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Mail } from 'lucide-react';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, billingCycle } = location.state || {};

  const handlePayPalPayment = () => {
    navigate('/payment/paypal', { state: { selectedPlan, billingCycle } });
  };

  const handleBinancePayment = () => {
    navigate('/payment/binance', { state: { selectedPlan, billingCycle } });
  };

  const handleOtherPayments = () => {
    const subject = encodeURIComponent('Consulta sobre formas de pago alternativas');
    const body = encodeURIComponent(
      `Hola,\n\nMe interesa suscribirme al plan ${selectedPlan?.name} (${billingCycle}) y me gustaría conocer las formas de pago disponibles en moneda local.\n\nPor favor, proporciónenme la información necesaria para realizar el pago de forma directa.\n\nGracias.`
    );
    window.location.href = `mailto:webmaster@habigt.tech?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Formas de pago</h1>
            {selectedPlan && (
              <p className="text-muted-foreground">
                Plan seleccionado: <span className="font-semibold">{selectedPlan.name}</span> - {billingCycle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* PayPal Payment */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={handlePayPalPayment}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Pago con PayPal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Realiza tu pago de forma segura a través de PayPal
                </p>
                <Button variant="outline" className="w-full">
                  Pagar con PayPal
                </Button>
              </CardContent>
            </Card>

            {/* Binance Pay */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={handleBinancePayment}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-xl">Binance Pay</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Paga con criptomonedas usando Binance Pay
                </p>
                <Button variant="outline" className="w-full">
                  Pagar con Binance
                </Button>
              </CardContent>
            </Card>

            {/* Other Payment Methods */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={handleOtherPayments}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">Otras formas de pago</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Consulta sobre pagos en moneda local y transferencias directas
                </p>
                <Button variant="outline" className="w-full">
                  Consultar opciones
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
