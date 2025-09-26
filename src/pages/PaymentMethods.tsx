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

          {/* Payment Security Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔒 Pagos Seguros
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Tus pagos están protegidos por N1co
              </h3>
              
              <div className="space-y-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                <p>
                  <span className="font-medium text-foreground">N1co</span> es una fintech de El Salvador especializada en procesamiento de pagos digitales, respaldada por <span className="font-medium text-blue-600">VISA</span> e instituciones financieras reguladas.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <div className="flex items-center space-x-2 bg-background/50 rounded-full px-3 py-1">
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium">Encriptación SSL</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-background/50 rounded-full px-3 py-1">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium">Respaldado por VISA</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-background/50 rounded-full px-3 py-1">
                    <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium">Regulado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
              📋 Pasos después del pago
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                <p>Realiza tu pago utilizando el método seleccionado arriba</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <p className="font-medium mb-2">Envía tu comprobante de pago a:</p>
                  <div className="bg-background/50 rounded-md p-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a 
                        href="mailto:webmaster@habigt.tech" 
                        className="font-mono text-primary hover:text-primary/80 transition-colors"
                      >
                        webmaster@habigt.tech
                      </a>
                    </div>
                    <div className="text-xs text-muted-foreground">o</div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686z"/>
                      </svg>
                      <a 
                        href="https://wa.me/50242457829" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-mono text-green-600 hover:text-green-500 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <p>Tu cuenta será activada en un máximo de <span className="font-semibold text-primary">24 horas</span> después de verificar tu pago</p>
                </div>
              </div>
            </div>
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
