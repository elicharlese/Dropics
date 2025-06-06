import Link from "next/link"
import Image from "next/image"

interface MegaMenuItem {
  name: string
  href: string
}

interface MegaMenuProps {
  title: string
  description: string
  image: string
  items: MegaMenuItem[]
  categories: MegaMenuItem[]
}

export function MegaMenu({ title, description, image, items, categories }: MegaMenuProps) {
  return (
    <div className="absolute left-0 right-0 mx-auto w-full max-w-6xl">
      <div className="overflow-hidden shadow-lg rounded-xl border-2 border-brand-teal/20">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 lg:p-8 bubble-bg">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          <div className="col-span-2 grid grid-cols-2 gap-6 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-brand-teal mb-4">{title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{description}</p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-brand-coral transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-coral mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={category.href}
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative h-full w-full min-h-[200px] overflow-hidden rounded-lg">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/70 to-transparent flex items-end">
                <div className="p-4">
                  <Link href={items[0].href} className="text-white font-medium text-sm hover:underline">
                    View All {title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-brand-yellow/10 p-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Free shipping on orders over $75</p>
          <Link
            href={items[0].href}
            className="text-sm font-medium text-brand-teal hover:text-brand-coral transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  )
}

