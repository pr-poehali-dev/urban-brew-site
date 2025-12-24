import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Cart, { CartItem } from '@/components/Cart';

const FloatingLeaf = ({ delay, left, top }: { delay: number; left: number; top: number }) => {
  const leafEmojis = ['🌿', '🍂', '🍁', '☘️'];
  const randomLeaf = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
  
  return (
    <div
      className="absolute text-4xl opacity-25 animate-float"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        top: `${top}%`,
      }}
    >
      {randomLeaf}
    </div>
  );
};

const SteamLine = ({ delay }: { delay: number }) => {
  return (
    <div
      className="absolute text-2xl opacity-40"
      style={{
        animationDelay: `${delay}s`,
        animation: 'float 2s ease-in-out infinite',
      }}
    >
      💨
    </div>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    {
      category: 'Эспрессо напитки',
      items: [
        { name: 'Эспрессо', description: 'Классический итальянский кофе', price: '120₽' },
        { name: 'Американо', description: 'Эспрессо с горячей водой', price: '150₽' },
        { name: 'Капучино', description: 'Эспрессо с молочной пеной', price: '180₽' },
        { name: 'Латте', description: 'Нежный кофе с молоком', price: '200₽' },
      ]
    },
    {
      category: 'Альтернатива',
      items: [
        { name: 'Флэт Уайт', description: 'Двойной эспрессо с бархатным молоком', price: '220₽' },
        { name: 'Раф', description: 'Сливочный напиток со сливками', price: '240₽' },
        { name: 'Матча Латте', description: 'Японский зеленый чай с молоком', price: '260₽' },
      ]
    },
    {
      category: 'Десерты',
      items: [
        { name: 'Круассан', description: 'Французская классика', price: '150₽' },
        { name: 'Чизкейк', description: 'Нью-йоркский стиль', price: '280₽' },
        { name: 'Брауни', description: 'Шоколадный десерт', price: '250₽' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
              Urban Brew
            </h1>
            
            <div className="flex items-center gap-4">
              <Cart 
                items={cartItems}
                onUpdateQuantity={(index, quantity) => {
                  const newItems = [...cartItems];
                  newItems[index].quantity = quantity;
                  setCartItems(newItems);
                }}
                onRemoveItem={(index) => {
                  setCartItems(cartItems.filter((_, i) => i !== index));
                }}
                onClearCart={() => setCartItems([])}
              />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
              >
                <Icon name="Home" size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Главная</span>
              </button>
              
              <button
                onClick={() => scrollToSection('menu')}
                className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
              >
                <Icon name="Coffee" size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Меню</span>
              </button>
              
              <button
                onClick={() => scrollToSection('takeaway')}
                className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
              >
                <Icon name="ShoppingBag" size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">С собой</span>
              </button>
              
              <button
                onClick={() => scrollToSection('terrace')}
                className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
              >
                <Icon name="Flower2" size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Веранда</span>
              </button>
              
              <button
                onClick={() => scrollToSection('contacts')}
                className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
              >
                <Icon name="MapPin" size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Контакты</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/20"></div>
        
        {[...Array(25)].map((_, i) => (
          <FloatingLeaf 
            key={`leaf-${i}`} 
            delay={i * 0.5} 
            left={Math.random() * 95} 
            top={Math.random() * 90}
          />
        ))}
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8 relative">
            <div className="text-9xl mb-4 animate-float">☕</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-2">
              <SteamLine delay={0} />
              <SteamLine delay={0.3} />
              <SteamLine delay={0.6} />
            </div>
          </div>
          
          <h2 className="text-7xl md:text-8xl font-bold mb-6 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
            Urban Brew
          </h2>
          
          <p className="text-2xl md:text-3xl mb-4 text-muted-foreground" style={{ fontFamily: 'Caveat, cursive' }}>
            Где каждый день начинается с правильного кофе
          </p>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto text-foreground/80">
            Уютная кофейня в центре города с авторскими напитками, домашними десертами и атмосферой для работы и встреч
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('menu')}
              className="text-lg px-8"
            >
              <Icon name="Coffee" size={20} className="mr-2" />
              Смотреть меню
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('contacts')}
              className="text-lg px-8"
            >
              <Icon name="MapPin" size={20} className="mr-2" />
              Как добраться
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary/50" />
        </div>
      </section>

      <section id="menu" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-6xl mb-4">☕</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
              Наше меню
            </h2>
            <p className="text-xl text-muted-foreground">
              Авторские напитки из свежеобжаренных зерен
            </p>
          </div>

          <div className="space-y-12">
            {menuItems.map((section, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-3xl font-bold mb-6 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
                  {section.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIdx) => (
                    <Card key={itemIdx} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-foreground">{item.name}</h4>
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const price = parseInt(item.price.replace('₽', ''));
                          const existingIndex = cartItems.findIndex(ci => ci.name === item.name);
                          
                          if (existingIndex >= 0) {
                            const newItems = [...cartItems];
                            newItems[existingIndex].quantity += 1;
                            setCartItems(newItems);
                          } else {
                            setCartItems([...cartItems, {
                              name: item.name,
                              description: item.description,
                              price,
                              quantity: 1
                            }]);
                          }
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="takeaway" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="text-6xl mb-6">🥤</div>
              <h2 className="text-5xl font-bold mb-6 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
                Кофе с собой
              </h2>
              <p className="text-lg mb-6 text-foreground/80">
                Забирайте любимые напитки с собой в экологичных стаканчиках. 
                Приносите свою кружку и получите скидку 10%!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={24} className="text-primary" />
                  <span>Быстрая подача за 3-5 минут</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Leaf" size={24} className="text-primary" />
                  <span>Экологичная упаковка</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Percent" size={24} className="text-primary" />
                  <span>Скидка за свою тару</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/323c2b84-3ab7-4d30-a797-e954de647b73/files/42326189-7124-4d41-8e51-57e9181f96fa.jpg"
                alt="Кофе с собой"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="terrace" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl animate-fade-in order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/projects/323c2b84-3ab7-4d30-a797-e954de647b73/files/a1986739-07cf-4c33-8dab-c857eb9e0c18.jpg"
                alt="Веранда"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="animate-fade-in order-1 md:order-2">
              <div className="text-6xl mb-6">🌿</div>
              <h2 className="text-5xl font-bold mb-6 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
                Летняя веранда
              </h2>
              <p className="text-lg mb-6 text-foreground/80">
                Уютная веранда с живыми растениями и мягким освещением. 
                Идеальное место для работы за ноутбуком или встреч с друзьями.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Wifi" size={24} className="text-primary" />
                  <span>Быстрый Wi-Fi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Plug" size={24} className="text-primary" />
                  <span>Розетки на каждом столике</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={24} className="text-primary" />
                  <span>Приятная фоновая музыка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
              Как нас найти
            </h2>
            <p className="text-xl text-muted-foreground">
              Приходите в гости — мы всегда рады!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-primary" style={{ fontFamily: 'Cormorant, serif' }}>
                Контактная информация
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Адрес</p>
                    <p className="text-muted-foreground">ул. Пушкина, д. 23, Москва</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">Пн-Пт: 8:00 - 22:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 9:00 - 23:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">hello@urbanbrew.ru</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                    <Icon name="Twitter" size={20} />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="relative h-96 md:h-auto rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/323c2b84-3ab7-4d30-a797-e954de647b73/files/7266110e-f4e8-4db1-b61a-00544cafdd35.jpg"
                alt="Кофейные зерна"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Cormorant, serif' }}>
            Urban Brew
          </h3>
          <p className="text-lg mb-6 opacity-90" style={{ fontFamily: 'Caveat, cursive' }}>
            Кофе, который вдохновляет
          </p>
          <p className="text-sm opacity-75">
            © 2024 Urban Brew. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;