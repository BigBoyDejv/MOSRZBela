'use client';
import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '4px', className = '' }: SkeletonProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden bg-[rgba(255,255,255,0.05)] ${className}`}
      style={{ width, height, borderRadius }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export const NewsSkeleton = () => (
  <div className="flex flex-col gap-4 p-6 border border-white/5 bg-white/5 rounded-2xl">
    <Skeleton width="40%" height="1rem" />
    <Skeleton width="100%" height="2rem" />
    <Skeleton width="100%" height="4rem" />
    <div className="flex gap-2">
      <Skeleton width="4rem" height="1.5rem" borderRadius="999px" />
      <Skeleton width="4rem" height="1.5rem" borderRadius="999px" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border-b border-white/5">
        <Skeleton width="100px" height="60px" />
        <div className="flex-1 space-y-2">
          <Skeleton width="70%" height="1.2rem" />
          <Skeleton width="40%" height="1rem" />
        </div>
      </div>
    ))}
  </div>
);
