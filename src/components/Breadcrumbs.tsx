import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    const routeNames: Record<string, string> = {
      'chi-siamo': 'Chi Siamo',
      'servizi': 'Servizi',
      'percorsi': 'Percorsi',
      'risorse': 'Risorse',
      'contatti': 'Contatti',
      'cookie-policy': 'Cookie Policy',
      'privacy-policy': 'Privacy Policy'
    };
    
    pathnames.forEach((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      breadcrumbs.push({
        label: routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1),
        href: isLast ? undefined : routeTo
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = items || generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') return null;
  
  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://noscite.it${item.href}` })
    }))
  };
  
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb"
        className={cn("py-4", className)}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            {breadcrumbItems.map((item, index) => (
              <li key={item.label} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
                )}
                
                {index === 0 && (
                  <Home className="h-4 w-4 mr-2 text-muted-foreground/60" />
                )}
                
                {item.href ? (
                  <Link 
                    to={item.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};