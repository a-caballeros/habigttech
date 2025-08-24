import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';

const PayPalPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, billingCycle } = location.state || {};

  const paypalUser = '@alfonsocaballeros';
  const contactEmail = 'webmaster@habigt.tech';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  const sendReceipt = () => {
    const subject = encodeURIComponent('Comprobante de pago PayPal - Suscripción');
    const body = encodeURIComponent(
      `Estimados,\n\nAdjunto el comprobante de pago realizado a través de PayPal para mi suscripción:\n\nPlan: ${selectedPlan?.name || 'N/A'}\nModalidad: ${billingCycle || 'N/A'}\nUsuario PayPal: ${paypalUser}\n\nPor favor, confirmen la activación de mi suscripción.\n\nGracias.`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a formas de pago
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Pago con PayPal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedPlan && (
                <Alert>
                  <AlertDescription>
                    <strong>Plan seleccionado:</strong> {selectedPlan.name} - {billingCycle}
                    <br />
                    <strong>Monto:</strong> ${billingCycle === 'monthly' ? selectedPlan.monthly_price : selectedPlan.annual_price} USD
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Instrucciones para el pago:</h3>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2"><strong>1.</strong> Realiza el pago a través de PayPal al siguiente usuario:</p>
                  <div className="flex items-center gap-2 bg-background p-3 rounded border">
                    <span className="font-mono font-medium">{paypalUser}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(paypalUser)}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2"><strong>2.</strong> Una vez realizado el pago, envía el comprobante por correo electrónico a:</p>
                  <div className="flex items-center gap-2 bg-background p-3 rounded border">
                    <span className="font-mono font-medium">{contactEmail}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(contactEmail)}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground"><strong>3.</strong> Incluye en el asunto del correo: "Comprobante de pago PayPal - Suscripción"</p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Importante:</strong> Tu suscripción será activada una vez que confirmemos la recepción del pago. Este proceso puede tomar hasta 24 horas hábiles.
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button onClick={sendReceipt} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar comprobante por correo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;