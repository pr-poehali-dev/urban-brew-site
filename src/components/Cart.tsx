import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const { toast } = useToast();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
  };

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/[^0-9+\s()-]/g, '');
    setPhone(numericValue);
  };

  const handleSubmitOrder = () => {
    const newErrors = { name: '', email: '', phone: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Неверный формат телефона';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      toast({
        title: "Заказ оформлен! ☕",
        description: `Мы свяжемся с вами по телефону ${phone}`,
      });
      
      setName('');
      setEmail('');
      setPhone('');
      setShowCheckout(false);
      onClearCart();
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'Cormorant, serif' }} className="text-3xl">
            {showCheckout ? 'Оформление заказа' : 'Корзина'}
          </SheetTitle>
        </SheetHeader>

        {!showCheckout ? (
          <>
            <div className="mt-8 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-primary font-bold mt-2">{item.price}₽</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRemoveItem(index)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <SheetFooter className="mt-8 flex-col gap-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{totalPrice}₽</span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setShowCheckout(true)}
                >
                  Оформить заказ
                </Button>
              </SheetFooter>
            )}
          </>
        ) : (
          <>
            <div className="mt-8 space-y-6">
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Ваш заказ:</h4>
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-semibold">{item.price * item.quantity}₽</span>
                  </div>
                ))}
                <div className="pt-2 border-t flex justify-between font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{totalPrice}₽</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.ru"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <SheetFooter className="mt-8 flex-col gap-2">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleSubmitOrder}
              >
                Подтвердить заказ
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => setShowCheckout(false)}
              >
                Назад
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
