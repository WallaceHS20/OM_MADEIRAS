
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Hero } from "@/components/Hero/indesx";
import { ContactCTA } from "@/components/Contact";
import logo from "@/assets/logo.png";
import fallback from "@/assets/no-image.png";
import { subscribeProducts } from "@/services/Products";
import { ProductCard } from "@/components/Card";

// 🔥 Importa TODAS imagens
const images = import.meta.glob("@/assets/products/*.jpeg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// 🔥 MULTI IMAGENS
const getProductImagesById = (id: string | number): string[] => {
  const matched = Object.keys(images).filter((path) =>
    path.match(new RegExp(`/${id}(-|_|\\.)`))
  );

  if (matched.length === 0) return [fallback];

  return matched.map((key) => images[key]);
};

export default function Products() {
  const container = useRef(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Firebase realtime
  useEffect(() => {
    const unsubscribe = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 adiciona imagens
  const productsWithImages = products.map((product) => ({
    ...product,
    images: getProductImagesById(product.id),
  }));

  // 🎬 animação
  useGSAP(
    () => {
      if (!productsWithImages.length) return;

      gsap.from(".card-anim", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: container, dependencies: [productsWithImages] }
  );

  return (
    <div className="p-4">
      <Hero />

      <h2 className="text-3xl font-bold mb-4 text-center">
        Catálogo Marcenaria
      </h2>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-content-center py-6">
          <i className="pi pi-spin pi-spinner text-3xl"></i>
        </div>
      ) : (
        <div ref={container} className="grid">
          {productsWithImages.length > 0 ? (
            productsWithImages.map((product) => (
              <div
                key={product.id}
                className="col-12 md:col-6 lg:col-4 card-anim"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-500">
              Nenhum produto cadastrado
            </div>
          )}
        </div>
      )}

      <ContactCTA />

      <TestimonialCarousel />

      <div className="flex justify-content-center w-full py-4">
        <img
          src={logo}
          alt="Marcenaria de alto padrão"
          style={{ maxWidth: "200px" }}
        />
      </div>
    </div>
  );
}