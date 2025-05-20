import useBaseUrl from "@docusaurus/useBaseUrl";

type ResponsiveImageProps = {
  alt: string;
  src: string;
  sizes?: string;
  format?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  alt,
  src,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
  format = "png",
  className,
  loading,
}) => {
  // 使用 1x (1280px), 2x (2560px), 3x (3840px) 尺寸
  const srcSet = [
    `${useBaseUrl(`${src}-1x.${format}`)} 1x`,
    `${useBaseUrl(`${src}-2x.${format}`)} 2x`,
    `${useBaseUrl(`${src}-3x.${format}`)} 3x`,
  ].join(", ");

  const fallback = useBaseUrl(`${src}-1x.${format}`);

  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
};
