import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Send, Paperclip, MoreHorizontal,
  Search, Filter, Archive
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
}

interface Conversation {
  id: string;
  contactName: string;
  contactPhoto: string;
  propertyTitle: string;
  propertyImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

const MessagingSystem = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      contactName: 'Carlos Mendoza',
      contactPhoto: '/api/placeholder/40/40',
      propertyTitle: 'Casa Colonial en Antigua',
      propertyImage: '/api/placeholder/60/40',
      lastMessage: '¿Podríamos agendar una visita para este fin de semana?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      messages: [
        {
          id: '1',
          text: 'Hola, me interesa mucho esta propiedad. ¿Está disponible?',
          timestamp: '10:15 AM',
          sent: false
        },
        {
          id: '2',
          text: 'Hola Carlos! Sí, la propiedad está disponible. Me da mucho gusto que te interese.',
          timestamp: '10:20 AM',
          sent: true
        },
        {
          id: '3',
          text: '¿Podríamos agendar una visita para este fin de semana?',
          timestamp: '10:30 AM',
          sent: false
        }
      ]
    },
    {
      id: '2',
      contactName: 'Ana Rodríguez',
      contactPhoto: '/api/placeholder/40/40',
      propertyTitle: 'Apartamento Moderno Zona 14',
      propertyImage: '/api/placeholder/60/40',
      lastMessage: 'Perfecto. Nos vemos el sábado a las 3 PM.',
      timestamp: 'Ayer',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          text: 'Me gustaría conocer más detalles sobre el financiamiento disponible.',
          timestamp: 'Ayer 2:15 PM',
          sent: false
        },
        {
          id: '2',
          text: 'Claro, tenemos varias opciones de financiamiento. ¿Te parece si nos reunimos para platicarte en detalle?',
          timestamp: 'Ayer 2:30 PM',
          sent: true
        },
        {
          id: '3',
          text: 'Perfecto. Nos vemos el sábado a las 3 PM.',
          timestamp: 'Ayer 2:45 PM',
          sent: false
        }
      ]
    },
    {
      id: '3',
      contactName: 'Roberto García',
      contactPhoto: '/api/placeholder/40/40',
      propertyTitle: 'Villa con Piscina',
      propertyImage: '/api/placeholder/60/40',
      lastMessage: '¿Incluye los muebles del área social?',
      timestamp: 'Lun',
      unreadCount: 1,
      messages: [
        {
          id: '1',
          text: '¿Incluye los muebles del área social?',
          timestamp: 'Lun 4:20 PM',
          sent: false
        }
      ]
    }
  ]);

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    // Here you would normally send the message to your backend
    setNewMessage("");
  };

  // Inbox View
  if (!selectedChat) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Mensajes</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-1" />
                  Archivadas
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer transition-smooth"
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.contactPhoto} />
                        <AvatarFallback>{conversation.contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-foreground">{conversation.contactName}</h3>
                        <span className="text-sm text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={conversation.propertyImage}
                          alt={conversation.propertyTitle}
                          className="w-8 h-6 rounded object-cover"
                        />
                        <span className="text-sm text-muted-foreground truncate">
                          {conversation.propertyTitle}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chat View
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedChat(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedConversation?.contactPhoto} />
              <AvatarFallback>
                {selectedConversation?.contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                {selectedConversation?.contactName}
              </h3>
              <div className="flex items-center gap-2">
                <img 
                  src={selectedConversation?.propertyImage}
                  alt={selectedConversation?.propertyTitle}
                  className="w-6 h-4 rounded object-cover"
                />
                <span className="text-sm text-muted-foreground">
                  {selectedConversation?.propertyTitle}
                </span>
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Separator />

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {selectedConversation?.messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.sent 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-muted text-foreground mr-4'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <Separator />

        {/* Message Input */}
        <div className="p-4 flex-shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input 
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagingSystem;