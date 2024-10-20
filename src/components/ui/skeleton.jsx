export default function SkeletonLoader({ size }) {
  return (
    <div
      className={`${size} skeleton truncate bg-black/10 text-base font-medium text-muted-foreground mb-2`}
    ></div>
  );
}
