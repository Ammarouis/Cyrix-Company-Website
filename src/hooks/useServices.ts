import { useLanguage } from "@/hooks/useLanguage";
import { services as baseServices, type Service } from "@/data/services";

export const useServices = (): Service[] => {
  const { t } = useLanguage();

  return baseServices.map((service) => {
    const prefix = `services.${service.id}`;
    return {
      ...service,
      name: t(`${prefix}.name`),
      tagline: t(`${prefix}.tagline`),
      location: t(`${prefix}.location`),
      description: t(`${prefix}.description`),
      features: service.features.map((_, index) => t(`${prefix}.features.${index}`)),
      amenities: service.amenities.map((amenity, index) => ({
        ...amenity,
        label: t(`${prefix}.amenities.${index}.label`),
        description: t(`${prefix}.amenities.${index}.description`),
      })),
      details: service.details.map((_, index) => t(`${prefix}.details.${index}`)),
      reviews: service.reviews.map((review, index) => ({
        ...review,
        role: t(`${prefix}.reviews.${index}.role`),
        comment: t(`${prefix}.reviews.${index}.comment`),
      })),
    };
  });
};

export const useFeaturedServices = () => {
  const services = useServices();
  return services.filter((s) => s.featured);
};

export const useServiceById = (id?: string) => {
  const services = useServices();
  return id ? services.find((s) => s.id === id) : undefined;
};
